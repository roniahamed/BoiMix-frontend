import { AwardIcon } from "lucide-react";

import { UserBadge } from "@/components/shared/user-badge";
import type { UserProfileBadge } from "@/types/user";

type ProfileBadgeCollectionProps = {
  badges: UserProfileBadge[];
};

export function ProfileBadgeCollection({
  badges,
}: ProfileBadgeCollectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {badges.map((badge) => (
        <article
          key={badge.label}
          className="bg-card rounded-lg border p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="bg-warning-soft text-warning inline-flex size-11 shrink-0 items-center justify-center rounded-full">
              <AwardIcon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <UserBadge label={badge.label} tone={badge.tone} />
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {badge.description}
              </p>
              {badge.earnedAt && (
                <p className="text-muted-foreground mt-2 text-xs">
                  Earned {badge.earnedAt}
                </p>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
