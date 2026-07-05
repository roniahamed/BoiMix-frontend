"use client";

import type { ReactNode } from "react";

import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { RightSidebarWidget } from "@/components/layout/right-sidebar-widget";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { dashboardNavItems } from "@/lib/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-svh">
      <SidebarNavigation title="Dashboard" items={dashboardNavItems} />
      <main className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</main>
      <MobileBottomNavigation />
      <RightSidebarWidget />
    </div>
  );
}
