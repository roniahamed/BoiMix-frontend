"use client";

import { useState } from "react";
import { Star } from "lucide-react";
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
      <h3 className="type-heading mb-6 text-xl">Reviews and Ratings</h3>

      <div className="flex flex-col items-start gap-10 border-b pb-8 md:flex-row md:pr-4 md:pl-8 lg:gap-16 lg:pl-12">
        {/* Rate Product */}
        <div className="flex min-w-[150px] flex-col items-start">
          <p className="text-foreground mb-1.5 font-medium">
            Rate this product
          </p>
          <RatingStars rating={5} className="mb-4 text-orange-400" />
          <Button
            variant="outline"
            onClick={() => setIsWriteModalOpen(true)}
            className="border-primary text-primary hover:bg-primary/10 rounded-md"
          >
            রিভিউ লিখুন
          </Button>
        </div>

        {/* Overall Rating */}
        <div className="flex min-w-[150px] flex-col items-start md:ml-auto">
          <h4 className="text-foreground text-5xl font-semibold">2.33</h4>
          <RatingStars rating={2.33} className="my-2" />
          <p className="text-muted-foreground text-xs font-medium">
            2 Ratings and 3 Reviews
          </p>
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 sm:justify-end">
        <div className="mr-auto flex items-center gap-2 sm:mr-4">
          <span className="text-muted-foreground text-sm font-medium">
            Filter By
          </span>
          <select
            value={filterStar === null ? "All" : filterStar.toString()}
            onChange={(e) => {
              const val = e.target.value;
              setFilterStar(val === "All" ? null : Number(val));
              setCurrentPage(1);
            }}
            className="cursor-pointer rounded-md border bg-transparent px-3 py-1.5 text-sm outline-none"
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
          <span className="text-muted-foreground text-sm font-medium">
            Sort By
          </span>
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="cursor-pointer rounded-md border bg-transparent px-3 py-1.5 text-sm outline-none"
          >
            <option>Default</option>
            <option>Recent</option>
            <option>Highest Rating</option>
            <option>Lowest Rating</option>
          </select>
        </div>
      </div>

      <div className="mt-4 mb-6 grid gap-0">
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
          <p className="text-muted-foreground py-8 text-center">
            No reviews found for this filter.
          </p>
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
