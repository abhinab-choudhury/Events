'use client';

import { motion } from 'framer-motion';
import { GalleryVerticalEnd } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeModeToggle } from './ThemeBtn';
import Link from 'next/link';

export default function Navbar() {
    return (
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto mb-16 flex max-w-7xl items-center justify-between rounded-full border border-slate-200 bg-white/60 px-6 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60"
      >
        <div className="flex items-center gap-2">
          <GalleryVerticalEnd className="size-6 text-indigo-600 dark:text-indigo-400" />
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            Events AI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/account">
            <Button
              variant="link"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Log in
            </Button>
          </Link>
          <ThemeModeToggle />
        </div>
      </motion.nav>
    );
  };