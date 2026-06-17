"use client";

import { useTheme } from "next-themes";
import { useEffect, type ReactNode } from "react";

import { useThemeStore } from "@/stores/theme-store";

type ThemeStateProviderProps = {
  children: ReactNode;
};

export function ThemeStateProvider({ children }: ThemeStateProviderProps) {
  const { setTheme } = useTheme();
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    setTheme(mode);
  }, [mode, setTheme]);

  return children;
}
