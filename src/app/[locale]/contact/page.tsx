import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import type { Metadata } from "next";

import { ContactChannels } from "@/components/contact/contact-channels";
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
  return { title: dict.metadata.pages.contact };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="container pb-16 md:pb-24 pt-10">
      <div className="mb-10 md:mb-12">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          {dict.contact.back}
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {dict.contact.title}
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          {dict.contact.subtitle}
        </p>
      </div>

      <ContactChannels />
    </div>
  );
}
