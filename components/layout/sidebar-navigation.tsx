"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLink } from "@/components/layout/brand-link";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SidebarNavigationProps = {
  title: string;
  items: NavItem[];
  className?: string;
};

export function SidebarNavigation({
  title,
  items,
  className,
}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-background hidden min-h-svh w-64 shrink-0 border-r lg:block",
        className,
      )}
    >
      <div className="sticky top-0 flex h-svh flex-col">
        <div className="border-b p-4">
          <BrandLink />
          <p className="type-caption text-muted-foreground mt-2">{title}</p>
        </div>
        <nav
          className="flex-1 space-y-1 overflow-y-auto p-3"
          aria-label={title}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-visible:ring-ring/50 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {Icon && <Icon className="size-4" aria-hidden="true" />}
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
