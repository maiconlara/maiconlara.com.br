"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { useDictionary, useLocale } from "@/i18n/dictionary-context";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const pathname = usePathname();
  const dict = useDictionary();
  const locale = useLocale();

  const navItems = [
    { path: "", label: dict.header.nav.home },
    { path: "/about", label: dict.header.nav.about },
    { path: "/projects", label: dict.header.nav.projects },
    { path: "/contact", label: dict.header.nav.contact },
  ];

  const localePrefix = `/${locale}`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
    >
      <div className="container flex items-center justify-between h-16">
        <Link
          href={localePrefix}
          className="font-semibold text-lg hover:text-primary transition-colors"
        >
          <Image
            src={logo}
            className="inline-block w-auto h-9 rounded-xl"
            alt="Maicon Lara"
            width={36}
            height={36}
          />
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {navItems.map((item) => {
            const href = `${localePrefix}${item.path}`;
            const isActive =
              pathname === href ||
              (item.path !== "" && pathname?.startsWith(href));

            return (
              <Link
                key={item.path}
                href={href}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}

                <motion.span
                  initial={false}
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-0 right-0 -bottom-1 h-[2px] origin-center bg-violet-500 rounded-full"
                />
              </Link>
            );
          })}

          <LanguageSwitcher />
        </nav>
      </div>
    </motion.header>
  );
}
