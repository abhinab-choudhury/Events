"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounded] = React.useState(false);

  React.useEffect(() => {
    setMounded(true);
  }, []);
  if (!mounted) return null;

  return (
    <Button
      variant={"ghost"}
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      size="icon"
    >
      {theme === "dark" ? (
        <Moon className="size-5 text-indigo-400 hidden dark:block" />
      ) : (
        <Sun className="size-5 text-indigo-600 dark:hidden" />
      )}
    </Button>
  );
}
