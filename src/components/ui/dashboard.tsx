"use client";

import {
  RiCalendarLine,
  RiCodeLine,
  RiLineChartLine,
  RiStarLine,
  RiGroupLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import { useMemo } from "react";

const stats = [
  { label: "Years of Experience", value: "3+", icon: RiCalendarLine },
  { label: "Github Projects", value: "50+", icon: RiCodeLine },
  { label: "GitHub Stars", value: "200+", icon: RiStarLine },
  { label: "Happy Clients", value: "15+", icon: RiGroupLine },
];

const weeklyActivity = [
  { day: "Mon", commits: 8 },
  { day: "Tue", commits: 12 },
  { day: "Wed", commits: 6 },
  { day: "Thu", commits: 15 },
  { day: "Fri", commits: 10 },
  { day: "Sat", commits: 4 },
  { day: "Sun", commits: 2 },
];

const languages = [
  { name: "TypeScript", percentage: 45, color: "bg-blue-500" },
  { name: "JavaScript", percentage: 25, color: "bg-yellow-500" },
  { name: "Python", percentage: 15, color: "bg-green-500" },
  { name: "Other", percentage: 15, color: "bg-primary" },
];

export function Dashboard() {
  const maxCommits = Math.max(...weeklyActivity.map((d) => d.commits));

  // Gerar intensidades fixas para evitar hydration mismatch
  const contributionData = useMemo(() => {
    return Array.from({ length: 84 }, (_, i) => {
      // Usar um padrão determinístico baseado no índice
      const seed = (i * 2654435761) % 2147483647;
      const intensity = (seed / 2147483647);
      return intensity;
    });
  }, []);

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
            <span className="text-3xl font-bold text-gradient">
              {stat.value}
            </span>
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
                animate={{ height: `${(day.commits / maxCommits) * 100}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary/50 to-primary"
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
            {languages.map((lang, index) => (
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
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className={`h-full rounded-full ${lang.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* GitHub Contribution Graph Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-6 rounded-xl bg-card border border-border"
      >
        <h3 className="font-semibold mb-4">Contribution Graph</h3>
        <div className="grid grid-cols-12 gap-1">
          {contributionData.map((intensity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.01 }}
              className={`w-3 h-3 rounded-sm ${
                intensity > 0.7
                  ? "bg-primary"
                  : intensity > 0.4
                    ? "bg-primary/60"
                    : intensity > 0.2
                      ? "bg-primary/30"
                      : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}