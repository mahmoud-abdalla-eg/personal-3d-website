import React from "react";
import { SkillNames } from "./constants";

export type Language = "en" | "zh";

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    blogs: string;
    contact: string;
    menu: string;
    close: string;
    resume: string;
  };
  hero: {
    greeting: string;
    role: string;
    resumeBtn: string;
    hireBtn: string;
    devtoolsTip: string;
    hireTip: string;
  };
  skills: {
    title: string;
    subtitleShow: string;
    subtitleHint: string;
    srPresses: string;
    srPressesUnavailable: string;
    exploreSkills: string;
    pressKeyHint: string;
    chibiCredit: string;
  };
  experience: {
    title: string;
    subtitle: string;
    present: string;
  };
  projects: {
    title: string;
    githubBtn: string;
    comingSoonTitle: string;
    comingSoonDesc: string;
    visit: string;
    visitProject: string;
    github: string;
    frontendClient: string;
    backendSystems: string;
    keyFeatures: string;
    coreCapabilities: string;
    highlights: string;
    architectureFeatures: string;
  };
  contact: {
    heading1: string;
    heading2: string;
    formTitle: string;
    formDescPre: string;
    formDescPost: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    privacyPromise: string;
    sendMessage: string;
    pleaseWait: string;
    toastSuccessTitle: string;
    toastSuccessDesc: string;
    toastErrorTitle: string;
    toastErrorDesc: string;
    errName: string;
    errEmail: string;
    errMessage: string;
  };
  footer: {
    rights: string;
    blog: string;
    newsletter: string;
  };
  resume: {
    back: string;
    download: string;
  };
  blogs: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    featured: string;
    minRead: string;
    min: string;
    readArticle: string;
    noPosts: string;
    backAll: string;
  };
  misc: {
    radialHint: string;
    motionOn: string;
    motionOff: string;
    motionNudgeTitle: string;
    motionNudgeDesc: string;
    enable3D: string;
    noThanks: string;
    langSwitchAria: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      blogs: "Blogs",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      resume: "Resume",
    },
    hero: {
      greeting: "Hi, I am",
      role: "Full-Stack Developer & AI Systems Analyst",
      resumeBtn: "Resume",
      hireBtn: "Hire Me",
      devtoolsTip: "theres something waiting for you in devtools",
      hireTip: "pls 🥹 🙏",
    },
    skills: {
      title: "Tech Stack",
      subtitleShow: "Tools I build with",
      subtitleHint: "(hint: press a key)",
      srPresses: "keyboard presses by all visitors",
      srPressesUnavailable: "Shared keyboard count unavailable",
      exploreSkills: "Explore my skills",
      pressKeyHint: "Hover, tap, or press a key",
      chibiCredit: "Rendered with Chibi",
    },
    experience: {
      title: "Experience",
      subtitle: "My professional journey.",
      present: "Present",
    },
    projects: {
      title: "Projects",
      githubBtn: "Explore all repositories on GitHub",
      comingSoonTitle: "Projects will be listed soon",
      comingSoonDesc:
        "I am currently preparing and showcasing my recent work. Please check back soon!",
      visit: "Visit",
      visitProject: "Visit Project",
      github: "GitHub",
      frontendClient: "Frontend / Client",
      backendSystems: "Backend / Systems",
      keyFeatures: "Key Features",
      coreCapabilities: "Core Capabilities",
      highlights: "Highlights",
      architectureFeatures: "Architecture & Features",
    },
    contact: {
      heading1: "LET'S WORK",
      heading2: "TOGETHER",
      formTitle: "Contact Form",
      formDescPre: "Please contact me directly at ",
      formDescPost: " or drop your info here.",
      fullName: "Full name",
      fullNamePlaceholder: "Your Name",
      email: "Email Address",
      emailPlaceholder: "you@example.com",
      message: "Your Message",
      messagePlaceholder: "Tell me about about your project,",
      privacyPromise: "I'll never share your data with anyone else. Pinky promise!",
      sendMessage: "Send Message",
      pleaseWait: "Please wait",
      toastSuccessTitle: "Thank you!",
      toastSuccessDesc: "I'll get back to you as soon as possible.",
      toastErrorTitle: "Error",
      toastErrorDesc: "Something went wrong! Please try again.",
      errName: "Full name must be at least 2 characters",
      errEmail: "Please enter a valid email address",
      errMessage: "Message must be at least 10 characters",
    },
    footer: {
      rights: "All rights reserved.",
      blog: "Blog",
      newsletter: "Newsletter",
    },
    resume: {
      back: "Back to portfolio",
      download: "Download PDF",
    },
    blogs: {
      badge: "Blog",
      title1: "Thoughts &",
      title2: "Dispatches",
      subtitle:
        "Notes on building things, breaking things, and occasionally writing about it.",
      featured: "Featured",
      minRead: "min read",
      min: "min",
      readArticle: "Read article",
      noPosts: "No posts yet. Check back soon.",
      backAll: "Back to all posts",
    },
    misc: {
      radialHint: "Right-click anywhere to react",
      motionOn: "Reduce motion",
      motionOff: "Enable motion",
      motionNudgeTitle: "Reduced motion is on",
      motionNudgeDesc:
        "The interactive 3D scene and animations are turned off. Want the full experience?",
      enable3D: "Enable 3D",
      noThanks: "No thanks",
      langSwitchAria: "Switch to Chinese",
    },
  },
  zh: {
    nav: {
      home: "首页",
      about: "关于",
      skills: "技能",
      experience: "经历",
      projects: "项目",
      blogs: "博客",
      contact: "联系",
      menu: "菜单",
      close: "关闭",
      resume: "简历",
    },
    hero: {
      greeting: "你好，我是",
      role: "全栈 Web 开发者与 AI 系统分析师",
      resumeBtn: "查看简历",
      hireBtn: "合作咨询",
      devtoolsTip: "控制台里有小彩蛋在等你 👀",
      hireTip: "期待与您共事 🥹 🙏",
    },
    skills: {
      title: "技术栈",
      subtitleShow: "核心开发技能与生产力工具",
      subtitleHint: "（提示：按下一个按键）",
      srPresses: "位访客的按键记录",
      srPressesUnavailable: "共享按键记录不可用",
      exploreSkills: "探索我的核心技能",
      pressKeyHint: "悬停、点击或按下键盘按键",
      chibiCredit: "由 Chibi 3D 渲染",
    },
    experience: {
      title: "工作经历",
      subtitle: "我的专业实践与职业发展历程。",
      present: "至今",
    },
    projects: {
      title: "精选项目",
      githubBtn: "在 GitHub 上探索全部开源仓库",
      comingSoonTitle: "项目即将上线",
      comingSoonDesc: "目前正在整理近期的项目作品，敬请期待！",
      visit: "访问",
      visitProject: "访问项目",
      github: "GitHub",
      frontendClient: "前端 / 客户端",
      backendSystems: "后端 / 系统服务",
      keyFeatures: "核心特性",
      coreCapabilities: "核心功能",
      highlights: "产品亮点",
      architectureFeatures: "系统架构与特性",
    },
    contact: {
      heading1: "携手合作",
      heading2: "共创精彩",
      formTitle: "联系表单",
      formDescPre: "请直接发送邮件至 ",
      formDescPost: " 或在此留言。",
      fullName: "姓名",
      fullNamePlaceholder: "您的姓名",
      email: "电子邮箱",
      emailPlaceholder: "you@example.com",
      message: "留言内容",
      messagePlaceholder: "请告诉我关于您的项目想法或合作需求...",
      privacyPromise: "绝不泄露您的任何个人信息，拉钩保证！",
      sendMessage: "发送留言",
      pleaseWait: "请稍候",
      toastSuccessTitle: "非常感谢！",
      toastSuccessDesc: "已收到您的留言，我会尽快回复！",
      toastErrorTitle: "发送失败",
      toastErrorDesc: "发生了一些错误，请稍后重试。",
      errName: "姓名至少需要 2 个字符",
      errEmail: "请输入有效的电子邮箱地址",
      errMessage: "留言内容至少需要 10 个字符",
    },
    footer: {
      rights: "保留所有权利。",
      blog: "博客",
      newsletter: "时事通讯",
    },
    resume: {
      back: "返回主页",
      download: "下载 PDF 简历",
    },
    blogs: {
      badge: "博客",
      title1: "思考与",
      title2: "写作",
      subtitle: "关于代码构建、技术折腾与思考沉淀的随笔与专栏。",
      featured: "精选文章",
      minRead: "分钟阅读",
      min: "分钟",
      readArticle: "阅读全文",
      noPosts: "暂无文章，敬请期待。",
      backAll: "返回所有文章",
    },
    misc: {
      radialHint: "右键点击任意处互动",
      motionOn: "减弱动画",
      motionOff: "开启动画",
      motionNudgeTitle: "已开启减弱动态效果",
      motionNudgeDesc:
        "交互式 3D 场景与动画已关闭。想要体验完整视觉效果吗？",
      enable3D: "开启 3D",
      noThanks: "不用了",
      langSwitchAria: "Switch to English",
    },
  },
};

export const SKILL_DESCRIPTIONS_ZH: Record<string, string> = {
  js: "自 95 年起就一直往 DOM 里狂塞代码，绝不吹嘘！💯🚀",
  ts: "JavaScript 家那位无处不在卷的学霸表哥 💯🔒",
  react: `"use using" \nusing use = useUsing("use")`,
  nextjs: "前端框架界的顶流主角，爱了爱了！👑📜",
  vue: "让前端开发瞬间舒爽的心灵抚慰剂，优雅治愈！🟢😌",
  expo: "一套代码，全端覆盖，再也不用为 Xcode 掉眼泪 📱✨",
  tailwind: "原子化样式直接起飞，手感丝滑到上头 🌪️🔥",
  nodejs: "JS 当年说「没想到吧，我也能写后端」，真没开玩笑！🔙🔚",
  express: "中间件生态嘎嘎顶，经典永不过时！🚂💨",
  bun: "狂灌了三瓶能量饮料的 Node，速度飞起 🥟⚡",
  postgres: "把关系型 SQL 玩成时尚高定，优雅永不过时 💅🐘",
  mongodb: "全身 NoSQL 潮流穿搭，主打一个随性自由！💪🍃",
  linux: "「chmod 777」就是终极浪漫与自由 🔓🙌",
  git: "代码世界的专属贴身保镖，安全感拉满 🕵️‍♂️🔄",
  vim: "退出？在现今这行情下？溜了溜了！🚪🏃",
  docker: "容器化天花板，在我的机器上能跑！🐳🔥",
  nginx: "反向代理直接漂移超车，芜湖起飞！🚗💨",
  claude: "从不需要咖啡续杯的顶尖结对编程搭子 🤖☕",
  cloudflare: "边缘网络直接起飞，家庭实验室藏在橙色云朵后 ☁️🛡️",
  gcp: "自带 Google 气场的云服务，长期免租入住！☁️🔥",
  aws: "永远有配置不完的功能，主打一个复杂硬核！🌐👨‍💻",
  homeassistant: "用 YAML 和灵感构筑的全屋智能，灯光听我号令 🏠💡",
  proxmox: "衣柜里塞进整个数据中心，电费单直呼内行 🖥️🔥",
  steam: "凌晨 3 点「再来亿把就睡」，夜夜如此 🎮🌙",
};

export interface LocalizedExperience {
  id: number;
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
}

export const EXPERIENCE_ZH: LocalizedExperience[] = [
  {
    id: 1,
    periods: [{ start: "2026年8月", end: "至今" }],
    title: "软件开发实习生",
    company: "Coremail · 中国广州番禺",
    description: [
      "通过结构化分析与严谨逻辑，排查并解决跨前后端 Web 应用的疑难缺陷。",
      "实现并调试系统间的单点登录（SSO）与 RESTful API 接口对接整合。",
      "参与核心用户界面开发、软件架构设计、交互体验优化及全栈工程落地。",
      "为团队现行业务与产品线提供人工智能应用、自动化脚本及技术数据分析支持。",
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.NODEJS,
      SkillNames.TS,
      SkillNames.JS,
      SkillNames.GIT,
      SkillNames.CLAUDE,
    ],
  },
  {
    id: 2,
    periods: [{ start: "2023年12月", end: "2024年12月" }],
    title: "平面设计师、Web 开发者兼产品经理",
    company: "UR 服装品牌 · 埃及十月六日城",
    description: [
      "独立搭建支持多分类与高级动态筛选的电商网站，极大提升商品浏览与转化效率。",
      "统筹品牌全套视觉识别系统（VI），涵盖标志、包装及营销物料，在社交平台上带动品牌认知度提升 20%。",
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.TAILWIND,
      SkillNames.NODEJS,
      SkillNames.MONGODB,
      SkillNames.JS,
      SkillNames.GIT,
    ],
  },
  {
    id: 3,
    periods: [{ start: "2023年8月", end: "2026年8月" }],
    title: "平面设计师与数字营销策划",
    company: "Sleep High 分部 · 埃及十月六日城",
    description: [
      "主导策划并输出 10+ 场数字化营销活动的视觉设计，3 个月内将品牌曝光度提升 20%。",
      "运营管理社媒投放矩阵，深入复盘广告数据以优化投资回报率（ROI），使用户互动率提升 30%。",
    ],
    skills: [SkillNames.TAILWIND, SkillNames.JS],
  },
  {
    id: 4,
    periods: [{ start: "2022年11月", end: "2025年6月" }],
    title: "自由职业平面设计师与网页设计师",
    company: "自由职业 · 埃及",
    description: [
      "为多家商业客户提供品牌形象及数字营销设计服务，包括 Logo、宣传折页与社媒宣传物料。",
      "按照客户定制化诉求，交付高质量的品牌视觉识别体系与多端自适应数字资产。",
    ],
    skills: [SkillNames.JS, SkillNames.TAILWIND, SkillNames.GIT],
  },
];

export const THEME_DISCLAIMERS_ZH = {
  light: [
    "警告：浅色模式正在释放上亿流明的耀眼光芒！",
    "注意：前方强光高能！非专业人士请勿轻易尝试。",
    "只有受过专业训练的眼睛才能直视这种明亮，请备好墨镜！",
    "坐稳扶好！浅色模式的光芒比你的前途还要耀眼。",
    "切换到浅色模式中……你的眼睛真的做好准备了吗？",
  ],
  dark: [
    "浅色模式？我还以为你疯了……欢迎重返暗黑阵营！",
    "正在切换暗黑模式……光明世界的生活还习惯吗？",
    "暗黑模式已激活！我的内心和眼睛都在由衷感谢你。",
    "欢迎回到阴影之中。外面的强光世界还好吗？",
    "暗黑模式开启！终于遇到真正懂高端品味的人了。",
  ],
};

export interface LocalizedProjectDetails {
  category: string;
  subtitle: string;
  overview: string;
  featuresTitle: string;
  features: { label: string; text: string }[];
}

export const PROJECTS_ZH: Record<string, LocalizedProjectDetails> = {
  "windows-antify-proxy": {
    category: "系统工具 / 网络代理",
    subtitle: "Windows 单进程独立代理与环境变量隔离管理器",
    overview:
      "基于 C# .NET 8 WPF 打造的高性能 Windows 桌面客户端，提供单进程隔离的网络代理隧道和动态环境变量注入管理能力。",
    featuresTitle: "核心特性",
    features: [
      {
        label: "单进程网络隔离",
        text: "支持按应用粒度精确路由网络流量，彻底不干扰全局系统代理。",
      },
      {
        label: "实时网络遥测",
        text: "针对活跃进程实时呈现网络延迟、吞吐带宽与连接速率统计。",
      },
      {
        label: "灵活分流规则",
        text: "可自定义域名、IP 及子网过滤列表，自如调度内外网路由。",
      },
      {
        label: "零残留退出机制",
        text: "优雅关闭清理状态，确保应用退出时瞬间还原环境变量与系统注册表配置。",
      },
    ],
  },
  "mandarin-flow-hsk": {
    category: "教育科技 / 语言学习平台",
    subtitle: "面向 HSK 1-6 级考试与流利表达的现代多语言中文学习平台",
    overview:
      "专为汉语初学者（HSK 1）到高阶流利者（HSK 6）量身定制的全功能 Web 应用，将间隔重复记忆算法（SRS）与真实场景对话紧密结合。",
    featuresTitle: "核心功能",
    features: [
      {
        label: "HSK 1-6 权威词库",
        text: "精选词汇卡包，支持灵活分组复习（25/50/100 词）并配备声调拼音发音。",
      },
      {
        label: "间隔重复记忆卡片",
        text: "采用智能 Leitner/SuperMemo SRS 遗忘曲线算法，分级评估掌握程度（重来、困难、良好、简单）。",
      },
      {
        label: "场景化互动对话",
        text: "双体系真实会话实战，配备汉字、带声调拼音、英语与阿拉伯语四层精准对照翻译。",
      },
      {
        label: "多维学情追踪分析",
        text: "由 Supabase 驱动的学习进度实时统计、打卡天数连续记录及错题归纳巩固。",
      },
    ],
  },
  markread: {
    category: "桌面应用 / Markdown 阅读器",
    subtitle: "专为极致阅读体验、流畅性能与 Windows 原生集成打造的文档级 Markdown 阅读器",
    overview:
      "基于 C# .NET 8 WPF、Microsoft WebView2 与 Markdig 构建的原生 Windows 桌面阅读器，专注于无干扰沉浸阅读、代码审阅与出版级导出。",
    featuresTitle: "产品亮点",
    features: [
      {
        label: "出版级排版质感",
        text: "定制 Neutral Zinc 暗黑与暖光护眼阅读配色，有效缓解长时间阅读视疲劳。",
      },
      {
        label: "完整 GFM 语法支持",
        text: "语法高亮代码块支持一键复制代码、表格渲染、任务清单、数学公式及引用块。",
      },
      {
        label: "多标签页文档管理",
        text: "多标签文档切换体验，结合单实例 IPC 进程通信，从文件资源管理器即点即开。",
      },
      {
        label: "高清出版级 PDF 导出",
        text: "清晰锐利的高精度 PDF 渲染引擎，支持自定义打印页眉页脚与页面边距。",
      },
    ],
  },
  "ai-hiring-workbench": {
    category: "人工智能 / 人才评估系统",
    subtitle: "新兴岗位用人标准制定与简历漏判复核智能工作台",
    overview:
      "融合前沿大语言模型深度推理（DeepSeek V3 & R1）与严密评估工作流的智能招聘工作台，助力高成长技术岗位快速拟定能力画像并规避人才遗漏。",
    featuresTitle: "系统架构与特性",
    features: [
      {
        label: "DeepSeek 双推理引擎",
        text: "深度调用 V3 与 R1 推理模型，输出结构化细分量表评分与简历全景穿透分析。",
      },
      {
        label: "Fastify 高吞吐后端",
        text: "高性能评估调度器，同时兼顾离线确定性基准测试与实时并发 API 调用。",
      },
      {
        label: "交叉双向校验机制",
        text: "将候选人多维履历与目标岗位画像严密对照，精准捕获隐形潜力与被低估的复合能力。",
      },
      {
        label: "结构化归档与报告输出",
        text: "自动化生成详尽的多维初筛研判报告，历史评估数据完备存储于 PostgreSQL。",
      },
    ],
  },
};
