'use client';

import { motion } from 'framer-motion';
import { GalleryVerticalEnd, LogOut, Settings, User } from 'lucide-react';
import { Button } from './ui/button';
import ThemeModeToggle from './ThemeBtn';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  if (session === null) {
    redirect('/account');
  }

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
      <div className="hidden items-center gap-6 md:flex">
        <Link
          href="/events"
          className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
        >
          Events
        </Link>
        <Link
          href="/services"
          className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
        >
          Services
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
        >
          About
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeModeToggle />
        {session === null ? (
          <Link href="/account">
            <Button
              variant="link"
              className="p-0 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Log in
            </Button>
          </Link>
        ) : (
          <UserDropdown />
        )}
      </div>
    </motion.nav>
  );
}

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full border border-indigo-600">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 size-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <User className="mr-2 size-4" /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900">
          <Button
            onClick={() => signOut()}
            variant={'ghost'}
            className="h-full w-full hover:bg-inherit"
          >
            <LogOut className="mr-2 size-4" /> Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
