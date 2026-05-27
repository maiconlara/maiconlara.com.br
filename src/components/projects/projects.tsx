"use client";

import { motion } from "framer-motion";
import { RiExternalLinkLine, RiGithubLine, RiStarLine } from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";

import {
  OUT_OF_GITHUB_REPOS,
  type FeaturedRepo,
} from "@/lib/featured-repos";
import { useDictionary, interpolate } from "@/i18n/dictionary-context";

const fetchRepos = async (): Promise<FeaturedRepo[]> => {
  const res = await fetch("/api/github/repos?limit=4");
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  return res.json();
};

export const Projects = () => {
  const dict = useDictionary();
  const p = dict.projects;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const projects = data && [...OUT_OF_GITHUB_REPOS, ...data];

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl bg-card border border-border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-6 w-40 rounded bg-secondary animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-lg bg-secondary animate-pulse" />
                  <div className="h-8 w-8 rounded-lg bg-secondary animate-pulse" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 w-full rounded bg-secondary animate-pulse" />
                <div className="h-3 w-4/5 rounded bg-secondary animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded-md bg-secondary animate-pulse" />
                <div className="h-5 w-12 rounded-md bg-secondary animate-pulse" />
              </div>
            </div>
          ))
        ) : isError || !data || data.length === 0 ? (
          <p className="md:col-span-2 text-center text-muted-foreground py-12">
            {p.loadError}
          </p>
        ) : (
          projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-card border border-border card-hover"
            >
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4 gap-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={interpolate(p.viewOnGitHub, {
                          name: project.name,
                        })}
                      >
                        <RiGithubLine className="w-4 h-4" />
                      </a>
                    )}
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={interpolate(p.viewLive, {
                          name: project.name,
                        })}
                      >
                        <RiExternalLinkLine className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {project.description || p.noDescription}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {project.language && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: project.languageColor }}
                      />
                      {project.language}
                    </span>
                  )}
                  {project.stars > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground">
                      <RiStarLine className="w-3 h-3" />
                      {project.stars}
                    </span>
                  )}
                  {project.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-muted-foreground mb-4">{p.wantMore}</p>
        <a
          href="https://github.com/maiconlara"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <RiGithubLine className="w-4 h-4" />
          {p.viewGitHub}
        </a>
      </motion.div>
    </>
  );
};
