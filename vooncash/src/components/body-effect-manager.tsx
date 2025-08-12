"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useTheme } from "next-themes";

export function BodyEffectManager() {
  const { state, setTheme: setVoonCashTheme } = useAppContext();
  const { theme, setTheme } = useTheme();

  // Sync next-themes with VoonCash's state
  useEffect(() => {
    if (state.settings.theme !== theme) {
      setTheme(state.settings.theme);
    }
  }, [state.settings.theme, theme, setTheme]);

  // Update HTML dir and lang attributes based on language
  useEffect(() => {
    document.documentElement.dir = state.settings.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = state.settings.language;
  }, [state.settings.language]);

  return null; // This component renders nothing
}
