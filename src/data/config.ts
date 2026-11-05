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
}

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
  githubUsername: "MahmoudAhmed995",
  githubRepo: "personal-3d-website",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://www.linkedin.com/in/mahmoud-abdalla-eg/",
    github: "https://github.com/MahmoudAhmed995",
  },
};
export { config };
