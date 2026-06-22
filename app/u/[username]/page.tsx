import type { Metadata } from "next";
import { ChevronDownIcon, LayoutGridIcon, ListIcon } from "lucide-react";

import { BookCard } from "@/components/shared/book-card";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { Button } from "@/components/ui/button";
import {
  getUserProfile,
  profileLibraryBooks,
  profileReviews,
} from "@/lib/mock/profile";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Reader Profile - BoiMix",
  description: "View a reader profile on BoiMix.",
};

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = getUserProfile(username);

  if (!profile) {
    return <ProfileNotFound />;
  }

  const filters = [
    "All",
    "Selling",
    "Swapping",
    "Borrowing",
    "Wishlist",
    "Collection",
  ];

  return (
    <ProfileShell profile={profile} active="library">
      <div className="space-y-8">
        {/* Library Filters and Sort */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <span
                key={filter}
                className={
                  filter === "All"
                    ? "bg-primary/10 text-primary hover:bg-primary/20 rounded-lg px-4 py-1.5 text-[15px] font-semibold transition-colors"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted rounded-lg px-4 py-1.5 text-[15px] font-semibold transition-colors"
                }
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-xl bg-transparent px-4 text-sm font-semibold"
            >
              Sort by: Newest
              <ChevronDownIcon className="ml-2 size-4" />
            </Button>
            <div className="bg-muted/40 flex items-center gap-1 rounded-xl border p-1">
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground size-8 rounded-lg shadow-xs"
              >
                <LayoutGridIcon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground size-8 rounded-lg"
              >
                <ListIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {profileLibraryBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="flex justify-center pt-2 pb-6">
          <Button
            variant="outline"
            className="bg-card rounded-full px-8 font-semibold shadow-sm"
          >
            Show more books
          </Button>
        </div>

        {/* Reviews Section */}
        <section className="bg-card rounded-[24px] border p-6 shadow-[0_18px_40px_rgba(51,51,51,0.08)]">
          <h2 className="text-foreground mb-6 text-lg font-bold tracking-tight">
            Reviews (238)
          </h2>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* Rating Summary */}
            <div className="flex min-w-[200px] flex-col gap-2">
              <div className="text-foreground text-5xl font-bold">4.8</div>
              <div className="text-warning flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="size-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-muted-foreground mt-1 text-sm font-medium">
                Based on 238 reviews
              </div>

              <div className="mt-4 space-y-2">
                {[
                  { stars: 5, pct: 80, count: 180 },
                  { stars: 4, pct: 15, count: 45 },
                  { stars: 3, pct: 3, count: 8 },
                  { stars: 2, pct: 1, count: 3 },
                  { stars: 1, pct: 1, count: 2 },
                ].map((row) => (
                  <div
                    key={row.stars}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="text-muted-foreground w-4 font-medium">
                      {row.stars}
                    </span>
                    <svg
                      className="text-muted-foreground size-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                      <div
                        className="bg-warning h-full rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-6 text-right">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="grid flex-1 gap-6 md:grid-cols-3">
              {profileReviews.slice(0, 3).map((review) => (
                <div key={review.id} className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted relative size-10 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${review.id}`}
                        alt="Reviewer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-foreground text-sm font-bold">
                        Anonymous Reviewer
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        {review.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="text-warning flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`size-4 ${star <= review.rating ? "fill-current" : "fill-muted text-muted"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">
                    {review.body}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    {/* Using placeholder book cover to simulate the book attachment in the review as per image */}
                    <div className="relative size-8 overflow-hidden rounded shadow-xs">
                      <Image
                        src={`/book-covers/${review.bookSlug}.svg`}
                        alt={review.bookTitle}
                        fill
                        className="bg-muted object-cover"
                      />
                    </div>
                    <span className="text-primary text-xs font-semibold">
                      {review.bookTitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ProfileShell>
  );
}
