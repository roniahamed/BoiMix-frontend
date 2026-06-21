"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileBottomNavItems } from "@/lib/navigation";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { cn } from "@/lib/utils";

export function MobileBottomNavigation() {
  const pathname = usePathname();
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
    <nav
      className="bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur md:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      aria-label="Mobile bottom"
    >
      <div className="grid h-16 grid-cols-5">
        {mobileBottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return item.href === "#menu" ? (
            <MobileNavbar key={item.href}>
              <button
                className={cn(
                  "text-muted-foreground flex flex-col items-center justify-center gap-1 text-[0.7rem] font-medium transition-colors",
                )}
              >
                {Icon && <Icon className="size-5" aria-hidden="true" />}
                <span>{item.title}</span>
              </button>
            </MobileNavbar>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-[0.7rem] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              {Icon && <Icon className="size-5" aria-hidden="true" />}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
