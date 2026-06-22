"use client";

import Image from "next/image";
import {
  AwardIcon,
  BookOpenIcon,
  HeartIcon,
  MessageSquareTextIcon,
  Repeat2Icon,
  ShoppingBagIcon,
  StarIcon,
  TagIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { UserProfileActivity } from "@/types/user";

const activityIcons = {
  review: {
    icon: StarIcon,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-500/10",
  },
  listed: {
    icon: BookOpenIcon,
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-500/10",
  },
  swap: {
    icon: Repeat2Icon,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-500/10",
  },
  borrow: {
    icon: ShoppingBagIcon,
    color: "text-orange-500",
    bg: "bg-orange-100 dark:bg-orange-500/10",
  },
  badge: {
    icon: AwardIcon,
    color: "text-yellow-500",
    bg: "bg-yellow-100 dark:bg-yellow-500/10",
  },
  wishlist: {
    icon: HeartIcon,
    color: "text-pink-500",
    bg: "bg-pink-100 dark:bg-pink-500/10",
  },
  sale: {
    icon: TagIcon,
    color: "text-teal-500",
    bg: "bg-teal-100 dark:bg-teal-500/10",
  },
} as const;

type ProfileActivityListProps = {
  activities: UserProfileActivity[];
};

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProfileActivityList({ activities }: ProfileActivityListProps) {
  const [sortOption, setSortOption] = useState("recent");

  // Group activities by dateLabel
  const groupedActivities = activities.reduce(
    (acc, activity) => {
      const label = activity.dateLabel || "Past";
      if (!acc[label]) acc[label] = [];
      acc[label].push(activity);
      return acc;
    },
    {} as Record<string, UserProfileActivity[]>,
  );

  return (
    <div className="w-full">
      {/* Sort Dropdown */}
      <div className="mb-4 flex items-center justify-end">
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="bg-card w-[150px] rounded-lg text-xs font-bold shadow-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="recent">Sort by: Recent</SelectItem>
              <SelectItem value="oldest">Sort by: Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Scrollable Container for Infinite Scroll Effect */}
      <div className="scrollbar-thumb-muted-foreground/20 h-[calc(100vh-280px)] scrollbar-thin scrollbar-track-transparent overflow-y-auto pr-4">
        {/* Timeline */}
        <div className="border-border/40 relative ml-[5px] border-l-2 pb-6">
          {Object.entries(groupedActivities).map(
            ([dateLabel, items], index) => (
              <div
                key={dateLabel}
                className={cn("relative", index !== 0 && "mt-8")}
              >
                {/* Date Node */}
                <div className="border-primary/40 bg-background absolute top-1 -left-[6px] h-[10px] w-[10px] rounded-full border-2" />
                <h3 className="text-foreground/80 pl-6 text-[12px] font-bold">
                  {dateLabel}
                </h3>

                {/* Activities in this date group */}
                <div className="mt-4 space-y-4 pl-6">
                  {items.map((activity) => {
                    const config =
                      activityIcons[activity.type] || activityIcons.listed;
                    const Icon = config.icon;

                    return (
                      <article
                        key={activity.id}
                        className="bg-card border-border/50 relative rounded-[5px] border p-3 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="flex gap-4">
                          <div
                            className={cn(
                              "flex size-10 shrink-0 items-center justify-center rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                              config.bg,
                            )}
                          >
                            <Icon
                              className={cn("size-4.5", config.color)}
                              strokeWidth={2.5}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-foreground text-[13px] font-semibold">
                                {activity.title}
                              </h4>
                              {activity.time && (
                                <time className="text-muted-foreground ml-auto text-[11px] font-medium">
                                  {activity.time}
                                </time>
                              )}
                            </div>

                            {/* Content Box */}
                            {activity.bookTitle && (
                              <div className="mt-2.5 flex items-start gap-3">
                                {activity.bookCover ? (
                                  <div className="bg-muted relative h-12 w-8 shrink-0 overflow-hidden rounded shadow-sm">
                                    <Image
                                      src={activity.bookCover}
                                      alt={activity.bookTitle}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="bg-muted flex h-12 w-8 shrink-0 items-center justify-center rounded shadow-sm">
                                    <BookOpenIcon className="text-muted-foreground size-3" />
                                  </div>
                                )}
                                <div className="flex min-h-[48px] flex-col justify-center">
                                  <h5 className="text-foreground text-[13px] leading-tight font-bold">
                                    {activity.bookTitle}
                                  </h5>
                                  {activity.bookAuthor && (
                                    <p className="text-muted-foreground mt-0.5 text-[12px]">
                                      {activity.bookAuthor}
                                    </p>
                                  )}
                                  {activity.type === "review" &&
                                    activity.rating && (
                                      <div className="mt-1 flex gap-0.5">
                                        {Array.from({ length: 5 }).map(
                                          (_, i) => (
                                            <StarIcon
                                              key={i}
                                              className={cn(
                                                "size-3",
                                                i < activity.rating!
                                                  ? "fill-warning text-warning"
                                                  : "fill-muted text-muted",
                                              )}
                                            />
                                          ),
                                        )}
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
