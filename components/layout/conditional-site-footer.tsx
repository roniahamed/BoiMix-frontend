"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";

export function ConditionalSiteFooter() {
  const pathname = usePathname();

  if (pathname === "/books/upload") {
    return null;
  }

  return <SiteFooter />;
}
