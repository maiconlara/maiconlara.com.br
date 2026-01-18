"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useState } from "react";
import {
  RiArrowLeftLine,
  RiGithubLine,
  RiLinkedinLine,
  RiMailLine,
  RiMapPinLine,
  RiSendPlaneLine,
} from "@remixicon/react";
import { toast } from "@/hooks/use-toast";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Email not configured",
      description:
        "The email service is not configured yet. Please reach out through LinkedIn or GitHub.",
      variant: "destructive",
    });
  };

  return (
    <div className="container pb-16 md:pb-0 pt-10">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect!</h1>
        <p className="text-muted-foreground max-w-2xl">
          Have a project in mind or just want to chat? I'd love to hear from
          you. Feel free to reach out through any of the channels below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                placeholder="Your message..."
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
              <RiSendPlaneLine className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>

        {/* Social Links */}
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
              Available for remote work worldwide. Open to relocation for the
              right opportunity.
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
                  <p className="text-sm text-muted-foreground">
                    {link.username}
                  </p>
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
              respond within 24 hours. For urgent matters, reach out on LinkedIn
              or Twitter.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
