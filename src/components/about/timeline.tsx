"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  RiArrowRightLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
} from "@remixicon/react";

import stays from "@/assets/stays_net_logo.jpeg";
import analitica from "@/assets/analitica.png";
import belogic from "@/assets/belogic.png";
import ufpr from "@/assets/ufpr.png";
import { useDictionary, useLocale } from "@/i18n/dictionary-context";

export const Timeline = () => {
  const dict = useDictionary();
  const locale = useLocale();
  const t = dict.about.timeline;

  const timeline = [
    {
      icon: RiBriefcaseLine,
      title: "stays.net",
      role: t.stays.role,
      period: t.stays.period,
      description: t.stays.description,
      current: true,
      logo: stays,
    },
    {
      icon: RiBriefcaseLine,
      title: "Analítica S/A",
      role: t.analitica.role,
      period: t.analitica.period,
      description: t.analitica.description,
      current: false,
      logo: analitica,
    },
    {
      icon: RiBriefcaseLine,
      title: "Belogic",
      role: t.belogicMid.role,
      period: t.belogicMid.period,
      description: t.belogicMid.description,
      logo: belogic,
    },
    {
      icon: RiGraduationCapLine,
      title: t.ufpr.title,
      role: t.ufpr.role,
      period: t.ufpr.period,
      description: t.ufpr.description,
      logo: ufpr,
    },
    {
      icon: RiBriefcaseLine,
      title: "Belogic",
      role: t.belogicJunior.role,
      period: t.belogicJunior.period,
      description: t.belogicJunior.description,
      logo: belogic,
    },
  ];

  return (
    <>
      <div className="relative">
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
              <div
                className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  item.current
                    ? "bg-primary text-primary-foreground glow-sm"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <item.icon className="size-5" />
              </div>

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
          href={`/${locale}/about/stack`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {dict.about.viewStack}
          <RiArrowRightLine className="w-4 h-4" />
        </Link>
      </motion.div>
    </>
  );
};
