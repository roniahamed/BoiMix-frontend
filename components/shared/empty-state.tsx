import type { LucideIcon } from "lucide-react";
import { SearchXIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon: Icon = SearchXIcon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-card shadow-soft flex flex-col items-center justify-center rounded-lg border px-6 py-12 text-center",
        className,
      )}
    >
      <span className="bg-muted text-muted-foreground inline-flex size-12 items-center justify-center rounded-full">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h2 className="text-foreground mt-4 font-semibold">{title}</h2>
      {description && (
        <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
