"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiHomeLine } from "@remixicon/react";

import { useDictionary, useLocale } from "@/i18n/dictionary-context";

export default function NotFound() {
  const dict = useDictionary();
  const locale = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="text-8xl font-bold text-gradient mb-4"
        >
          404
        </motion.h1>
        <h2 className="text-2xl font-semibold mb-2">{dict.notFound.title}</h2>
        <p className="text-muted-foreground mb-8">{dict.notFound.description}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <RiHomeLine className="w-4 h-4" />
          {dict.notFound.backHome}
        </Link>
      </motion.div>
    </div>
  );
}
