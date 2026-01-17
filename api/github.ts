import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "GitHub token not configured" });
  }

  const ghRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  const user = await ghRes.json();

  const reposRes = await fetch(
    "https://api.github.com/user/repos?per_page=100&visibility=all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  const repos = await reposRes.json();

  const totalStars = repos.reduce(
    (acc: number, repo: any) => acc + repo.stargazers_count,
    0
  );

  res.status(200).json({
    totalRepos: user.public_repos + user.total_private_repos,
    publicRepos: user.public_repos,
    privateRepos: user.total_private_repos,
    totalStars,
  });
}
