"use client";

import {
  Book,
  Bookmark,
  Users,
  Star,
  ArrowUpRight,
  Clock,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string;
  subValue?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  gradientBorder?: string;
}

function SummaryCard({
  title,
  value,
  subValue,
  trend,
  trendPositive = true,
  icon: Icon,
  colorClass,
  bgClass,
}: SummaryCardProps) {
  return (
    <div className="group bg-card/95 hover:bg-card border-border/70 hover:shadow-primary/5 hover:border-primary/30 relative flex flex-col justify-between rounded-2xl border p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4">
      <div className="flex items-start justify-between gap-1">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11",
            bgClass,
          )}
        >
          <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", colorClass)} />
        </div>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 truncate rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-all sm:px-2 sm:text-xs",
              trendPositive
                ? "bg-success/15 text-success"
                : "bg-warning/15 text-warning",
            )}
          >
            <ArrowUpRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            <span className="truncate">{trend}</span>
          </span>
        )}
      </div>

      <div className="mt-3 sm:mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
            {value}
          </span>
        </div>

        <div className="mt-0.5 flex items-center justify-between sm:mt-1">
          <span className="text-muted-foreground line-clamp-1 text-[10px] font-semibold tracking-wider uppercase sm:text-xs">
            {title}
          </span>
        </div>

        {subValue && (
          <div className="text-muted-foreground/90 border-border/40 mt-2 line-clamp-1 flex items-center gap-1 border-t pt-2 text-[11px] font-medium sm:text-xs">
            <Clock className="text-muted-foreground h-3 w-3 shrink-0" />
            <span className="truncate">{subValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function QuickSummary() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <SummaryCard
        title="My Books"
        value="42"
        subValue="35 available"
        trend="+14% mo"
        trendPositive={true}
        icon={Book}
        colorClass="text-brand-pink"
        bgClass="bg-brand-pink/10 shadow-xs"
      />
      <SummaryCard
        title="Books Sold"
        value="5"
        subValue="৳ 2,450 Earned"
        trend="+2 this wk"
        trendPositive={true}
        icon={ShoppingBag}
        colorClass="text-emerald-500"
        bgClass="bg-emerald-500/10 shadow-xs"
      />
      <SummaryCard
        title="Borrowing"
        value="2"
        subValue="Atomic Habits due"
        trend="Active"
        trendPositive={true}
        icon={Bookmark}
        colorClass="text-success"
        bgClass="bg-success/10 shadow-xs"
      />
      <SummaryCard
        title="Lending"
        value="1"
        subValue="Lent to Ahmed"
        trend="+1 wk"
        trendPositive={true}
        icon={Users}
        colorClass="text-warning"
        bgClass="bg-warning/10 shadow-xs"
      />
      <SummaryCard
        title="Reputation"
        value="4.9"
        subValue="Top 5% exchanger"
        trend="48 Reviews"
        trendPositive={true}
        icon={Star}
        colorClass="text-brand-blue"
        bgClass="bg-brand-blue/10 shadow-xs"
      />
    </div>
  );
}
