import type { ReactNode } from "react";

import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { ConditionalSiteFooter } from "@/components/layout/conditional-site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileFAB } from "@/components/layout/mobile-fab";
import { FloatingMessageWidget } from "@/components/messages/floating-message-widget";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background text-foreground min-h-svh">
      <SiteHeader />
      <main>{children}</main>
      <ConditionalSiteFooter />
      <MobileBottomNavigation />
      <MobileFAB />
      <FloatingMessageWidget />
    </div>
  );
}
