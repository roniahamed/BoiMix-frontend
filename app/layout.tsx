import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Hind_Siliguri } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeStateProvider } from "@/providers/theme-state-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BoiMix - Book Exchange, Borrow & Marketplace",
    template: "%s | BoiMix",
  },
  description:
    "Buy, sell, exchange, and borrow books from readers near you or access our Central Library on BoiMix.",
  keywords: [
    "BoiMix",
    "Book Exchange Bangladesh",
    "Borrow Books",
    "Buy Books Dhaka",
    "Used Books Marketplace",
    "Central Library",
  ],
  authors: [{ name: "BoiMix Team" }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://boimix.com",
    title: "BoiMix - Book Exchange & Marketplace",
    description:
      "Connect with book lovers to buy, sell, borrow, or exchange books effortlessly.",
    siteName: "BoiMix",
  },
  twitter: {
    card: "summary_large_image",
    title: "BoiMix - Book Exchange & Marketplace",
    description:
      "Connect with book lovers to buy, sell, borrow, or exchange books effortlessly.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${hindSiliguri.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
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
