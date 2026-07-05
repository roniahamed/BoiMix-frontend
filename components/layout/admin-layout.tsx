"use client";

import type { ReactNode } from "react";

import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { RightSidebarWidget } from "@/components/layout/right-sidebar-widget";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { adminNavItems } from "@/lib/navigation";

type AdminLayoutProps = {
  children: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-svh">
      <SidebarNavigation title="Admin Panel" items={adminNavItems} />
      <main className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</main>
      <MobileBottomNavigation />
      <RightSidebarWidget />
    </div>
  );
}
