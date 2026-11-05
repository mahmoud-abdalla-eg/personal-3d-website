"use client";

import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useLanguage } from "@/contexts/i18n-context";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

export const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            {t("projects.visitProject", "Visit Project")}
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            {t("projects.github", "GitHub")}
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  firebase: brand("Firebase", "firebase-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  vite: brand("Vite", "vite-mono.svg"),
  sqlite: brand("SQLite", "sqlite-mono.svg"),
  dotnet: {
    title: ".NET 8 / WPF",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold font-mono">.NET</span>,
  },
  csharp: {
    title: "C#",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold font-mono">C#</span>,
  },
  windows: {
    title: "Windows API",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold font-mono">Win32</span>,
  },
  fastify: {
    title: "Fastify",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold font-mono">Fastify</span>,
  },
  deepseek: {
    title: "DeepSeek AI",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold font-mono">DeepSeek</span>,
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "windows-antify-proxy",
    category: "System Utility / Networking",
    title: "Win Antify Proxy",
    src: `${BASE_PATH}/windows-antify-proxy/landing.png`,
    screenshots: ["landing.png", "rules.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.dotnet,
        PROJECT_SKILLS.csharp,
        PROJECT_SKILLS.windows,
      ],
      backend: [
        PROJECT_SKILLS.csharp,
        PROJECT_SKILLS.dotnet,
        PROJECT_SKILLS.windows,
      ],
    },
    github: "https://github.com/mahmoud-abdalla-eg/windows-antify-proxy",
    live: "https://github.com/mahmoud-abdalla-eg/windows-antify-proxy/releases",
    content: (
      <div>
        <TypographyH3 className="my-4">Win Antify Proxy</TypographyH3>
        <TypographyP className="font-mono text-muted-foreground">
          Per-Process Isolated Proxy & Environment Variable Manager for Windows
        </TypographyP>
        <ProjectsLinks
          live="https://github.com/mahmoud-abdalla-eg/windows-antify-proxy/releases"
          repo="https://github.com/mahmoud-abdalla-eg/windows-antify-proxy"
        />
        <TypographyP className="my-4">
          A high-performance Windows desktop application built with C# .NET 8 WPF providing per-process isolated network proxy tunneling and dynamic environment variable control.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Per-Process Isolation:</strong> Route network traffic on an application-by-application basis without affecting the global system proxy.</li>
          <li><strong>Real-time Telemetry:</strong> Live connection speed, latency, and throughput statistics per active process.</li>
          <li><strong>Custom Bypass Rules:</strong> Configurable domain, IP, and subnet rule lists for flexible intranet and extranet steering.</li>
          <li><strong>Zero System Pollution:</strong> Clean state teardown ensuring environment variables and proxy registries revert instantly upon exit.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "mandarin-flow-hsk",
    category: "EdTech / Learning Platform",
    title: "Mandarin Flow HSK",
    src: `${BASE_PATH}/mandarin-flow-hsk/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.supabase,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.node,
      ],
    },
    github: "https://github.com/mahmoud-abdalla-eg/Chinese-Hsk1-6-Books-And-Flashcard-Website",
    live: "https://github.com/mahmoud-abdalla-eg/Chinese-Hsk1-6-Books-And-Flashcard-Website",
    content: (
      <div>
        <TypographyH3 className="my-4">Mandarin Flow HSK (HSK 1-6 Platform)</TypographyH3>
        <TypographyP className="font-mono text-muted-foreground">
          Modern, multilingual Chinese learning platform for HSK 1-6 mastery
        </TypographyP>
        <ProjectsLinks
          live="https://github.com/mahmoud-abdalla-eg/Chinese-Hsk1-6-Books-And-Flashcard-Website"
          repo="https://github.com/mahmoud-abdalla-eg/Chinese-Hsk1-6-Books-And-Flashcard-Website"
        />
        <TypographyP className="my-4">
          A comprehensive web application designed for students learning Mandarin Chinese from beginner (HSK 1) to advanced fluency (HSK 6), combining spaced-repetition memory science with real-world situational dialogues.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">Core Capabilities</TypographyH3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>HSK 1-6 Word Library:</strong> Curated vocabulary decks with flexible batch sizes (25, 50, 100 words) and Pinyin tonal audio.</li>
          <li><strong>Spaced Repetition Flashcards:</strong> Intelligent Leitner/SuperMemo SRS algorithm rating difficulty (*Again, Hard, Good, Easy*).</li>
          <li><strong>Interactive Dialogues:</strong> Dual-curriculum situational lessons with 4-layer translations (Hanzi, Pinyin with tones, English, and Arabic).</li>
          <li><strong>Learner Progress Analytics:</strong> Detailed mastery tracking, streak counters, and mistake review sessions powered by Supabase.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "markread",
    category: "Desktop App / Markdown Viewer",
    title: "MarkRead",
    src: `${BASE_PATH}/markread/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.dotnet,
        PROJECT_SKILLS.csharp,
        PROJECT_SKILLS.windows,
      ],
      backend: [
        PROJECT_SKILLS.csharp,
        PROJECT_SKILLS.dotnet,
        PROJECT_SKILLS.windows,
      ],
    },
    github: "https://github.com/mahmoud-abdalla-eg/MarkRead",
    live: "https://github.com/mahmoud-abdalla-eg/MarkRead",
    content: (
      <div>
        <TypographyH3 className="my-4">MarkRead</TypographyH3>
        <TypographyP className="font-mono text-muted-foreground">
          Document-grade Markdown viewer built for readability, speed, and Windows integration
        </TypographyP>
        <ProjectsLinks
          live="https://github.com/mahmoud-abdalla-eg/MarkRead"
          repo="https://github.com/mahmoud-abdalla-eg/MarkRead"
        />
        <TypographyP className="my-4">
          A native Windows desktop Markdown reader engineered with C# .NET 8 WPF, Microsoft WebView2, and Markdig, tailored for distraction-free reading, code inspection, and publication-ready export.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">Highlights</TypographyH3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Book-grade Typography:</strong> Custom Neutral Zinc dark and warm light reading palettes designed to reduce eye strain.</li>
          <li><strong>Full GFM Support:</strong> Syntax-highlighted code blocks with 1-click copy, tables, checklists, math formulas, and blockquotes.</li>
          <li><strong>Tabbed Document Navigation:</strong> Multi-tab workflow with Single-Instance IPC for instant file opening from File Explorer.</li>
          <li><strong>Publication PDF Export:</strong> Clean, high-fidelity PDF rendering with customizable print headers and margins.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ai-hiring-workbench",
    category: "AI / Candidate Evaluation",
    title: "AI Hiring Workbench",
    src: `${BASE_PATH}/ai-hiring-workbench/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.vite,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.fastify,
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.deepseek,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.supabase,
      ],
    },
    github: "https://github.com/mahmoud-abdalla-eg/ai-hiring-workbench",
    live: "https://github.com/mahmoud-abdalla-eg/ai-hiring-workbench",
    content: (
      <div>
        <TypographyH3 className="my-4">AI Hiring Workbench</TypographyH3>
        <TypographyP className="font-mono text-muted-foreground">
          Emerging role hiring standard formulation & screening omission review workbench
        </TypographyP>
        <ProjectsLinks
          live="https://github.com/mahmoud-abdalla-eg/ai-hiring-workbench"
          repo="https://github.com/mahmoud-abdalla-eg/ai-hiring-workbench"
        />
        <TypographyP className="my-4">
          An automated hiring intelligence platform combining LLM reasoning (DeepSeek V3 & R1) with rigorous evaluation runners to formulate role standards and prevent talent omission in high-growth tech positions.
        </TypographyP>
        <TypographyH3 className="my-4 mt-8">Architecture & Features</TypographyH3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>DeepSeek Reasoning Engines:</strong> Leveraging V3 and R1 reasoning models for structured rubric scoring and deep resume analysis.</li>
          <li><strong>Fastify Backend Runner:</strong> High-throughput evaluation runner supporting both offline deterministic benchmarks and live API runs.</li>
          <li><strong>Dual Verification:</strong> Cross-checks candidate profiles against role requirements to detect overlooked skills and hidden competencies.</li>
          <li><strong>Structured Exports:</strong> Auto-generates detailed screening reports and evaluation summaries stored in PostgreSQL.</li>
        </ul>
      </div>
    ),
  },
];

export { PROJECT_SKILLS };
export default projects;
