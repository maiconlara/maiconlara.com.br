"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
} from "@remixicon/react";
import analitica from "@/assets/analitica.png";
import belogic from "@/assets/belogic.png";
import ufpr from "@/assets/ufpr.png";
import Image from "next/image";

const timeline = [
  {
    icon: RiBriefcaseLine,
    title: "Analítica S/A",
    role: "Mid-Level Full Stack Developer",
    period: "Jul 2025 - Present",
    description:
      "Contributing to enterprise full-stack development using Next.js and Nest.js.",
    current: true,
    logo: analitica,
  },
  {
    icon: RiBriefcaseLine,
    title: "Belogic",
    role: "Mid-Level Frontend Developer",
    period: "Mar 2025 - Jul 2025",
    description:
      "Contributing to enterprise full-stack development using Next.js and Nest.js.",
    logo: belogic,
  },
  {
    icon: RiGraduationCapLine,
    title: "Bachelor's Degree",
    role: "Systems Analysis and Development",
    period: "Feb 2022 - Nov 2024",
    description: "Federal University of Paraná (UFPR)",
    logo: ufpr,
  },
  {
    icon: RiBriefcaseLine,
    title: "Belogic",
    role: "Junior Frontend Developer",
    period: "Jun 2024 - Mar 2025",
    description:
      "Contributing to enterprise full-stack development using Next.js and Nest.js.",
    logo: belogic,
  },
];

export default function AboutPage() {
  return (
    <div className="container pb-16 md:pb-24 pt-10">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">About</h1>
        <p className="text-muted-foreground max-w-2xl">
          A deeper look into my professional and personal journey. Here's a
          timeline of the major milestones that shaped who I am today as a
          developer and person.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

        {timeline.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex gap-6 mb-12 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Icon */}
              <div
                className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  item.current
                    ? "bg-primary text-primary-foreground glow-sm"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <item.icon className="size-5" />
              </div>

              {/* Content */}
              <div
                className={`flex-1 max-w-md ${
                  isLeft ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                }`}
              >
                <div className="p-4 rounded-xl bg-card border border-border card-hover">
                  <span className="text-xs text-primary">{item.period}</span>
                  <div
                    className={`flex items-center gap-3 mt-1 justify-start ${isLeft ? "md:justify-end" : "md:justify-start"}`}
                  >
                    {item.logo && (
                      <Image
                        src={item.logo}
                        alt={`${item.title} logo`}
                        className={`size-10 rounded border border-border bg-white object-contain ${
                          isLeft ? "md:order-2" : "md:order-0"
                        }`}
                        width={40}
                        height={40}
                      />
                    )}

                    <div
                      className={`${isLeft ? "md:text-right" : "md:text-left"}`}
                    >
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <Link
          href="/about/stack"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          View my tech stack
          <RiArrowRightLine className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
