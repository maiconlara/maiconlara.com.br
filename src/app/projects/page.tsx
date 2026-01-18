import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { Metadata } from "next";
import { Projects } from "@/components/projects/projects";

export const metadata: Metadata = {
  title: "Projects",
};

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

      <Projects />
    </div>
  );
}
