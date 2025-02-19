'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
      <section className="relative min-h-screen w-full bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="relative flex flex-col items-center justify-center gap-4 px-4"
        >
          {/* Hero content */}
          <div className="container relative z-20 flex min-h-screen flex-col items-start justify-center align-middle">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-2 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-6xl font-bold text-transparent md:text-8xl">
                Events AI
              </h1>
              <p className="mb-8 text-lg font-light text-gray-400 dark:text-gray-600 md:text-lg">
                Transform your event planning with AI-powered organization and
                scheduling
              </p>
              <Link href={'/account'}>
                <Button variant={'default'}>Get Started Free</Button>
              </Link>
            </div>
          </div>
        </motion.div>
        <ShootingStars maxSpeed={18} minDelay={15} />
        <StarsBackground twinkleProbability={0.9} />
      </section>
    </main>
  );
}
