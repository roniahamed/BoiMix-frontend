import Link from "next/link";

import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import type { UserSummary } from "@/types/user";

type UserMiniCardProps = {
  user: UserSummary;
  className?: string;
};

export function UserMiniCard({ user, className }: UserMiniCardProps) {
  return (
    <Link
      href={user.username ? `/u/${user.username}` : "#"}
      className={cn(
        "bg-card shadow-soft hover:bg-muted/40 focus-visible:ring-ring/50 flex items-center gap-3 rounded-lg border p-3 transition-colors focus-visible:ring-[3px] focus-visible:outline-none",
        className,
      )}
    >
      <UserAvatar name={user.name} src={user.avatarUrl} className="size-9" />
      <span className="min-w-0">
        <span className="text-foreground block truncate text-sm font-semibold">
          {user.name}
        </span>
        {user.location && (
          <span className="text-muted-foreground block truncate text-xs">
            {user.location}
          </span>
        )}
      </span>
    </Link>
  );
}
