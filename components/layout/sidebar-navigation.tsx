"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLink } from "@/components/layout/brand-link";
import type { NavItem, NavGroup } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SidebarNavigationProps = {
  title: string;
  items?: NavItem[];
  groups?: NavGroup[];
  className?: string;
};

export function SidebarNavigation({
  title,
  items,
  groups,
  className,
}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn("bg-background shrink-0 border-r lg:block", className)}
    >
      <div className="flex h-full flex-col">
        <div className="border-b px-6 py-4">
          <p className="text-foreground text-sm font-semibold">{title}</p>
        </div>
        <div className="flex-1 scrollbar-none overflow-y-auto p-4">
          {groups ? (
            <div className="space-y-6">
              {groups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
                    {group.title}
                  </h4>
                  <nav className="space-y-1" aria-label={group.title}>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard/overview" &&
                          pathname.startsWith(item.href));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "focus-visible:ring-ring/50 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {Icon && (
                            <Icon className="size-4" aria-hidden="true" />
                          )}
                          {item.title}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
          ) : (
            <nav className="space-y-1" aria-label={title}>
              {items?.map((item) => {
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
          )}
        </div>
      </div>
    </aside>
  );
}
