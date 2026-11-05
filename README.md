<div align="center">

# 🚀 Mahmoud Abdalla — 3D Portfolio

**Full-Stack Developer & Creative Technologist**  
🎓 Computer Science Student at Jinan University | 🇪🇬 From Egypt | 📍 Based in Guangzhou, China

A developer portfolio you can actually play with. Press keys on a 3D keyboard, watch other visitors' cursors fly by, and chat with whoever's online.

### [✨ Live Demo → MahmoudAbdalla.dev](https://MahmoudAbdalla.dev)

[![GitHub stars](https://img.shields.io/github/stars/mahmoud-abdalla-eg/personal-3d-website?style=flat&logo=github)](https://github.com/mahmoud-abdalla-eg/personal-3d-website/stargazers)
[![Forks](https://img.shields.io/github/forks/mahmoud-abdalla-eg/personal-3d-website?style=flat&logo=github)](https://github.com/mahmoud-abdalla-eg/personal-3d-website/network/members)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mahmoud-abdalla-eg/personal-3d-website)

<!-- swap for demo video: drag an .mp4 into the GitHub web editor, paste the user-attachments URL on its own line here -->
![Portfolio Preview](public/assets/projects-screenshots/portfolio/landing.png)

</div>

---

## 👤 About Mahmoud Abdalla

- 🎓 **Education:** B.S. Computer Science and Technology at **Jinan University** (暨南大学), Guangzhou, China (Expected Graduation: Jun 2028)
- 🌍 **Background:** Originally from **Egypt** 🇪🇬, currently studying & working in **Guangzhou, China** 🇨🇳
- 💻 **Specialization:** Full-Stack Web Development, REST APIs, SSO Integration, UI/UX Design, and AI-assisted Engineering
- 🌐 **Portfolio Website:** [https://MahmoudAbdalla.dev](https://MahmoudAbdalla.dev)
- 📧 **Email:** [Mahmouddesign01@gmail.com](mailto:Mahmouddesign01@gmail.com)
- 🐙 **GitHub:** [@mahmoud-abdalla-eg](https://github.com/mahmoud-abdalla-eg)
- 💼 **LinkedIn:** [mahmoud-abdalla-eg](https://www.linkedin.com/in/mahmoud-abdalla-eg/)
- 💬 **WeChat ID:** Mahmoud-Ahmed995

---

## 💼 Experience

### 1. **Coremail** — Software Development Intern
*Aug 2026 – Present | Panyu, Guangzhou, Guangdong, China*
- Diagnose and resolve bugs across front-end and back-end web applications using structured problem-solving.
- Implement and troubleshoot SSO integrations and REST API integrations between systems and services.
- Contribute to user interface development, software design, usability improvements, and full-stack web development.
- Support Artificial Intelligence, automation, and technical data analysis for ongoing product and engineering work.
- **Tech Stack:** React.js, Node.js, TypeScript, JavaScript, Git, AI / Claude

### 2. **UR Clothing Brand** — Graphic Designer, Web Developer & Product Manager
*Dec 2023 – Dec 2024 | 6 of October, Egypt*
- Developed the brand identity, including logo, packaging, and marketing assets, increasing brand recognition by 20% across social media platforms.
- Built a multi-category e-commerce website with advanced filtering to improve product browsing and discovery.
- **Tech Stack:** React.js, Tailwind CSS, Node.js, MongoDB, JavaScript, Git

### 3. **Sleep High Branch** — Graphic Designer & Digital Marketer
*Aug 2023 – Aug 2026 | 6 of October, Egypt*
- Created graphic content for 10+ digital campaigns, increasing brand visibility by 20% within 3 months.
- Managed social media campaigns and analyzed performance data to optimize ROI, increasing audience engagement by 30%.
- **Tech Stack:** UI/UX, Graphic Design, Tailwind CSS, JavaScript

### 4. **Freelance** — Freelance Graphic Designer & Web Designer
*Nov 2022 – Jun 2025 | Egypt*
- Designed branding and digital marketing materials for multiple freelance clients, including logos, brochures, and social media graphics.
- Delivered customized visual identity designs and responsive digital assets meeting client specifications.
- **Tech Stack:** JavaScript, Tailwind CSS, Git

---

## ✨ Features

- **Interactive 3D Keyboard** — Programmatically generated Chibi keyboard where each keycap represents a skill, revealing titles and descriptions on hover/press. Try colors, logos, and layouts in the [Chibi keycap customizer](https://chibi.nareshkhatri.dev/demo/keycaps).
- **Live Multiplayer** — See other visitors' cursors in realtime, who's online, and chat with them ([details](#-realtime-features-optional))
- **Buttery Animations** — GSAP + Framer Motion powered scroll, hover, and reveal animations
- **Space Theme** — Floating particles on a dark canvas for a cosmic vibe
- **Easter Eggs** — Open DevTools and follow the clues 🐱
- **Light & Dark Mode** — Full theme support with cheeky disclaimer toasts
- **Responsive** — Works across all screen sizes
- **Contact Form** — Email delivery via Resend
- **Analytics** _(optional)_ — Umami analytics integration

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16.2.2, React 19.2.4, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI, Aceternity UI |
| **Animation** | GSAP, Framer Motion |
| **3D** | @chibi3d/runtime, Three.js, React Three Fiber |
| **Email** | Resend |
| **Misc** | Lenis (smooth scroll), Zod, next-themes |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ for Next.js 16; use a current LTS release with pnpm 11
- pnpm 11.20.0

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mahmoud-abdalla-eg/personal-3d-website.git
    cd personal-3d-website
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**

    Copy `.env.example` to `.env.local` and fill in the values:

    ```bash
    cp .env.example .env.local
    ```

    | Variable | Required | Description |
    |---|---|---|
    | `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) for the contact form |
    | `NEXT_PUBLIC_WS_URL` | No | WebSocket server URL for realtime features (cursors, chat, presence) |
    | `UMAMI_DOMAIN` | No | Umami analytics script URL |
    | `UMAMI_SITE_ID` | No | Umami website ID |

4. **Run the development server:**

    ```bash
    pnpm dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) and see the magic ✨

---

## Code checks

Run these before opening a pull request:

```bash
pnpm lint
pnpm typecheck
```

Next.js 16 no longer runs lint during builds. The ESLint CLI uses `eslint.config.mjs`. New React Compiler diagnostics for refs, immutability, effect state updates, and manual memoization report warnings while existing animation and realtime components are migrated. Hook ordering violations remain errors.

Blog frontmatter requires a title, summary, and `publishedAt` date in `YYYY-MM-DD` format. Optional fields are `image`, `author`, and a list of `tags`. Invalid frontmatter raises a content error; unknown blog slugs return a 404.

Files under `public/assets` can be replaced at the same URL and cache for one hour before revalidation. Next.js content-hashed static assets retain immutable caching.

---

## 🎨 Personal Configuration

All personal info is centralized in [`src/data/config.ts`](src/data/config.ts):

```ts
const config: Config = {
  title: "Mahmoud Abdalla | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Mahmoud, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and modern web applications. Let's build something amazing together!",
    short:
      "Discover the portfolio of Mahmoud, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Mahmoud",
    "Mahmoud Abdalla",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Framer Motion",
  ],
  author: "Mahmoud Abdalla",
  email: "Mahmouddesign01@gmail.com",
  site: "https://MahmoudAbdalla.dev",

  // for github stars button
  githubUsername: "mahmoud-abdalla-eg",
  githubRepo: "personal-3d-website",

  social: {
    linkedin: "https://www.linkedin.com/in/mahmoud-abdalla-eg/",
    github: "https://github.com/mahmoud-abdalla-eg",
  },
};
```

Other files to customize:

| File | What to change |
|---|---|
| `src/data/projects.tsx` | Projects, screenshots, descriptions, and tech stacks |
| `src/data/constants.ts` | Skills list (name, description, icon) and work experience |
| `public/assets/` | Profile images, OG image, and project screenshots |

---

## ⌨️ Customize the 3D keyboard

Try colors, logos, and layouts in the [Chibi keycap customizer](https://chibi.nareshkhatri.dev/demo/keycaps), then apply your choices to `SKILLS` in [`src/data/constants.ts`](src/data/constants.ts):

- `keyboardColor`: keycap color, such as `"#ff9408"`.
- `keyboardIcon`: copy an SVG URL from [thesvg.org](https://thesvg.org) and paste it here. You can also use a local file under `public/assets/keyboard/logos/`.
- `label` and `shortDescription`: text shown when interacting with a key.
- `shortcut`: optional physical key code, such as `"KeyQ"`. Keep shortcuts unique; defaults follow QWERTY letter order.

The demo accepts logo names too, but `keyboardIcon` needs an image URL or local asset path. Without keyboard overrides, keys use the skill's `color` and `icon`.

Keys follow the order of `SKILLS`. To change the default six columns, pass a second argument to `createKeyboardScene` in [`keyboard-scene.tsx`](src/components/keyboard/keyboard-scene.tsx). Rows adjust automatically to the skill count.

---

## 🔌 Realtime Features (Optional)

The portfolio supports optional realtime features powered by a **separate backend API**:

- 🖱️ **Live cursors** — See other visitors' cursors in realtime
- 👥 **Online presence** — Shows who's currently on the site
- 💬 **Chat** — Live chat between visitors
- **Zombie Survival** with multiplayer and leaderboards on the live site.

These features activate automatically when the `NEXT_PUBLIC_WS_URL` environment variable is set. Without it, the portfolio works perfectly fine as a static site — no realtime features, no backend dependency.

---

## 🚀 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mahmoud-abdalla-eg/personal-3d-website)

This site is deployed on **Vercel**. To deploy your own:

1. Push your code to a GitHub repository
2. Connect the repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Vercel handles the rest — automatic deployments on every push

---

## 🤝 Credits & Acknowledgements

- Built upon the open-source 3D interactive portfolio architecture created by [Naresh Khatri](https://github.com/Naresh-Khatri/3d-portfolio).
- Rebranded and maintained by **[Mahmoud Abdalla](https://github.com/mahmoud-abdalla-eg)**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
