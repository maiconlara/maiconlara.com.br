"use client";

import {
  RiArrowRightUpLine,
  RiGithubLine,
  RiLightbulbLine,
  RiLinkedinLine,
  RiMailLine,
  RiMapPinLine,
} from "@remixicon/react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useDictionary } from "@/i18n/dictionary-context";

const EMAIL = "contato@maiconlara.com.br";

const socialLinks = [
  {
    icon: RiGithubLine,
    label: "GitHub",
    href: "https://github.com/maiconlara",
    username: "@maiconlara",
  },
  {
    icon: RiLinkedinLine,
    label: "LinkedIn",
    href: "https://linkedin.com/in/maiconlara",
    username: "Maicon Lara",
  },
];

const cardClassName =
  "rounded-xl bg-card border border-border card-hover outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const iconBoxClassName =
  "w-10 h-10 shrink-0 rounded-lg bg-secondary flex items-center justify-center";

const arrowClassName =
  "w-4 h-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

export const ContactChannels = () => {
  const dict = useDictionary();
  const c = dict.contact;
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <motion.a
        variants={item}
        href={`mailto:${EMAIL}`}
        className={`group flex flex-col justify-between gap-8 p-6 md:p-8 md:col-span-2 ${cardClassName}`}
      >
        <div className="flex items-start justify-between">
          <div className={iconBoxClassName}>
            <RiMailLine className="w-5 h-5 text-primary" aria-hidden />
          </div>
          <RiArrowRightUpLine className={`${arrowClassName} w-5 h-5`} aria-hidden />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{c.emailNote}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold break-all transition-colors group-hover:text-primary">
            {EMAIL}
          </p>
        </div>
      </motion.a>

      <motion.div
        variants={item}
        className="flex flex-col gap-4 p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3">
          <div className={iconBoxClassName}>
            <RiMapPinLine className="w-5 h-5 text-primary" aria-hidden />
          </div>
          <div>
            <p className="font-medium">{c.location.title}</p>
            <p className="text-sm text-muted-foreground">{c.location.city}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 border-t border-border pt-4 mt-auto">
          <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {c.location.availability}
          </p>
        </div>
      </motion.div>

      {socialLinks.map((link) => (
        <motion.a
          key={link.label}
          variants={item}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center gap-4 p-6 ${cardClassName}`}
        >
          <div className={iconBoxClassName}>
            <link.icon className="w-5 h-5 text-primary" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="font-medium transition-colors group-hover:text-primary">
              {link.label}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {link.username}
            </p>
          </div>
          <RiArrowRightUpLine className={`ml-auto ${arrowClassName}`} aria-hidden />
        </motion.a>
      ))}

      <motion.div
        variants={item}
        className="flex items-start gap-3 p-6 rounded-xl border border-primary/30 bg-primary/5"
      >
        <RiLightbulbLine className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden />
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="text-primary font-medium">{c.tip}</span> {c.tipText}
        </p>
      </motion.div>
    </motion.div>
  );
};
