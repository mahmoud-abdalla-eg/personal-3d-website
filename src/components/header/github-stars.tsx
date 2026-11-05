import { config } from "@/data/config";
import { getGithubStars } from "@/lib/github-stars";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";

export default async function GitHubStars({ className }: { className?: string }) {
  if (!config.githubUsername || !config.githubRepo) return null;

  let stars: number | null = null;
  try {
    stars = await getGithubStars();
  } catch (err) {
    // don't fail the render/build on a github outage or rate limit
    console.error(err);
    return null;
  }

  // Fallback to 0 if rate-limited or fetch fails so the button doesn't disappear
  const displayStars = stars ?? 0;

  return (
    <GitHubStarsButton
      username={config.githubUsername}
      repo={config.githubRepo}
      stars={displayStars}
      className={className}
    />
  );
}
