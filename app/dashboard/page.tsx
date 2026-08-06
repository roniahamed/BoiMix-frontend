"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  BadgeCheck,
  Flame,
  Plus,
  Minus,
  Sparkles,
  Book,
  Bookmark,
  Users,
  Star,
  Ticket,
  Bell,
} from "lucide-react";
import { dashboardNavGroups } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AddBookButton,
  AddBookDialog,
} from "@/components/shared/add-book-button";
import { useAuthStore } from "@/stores/auth-store";

export default function DashboardMenuPage() {
  const router = useRouter();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  // On desktop (lg+), redirect to /dashboard/overview since sidebar handles navigation
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      router.replace("/dashboard/overview");
    }
  }, [router]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 p-4 pb-28">
      {/* User Profile Banner - Mobile */}
      <div className="from-brand-blue to-primary relative overflow-hidden rounded-2xl bg-gradient-to-r p-4 text-white shadow-md">
        <div className="flex items-center gap-3.5">
          <Avatar className="h-14 w-14 shrink-0 border-2 border-white/30 shadow-sm">
            <AvatarImage
              src="https://ui-avatars.com/api/?name=Roni+Ahamed&background=0D8ABC&color=fff"
              alt="Roni Ahamed"
            />
            <AvatarFallback className="text-primary bg-white font-bold">
              RA
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <h2 className="truncate text-base font-extrabold text-white">
                Roni Ahamed
              </h2>
              <BadgeCheck className="h-4 w-4 shrink-0 text-white" />
            </div>
            <p className="text-xs font-medium text-white/80">
              Backend Engineer • Dhaka
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px]">
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 font-bold">
                <Flame className="h-3 w-3 fill-amber-300 text-amber-300" /> 14d
                Streak
              </span>
            </div>
          </div>
          <Link
            href="/dashboard/overview"
            className="text-primary shrink-0 rounded-xl bg-white px-3.5 py-2 text-xs font-extrabold shadow-sm transition-colors hover:bg-white/90"
          >
            Overview
          </Link>
        </div>
      </div>

      {/* Quick Stat Pill Grid - Mobile */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "My Books",
            val: "42",
            icon: Book,
            color: "text-brand-pink",
          },
          { label: "Borrow", val: "2", icon: Bookmark, color: "text-success" },
          { label: "Lending", val: "1", icon: Users, color: "text-warning" },
          {
            label: "Rating",
            val: "4.9★",
            icon: Star,
            color: "text-brand-blue",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-card border-border/70 space-y-0.5 rounded-xl border p-2.5 text-center shadow-2xs"
          >
            <stat.icon className={`mx-auto h-4 w-4 ${stat.color}`} />
            <p className="text-foreground text-sm leading-none font-extrabold">
              {stat.val}
            </p>
            <p className="text-muted-foreground truncate text-[10px] font-semibold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Membership Highlight Card */}
      <div className="relative mb-4 flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-400 p-4 text-white shadow-md">
        <div className="relative z-10 space-y-0.5">
          <h3 className="flex items-center gap-2 text-base font-extrabold">
            <Ticket className="h-5 w-5" /> Pro Membership
          </h3>
          <p className="text-[11px] font-medium text-white/90">
            Unlock all premium features & books
          </p>
        </div>
        <Link
          href="/dashboard/passes"
          className="relative z-10 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-orange-500 shadow-sm transition-transform hover:bg-white/90 active:scale-95"
        >
          Upgrade
        </Link>
        <Sparkles className="absolute top-2 right-24 h-16 w-16 text-white/20" />
      </div>

      {/* Quick Action Button - Mobile */}
      <AddBookButton className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold shadow-sm transition-transform active:scale-[0.99]">
        <Plus className="h-4 w-4 stroke-[3]" /> Add New Book to Library
      </AddBookButton>

      {/* Dashboard groups (Accordion Style) */}
      <div className="bg-card border-border/70 overflow-hidden rounded-2xl border shadow-2xs">
        {dashboardNavGroups.map((group) => {
          const totalNotifications = group.items.reduce((sum, item) => {
            if (typeof item.badge === "number") return sum + item.badge;
            if (typeof item.badge === "string") {
              const parsed = parseInt(item.badge, 10);
              return isNaN(parsed) ? sum : sum + parsed;
            }
            return sum;
          }, 0);

          return (
            <div
              key={group.title}
              className="border-border/40 border-b last:border-0"
            >
              <button
                onClick={() =>
                  setOpenGroup(openGroup === group.title ? null : group.title)
                }
                className="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3.5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-sm font-bold">
                    {group.title}
                  </span>
                  {totalNotifications > 0 && (
                    <div className="bg-brand-pink/15 text-brand-pink flex items-center gap-1 rounded-full px-2 py-0.5">
                      <Bell className="h-3 w-3" />
                      <span className="text-[10px] font-extrabold">
                        {totalNotifications}
                      </span>
                    </div>
                  )}
                </div>
                <div className="bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-md border shadow-sm">
                  {openGroup === group.title ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </div>
              </button>

              <div
                className={cn(
                  "divide-border/40 bg-muted/10 grid divide-y transition-all duration-300 ease-in-out",
                  openGroup === group.title
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="divide-border/40 divide-y">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const finalHref = item.href.replace(
                        "[username]",
                        user?.username || "me",
                      );
                      const navLink = (
                        <Link
                          key={item.href}
                          href={finalHref}
                          className="hover:bg-muted/50 active:bg-muted flex items-center justify-between px-4 py-3.5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {Icon && (
                              <span className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                                <Icon
                                  className="text-primary size-4"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                            <span className="text-foreground text-sm font-medium">
                              {item.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge !== undefined && (
                              <span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 text-[11px] font-bold">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="text-muted-foreground/50 size-4 shrink-0" />
                          </div>
                        </Link>
                      );

                      if (item.href === "/books/upload") {
                        return (
                          <AddBookDialog key={item.href}>
                            {navLink}
                          </AddBookDialog>
                        );
                      }

                      return navLink;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
