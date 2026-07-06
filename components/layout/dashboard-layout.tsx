"use client";

import type { ReactNode } from "react";

import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { RightSidebarWidget } from "@/components/layout/right-sidebar-widget";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { dashboardNavGroups } from "@/lib/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-muted/10 text-foreground flex min-h-svh flex-col">
      <SiteHeader />

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
