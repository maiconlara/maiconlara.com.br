import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import Providers from "../providers";
import {
  defaultLocale,
  isLocale,
  locales,
  localeOpenGraph,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DictionaryProvider } from "@/i18n/dictionary-context";

const SITE_URL = "https://maiconlara.com.br";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const m = dict.metadata;

  const localizedUrl = `${SITE_URL}/${locale}`;
  const languageAlternates = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.defaultTitle,
      template: m.titleTemplate,
    },
    description: m.description,
    authors: [{ name: "Maicon Lara" }],
    creator: "Maicon Lara",
    alternates: {
      canonical: localizedUrl,
      languages: {
        ...languageAlternates,
        "x-default": `${SITE_URL}/${defaultLocale}`,
      },
    },
    openGraph: {
      title: m.defaultTitle,
      description: m.shortDescription,
      url: localizedUrl,
      siteName: m.siteName,
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: m.ogAlt,
        },
      ],
      locale: localeOpenGraph[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeOpenGraph[l]),
      type: "website",
    },
    robots: { index: true, follow: true },
    twitter: {
      card: "summary_large_image",
      site: "@MaiconLara",
      title: m.defaultTitle,
      description: m.shortDescription,
      images: ["/og-image.webp"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <Script
          id="schema-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Maicon Lara",
              url: `${SITE_URL}/`,
              jobTitle: "Frontend & Fullstack Developer",
              sameAs: [
                "https://github.com/maiconlara",
                "https://www.linkedin.com/in/maiconlara",
              ],
            }),
          }}
        />
        <Providers>
          <DictionaryProvider dict={dict} locale={locale}>
            <TooltipProvider>
              <div className="min-h-screen">
                <Header />
                <main className="pt-16">{children}</main>
              </div>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </DictionaryProvider>
        </Providers>
      </body>
    </html>
  );
}
