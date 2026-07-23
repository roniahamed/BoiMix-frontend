"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  BadgeCheck,
  Flame,
  Plus,
  Sparkles,
  Book,
  Bookmark,
  Users,
  Star,
} from "lucide-react";
import { dashboardNavGroups } from "@/lib/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardMenuPage() {
  const router = useRouter();

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
              src="https://i.pravatar.cc/240?u=roni"
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

      {/* Quick Action Button - Mobile */}
      <Link
        href="/books/upload"
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold shadow-sm transition-transform active:scale-[0.99]"
      >
        <Plus className="h-4 w-4 stroke-[3]" /> Add New Book to Library
      </Link>

      {/* Dashboard groups */}
      {dashboardNavGroups.map((group) => (
        <div
          key={group.title}
          className="bg-card border-border/70 overflow-hidden rounded-2xl border shadow-2xs"
        >
          <h3 className="bg-muted/40 text-muted-foreground border-border/50 flex items-center justify-between border-b px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase">
            <span>{group.title}</span>
            <Sparkles className="text-muted-foreground/50 h-3 w-3" />
          </h3>
          <div className="divide-border/40 divide-y">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
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
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
