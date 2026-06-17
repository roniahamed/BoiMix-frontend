import type { ReactNode } from "react";

import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background text-foreground min-h-svh">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <MobileBottomNavigation />
    </div>
  );
}
