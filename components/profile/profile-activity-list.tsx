import {
  AwardIcon,
  BookOpenIcon,
  MessageSquareTextIcon,
  Repeat2Icon,
  ShoppingBagIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { UserProfileActivity } from "@/types/user";

const activityIcons = {
  review: MessageSquareTextIcon,
  listed: ShoppingBagIcon,
  swap: Repeat2Icon,
  borrow: BookOpenIcon,
  badge: AwardIcon,
} as const;

type ProfileActivityListProps = {
  activities: UserProfileActivity[];
};

export function ProfileActivityList({ activities }: ProfileActivityListProps) {
  return (
    <div className="bg-card rounded-lg border shadow-sm">
      {activities.map((activity, index) => {
        const Icon = activityIcons[activity.type];

        return (
          <article
            key={activity.id}
            className={cn(
              "flex gap-4 p-4",
              index !== activities.length - 1 && "border-b",
            )}
          >
            <span className="bg-info-soft text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-foreground font-semibold">
                  {activity.title}
                </h2>
                <time className="text-muted-foreground text-xs">
                  {activity.createdAt}
                </time>
              </div>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {activity.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
