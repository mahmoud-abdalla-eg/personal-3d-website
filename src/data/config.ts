export interface SocialConfig {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

export interface Config {
  title: string;
  description: {
    long: string;
    short: string;
  };
  keywords: string[];
  author: string;
  email: string;
  site: string;
  githubUsername: string;
  githubRepo: string;
  readonly ogImg: string;
  social: SocialConfig;
  resume: {
    en: string;
    zh: string;
    folder: string;
    enPdf: string;
    zhPdf: string;
  };
}

const config: Config = {
  title: "Mahmoud Abdalla | Full-Stack Developer & AI Systems Analyst",
  description: {
    long: "Explore the portfolio of Mahmoud, a full-stack developer and AI systems analyst specializing in interactive web experiences, 3D animations, and modern web applications. Let's build something amazing together!",
    short:
      "Discover the portfolio of Mahmoud, a full-stack developer and AI systems analyst creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Mahmoud",
    "Mahmoud Abdalla",
    "portfolio",
    "full-stack developer",
    "AI systems analyst",
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
  site: "https://mahmoudabdalla.vercel.app",

  // for github stars button
  githubUsername: "mahmoud-abdalla-eg",
  githubRepo: "personal-3d-website",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://www.linkedin.com/in/mahmoud-abdalla-eg/",
    github: "https://github.com/mahmoud-abdalla-eg",
  },
  resume: {
    en: "https://drive.google.com/file/d/1HAKa4iuu_Cb3SEoo41dqoFmvt1e-U767/view?usp=sharing",
    zh: "https://drive.google.com/file/d/1bX1Zm-6_KMHQ_L4LXrrd-s5EpYIhYALs/view?usp=sharing",
    folder: "https://drive.google.com/drive/folders/1BOKBKhfPxQ890HNSNxX0EyzPdD4osYgz",
    enPdf: "/CV_Mahmoud_Abdalla_EN.pdf",
    zhPdf: "/CV_Mahmoud_Abdalla_ZH.pdf",
  },
};
export { config };
