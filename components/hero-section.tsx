"use client";

import { motion } from "framer-motion";
import Navbar from "./navbar";
import { Calendar, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-fit w-full bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-indigo-950 dark:to-blue-950">
      {/* Fine grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/30"></div>

      {/* Light radial gradient mask */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)] dark:bg-black dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative z-10 px-4 pt-20 md:pt-16"
      >
        {/* Hero content */}
        <div className="container relative z-20 mx-auto">
          <div
            className={cn(
              "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
              scrolled ? "shadow-md py-2" : "py-4",
            )}
          >
            <div className="container mx-auto px-4">
              <Navbar />
            </div>
          </div>

          {/* Hero section with modern split layout */}
          <div className="mx-auto grid grid-cols-1 max-w-7xl place-content-center items-center gap-8 pb-20 pt-8 md:grid-cols-2 md:gap-12 md:pb-32 md:pt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex flex-col"
            >
              <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                <Sparkles className="size-3" />
                <span>AI-powered event platform</span>
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
                Create smarter
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                  events with AI
                </span>
              </h1>

              <p className="mb-6 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Transform how you plan and manage events with AI-powered
                chatbots, intelligent scheduling, and real-time analytics for
                exceptional attendee experiences.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/account">
                  <Button className="h-12 rounded-lg bg-indigo-600 px-8 text-sm font-medium text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-lg dark:bg-indigo-600 dark:shadow-indigo-900/20 dark:hover:bg-indigo-500">
                    Create your first event
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    variant="outline"
                    className="h-12 rounded-lg border-slate-200 bg-white/50 px-6 text-sm font-medium text-slate-800 backdrop-blur-sm transition-all hover:bg-white hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-slate-900 dark:hover:text-indigo-400"
                  >
                    See how it works
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="size-8 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                  <div className="size-8 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">500+</span> event organizers
                  trust us
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative mx-auto aspect-square max-w-md"
            >
              {/* Modern abstract UI mockup - Dashboard Preview */}
              <div className="md:absolute md:left-1/2 md:top-1/2 size-64 min-h-fit md:-translate-x-1/2 md:-translate-y-1/2 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-950/20">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="mb-1 h-3 w-32 rounded-full bg-indigo-200 dark:bg-indigo-800"></div>
                    <div className="h-2 w-20 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                  </div>
                  <div className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60"></div>
                </div>

                <div className="mb-6 rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30">
                  <div className="flex justify-between">
                    <div className="h-3 w-20 rounded-full bg-indigo-200 dark:bg-indigo-700"></div>
                    <div className="h-3 w-10 rounded-full bg-indigo-200 dark:bg-indigo-700"></div>
                  </div>
                  <div className="mt-2 h-12 rounded bg-white dark:bg-slate-800"></div>
                </div>

                <div className="mb-4 space-y-3">
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800"></div>
                  <div className="h-2 w-5/6 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                    <Calendar className="mb-2 size-6 text-indigo-500 dark:text-indigo-400" />
                    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                  <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                    <MessageSquareText className="mb-2 size-6 text-indigo-500 dark:text-indigo-400" />
                    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                </div>
              </div>

              {/* Accent decorative elements */}
              <div className="absolute -right-4 bottom-12 size-20 rounded-full bg-indigo-200/30 blur-2xl dark:bg-indigo-700/20"></div>
              <div className="absolute -left-8 top-8 size-24 rounded-full bg-purple-200/30 blur-2xl dark:bg-purple-700/20"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced background effects with light/dark mode consideration */}
      <div className="absolute inset-0 overflow-hidden">
        <ShootingStars
          maxSpeed={18}
          minDelay={15}
          className="opacity-30 dark:opacity-60"
        />
        <StarsBackground
          twinkleProbability={0.7}
          className="opacity-30 dark:opacity-70"
        />
      </div>
    </section>
  );
}
