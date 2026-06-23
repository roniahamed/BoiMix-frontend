import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeStateProvider } from "@/providers/theme-state-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "BoiMix",
  description: "BoiMix frontend foundation and design system.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ThemeStateProvider>
            <QueryProvider>
              <AuthProvider>
                <TooltipProvider>
                  {children}
                  <Toaster />
                </TooltipProvider>
              </AuthProvider>
            </QueryProvider>
          </ThemeStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
