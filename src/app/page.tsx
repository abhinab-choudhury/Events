'use client';

import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { FAQSection } from '@/components/FAQSection';

export default function Home() {
  return (
    <main className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
    </main>
  );
}
