"use client";

import Image from "next/image";
import { RatingStars } from "@/components/shared/rating-stars";
import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";

type ReviewCardProps = {
  reviewerName?: string;
  reviewerAvatarUrl?: string;
  rating: number;
  body: string;
  createdAt?: string;
  className?: string;
  bookCover?: string;
  bookTitle?: string;
  bookAuthor?: string;
  transactionType?: string;
  location?: string;
  helpfulCount?: number;
};

export function ReviewCard({
  reviewerName = "Anonymous",
  reviewerAvatarUrl,
  rating,
  body,
  createdAt,
  className,
  bookCover,
  transactionType,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "bg-card border-border/20 mb-2 flex flex-row gap-4 rounded-[5px] border p-4 shadow-none",
        className,
      )}
    >
      {/* Left: Book Cover Only */}
      <div className="border-border/40 flex shrink-0 items-center justify-center border-r pr-4">
        {bookCover ? (
          <div className="bg-muted relative h-12 w-8 shrink-0 overflow-hidden rounded shadow-sm">
            <Image
              src={bookCover}
              alt="Book Cover"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-muted h-12 w-8 shrink-0 rounded shadow-sm" />
        )}
      </div>

      {/* Right: Review Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar
              name={reviewerName}
              src={reviewerAvatarUrl}
              className="size-9"
            />
            <div className="flex flex-col">
              <span className="text-foreground text-[13px] font-bold">
                {reviewerName}
              </span>
              {createdAt && (
                <span className="text-muted-foreground text-[11px] font-medium">
                  {createdAt}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {transactionType && (
              <span
                className={cn(
                  "block w-[88px] rounded px-2.5 py-1 text-center text-[10px] font-bold tracking-wider whitespace-nowrap uppercase",
                  transactionType === "For Swap"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500"
                    : transactionType === "For Borrow"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-500",
                )}
              >
                {transactionType}
              </span>
            )}
            <button className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-center gap-2">
            <RatingStars rating={rating} />
            <p className="text-foreground ml-2 text-[13px] font-medium">
              {body}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
