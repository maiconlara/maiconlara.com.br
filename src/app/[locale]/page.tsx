import type { Metadata } from "next";
import { HeroSection } from "@/components/hero/HeroSection";
import { CareerItems } from "@/components/home/career-items";
import { Dashboard } from "@/components/ui/dashboard";
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
  return { title: dict.metadata.defaultTitle };
}

export default function HomePage() {
  return (
    <div className="container pb-20">
      <HeroSection />
      <Dashboard />
      <CareerItems />
    </div>
  );
}
