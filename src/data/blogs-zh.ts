export interface BlogTranslation {
  title: string;
  summary: string;
  tags: string[];
  content: string;
}

export const BLOGS_ZH: Record<string, BlogTranslation> = {
  "windows-network-isolation-dotnet": {
    title: "基于 .NET 8 构建 Windows 进程级网络隔离代理架构",
    summary:
      "深入剖析 Win Antify Proxy 的架构设计：如何在不修改 Windows 全局注册表与系统代理的前提下，实现应用进程级代理分流、动态环境变量注入与零污染退出机制。",
    tags: ["C#", ".NET 8", "系统架构", "网络工程"],
    content: `# 基于 .NET 8 构建 Windows 进程级网络隔离代理架构

大多数运行在 Windows 上的开发者工具与企业网络客户端都高度依赖全局系统代理配置。直接通过 Windows Internet API（\`InternetSetOption\`）或修改注册表路径（\`HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\`），会对操作系统中运行的所有应用程序产生无差别的全局影响。

在构建分布式微服务、调试本地网关或跨异构企业内网办公时，全局代理往往会带来严重的操作冲突。例如，原本仅为自动化测试脚本或特定遗留客户端启动的代理，往往会意外拦截浏览器的日常访问、即时通讯工具以及 IDE 的后台同步服务。

为了彻底解决这一痛点，我设计并开发了 **Win Antify Proxy**——一款基于 C# 和 .NET 8 WPF 构建的高性能轻量级 Windows 桌面实用工具，提供精确到应用进程级别的网络隔离与动态执行环境变量管控。

## 核心挑战：构建进程级隔离边界

Windows 原生并未在应用层提供类似 *“仅将 PID 为 14280 的进程流量转发至代理 127.0.0.1:7897”* 的即开即用开关。业内通常采取的方案可分为以下两类：

1. **内核级 WFP（Windows 过滤平台）驱动程序**：具备极强的底层流量拦截能力，但需要微软内核代码签名、管理员提权安装，且后期维护与兼容性成本极高。
2. **环境变量注入与专属子进程包裹机制**：直接将标准的代理环境变量（\`HTTP_PROXY\`、\`HTTPS_PROXY\`、\`ALL_PROXY\`、\`NO_PROXY\`）动态注入到目标进程的执行上下文中。

对于一款强调“零系统污染、即开即用”的开发者工具而言，第二种方案结合进程生命周期状态监控，能够在安全性、便携性与零注册表污染之间取得绝佳的工程平衡。

## 1. 干净的子进程生成与独立环境块

当通过 Win Antify Proxy 启动目标可执行程序时，系统会构建专属的 \`ProcessStartInfo\` 配置块，独立隔离进程环境，避免继承被全局污染的状态：

\`\`\`csharp
public Process LaunchIsolatedProcess(string executablePath, ProxyProfile profile, string[]? arguments = null)
{
    var startInfo = new ProcessStartInfo
    {
        FileName = executablePath,
        Arguments = arguments != null ? string.Join(" ", arguments) : string.Empty,
        UseShellExecute = false,
        CreateNoWindow = false
    };

    // 注入精确的进程级代理路由环境变量
    startInfo.EnvironmentVariables["HTTP_PROXY"] = profile.Endpoint;
    startInfo.EnvironmentVariables["HTTPS_PROXY"] = profile.Endpoint;
    startInfo.EnvironmentVariables["ALL_PROXY"] = profile.Endpoint;
    startInfo.EnvironmentVariables["NO_PROXY"] = profile.BypassList;

    var process = new Process { StartInfo = startInfo };
    process.EnableRaisingEvents = true;
    process.Exited += (s, e) => OnProcessTerminated(process.Id);
    process.Start();

    return process;
}
\`\`\`

通过显式指定 \`UseShellExecute = false\`，我们直接绕过了 Windows Shell 默认的注册表继承链，从而确保子进程获得的是经过精确隔离的作用域环境块。

## 2. 实时遥测与底层套接字诊断

在现代开发者工具中，直观的可观测性至关重要。如果缺乏低延迟的实时遥测指标，定位连接超时或握手失败往往只能沦为猜测。

Win Antify Proxy 集成了高精度系统性能计数器，支持实时追踪：

- **套接字往返时延（RTT）**：周期性向目标上游网关发送高效 TCP 探测包。
- **吞吐量遥测指标**：跨活跃进程句柄实时汇总上下行字节流计数。
- **连接健康检查**：当上游节点不可达或 TLS 握手重协商失败时，提供毫秒级 UI 状态提示。

\`\`\`csharp
// 轻量级套接字延迟探测器
public async Task<TimeSpan> MeasureGatewayLatencyAsync(IPEndPoint endpoint, CancellationToken ct)
{
    using var socket = new Socket(endpoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
    var stopwatch = Stopwatch.StartNew();
    
    await socket.ConnectAsync(endpoint, ct);
    stopwatch.Stop();
    
    return stopwatch.Elapsed;
}
\`\`\`

## 3. 零系统残留与优雅退出清理

传统代理管理工具最让人头疼的问题之一，便是在遭遇意外崩溃或系统重启后，因遗留开启的全局代理标志而导致整台计算机的网络瘫痪。

在 Win Antify Proxy 的架构设计中，我们采用了严格的无状态与生命周期绑定原则：
- **绝不篡改系统全局注册表**：程序全程不触碰 \`Internet Settings\` 下的 \`ProxyEnable\` 或 \`ProxyServer\` 项。
- **瞬态配置管理**：所有运行时状态仅驻留于用户本地配置目录或易失性进程内存中。
- **优雅的子进程树清理机制**：利用 Windows Job Objects（作业对象）追踪整个进程树生命周期，确保当主程序退出时，所有衍生孤儿进程均被安全妥善地回收。

## 总结与展望

在 Windows 平台上开发开发者工具，既需要敬畏操作系统的底层机制，又需要兼顾现代应用的流畅人机体验。Win Antify Proxy 证明了借助现代 .NET 8 与审慎的系统架构设计，我们完全能够在保障极低资源占用与毫秒级启动的同时，实现高水准的桌面端进程网络隔离。
`,
  },
  "building-resilient-llm-evaluation-pipelines": {
    title: "面向生产环境构建高可用 LLM 自动化评估系统",
    summary:
      "告别简单的单轮文本问答：深入探讨如何通过严格的 JSON Schema 输出约束、多维度量化评分标准校准，以及基于 DeepSeek 的企业级异步评估流水线架构。",
    tags: ["AI系统", "大语言模型", "DeepSeek", "全栈工程"],
    content: `# 面向生产环境构建高可用 LLM 自动化评估系统

将大语言模型（LLM）落地到生产环境中，早已超越了简单的对话气泡与自由文本生成的阶段。当今严苛的企业级软件——无论是候选人智能面试评估还是自动化合规审计——都对底层智能管道提出了**确定性、可复现与可审计**的硬性要求。

在设计与构建 **AI Hiring Workbench** 等智能分析系统的过程中，我深入攻克了将 LLM 融入业务核心链路的关键工程难题：如何确保结构化 Schema 100% 合规、如何根除模型给出的“幻觉评分”，以及如何在海量并发下平稳支撑高吞吐评估。

以下是构建韧性企业级 LLM 自动化评估流水线的核心架构设计模式。

## 1. 在 API 网关层实施严格的 JSON Schema 强类型约束

当下游业务系统需要依据评估分数进行排序、筛选候选人或将实体结构持久化到关系型数据库中时，自由随意的自然语言回复是完全不可接受的。仅仅在 Prompt 中写上 *“请仅返回有效的 JSON”*，在规模化高并发场景下必然会出现解析崩溃。

现代评估流水线必须在入口处施加端到端的结构化类型约束：

\`\`\`typescript
import { z } from "zod";

export const CandidateEvaluationSchema = z.object({
  candidateId: z.string().uuid(),
  overallScore: z.number().min(0).max(100),
  rubricBreakdown: z.object({
    technicalCompetence: z.number().min(0).max(100),
    systemDesign: z.number().min(0).max(100),
    communicationClarity: z.number().min(0).max(100),
  }),
  strengths: z.array(z.string().min(5)),
  growthAreas: z.array(z.string().min(5)),
  evidenceQuotes: z.array(z.string()),
  recommendation: z.enum(["strongly_hire", "hire", "neutral", "reject"]),
});

export type CandidateEvaluation = z.infer<typeof CandidateEvaluationSchema>;
\`\`\`

通过将大模型 API 的结构化输出模式（如 \`response_format: { type: "json_object" }\` 或原生 JSON Schema 约束）与业务边界处的 Zod 运行时校验深度绑定，任何不合规的模型输出都会在网关层被立即拦截并触发自动化受控重试，从而彻底杜绝脏数据污染底层数据库。

## 2. 多维度评分准则（Rubric）标定校准

AI 评估系统的一大普遍顽疾是“评分漂移”——对完全相同的输入材料，模型在本次调用中给出 85 分，下一次调用却给出 65 分。

为了最大程度提升评估打分的确定性与稳定性：

- **Few-Shot 锚点示例**：在系统提示词中显式提供代表“优秀、中等、不及格”各个层级的基准样本，并附带评级推导过程。
- **解构化拆分打分**：避免要求模型给出单一笼统的总体印象分，而是将其拆解为独立、可量化且具备明确打分边界的细分维度。
- **基于事实证据的引用溯源（Evidence Grounding）**：强制要求模型在推导细分子项得分之前，必须先从原始材料中摘录字面引文证据（*evidence quotes*）。强制模型列出客观依据不仅能约束其推理逻辑，更能大幅降低虚构与幻觉评分的概率。

> “如果一个 AI 评估系统无法准确指出支撑其结论的具体引文出处，那么该评估便不具备任何可审计性与公信力。”

## 3. 异步任务队列与流式实时遥测

对包含大量文字的长篇面试记录或复杂技术答卷进行批量评估时，任务耗时通常会超出常规 HTTP 网关的超时限制（Serverless 环境通常为 15～30 秒）。

稳健的评估系统架构必须将“任务触发”与“分析核心循环”彻底解耦：

\`\`\`
[前端客户端 / UI]
      │  (POST /api/evaluations/batch)
      ▼
[API 网关] ───► [Redis / BullMQ 异步队列]
                            │
                            ▼
                    [Worker 评估引擎]
                            │  (DeepSeek / LLM API)
                            ▼
                    [Zod Schema 校验器]
                            │
                            ├── 校验通过 ──► [数据库持久化] ──► [WebSocket 实时广播]
                            └── 校验失败 ──► [指数退避重试队列]
\`\`\`

1. **分布式任务队列**：将评估任务投递至消息队列（如 Redis / BullMQ），由后台 Worker 统一调度速率限制、重试策略与指数退避。
2. **基于 WebSocket 的实时状态流**：将阶段性处理进度（如 *文档已解析*、*提取技术能力画像*、*计算综合量化评分*）实时推送到客户端界面，提供流畅的用户交互反馈。
3. **不可变审计追踪**：将每次评估的完整 Prompt 输入、消耗的 Token 数量、网络时延以及模型版本与生成结果一同持久化归档，实现全生命周期的可追溯性。

## 结语

在生产环境中运用大语言模型，其核心不在于盲目祈祷模型“表现完美”，而在于构建足够坚固的工程骨架去保证系统的稳定性、可解释性与高效吞吐。通过结构化输出约束、证据链锚定以及可靠的异步队列架构，LLM 才能真正转化为企业级软件中值得托付的强大生产力引擎。
`,
  },
};
