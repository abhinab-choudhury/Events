"use client";

import React, { Children, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
// import ThemeModeToggle from "@/components/themebtn";
import { GalleryVerticalEnd } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-transparent w-full flex-1 max-w-full min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-auto",
        "h-[60vh]", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-gray-50 dark:bg-gray-950">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <SidebarLink
                fn={() => signOut()}
                link={{
                  label: "Logout",
                  href: "/",
                  icon: (
                    <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
              />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: session?.user.name || "User",
                href: "/profile",
                icon: (
                  <img
                    src={session?.user.image || ""}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 dark:bg-gray-950 p-6">{children}</div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 gap-3 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="flex items-center justify-start align-middle gap-1">
        <GalleryVerticalEnd className="dark:text-white text-black h-6 w-6" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-extrabold text-black dark:text-white whitespace-pre text-xl"
        >
          Events AI
        </motion.span>
      </div>
      {/* <ThemeModeToggle /> */}
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <GalleryVerticalEnd className="dark:text-white text-black h-6 w-6" />
    </Link>
  );
};
