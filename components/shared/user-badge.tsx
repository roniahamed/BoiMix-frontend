import { BeautifulBadge } from "@/components/shared/beautiful-badge";
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
  icon = "award",
  badgeColor,
  className,
}: UserBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-1 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      <BeautifulBadge
        type={icon}
        color={badgeColor}
        className="size-5 drop-shadow-none"
        iconClassName="size-2.5"
      />
      {label}
    </span>
  );
}
