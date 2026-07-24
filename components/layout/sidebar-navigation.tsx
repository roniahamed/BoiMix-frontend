"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, LogOut, Sparkles } from "lucide-react";
import type { NavItem, NavGroup } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { AddBookDialog } from "@/components/shared/add-book-button";

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

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive =
      pathname === item.href ||
      (item.href !== "/dashboard/overview" && pathname.startsWith(item.href));

    const navLink = (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:ring-2 focus-visible:outline-none",
          isActive
            ? "bg-primary text-primary-foreground shadow-primary/20 font-semibold shadow-md"
            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          {Icon && (
            <Icon
              className={cn(
                "size-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground group-hover:text-primary",
              )}
              aria-hidden="true"
            />
          )}
          <span className="truncate">{item.title}</span>
        </div>
        {item.badge !== undefined && (
          <span
            className={cn(
              "ml-2 flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-bold transition-all",
              isActive
                ? "bg-primary-foreground text-primary shadow-xs"
                : item.badgeVariant === "brand"
                  ? "bg-brand-blue/15 text-brand-blue"
                  : item.badgeVariant === "warning"
                    ? "bg-warning/15 text-warning"
                    : item.badgeVariant === "success"
                      ? "bg-success/15 text-success"
                      : "bg-muted text-muted-foreground",
            )}
          >
            {item.badge}
          </span>
        )}
      </Link>
    );

    if (item.href === "/books/upload") {
      return <AddBookDialog key={item.href}>{navLink}</AddBookDialog>;
    }

    return navLink;
  };

  return (
    <aside
      className={cn(
        "bg-card border-border/60 shrink-0 border-r shadow-xs lg:block",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-border/50 flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="text-foreground text-sm font-bold tracking-tight">
              {title}
            </p>
          </div>
          <span className="bg-success/10 text-success rounded-full px-2 py-0.5 text-[10px] font-bold">
            Live
          </span>
        </div>

        {/* Navigation list */}
        <div className="flex-1 scrollbar-none space-y-6 overflow-y-auto p-3.5">
          {groups ? (
            groups.map((group) => (
              <div key={group.title} className="space-y-1.5">
                <h4 className="text-muted-foreground/80 px-3 text-[11px] font-bold tracking-wider uppercase">
                  {group.title}
                </h4>
                <nav className="space-y-1" aria-label={group.title}>
                  {group.items.map(renderNavItem)}
                </nav>
              </div>
            ))
          ) : (
            <nav className="space-y-1" aria-label={title}>
              {items?.map(renderNavItem)}
            </nav>
          )}
        </div>

        {/* User Mini Profile Footer */}
        <div className="border-border/60 border-t p-3.5">
          <div className="bg-muted/50 hover:bg-muted/80 flex items-center justify-between rounded-xl p-2.5 transition-colors">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <Avatar className="border-border h-9 w-9 border">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=roni"
                    alt="Roni Ahamed"
                  />
                  <AvatarFallback className="text-xs font-bold">
                    RA
                  </AvatarFallback>
                </Avatar>
                <span className="bg-success ring-background absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full ring-2" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-foreground truncate text-xs font-bold">
                    Roni Ahamed
                  </p>
                  <BadgeCheck className="text-brand-blue h-3.5 w-3.5 shrink-0" />
                </div>
                <p className="text-muted-foreground truncate text-[11px]">
                  Pro Exchanger • Dhaka
                </p>
              </div>
            </div>
            <Link
              href="/auth/login"
              title="Logout"
              className="text-muted-foreground hover:text-danger rounded-lg p-1.5 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
