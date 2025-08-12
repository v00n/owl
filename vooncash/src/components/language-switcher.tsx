"use client";

import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { state, setLanguage } = useAppContext();
  const currentLang = state.settings.language;

  return (
    <div className="flex w-fit items-center rounded-full border bg-secondary p-1">
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
          currentLang === "en"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("ar")}
        className={cn(
          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
          currentLang === "ar"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground"
        )}
      >
        AR
      </button>
    </div>
  );
}
