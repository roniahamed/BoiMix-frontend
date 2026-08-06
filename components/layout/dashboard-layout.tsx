"use client";

import { type ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { RightSidebarWidget } from "@/components/layout/right-sidebar-widget";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { dashboardNavGroups, dashboardNavItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    useAuthStore.persist.onFinishHydration(() => setHasHydrated(true));
    setHasHydrated(useAuthStore.persist.hasHydrated());
  }, []);

  useEffect(() => {
    if (mounted && hasHydrated && !isAuthenticated) {
      router.push("/auth/login?redirect=" + encodeURIComponent(pathname));
    }
  }, [mounted, hasHydrated, isAuthenticated, router, pathname]);

  if (!mounted || !hasHydrated || !isAuthenticated) {
    return null; // or a loading spinner
  }

  const activeNavItem = dashboardNavItems
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/dashboard/overview" &&
          item.href !== "/dashboard/exchanges" &&
          pathname.startsWith(`${item.href}/`)),
    );

  const isSubPage = pathname !== "/dashboard";
  const pageTitle = activeNavItem ? activeNavItem.title : "Dashboard";

  return (
    <div className="bg-muted/10 text-foreground flex min-h-svh flex-col">
      <SiteHeader />

      {/* Mobile Sub-Header with Back Button (lg:hidden) */}
      {isSubPage && (
        <div className="border-border/60 bg-background/95 sticky top-14 z-20 flex h-12 items-center justify-between border-b px-4 backdrop-blur-md lg:hidden">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-foreground hover:text-primary flex min-h-[36px] cursor-pointer items-center gap-2 text-xs font-bold transition-colors active:scale-95"
          >
            <span className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span>Dashboard Menu</span>
          </button>

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
        <main
          className={cn(
            "w-full min-w-0 flex-1 transition-all",
            pathname.startsWith("/dashboard/messages")
              ? "h-[calc(100vh-64px)] pb-16 lg:pb-0"
              : "pb-20 lg:pb-12",
          )}
        >
          {/* Inner content constrained to max-w-6xl (1152px) so cards don't stretch infinitely */}
          <div
            className={cn(
              "mx-auto w-full",
              pathname.startsWith("/dashboard/messages")
                ? "h-full max-w-[1400px] p-0 lg:p-6 lg:pb-8"
                : "max-w-6xl p-4 md:p-6 lg:p-8",
            )}
          >
            {children}
          </div>
        </main>
      </div>

      <MobileBottomNavigation />
      <RightSidebarWidget />
    </div>
  );
}
