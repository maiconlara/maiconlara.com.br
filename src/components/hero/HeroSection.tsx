"use client";

import { TypeWriter } from "@/components/ui/TypeWriter";
import { RiMapPinLine, RiWifiLine } from "@remixicon/react";
import { useDictionary } from "@/i18n/dictionary-context";

export function HeroSection() {
  const dict = useDictionary();
  const h = dict.hero;

  return (
    <section className="pb-16 md:pb-24 pt-10">
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-muted-foreground text-sm">
            <TypeWriter text={h.greeting} delay={150} />
          </span>

          <h1 className="text-4xl md:text-6xl font-bold">{h.name}</h1>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <RiMapPinLine className="w-4 h-4 text-primary" />
            {h.location}
          </span>
          <span className="flex items-center gap-2">
            <RiWifiLine className="w-4 h-4 text-primary" />
            {h.availability}
          </span>
        </div>

        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          <span className="text-foreground font-medium">{h.bioRole}</span>{" "}
          {h.bioMiddle} <span className="text-primary">Next.js</span>,{" "}
          <span className="text-primary">TypeScript</span>,{" "}
          <span className="text-primary">React</span> {h.bioAnd}{" "}
          <span className="text-primary">Node.js</span>
          {h.bioAfter}
        </p>
      </div>
    </section>
  );
}
