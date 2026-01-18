"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  RiArrowLeftLine,
  RiExternalLinkLine,
  RiGithubLine,
} from "@remixicon/react";

const projects = [
  {
    title: "Project 1",
    description: "-",
    tech: ["React"],
    github: "#",
    live: "#",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Project 2",
    description: "-",
    tech: ["Next.js"],
    github: "#",
    live: "#",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Project 3",
    description: "-",
    tech: ["React"],
    github: "#",
    live: "#",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Project 4",
    description: "-",
    tech: ["React"],
    github: "#",
    live: "#",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

export default function ProjectsPage() {
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

        <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground max-w-2xl">
          A collection of my recent work. Each project represents a unique
          challenge and an opportunity to push the boundaries of what's possible
          on the web.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-card border border-border card-hover"
          >
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="View on GitHub"
                  >
                    <RiGithubLine className="w-4 h-4" />
                  </a>
                  <a
                    href={project.live}
                    className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="View live site"
                  >
                    <RiExternalLinkLine className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-muted-foreground mb-4">
          Want to see more? Check out my GitHub for additional projects.
        </p>
        <a
          href="https://github.com/maiconlara"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <RiGithubLine className="w-4 h-4" />
          View GitHub Profile
        </a>
      </motion.div>
    </div>
  );
}
