import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import type { Metadata } from "next";

import { Timeline } from "@/components/about/timeline";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.metadata.pages.about };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="container pb-16 md:pb-24 pt-10">
      <div className="mb-12">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          {dict.about.back}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {dict.about.title}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {dict.about.subtitle}
        </p>
      </div>

      <Timeline />
    </div>
  );
}
