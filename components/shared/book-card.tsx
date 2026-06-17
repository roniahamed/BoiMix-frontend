import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheckIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  HeartIcon,
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
        "group bg-card shadow-soft hover:shadow-card-hover relative overflow-hidden rounded-md border transition-all duration-200 hover:-translate-y-0.5 hover:bg-white",
        className,
      )}
    >
      <div className="relative bg-white p-2.5">
        <Link
          href={`/books/${book.slug}`}
          className="bg-muted shadow-soft relative block aspect-[3/4] overflow-hidden rounded-md"
        >
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            sizes="(min-width: 1400px) 180px, (min-width: 992px) 16vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "type-badge shadow-soft rounded-full px-2 py-1",
                tagClasses[tag],
              )}
            >
              {tagLabels[tag]}
            </span>
          ))}
        </div>
        <Link
          href="/dashboard/wishlist"
          className="bg-background/95 shadow-soft hover:bg-brand-pink focus-visible:ring-ring/50 absolute top-2 right-2 z-10 cursor-pointer rounded-full p-2 transition-all duration-200 hover:scale-110 hover:text-white focus-visible:ring-[3px] focus-visible:outline-none active:scale-90"
          aria-label={
            book.isWishlisted ? "Open wishlisted book" : "Add to wishlist"
          }
        >
          <HeartIcon
            className={cn(
              "size-4 transition-transform",
              book.isWishlisted
                ? "fill-brand-pink text-brand-pink"
                : "text-muted-foreground",
            )}
            aria-label={book.isWishlisted ? "Wishlisted" : "Not wishlisted"}
          />
        </Link>
        <div className="pointer-events-none absolute inset-2.5 flex items-center justify-center rounded-md bg-gray-900/55 p-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 max-md:hidden">
          <div className="grid w-full max-w-36 translate-y-2 transform gap-2 transition-transform duration-300 group-hover:translate-y-0">
            <Button
              size="sm"
              className="cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              {book.isInCart ? <ShoppingCartIcon /> : <ShoppingCartIcon />}
              {book.isInCart ? "In Cart" : "Add"}
            </Button>
            <Button
              size="sm"
              variant="success"
              className="cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <BookOpenIcon />
              Borrow
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Repeat2Icon />
              Swap
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-1.5 px-2.5 pb-2.5">
        <div>
          <Link
            href={`/books/${book.slug}`}
            className="text-foreground hover:text-primary line-clamp-2 min-h-9 text-[0.82rem] leading-[1.15rem] font-semibold"
          >
            {book.title}
          </Link>
          <p className="text-muted-foreground mt-1 truncate text-xs">
            {book.author}
          </p>
        </div>
        <div className="text-muted-foreground grid gap-1 text-[0.72rem]">
          <div className="flex items-center justify-between gap-2">
            <RatingStars rating={book.rating} reviewCount={book.reviewCount} />
            {book.distance && <span className="shrink-0">{book.distance}</span>}
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
              <span className="text-accent shrink-0 text-[0.82rem] font-bold">
                ৳{book.price.toLocaleString("en-BD")}
              </span>
            )}
          </div>
        </div>
      </div>
      <Link
        href={`/books/${book.slug}`}
        className="text-primary hover:bg-primary hover:text-primary-foreground border-border bg-secondary/90 absolute right-0 bottom-0 left-0 flex h-8 cursor-pointer items-center justify-center gap-1 border-t text-xs font-bold opacity-0 transition-all duration-200 group-hover:opacity-100 active:scale-95"
      >
        View Details
        {book.isVerifiedLibrary && (
          <BadgeCheckIcon className="size-3.5" aria-label="Verified library" />
        )}
      </Link>
    </article>
  );
}
