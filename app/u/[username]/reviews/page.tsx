import type { Metadata } from "next";
import { ReviewCard } from "@/components/shared/review-card";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { getUserProfile, profileReviews } from "@/lib/mock/profile";
import { StarIcon, FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reader Reviews - BoiMix",
  description: "Read public reviews from a BoiMix reader.",
};

export default async function UserReviewsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = getUserProfile(username);

  if (!profile) {
    return <ProfileNotFound />;
  }

  return (
    <ProfileShell profile={profile} active="reviews">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {/* Left Sidebar: Ratings */}
        <div className="w-full shrink-0 space-y-6 lg:w-[200px]">
          {/* Overall Rating */}
          <section className="bg-card border-border/20 rounded-[5px] border p-4 shadow-none">
            <h2 className="text-foreground text-[14px] font-bold">
              Overall Rating
            </h2>
            <div className="mt-2">
              <div className="flex items-end gap-2">
                <span className="text-foreground text-[32px] leading-none font-bold tracking-tight">
                  4.9
                </span>
                <div className="flex items-center gap-0.5 pb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="fill-warning text-warning size-3.5"
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mt-1 text-[11px] font-medium">
                Based on 238 reviews
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { stars: 5, count: 180, width: "w-[80%]", bg: "bg-orange-500" },
                { stars: 4, count: 45, width: "w-[30%]", bg: "bg-orange-500" },
                { stars: 3, count: 8, width: "w-[8%]", bg: "bg-orange-500" },
                { stars: 2, count: 3, width: "w-[4%]", bg: "bg-orange-500" },
                { stars: 1, count: 2, width: "w-[3%]", bg: "bg-orange-500" },
              ].map((row) => (
                <div
                  key={row.stars}
                  className="text-foreground flex items-center gap-2 text-[10px] font-bold"
                >
                  <div className="flex w-7 items-center justify-end gap-0.5 whitespace-nowrap">
                    <span>{row.stars}</span>
                    <StarIcon className="size-2.5 fill-current" />
                  </div>
                  <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
                    <div
                      className={cn("h-full rounded-full", row.bg, row.width)}
                    />
                  </div>
                  <span className="text-muted-foreground w-5 text-right">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Main Content: Reviews List */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground text-lg font-bold tracking-tight">
              All Reviews (238)
            </h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="all-ratings">
                <SelectTrigger className="bg-card border-border/50 w-[130px] rounded-lg text-[12px] font-bold shadow-sm">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-ratings">All Ratings</SelectItem>
                    <SelectItem value="5-stars">5 Stars</SelectItem>
                    <SelectItem value="4-stars">4 Stars</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="bg-card border-border/50 w-[130px] rounded-lg text-[12px] font-bold shadow-sm">
                  <SelectValue placeholder="Most Recent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <button className="bg-card border-border/50 hover:bg-muted flex size-9 items-center justify-center rounded-lg border shadow-sm transition-colors">
                <FilterIcon className="text-foreground size-4" />
              </button>
            </div>
          </div>

          {/* Infinite Scroll Container Without Outer Border */}
          <div className="scrollbar-thumb-muted-foreground/20 h-[calc(100vh-220px)] scrollbar-thin scrollbar-track-transparent overflow-y-auto pr-4">
            {profileReviews.map((review) => (
              <ReviewCard
                key={review.id}
                reviewerName={review.reviewerName}
                reviewerAvatarUrl={review.reviewerAvatar}
                rating={review.rating}
                body={review.body}
                createdAt={review.createdAt}
                bookTitle={review.bookTitle}
                bookAuthor={review.bookAuthor}
                bookCover={review.bookCover}
                transactionType={review.transactionType}
                location={review.location}
              />
            ))}
          </div>
        </div>
      </div>
    </ProfileShell>
  );
}
