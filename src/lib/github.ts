// Server-only utilities for fetching GitHub data.
// Never import this from a "use client" file: it relies on
// process.env.GITHUB_TOKEN, which must stay on the server.

import type { FeaturedRepo } from "./featured-repos";

export type { FeaturedRepo } from "./featured-repos";

const GITHUB_USERNAME = "maiconlara";
const REVALIDATE_SECONDS = 60 * 60; // 1 hour ISR cache

// Hex codes lifted from GitHub's linguist palette so we can use inline styles
// (Tailwind JIT can't see class names that come from server data).
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Shell: "#89e051",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Astro: "#ff5a03",
  Lua: "#000080",
  "Jupyter Notebook": "#DA5B0B",
  Dockerfile: "#384d54",
};

const FALLBACK_COLOR = "#a78bfa"; // matches the violet primary

const colorFor = (language: string) =>
  LANGUAGE_COLORS[language] ?? FALLBACK_COLOR;

const ghHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

async function ghFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: ghHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

interface GithubUser {
  login: string;
  public_repos: number;
  created_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
}

export interface GithubLanguage {
  name: string;
  percentage: number;
  color: string;
}

export interface GithubDayCommits {
  day: string;
  commits: number;
  /** ISO date (YYYY-MM-DD). Only present when sourced from the calendar. */
  date?: string;
}

export interface ContributionCell {
  date: string;
  count: number;
}

export interface GithubStats {
  publicRepos: number;
  totalStars: number;
  yearsActive: number;
  followers: number;
  topLanguages: GithubLanguage[];
  weeklyActivity: GithubDayCommits[];
  contribution: ContributionCell[];
  contributionTotal: number;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ContributionData {
  days: ContributionCell[];
  weeklyActivity: GithubDayCommits[];
  cells: ContributionCell[];
}

// Pulls the authenticated user's contribution calendar via GraphQL.
// Using `viewer` (instead of `user(login:)`) means private contributions are
// included automatically as long as the token has access — no extra setting
// in the user's public profile required.
async function getContributionData(): Promise<ContributionData | null> {
  if (!process.env.GITHUB_TOKEN) return null;

  const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.warn(
        `[github] GraphQL contributions failed: ${res.status} ${res.statusText}`
      );
      return null;
    }

    const json = (await res.json()) as {
      errors?: Array<{ message: string }>;
      data?: {
        viewer?: {
          contributionsCollection?: {
            contributionCalendar?: {
              weeks?: Array<{
                contributionDays?: Array<{
                  date?: string;
                  contributionCount?: number;
                }>;
              }>;
            };
          };
        };
      };
    };

    if (json.errors?.length) {
      console.warn(
        `[github] GraphQL contributions errors: ${json.errors
          .map((e) => e.message)
          .join("; ")}`
      );
      return null;
    }

    const weeks =
      json.data?.viewer?.contributionsCollection?.contributionCalendar
        ?.weeks ?? [];

    // Keep weeks aligned: each week is exactly 7 days (Sun→Sat).
    const days: ContributionCell[] = [];
    for (const week of weeks) {
      for (const day of week.contributionDays ?? []) {
        if (!day.date) continue;
        days.push({
          date: day.date,
          count: day.contributionCount ?? 0,
        });
      }
    }

    // Weekly activity = the most recent 7 days, in chronological order.
    const last7 = days.slice(-7);
    const weeklyActivity: GithubDayCommits[] = last7.map((d) => ({
      day: DAY_LABELS[new Date(d.date).getUTCDay()],
      commits: d.count,
      date: d.date,
    }));

    // Contribution cells = full year (53 weeks * 7 days), week-then-day order.
    return { days, weeklyActivity, cells: days };
  } catch (err) {
    console.warn("[github] GraphQL contributions threw:", err);
    return null;
  }
}

// Fallback when no token is available: derive last-7-days commits from public events.
function buildWeeklyActivityFromEvents(events: unknown[]): GithubDayCommits[] {
  const counts = new Array(7).fill(0);
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  for (const raw of events) {
    const event = raw as {
      type?: string;
      created_at?: string;
      payload?: { commits?: unknown[] };
    };
    if (event.type !== "PushEvent" || !event.created_at) continue;
    const ts = new Date(event.created_at).getTime();
    if (Number.isNaN(ts) || ts < weekAgo) continue;
    const dayIndex = new Date(event.created_at).getDay();
    counts[dayIndex] += event.payload?.commits?.length ?? 0;
  }

  const order = [1, 2, 3, 4, 5, 6, 0];
  return order.map((i) => ({ day: DAY_LABELS[i], commits: counts[i] }));
}

export async function getGithubStats(): Promise<GithubStats | null> {
  const user = await ghFetch<GithubUser & { followers: number }>(
    `/users/${GITHUB_USERNAME}`
  );
  if (!user) return null;

  const repos = await ghFetch<GithubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&type=owner`
  );
  if (!repos) return null;

  const ownRepos = repos.filter((r) => !r.fork);
  const totalStars = ownRepos.reduce(
    (acc, r) => acc + (r.stargazers_count ?? 0),
    0
  );

  const accountYear = new Date(user.created_at).getFullYear();
  const yearsActive = Math.max(1, new Date().getFullYear() - accountYear);

  // Aggregate language bytes from the most recent repos to keep API usage low.
  const reposForLangs = ownRepos.slice(0, 12);
  const langBytes: Record<string, number> = {};
  await Promise.all(
    reposForLangs.map(async (repo) => {
      const langs = await ghFetch<Record<string, number>>(
        `/repos/${repo.full_name}/languages`
      );
      if (!langs) return;
      for (const [name, bytes] of Object.entries(langs)) {
        langBytes[name] = (langBytes[name] ?? 0) + bytes;
      }
    })
  );

  const totalBytes =
    Object.values(langBytes).reduce((a, b) => a + b, 0) || 1;
  const sortedLangs = Object.entries(langBytes).sort(
    ([, a], [, b]) => b - a
  );
  const topThree = sortedLangs.slice(0, 3);
  const otherBytes = sortedLangs
    .slice(3)
    .reduce((acc, [, bytes]) => acc + bytes, 0);

  const topLanguages: GithubLanguage[] = topThree.map(([name, bytes]) => ({
    name,
    percentage: Math.round((bytes / totalBytes) * 100),
    color: colorFor(name),
  }));
  if (otherBytes > 0) {
    topLanguages.push({
      name: "Other",
      percentage: Math.round((otherBytes / totalBytes) * 100),
      color: "bg-primary",
    });
  }

  // Prefer GraphQL (includes private contributions). Fall back to public events.
  const contribData = await getContributionData();
  let weeklyActivity: GithubDayCommits[];
  let contribution: ContributionCell[];

  if (contribData) {
    weeklyActivity = contribData.weeklyActivity;
    contribution = contribData.cells;
  } else {
    const events = await ghFetch<unknown[]>(
      `/users/${GITHUB_USERNAME}/events/public?per_page=100`
    );
    weeklyActivity = buildWeeklyActivityFromEvents(events ?? []);
    contribution = [];
  }

  const contributionTotal = contribution.reduce((acc, c) => acc + c.count, 0);

  return {
    publicRepos: user.public_repos,
    totalStars,
    yearsActive,
    followers: user.followers ?? 0,
    topLanguages,
    weeklyActivity,
    contribution,
    contributionTotal,
  };
}

export async function getFeaturedRepos(limit = 6): Promise<FeaturedRepo[] | null> {
  const repos = await ghFetch<GithubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&type=owner`
  );
  if (!repos) return null;

  return repos
    .filter((r) => !r.fork && !r.archived && !r.private)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return (
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );
    })
    .slice(0, limit)
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description ?? "",
      url: r.html_url,
      homepage: r.homepage,
      stars: r.stargazers_count,
      language: r.language,
      languageColor: r.language ? colorFor(r.language) : "bg-primary",
      topics: r.topics ?? [],
    }));
}
