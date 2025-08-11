"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { state, setTheme } = useAppContext();

  // The UI only toggles between light and dark. 'system' will be resolved by next-themes.
  // For the toggle's visual state, we can reflect the effective theme.
  // A simple solution is to just have the toggle control light/dark and not show a state for 'system'.
  const currentTheme = state.settings.theme;

  return (
    <div className="relative flex items-center rounded-full border bg-secondary p-1">
      <div
        className="relative flex w-[70px] items-center"
      >
        <button
          onClick={() => setTheme("light")}
          className={cn("relative z-10 h-7 w-7 flex items-center justify-center rounded-full",
            currentTheme === 'light' ? 'text-secondary' : 'text-muted-foreground'
          )}
          aria-label="Light mode"
        >
          <Sun className="h-5 w-5" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn("relative z-10 h-7 w-7 flex items-center justify-center rounded-full",
            currentTheme === 'dark' ? 'text-secondary' : 'text-muted-foreground'
          )}
          aria-label="Dark mode"
        >
          <Moon className="h-5 w-5" />
        </button>
        <motion.div
          className="absolute z-0 h-7 w-7 rounded-full bg-background shadow-sm"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          animate={{
            x: currentTheme === "dark" ? "100%" : 0,
          }}
        />
      </div>
    </div>
  );
}
