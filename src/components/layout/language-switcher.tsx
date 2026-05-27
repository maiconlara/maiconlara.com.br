"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { RiArrowDownSLine } from "@remixicon/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  locales,
  localeCountryCode,
  localeNames,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { useDictionary, useLocale, interpolate } from "@/i18n/dictionary-context";
import { cn } from "@/lib/utils";
import { FlagIcon } from "./flag-icons";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const dict = useDictionary();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: Locale) => {
    if (next === currentLocale) return;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && isLocale(segments[0])) {
      segments[0] = next;
    } else {
      segments.unshift(next);
    }
    const nextPath = "/" + segments.join("/");

    startTransition(() => {
      router.replace(nextPath);
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={dict.header.language.label}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
          isPending && "opacity-60"
        )}
      >
        <FlagIcon
          country={localeCountryCode[currentLocale] as "BR" | "US" | "ES"}
          className="h-4 w-6 rounded-sm"
        />
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        <RiArrowDownSLine className="w-3.5 h-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-[160px]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onSelect={() => switchLocale(loc)}
            aria-label={interpolate(dict.header.language.switchTo, {
              language: localeNames[loc],
            })}
            className={cn(
              "gap-2 cursor-pointer",
              loc === currentLocale && "bg-secondary/60"
            )}
          >
            <FlagIcon
              country={localeCountryCode[loc] as "BR" | "US" | "ES"}
              className="h-4 w-6 rounded-sm"
            />
            <span>{localeNames[loc]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
