"use client";

import { Book, Bookmark, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}

function SummaryCard({
  title,
  value,
  subValue,
  icon: Icon,
  colorClass,
  bgClass,
}: SummaryCardProps) {
  return (
    <div className="bg-card flex items-center gap-4 rounded-xl border p-4 shadow-sm">
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
          bgClass,
        )}
      >
        <Icon className={cn("h-6 w-6", colorClass)} />
      </div>
      <div className="flex flex-col">
        <div className="text-2xl leading-none font-bold">{value}</div>
        <div className="text-foreground/80 mt-1 text-sm font-medium">
          {title}
        </div>
        {subValue && (
          <div className="text-muted-foreground mt-0.5 text-xs">{subValue}</div>
        )}
      </div>
    </div>
  );
}

export function QuickSummary() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="My Books"
        value="42"
        icon={Book}
        colorClass="text-brand-pink"
        bgClass="bg-brand-pink/10"
      />
      <SummaryCard
        title="Borrowing"
        value="2"
        subValue="Due in 2 days"
        icon={Bookmark}
        colorClass="text-success"
        bgClass="bg-success/10"
      />
      <SummaryCard
        title="Lending"
        value="1"
        icon={Users}
        colorClass="text-warning"
        bgClass="bg-warning/10"
      />
      <SummaryCard
        title="Reputation Score"
        value="4.8"
        subValue="Excellent"
        icon={Star}
        colorClass="text-brand-blue"
        bgClass="bg-brand-blue/10"
      />
    </div>
  );
}
