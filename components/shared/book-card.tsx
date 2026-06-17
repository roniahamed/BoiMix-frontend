import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheckIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  Repeat2Icon,
  ShoppingCartIcon,
} from "lucide-react";

import { RatingStars } from "@/components/shared/rating-stars";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BookCardBook } from "@/types/book";

const tagLabels = {
  sell: "Sell",
  swap: "Swap",
  borrow: "Borrow",
} as const;

const tagClasses = {
  sell: "bg-warning text-warning-foreground",
  swap: "bg-info text-info-foreground",
  borrow: "bg-success text-success-foreground",
} as const;

type BookCardProps = {
  book: BookCardBook;
  className?: string;
};

export function BookCard({ book, className }: BookCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-md bg-transparent transition-all duration-300",
        className,
      )}
    >
      {/* Outer Card Content */}
      <div className="flex h-full flex-col bg-transparent">
        {/* Cover Image Area */}
        <div className="relative bg-white p-2">
          <Link
            href={`/books/${book.slug}`}
            className="bg-muted relative block aspect-[3/4] overflow-hidden rounded-md shadow-xs"
          >
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              sizes="(min-width: 1400px) 180px, (min-width: 992px) 16vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "type-badge rounded-full px-2 py-0.5 text-[0.65rem] font-bold shadow-xs",
                  tagClasses[tag],
                )}
              >
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        </div>

        {/* Info/Metadata Area */}
        <div className="space-y-1 p-2 pt-1">
          <div>
            <Link
              href={`/books/${book.slug}`}
              className="text-foreground hover:text-primary line-clamp-2 min-h-8 text-[0.78rem] leading-[1.1rem] font-semibold"
            >
              {book.title}
            </Link>
            <p className="text-muted-foreground mt-0.5 truncate text-[0.7rem]">
              {book.author}
            </p>
          </div>
          <div className="text-muted-foreground grid gap-0.5 text-[0.68rem]">
            <div className="flex items-center justify-between gap-2">
              <RatingStars
                rating={book.rating}
                reviewCount={book.reviewCount}
              />
              {book.distance && (
                <span className="shrink-0">{book.distance}</span>
              )}
            </div>
            <div className="flex min-w-0 items-center justify-between gap-2">
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1",
                  book.availability === "in-stock"
                    ? "text-success"
                    : "text-danger",
                )}
              >
                {book.availability === "in-stock" && (
                  <CheckCircle2Icon className="size-3" aria-hidden="true" />
                )}
                {book.availability === "in-stock" ? "In Stock" : "Out of Stock"}
              </span>
              {book.location && (
                <span className="min-w-0 truncate text-right">
                  {book.location}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate capitalize">
                {book.condition}
              </span>
              {book.price !== undefined && (
                <span className="text-accent shrink-0 text-[0.78rem] font-bold">
                  ৳{book.price.toLocaleString("en-BD")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Glassmorphism Hover Overlay over the entire card */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center rounded-md border border-white/20 bg-white/60 p-3 opacity-0 backdrop-blur-[3px] transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 dark:border-white/5 dark:bg-black/65">
        <div className="flex w-full max-w-[136px] -translate-y-4 transform flex-col items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-y-0">
          <Button
            size="sm"
            className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 px-3 text-xs transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingCartIcon className="size-4" />
            <span>{book.isInCart ? "In Cart" : "Add to Cart"}</span>
          </Button>
          <Button
            size="sm"
            variant="success"
            className="flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 px-3 text-xs transition-all hover:scale-105 active:scale-95"
          >
            <BookOpenIcon className="size-4" />
            <span>Borrow</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-background text-foreground flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 px-3 text-xs transition-all hover:scale-105 active:scale-95"
          >
            <Repeat2Icon className="size-4" />
            <span>Swap</span>
          </Button>
        </div>
        <Link
          href={`/books/${book.slug}`}
          className="border-border bg-secondary/90 text-primary hover:bg-primary hover:text-primary-foreground absolute right-0 bottom-0 left-0 flex h-12 cursor-pointer items-center justify-center gap-1 rounded-b-md border-t text-sm font-bold transition-all active:scale-95"
        >
          View Details
          {book.isVerifiedLibrary && (
            <BadgeCheckIcon className="size-4" aria-label="Verified library" />
          )}
        </Link>
      </div>
    </article>
  );
}
