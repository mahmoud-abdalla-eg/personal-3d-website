import { cacheLife } from "next/cache";
import { config } from "@/data/config";

// unauthenticated github api = 60 req/hr per ip; 5min cache -> ~12 req/hr
export async function getGithubStars(): Promise<number | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300 });

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-stars-fetcher",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/repos/${config.githubUsername}/${config.githubRepo}`,
      { headers },
    );
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (typeof data.stargazers_count !== "number") {
      return null;
    }
    return data.stargazers_count;
  } catch {
    return null;
  }
}
