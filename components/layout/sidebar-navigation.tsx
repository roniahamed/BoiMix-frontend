"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  LogOut,
  Sparkles,
  Plus,
  Minus,
  Ticket,
  Bell,
} from "lucide-react";
import type { NavItem, NavGroup } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { AddBookDialog } from "@/components/shared/add-book-button";
import { useAuthStore } from "@/stores/auth-store";

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
  const user = useAuthStore((state) => state.user);

  const [openGroup, setOpenGroup] = useState<string | null>(() => {
    if (!groups) return null;
    const activeGroup = groups.find((g) =>
      g.items.some(
        (item) =>
          pathname === item.href ||
          (item.href !== "/dashboard/overview" &&
            item.href !== "/dashboard/exchanges" &&
            pathname.startsWith(`${item.href}/`)),
      ),
    );
    return activeGroup ? activeGroup.title : null;
  });

  const toggleGroup = (groupTitle: string) => {
    setOpenGroup((prev) => (prev === groupTitle ? null : groupTitle));
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const finalHref = item.href.replace("[username]", user?.username || "me");

    const isActive =
      pathname === finalHref ||
      (finalHref !== "/dashboard/overview" &&
        finalHref !== "/dashboard/exchanges" &&
        pathname.startsWith(`${finalHref}/`));

    const navLink = (
      <Link
        key={item.href}
        href={finalHref}
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
        <div className="flex-1 scrollbar-none space-y-4 overflow-y-auto p-3.5">
          {/* Pro Membership Highlights */}
          <div className="relative mb-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 p-3 text-white shadow-md">
            <div className="relative z-10 space-y-0.5">
              <h3 className="flex items-center gap-1.5 text-sm font-extrabold">
                <Ticket className="h-4 w-4" /> Pro Membership
              </h3>
              <p className="text-[10px] font-medium text-white/90">
                Unlock all premium features
              </p>
            </div>
            <Link
              href="/dashboard/passes"
              className="relative z-10 mt-2 inline-block rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-orange-500 shadow-sm transition-transform hover:bg-white/90 active:scale-95"
            >
              Upgrade
            </Link>
            <Sparkles className="absolute -top-2 -right-2 h-16 w-16 text-white/20" />
          </div>

          {groups ? (
            <div className="space-y-2">
              {groups.map((group) => {
                const totalNotifications = group.items.reduce((sum, item) => {
                  if (typeof item.badge === "number") return sum + item.badge;
                  if (typeof item.badge === "string") {
                    const parsed = parseInt(item.badge, 10);
                    return isNaN(parsed) ? sum : sum + parsed;
                  }
                  return sum;
                }, 0);
                const isOpen = openGroup === group.title;

                return (
                  <div
                    key={group.title}
                    className="border-border/40 bg-card overflow-hidden rounded-xl border shadow-2xs"
                  >
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className="hover:bg-muted/50 flex w-full items-center justify-between px-3 py-2.5 transition-colors"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="text-foreground truncate text-xs font-bold tracking-wider uppercase">
                          {group.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {totalNotifications > 0 && (
                          <div className="bg-brand-pink/15 text-brand-pink flex items-center gap-1 rounded-full px-1.5 py-0.5">
                            <Bell className="h-2.5 w-2.5" />
                            <span className="text-[9px] font-extrabold">
                              {totalNotifications}
                            </span>
                          </div>
                        )}
                        <div className="text-muted-foreground flex items-center justify-center">
                          {isOpen ? (
                            <Minus className="h-3.5 w-3.5" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" />
                          )}
                        </div>
                      </div>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <nav
                          className="bg-muted/10 border-border/40 space-y-0.5 border-t p-1.5 pt-0"
                          aria-label={group.title}
                        >
                          {group.items.map(renderNavItem)}
                        </nav>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
                    src={
                      user?.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8ABC&color=fff`
                    }
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="text-xs font-bold">
                    {user?.name?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="bg-success ring-background absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full ring-2" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-foreground truncate text-xs font-bold">
                    {user?.name || "User"}
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
