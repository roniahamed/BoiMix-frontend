"use client";

import type { ReactNode } from "react";

import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { RightSidebarWidget } from "@/components/layout/right-sidebar-widget";
import { moderatorNavItems } from "@/lib/navigation";

type ModeratorLayoutProps = {
  children: ReactNode;
};

export function ModeratorLayout({ children }: ModeratorLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-svh">
      <SidebarNavigation title="Moderator Panel" items={moderatorNavItems} />
      <main className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</main>
      <MobileBottomNavigation />
      <RightSidebarWidget />
    </div>
  );
}
