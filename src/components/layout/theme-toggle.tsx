"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

import { useDictionary } from "@/i18n/dictionary-context";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dict = useDictionary();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dict.header.theme.toggle}
      title={isDark ? dict.header.theme.light : dict.header.theme.dark}
      className={cn(
        "relative inline-flex items-center justify-center w-9 h-9 rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-secondary",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
        "transition-colors"
      )}
      suppressHydrationWarning
    >
      <RiSunLine
        aria-hidden
        className={cn(
          "absolute w-4 h-4 transition-all duration-500 ease-out",
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        )}
      />
      <RiMoonLine
        aria-hidden
        className={cn(
          "absolute w-4 h-4 transition-all duration-500 ease-out",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
    </button>
  );
}
