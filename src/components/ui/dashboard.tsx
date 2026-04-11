"use client";

import {
  RiCalendarLine,
  RiCodeLine,
  RiLineChartLine,
  RiStarLine,
  RiUserStarLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ContributionCell {
  date: string;
  count: number;
}

interface GithubStats {
  publicRepos: number;
  totalStars: number;
  yearsActive: number;
  followers: number;
  topLanguages: Array<{ name: string; percentage: number; color: string }>;
  weeklyActivity: Array<{ day: string; commits: number }>;
  contribution: ContributionCell[];
  contributionTotal: number;
}

const fetchStats = async (): Promise<GithubStats> => {
  const res = await fetch("/api/github/stats");
  if (!res.ok) throw new Error("Failed to fetch GitHub stats");
  return res.json();
};

const formatCount = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}+`;
};

export function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["github-stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const stats = [
    {
      label: "Years on GitHub",
      value: data ? `${data.yearsActive}+` : null,
      icon: RiCalendarLine,
    },
    {
      label: "Public Repos",
      value: data ? formatCount(data.publicRepos) : null,
      icon: RiCodeLine,
    },
    {
      label: "GitHub Stars",
      value: data ? formatCount(data.totalStars) : null,
      icon: RiStarLine,
    },
    {
      label: "Followers",
      value: data ? formatCount(data.followers) : null,
      icon: RiUserStarLine,
    },
  ];

  const contribution = data?.contribution ?? [];
  const contributionMax = useMemo(
    () => Math.max(...contribution.map((c) => c.count), 1),
    [contribution]
  );
  const contributionWeeks = useMemo(() => {
    const weeks: ContributionCell[][] = [];
    for (let i = 0; i < contribution.length; i += 7) {
      weeks.push(contribution.slice(i, i + 7));
    }
    return weeks;
  }, [contribution]);

  // Pick which weeks should display a month label (only first occurrence
  // of each month gets a label, like the GitHub profile graph).
  const monthLabels = useMemo(() => {
    const labels: Record<number, string> = {};
    let last = "";
    contributionWeeks.forEach((week, i) => {
      const first = week[0];
      if (!first) return;
      const month = new Date(first.date).toLocaleString("en-US", {
        month: "short",
      });
      if (month !== last) {
        labels[i] = month;
        last = month;
      }
    });
    return labels;
  }, [contributionWeeks]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const intensityClass = (count: number) => {
    if (count === 0) return "bg-secondary";
    const ratio = count / contributionMax;
    if (ratio > 0.75) return "bg-primary";
    if (ratio > 0.5) return "bg-primary/70";
    if (ratio > 0.25) return "bg-primary/40";
    return "bg-primary/20";
  };

  const weeklyActivity = data?.weeklyActivity ?? [
    { day: "Mon", commits: 0 },
    { day: "Tue", commits: 0 },
    { day: "Wed", commits: 0 },
    { day: "Thu", commits: 0 },
    { day: "Fri", commits: 0 },
    { day: "Sat", commits: 0 },
    { day: "Sun", commits: 0 },
  ];
  const maxCommits = Math.max(...weeklyActivity.map((d) => d.commits), 1);

  const languages =
    data?.topLanguages && data.topLanguages.length > 0 ? data.topLanguages : [];

  return (
    <div className="container px-0 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border card-hover text-center"
          >
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
            {stat.value ? (
              <span className="text-3xl font-bold text-gradient">
                {stat.value}
              </span>
            ) : (
              <span
                aria-hidden
                className="block mx-auto h-8 w-16 rounded-md bg-secondary animate-pulse"
              />
            )}
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-6">
            <RiCalendarLine className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Weekly Activity</h3>
          </div>

          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyActivity.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ height: 0 }}
                animate={{
                  height: `${(day.commits / maxCommits) * 100}%`,
                }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className={`w-full rounded-t-md bg-gradient-to-t from-primary/50 to-primary ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                  style={{ height: "100%" }}
                />
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-6">
            <RiLineChartLine className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Top Languages</h3>
          </div>

          <div className="space-y-4">
            {isLoading || languages.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="h-4 w-20 rounded bg-secondary animate-pulse" />
                      <span className="h-4 w-8 rounded bg-secondary animate-pulse" />
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden animate-pulse" />
                  </div>
                ))
              : languages.map((lang, index) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{lang.name}</span>
                      <span className="text-muted-foreground">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{
                          delay: 0.6 + index * 0.1,
                          duration: 0.5,
                        }}
                        className={cn("h-full rounded-full")}
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </motion.div>
      </div>

      {/* GitHub Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
          <h3 className="font-semibold">Contribution Graph</h3>
          {data?.contributionTotal ? (
            <span className="text-xs text-muted-foreground">
              {data.contributionTotal.toLocaleString("en-US")} contributions in
              the last year
            </span>
          ) : null}
        </div>

        {isLoading ? (
          <div className="h-[140px] rounded-md bg-secondary/40 animate-pulse" />
        ) : contribution.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            Contribution data unavailable. A GitHub token with{" "}
            <code className="px-1 py-0.5 rounded bg-secondary text-xs">
              read:user
            </code>{" "}
            scope is required.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Month labels */}
              <div
                className="grid gap-[3px] mb-1 text-[10px] text-muted-foreground pl-7"
                style={{
                  gridTemplateColumns: `repeat(${contributionWeeks.length}, 12px)`,
                }}
              >
                {contributionWeeks.map((_, i) => (
                  <span key={i} className="h-3 leading-3 whitespace-nowrap">
                    {monthLabels[i] ?? ""}
                  </span>
                ))}
              </div>

              <div className="flex gap-1">
                {/* Day-of-week labels (Mon / Wed / Fri) */}
                <div className="grid grid-rows-7 gap-[3px] text-[10px] text-muted-foreground pr-1">
                  <span className="h-3 leading-3" />
                  <span className="h-3 leading-3">Mon</span>
                  <span className="h-3 leading-3" />
                  <span className="h-3 leading-3">Wed</span>
                  <span className="h-3 leading-3" />
                  <span className="h-3 leading-3">Fri</span>
                  <span className="h-3 leading-3" />
                </div>

                {/* Heatmap cells */}
                <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
                  {contributionWeeks.flatMap((week, wi) =>
                    Array.from({ length: 7 }, (_, di) => {
                      const day = week[di];
                      if (!day) {
                        return (
                          <div
                            key={`empty-${wi}-${di}`}
                            className="w-3 h-3"
                          />
                        );
                      }
                      return (
                        <motion.div
                          key={`day.date-${wi}-${di}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.4 + (wi * 7 + di) * 0.003,
                          }}
                          title={`${day.count} contribution${
                            day.count === 1 ? "" : "s"
                          } on ${formatDate(day.date)}`}
                          className={cn(
                            "w-3 h-3 rounded-sm",
                            intensityClass(day.count)
                          )}
                        />
                      );
                    })
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-muted-foreground">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-secondary" />
                <div className="w-3 h-3 rounded-sm bg-primary/20" />
                <div className="w-3 h-3 rounded-sm bg-primary/40" />
                <div className="w-3 h-3 rounded-sm bg-primary/70" />
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
