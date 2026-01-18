import { HeroSection } from "@/components/hero/HeroSection";
import { CareerItems } from "@/components/home/career-items";

import { Dashboard } from "@/components/ui/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div className="container pb-20">
      <HeroSection />
      <Dashboard />
      <CareerItems />
    </div>
  );
}
