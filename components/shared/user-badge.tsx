import { BadgeCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { UserBadge as UserBadgeType } from "@/types/user";

const toneClasses: Record<NonNullable<UserBadgeType["tone"]>, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
};

type UserBadgeProps = UserBadgeType & {
  className?: string;
};

export function UserBadge({
  label,
  tone = "default",
  className,
}: UserBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      <BadgeCheckIcon className="size-3" aria-hidden="true" />
      {label}
    </span>
  );
}
