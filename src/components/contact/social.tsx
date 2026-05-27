"use client";

import {
  RiGithubLine,
  RiLinkedinLine,
  RiMailLine,
  RiMapPinLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import { useDictionary } from "@/i18n/dictionary-context";

export const Social = () => {
  const dict = useDictionary();
  const c = dict.contact;

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
    {
      icon: RiMailLine,
      label: "Email",
      href: "mailto:maiconlaracontato@gmail.com",
      username: "maiconlaracontato@gmail.com",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-3 mb-4">
          <RiMapPinLine className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">{c.location.title}</p>
            <p className="text-sm text-muted-foreground">{c.location.city}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {c.location.availability}
        </p>
      </div>

      <div className="space-y-3">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border card-hover"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <link.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{link.label}</p>
              <p className="text-sm text-muted-foreground">{link.username}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-xl bg-card border border-primary"
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-medium">{c.tip}</span> {c.tipText}
        </p>
      </motion.div>
    </motion.div>
  );
};
