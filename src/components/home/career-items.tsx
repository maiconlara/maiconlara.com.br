"use client";

import { motion } from "framer-motion";
import {
  RiArrowRightLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
} from "@remixicon/react";

import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { OUT_OF_GITHUB_REPOS } from "@/lib/featured-repos";
import { useDictionary, useLocale } from "@/i18n/dictionary-context";

export const CareerItems = () => {
  const dict = useDictionary();
  const locale = useLocale();
  const t = dict.about.timeline;
  const cards = dict.home.cards;

  const careerItems = [
    {
      icon: RiBriefcaseLine,
      title: "stays.net",
      date: t.stays.period,
    },
    {
      icon: RiBriefcaseLine,
      title: "Analítica - Gerenciadora de Dados S/A",
      date: t.analitica.period,
    },
    {
      icon: RiBriefcaseLine,
      title: "Belogic",
      date: `${t.belogicJunior.period.split(" - ")[0]} - ${t.belogicMid.period.split(" - ")[1]}`,
    },
    {
      icon: RiBriefcaseLine,
      title: t.adamRobo.title,
      date: t.adamRobo.period,
    },
    {
      icon: RiGraduationCapLine,
      title: t.ufpr.role,
      date: t.ufpr.period,
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-fr">
      <AnimatedCard
        to={`/${locale}/about`}
        title={cards.about.title}
        description={cards.about.description}
        delay={0.2}
        containterClassName="lg:col-span-3"
      >
        <div className="space-y-3 mt-4">
          {careerItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 text-sm"
            >
              <item.icon className="w-4 h-4 text-primary shrink-0" />
              <span className="text-foreground truncate">{item.title}</span>
              <span className="text-muted-foreground text-xs ml-auto shrink-0">
                {item.date}
              </span>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>

      <AnimatedCard
        to={`/${locale}/projects`}
        title={cards.projects.title}
        description={cards.projects.description}
        delay={0.3}
        containterClassName="lg:col-span-2"
      >
        <div className="flex h-full w-full flex-col gap-2 ">
          {OUT_OF_GITHUB_REPOS.slice(0, 2).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className=" rounded-lg bg-card border border-border justify-between p-3 flex flex-col overflow-hidden"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: project.languageColor }}
                  aria-hidden
                />
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {project.language}
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
                  {project.name}
                </p>
                <p className="text-[10px] text-muted-foreground line-clamp-1">
                  {project.topics.slice(0, 3).join(" · ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>
    </section>
  );
};
