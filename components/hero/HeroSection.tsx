import { TypeWriter } from "@/components/ui/TypeWriter";
import { RiMapPinLine, RiWifiLine } from "@remixicon/react";

export function HeroSection() {
  return (
    <section className="pb-16 md:pb-24 pt-10">
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-muted-foreground text-sm">
            <TypeWriter text="Hello!" delay={150} />
          </span>

          <h1 className="text-4xl md:text-6xl font-bold">I'm Maicon</h1>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <RiMapPinLine className="w-4 h-4 text-primary" />
            Curitiba, Paraná, Brazil
          </span>
          <span className="flex items-center gap-2">
            <RiWifiLine className="w-4 h-4 text-primary" />
            Open to opportunities
          </span>
        </div>

        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          <span className="text-foreground font-medium">
            Mid-Level Fullstack Developer
          </span>{" "}
          with 3+ years of experience, specialized in creating scalable and
          high-performance applications. I work mainly with{" "}
          <span className="text-primary">Next.js</span>,{" "}
          <span className="text-primary">TypeScript</span>,{" "}
          <span className="text-primary">React</span> and{" "}
          <span className="text-primary">Node.js</span>, always aiming maintainable code and outstanding user experiences.
        </p>
      </div>
    </section>
  );
}
