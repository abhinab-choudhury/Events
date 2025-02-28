"use client";

import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { FAQSection } from "@/components/faq-section";

export default function Home() {
  return (
    <main className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
    </main>
  );
}
