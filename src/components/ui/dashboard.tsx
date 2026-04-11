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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  weeklyActivity: Array<{ day: string; commits: number; date?: string }>;
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

  // Group contributions into weeks of 7 slots aligned by UTC weekday
  // (Sun=0 .. Sat=6). Missing days (partial first/last week) become nulls
  // so the CSS grid stays aligned.
  const contributionWeeks = useMemo<Array<Array<ContributionCell | null>>>(() => {
    if (contribution.length === 0) return [];
    const sorted = [...contribution].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    const weeks: Array<Array<ContributionCell | null>> = [];
    let currentWeek: Array<ContributionCell | null> = new Array(7).fill(null);
    let currentWeekday = new Date(sorted[0].date).getUTCDay();

    for (const day of sorted) {
      const weekday = new Date(day.date).getUTCDay();
      if (weekday < currentWeekday) {
        weeks.push(currentWeek);
        currentWeek = new Array(7).fill(null);
      }
      currentWeek[weekday] = day;
      currentWeekday = weekday;
    }
    weeks.push(currentWeek);
    return weeks;
  }, [contribution]);

  // Pick which weeks should display a month label (only first occurrence
  // of each month gets a label, like the GitHub profile graph).
  const monthLabels = useMemo(() => {
    const labels: Record<number, string> = {};
    let last = "";
    contributionWeeks.forEach((week, i) => {
      const first = week.find((d) => d !== null);
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

          <TooltipProvider delayDuration={80} skipDelayDuration={200}>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyActivity.map((day, index) => {
                // Ensure non-zero days always render a visible nub, while
                // keeping proportions correct for larger values.
                const ratio = day.commits / maxCommits;
                const targetHeight =
                  day.commits === 0 ? 0 : Math.max(ratio * 100, 8);

                const label = day.date ? formatDate(day.date) : day.day;

                return (
                  <Tooltip key={day.day + index}>
                    <TooltipTrigger asChild>
                      <div className="flex-1 h-full flex flex-col items-center justify-end gap-2 cursor-default">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${targetHeight}%` }}
                          transition={{
                            delay: 0.5 + index * 0.1,
                            duration: 0.5,
                          }}
                          className={`w-full rounded-t-md bg-gradient-to-t from-primary/50 to-primary ${
                            isLoading ? "animate-pulse" : ""
                          }`}
                        />
                        <span className="text-xs text-muted-foreground leading-none">
                          {day.day}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      <span className="font-medium">
                        {day.commits} commit{day.commits === 1 ? "" : "s"}
                      </span>
                      <span className="text-muted-foreground"> on {label}</span>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
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
          <div className="w-full aspect-[53/7] rounded-md bg-secondary/40 animate-pulse" />
        ) : contribution.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            Contribution data unavailable. A GitHub token with{" "}
            <code className="px-1 py-0.5 rounded bg-secondary text-xs">
              read:user
            </code>{" "}
            scope is required.
          </p>
        ) : (
          <TooltipProvider delayDuration={60} skipDelayDuration={200}>
            <div className="w-full">
              {/* Month labels — share the same column template as the heatmap
                  so each label sits above its week column. pl compensates for
                  the day-of-week labels to the left of the grid. */}
              <div className="flex mb-1 ">
                <div
                  className="grid gap-[3px] text-[10px] text-muted-foreground w-full"
                  style={{
                    gridTemplateColumns: `repeat(${contributionWeeks.length}, minmax(0, 1fr))`,
                  }}
                >
                  {contributionWeeks.map((_, i) => (
                    <span
                      key={i}
                      className="leading-3 whitespace-nowrap overflow-visible"
                    >
                      {monthLabels[i] ?? ""}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-1 items-stretch w-full">
                {/* Day-of-week labels — stretch to the graph's height via flex */}
       

                {/* Heatmap — fills remaining width, height derived from
                    aspect-ratio so cells stay square responsively */}
                <div
                  className="grid flex-1 min-w-0 gap-[3px]"
                  style={{
                    aspectRatio: `${contributionWeeks.length} / 7`,
                    gridTemplateColumns: `repeat(${contributionWeeks.length}, minmax(0, 1fr))`,
                    gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                    gridAutoFlow: "column",
                  }}
                >
                  {contributionWeeks.flatMap((week, wi) =>
                    week.map((day, di) => {
                      if (!day) {
                        return (
                          <div key={`empty-${wi}-${di}`} aria-hidden />
                        );
                      }
                      return (
                        <Tooltip key={`${wi}-${di}-${day.date}`}>
                          <TooltipTrigger asChild>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.3 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 0.3 + (wi * 7 + di) * 0.002,
                                duration: 0.2,
                              }}
                              className={cn(
                                "rounded-[2px] cursor-default",
                                intensityClass(day.count)
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="text-xs px-2 py-1"
                          >
                            <span className="font-medium">
                              {day.count} contribution
                              {day.count === 1 ? "" : "s"}
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              on {formatDate(day.date)}
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-muted-foreground">
                <span>Less</span>
                <div className="w-3 h-3 rounded-[2px] bg-secondary" />
                <div className="w-3 h-3 rounded-[2px] bg-primary/20" />
                <div className="w-3 h-3 rounded-[2px] bg-primary/40" />
                <div className="w-3 h-3 rounded-[2px] bg-primary/70" />
                <div className="w-3 h-3 rounded-[2px] bg-primary" />
                <span>More</span>
              </div>
            </div>
          </TooltipProvider>
        )}
      </motion.div>
    </div>
  );
}
