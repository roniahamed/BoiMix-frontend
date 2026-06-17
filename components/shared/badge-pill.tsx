import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type BadgeTone = "default" | "success" | "warning" | "danger" | "info";

const toneClasses: Record<BadgeTone, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
};

type BadgePillProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

export function BadgePill({
  children,
  tone = "default",
  className,
}: BadgePillProps) {
  return (
    <span
      className={cn(
        "type-badge inline-flex items-center rounded-full px-2.5 py-1",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
