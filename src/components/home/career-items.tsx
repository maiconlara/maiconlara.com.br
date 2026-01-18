"use client";

import { motion } from "framer-motion";

import { AnimatedCard } from "@/components/ui/AnimatedCard";
import {
  RiArrowRightLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
} from "@remixicon/react";

const careerItems = [
  {
    icon: RiBriefcaseLine,
    title: "Analítica - Gerenciadora de Dados S/A",
    date: "Jul 2025 - Present",
  },
  { icon: RiBriefcaseLine, title: "Belogic", date: "Jun 2024 - Jul 2025" },
  { icon: RiBriefcaseLine, title: "Adam Robo", date: "Jun 2023 - Jun 2024" },
  {
    icon: RiGraduationCapLine,
    title: "Systems Analysis and Development",
    date: "Feb 2022 - Nov 2024",
  },
];

export const CareerItems = () => {
  return (
    <section className="grid md:grid-cols-2 gap-6 items-stretch">
      <AnimatedCard
        to="/about"
        title="About"
        description="Take a look into my career."
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
        to="/projects"
        title="Projects"
        description="Some of my recent works"
        delay={0.3}
        containterClassName="row-span-2"
      >
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Project 1</span>
          </div>
          <div className="flex-1 h-24 rounded-lg bg-gradient-to-br from-secondary to-card flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Project 2</span>
          </div>
        </div>
      </AnimatedCard>

      <div className="grid grid-cols-3 gap-6">
        <AnimatedCard
          to="/about/stack"
          title="Languages & Tools"
          description="Technologies I work with"
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
          to="/contact"
          title="Contact"
          description="Lets talk!"
          delay={0.6}
          containterClassName="col-span-1"
        >
          <div className="flex items-center gap-2 mt-4 text-primary">
            <span className="text-sm">Get in touch</span>
            <RiArrowRightLine className="w-4 h-4" />
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
};
