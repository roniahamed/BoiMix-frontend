"use client";

import { useState } from "react";
import { MessageSquareDashed, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RatingStars } from "@/components/shared/rating-stars";
import { ReviewCard } from "@/components/shared/review-card";
import { ReviewForm } from "@/components/shared/review-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function BookReviews({
  reviews,
  bookTitle,
}: {
  reviews: Record<string, unknown>[];
  bookTitle: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Default");
  const [filterStar, setFilterStar] = useState<number | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const filteredReviews = reviews.filter(
    (r) => filterStar === null || r.rating === filterStar,
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === "Highest Rating") return b.rating - a.rating;
    if (sortOption === "Lowest Rating") return a.rating - b.rating;
    return 0;
  });

  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div
      id="reviews"
      className="bg-card scroll-mt-24 border p-5 shadow-sm lg:p-6"
    >
      <h3 className="type-heading mb-4 text-xl md:mb-6">Reviews and Ratings</h3>

      <div className="flex flex-col items-start gap-5 border-b pb-5 md:flex-row md:gap-8 md:pr-4 md:pb-8 md:pl-8 lg:gap-16 lg:pl-12">
        <div className="flex w-full flex-row justify-between gap-4 md:w-auto md:flex-1 md:justify-start md:gap-10 lg:gap-16">
          {/* Rate Product */}
          <div className="flex min-w-[110px] flex-col items-start md:min-w-[130px]">
            <p className="text-foreground mb-1 text-sm font-medium md:mb-1.5 md:text-base">
              Rate this product
            </p>
            <RatingStars rating={5} className="mb-3 text-orange-400 md:mb-4" />
            <Button
              variant="outline"
              onClick={() => setIsWriteModalOpen(true)}
              className="border-primary text-primary hover:bg-primary/10 h-8 rounded-md px-3 text-xs md:h-10 md:px-4 md:text-sm"
            >
              রিভিউ লিখুন
            </Button>
          </div>

          {/* Overall Rating */}
          <div className="flex min-w-[110px] flex-col items-start md:ml-auto md:min-w-[130px]">
            <h4 className="text-foreground text-4xl font-semibold md:text-5xl">
              2.33
            </h4>
            <RatingStars rating={2.33} className="my-1.5 md:my-2" />
            <p className="text-muted-foreground text-[10px] font-medium md:text-xs">
              2 Ratings and 3 Reviews
            </p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex w-full max-w-[280px] flex-1 flex-col gap-2">
          {[
            { star: 5, count: 1, percentage: 50 },
            { star: 4, count: 0, percentage: 0 },
            { star: 3, count: 0, percentage: 0 },
            { star: 2, count: 0, percentage: 0 },
            { star: 1, count: 2, percentage: 80 },
          ].map((row) => (
            <div key={row.star} className="flex items-center gap-3 text-sm">
              <div className="flex w-[60px] items-center justify-end gap-1 text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-3",
                      i < row.star
                        ? "fill-current"
                        : "text-muted-foreground/30 fill-transparent",
                    )}
                  />
                ))}
              </div>
              <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-orange-500"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>
              <span className="text-muted-foreground w-4 text-right text-xs font-medium">
                {row.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 sm:justify-end sm:gap-4 md:mt-6">
        <div className="flex items-center gap-2 sm:mr-4">
          <span className="text-muted-foreground text-xs font-medium sm:text-sm">
            Filter By
          </span>
          <select
            value={filterStar === null ? "All" : filterStar.toString()}
            onChange={(e) => {
              const val = e.target.value;
              setFilterStar(val === "All" ? null : Number(val));
              setCurrentPage(1);
            }}
            className="cursor-pointer rounded-md border bg-transparent px-2 py-1.5 text-xs outline-none sm:px-3 sm:text-sm"
          >
            <option value="All">All Stars</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs font-medium sm:text-sm">
            Sort By
          </span>
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="cursor-pointer rounded-md border bg-transparent px-2 py-1.5 text-xs outline-none sm:px-3 sm:text-sm"
          >
            <option>Default</option>
            <option>Recent</option>
            <option>Highest Rating</option>
            <option>Lowest Rating</option>
          </select>
        </div>
      </div>

      <div className="mt-4 mb-4 grid gap-0 md:mt-6 md:mb-6">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              reviewerName={review.authorName}
              reviewerAvatarUrl={review.authorAvatar}
              rating={review.rating}
              body={review.content}
              createdAt={review.date}
              helpfulCount={review.helpfulCount}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted/30 mb-4 flex size-20 items-center justify-center rounded-full">
              <MessageSquareDashed className="text-muted-foreground size-10" />
            </div>
            <h4 className="text-foreground mb-2 text-lg font-semibold">
              No reviews yet
            </h4>
            <p className="text-muted-foreground mb-6 max-w-sm text-sm">
              We couldn&apos;t find any reviews matching your current filters.
              Be the first to share your thoughts!
            </p>
            <Button onClick={() => setIsWriteModalOpen(true)}>
              Write a Review
            </Button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="mb-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                  document
                    .getElementById("reviews")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                    document
                      .getElementById("reviews")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  document
                    .getElementById("reviews")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <ReviewForm bookTitle={bookTitle} />

      <Dialog open={isWriteModalOpen} onOpenChange={setIsWriteModalOpen}>
        <DialogContent className="w-[95vw] p-6 sm:max-w-[600px] sm:p-8 md:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your thoughts on {bookTitle}.
            </DialogDescription>
          </DialogHeader>
          <ReviewForm
            bookTitle={bookTitle}
            isModal
            onCancel={() => setIsWriteModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
