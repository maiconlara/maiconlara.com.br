"use client";

import {
  RiGithubLine,
  RiLinkedinLine,
  RiMailLine,
  RiMapPinLine,
} from "@remixicon/react";
import { motion } from "framer-motion";

export const Social = () => {
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
            <p className="font-medium">Location</p>
            <p className="text-sm text-muted-foreground">
              Curitiba, Paraná, Brazil
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Available for remote work worldwide. Open to relocation for the right
          opportunity.
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
        className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20"
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-medium">Tip:</span> I usually
          respond within 24 hours. For urgent matters, reach out on LinkedIn or
          Twitter.
        </p>
      </motion.div>
    </motion.div>
  );
};
