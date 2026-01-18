import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

import { Metadata } from "next";
import { Timeline } from "@/components/about/timeline";

export const metadata: Metadata = {
  title: "About",
};

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

      <Timeline />
    </div>
  );
}
