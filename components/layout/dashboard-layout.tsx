"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { RightSidebarWidget } from "@/components/layout/right-sidebar-widget";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { dashboardNavGroups, dashboardNavItems } from "@/lib/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Find active nav item title for header badge
  const activeNavItem = dashboardNavItems.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/dashboard/overview" && pathname.startsWith(item.href)),
  );

  const isSubPage = pathname !== "/dashboard";
  const pageTitle = activeNavItem ? activeNavItem.title : "Dashboard";

  return (
    <div className="bg-muted/10 text-foreground flex min-h-svh flex-col">
      <SiteHeader />

      {/* Mobile Sub-Header with Back Button (lg:hidden) */}
      {isSubPage && (
        <div className="border-border/60 bg-background/95 sticky top-14 z-20 flex items-center justify-between border-b px-4 py-2.5 shadow-2xs backdrop-blur-md lg:hidden">
          <Link
            href="/dashboard"
            className="text-foreground hover:text-primary flex min-h-[36px] items-center gap-2 text-xs font-bold transition-colors active:scale-95"
          >
            <span className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span>Dashboard Menu</span>
          </Link>

          <div className="text-muted-foreground bg-muted/60 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold">
            <span className="max-w-[140px] truncate">{pageTitle}</span>
          </div>
        </div>
      )}

      {/* Full width container for fluid layout */}
      <div className="flex w-full flex-1 items-start">
        {/* Sidebar flush to the left edge */}
        <SidebarNavigation
          title="Dashboard"
          groups={dashboardNavGroups}
          className="sticky top-16 z-30 hidden h-[calc(100vh-4rem)] w-[260px] lg:block"
        />

        {/* Main area takes remaining width */}
        <main className="w-full min-w-0 flex-1 pb-20 lg:pb-12">
          {/* Inner content constrained to max-w-6xl (1152px) so cards don't stretch infinitely */}
          <div className="mx-auto w-full max-w-6xl p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      <MobileBottomNavigation />
      <RightSidebarWidget />
    </div>
  );
}
