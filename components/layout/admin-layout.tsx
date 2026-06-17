import type { ReactNode } from "react";

import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { MobileFAB } from "@/components/layout/mobile-fab";
import { adminNavItems } from "@/lib/navigation";

type AdminLayoutProps = {
  children: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-svh">
      <SidebarNavigation title="Admin Panel" items={adminNavItems} />
      <main className="min-w-0 flex-1">{children}</main>
      <MobileFAB />
    </div>
  );
}
