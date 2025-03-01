"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { GalleryVerticalEnd, LogOut, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
// import ThemeModeToggle from "./themebtn";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to apply different styles when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "z-50 w-full border-black mx-auto transition-all duration-100",
        scrolled
          ? "fixed top-0 left-0 right-0 w-full border-slate-200 bg-white/45 backdrop-blur-2xl shadow-sm dark:border-slate-800 dark:bg-slate-900/95"
          : "rounded-full max-w-7xl bg-white/80 dark:bg-slate-900/80"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <GalleryVerticalEnd className="size-6 text-indigo-600 dark:text-indigo-400" />
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            Events AI
          </span>
        </Link>
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
          {/* <ThemeModeToggle /> */}
          {status !== "authenticated" ? (
            <Link href="/account">
              <Button
                variant="link"
                className="p-0 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Log in
              </Button>
            </Link>
          ) : (
            <UserDropdown session={session} />
          )}
        </div>
      </div>
    </motion.nav>
  );
}

const UserDropdown = ({ session }: { session: Session }) => {
  const { user } = session;
  const router = useRouter();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full border border-indigo-600">
        <Avatar>
          <AvatarImage src={user.image || ""} alt="user" />
          <AvatarFallback>
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/settings"} className="flex gap-2">
            <Settings className="mr-2 size-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/dashboard"} className="flex gap-2">
            <User className="mr-2 size-4" /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900">
          <Button
            onClick={async () => {
              try {
                const response = await signOut({ redirect: false });
                if (response) {
                  toast("You have been logged out successfully. ✅");
                  router.push("/");
                }
              } catch (error) {
                toast(
                  "Unable to log out. Please check your connection and try again. ❌"
                );
                console.error("Logout error:", error);
              }
            }}
            variant={"ghost"}
            className="h-full w-full hover:bg-inherit"
          >
            <LogOut className="mr-2 size-4" /> Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
