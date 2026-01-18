import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { Metadata } from "next";
import { TechCategories } from "@/components/stack/tech-categories";

export const metadata: Metadata = {
  title: "Stack",
};

export default function StackPage() {
  return (
    <div className="container pb-16 md:pb-24 pt-10">
      <div className="mb-12">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          Back to About
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Languages & Tools
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          The technologies I use daily to build modern, scalable, and performant
          web applications.
        </p>
      </div>
      <TechCategories />
    </div>
  );
}
