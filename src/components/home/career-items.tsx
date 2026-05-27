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

const PROJECT_TILE_GRADIENTS = [
  "from-primary/25 via-primary/10 to-transparent",
  "from-fuchsia-500/20 via-primary/10 to-transparent",
];

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
    <section className="grid md:grid-cols-2 gap-6 items-stretch">
      <AnimatedCard
        to={`/${locale}/about`}
        title={cards.about.title}
        description={cards.about.description}
        delay={0.2}
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
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-foreground">{item.title}</span>
              <span className="text-muted-foreground text-xs ml-auto">
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
        containterClassName="row-span-2"
      >
        <div className="flex gap-2 mt-4">
          {OUT_OF_GITHUB_REPOS.slice(0, 2).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`flex-1 h-24 rounded-lg bg-gradient-to-br ${
                PROJECT_TILE_GRADIENTS[index % PROJECT_TILE_GRADIENTS.length]
              } border border-border/60 p-3 flex flex-col justify-between overflow-hidden`}
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

      <div className="grid grid-cols-3 gap-6">
        <AnimatedCard
          to={`/${locale}/about/stack`}
          title={cards.stack.title}
          description={cards.stack.description}
          delay={0.4}
          containterClassName="col-span-2"
        >
          <div className="flex gap-2 mt-4 flex-wrap">
            {["Next.js", "TypeScript", "React", "Node.js"].map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          to={`/${locale}/contact`}
          title={cards.contact.title}
          description={cards.contact.description}
          delay={0.6}
          containterClassName="col-span-1"
        >
          <div className="flex items-center gap-2 mt-4 text-primary">
            <span className="text-sm">{cards.contact.cta}</span>
            <RiArrowRightLine className="w-4 h-4" />
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
};
