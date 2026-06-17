import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AnalyticsCardProps = {
  title: string;
  value: string;
  description?: string;
  trend?: string;
  icon?: LucideIcon;
  className?: string;
};

export function AnalyticsCard({
  title,
  value,
  description,
  trend,
  icon: Icon,
  className,
}: AnalyticsCardProps) {
  return (
    <article
      className={cn("bg-card shadow-soft rounded-lg border p-4", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="type-caption text-muted-foreground">{title}</p>
          <p className="text-foreground mt-2 text-2xl font-bold">{value}</p>
        </div>
        {Icon && (
          <span className="bg-info-soft text-info inline-flex size-10 items-center justify-center rounded-lg">
            <Icon className="size-5" aria-hidden="true" />
          </span>
        )}
      </div>
      {(description || trend) && (
        <div className="mt-3 flex items-center justify-between gap-2 text-sm">
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
          {trend && <p className="text-success font-medium">{trend}</p>}
        </div>
      )}
    </article>
  );
}
