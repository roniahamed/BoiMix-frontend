"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookPlusIcon } from "lucide-react";
import { mobileBottomNavItems } from "@/lib/navigation";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { useMessageStore } from "@/lib/store/use-message-store";
import { cn } from "@/lib/utils";

export function MobileBottomNavigation() {
  const pathname = usePathname();
  const unreadCount = useMessageStore((s) => s.unreadCount);

  const nonDetailsRoutes = [
    "upload",
    "search",
    "category",
    "borrow",
    "near-me",
    "new",
    "top-rated",
    "trending",
  ];
  const isDetailsPage =
    pathname.startsWith("/books/") &&
    pathname.split("/").length === 3 &&
    !nonDetailsRoutes.includes(pathname.split("/")[2]);

  if (isDetailsPage) return null;

  return (
    <>
      {/* Bottom Navigation */}
      <nav
        className="bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur md:hidden"
        style={{
          paddingBottom: "max(8px, env(safe-area-inset-bottom))",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
        aria-label="Mobile bottom"
      >
        <div className="grid h-13 grid-cols-5">
          {mobileBottomNavItems.map((item) => {
            const Icon = item.icon;
            const isMessages = item.href === "/dashboard/messages";
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return item.href === "#menu" ? (
              <MobileNavbar key={item.href}>
                <button
                  className={cn(
                    "text-muted-foreground flex flex-col items-center justify-center gap-0.5 text-[0.62rem] font-medium transition-colors",
                  )}
                >
                  {Icon && <Icon className="size-4.5" aria-hidden="true" />}
                  <span>{item.title}</span>
                </button>
              </MobileNavbar>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 text-[0.62rem] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span className="relative">
                  {Icon && <Icon className="size-4.5" aria-hidden="true" />}
                  {isMessages && unreadCount > 0 && (
                    <span className="bg-primary text-primary-foreground absolute -top-1 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] leading-none font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </span>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
