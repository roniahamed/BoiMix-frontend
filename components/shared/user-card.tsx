import Link from "next/link";
import { MapPinIcon, StarIcon } from "lucide-react";

import { UserAvatar } from "@/components/shared/user-avatar";
import { UserBadge } from "@/components/shared/user-badge";
import { cn } from "@/lib/utils";
import type { UserSummary } from "@/types/user";

type UserCardProps = {
  user: UserSummary;
  className?: string;
};

export function UserCard({ user, className }: UserCardProps) {
  return (
    <article
      className={cn("bg-card shadow-soft rounded-lg border p-4", className)}
    >
      <div className="flex items-start gap-3">
        <UserAvatar name={user.name} src={user.avatarUrl} />
        <div className="min-w-0 flex-1">
          <Link
            href={user.username ? `/u/${user.username}` : "#"}
            className="text-foreground hover:text-primary font-semibold"
          >
            {user.name}
          </Link>
          {user.location && (
            <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
              <MapPinIcon className="size-3.5" aria-hidden="true" />
              {user.location}
            </p>
          )}
          {user.rating !== undefined && (
            <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
              <StarIcon
                className="fill-warning text-warning size-3.5"
                aria-hidden="true"
              />
              {user.rating.toFixed(1)}
            </p>
          )}
        </div>
      </div>
      {!!user.badges?.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {user.badges.map((badge) => (
            <UserBadge key={badge.label} {...badge} />
          ))}
        </div>
      )}
    </article>
  );
}
