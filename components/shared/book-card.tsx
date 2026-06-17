import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheckIcon,
  BookOpenIcon,
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
        "group bg-card shadow-soft hover:bg-muted/30 hover:shadow-card-hover overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="bg-muted relative aspect-[3/4] overflow-hidden">
        <Image
          src={book.coverUrl}
          alt={book.title}
          fill
          sizes="(min-width: 1200px) 240px, (min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
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
        <span className="bg-background/95 shadow-soft absolute top-2 right-2 rounded-full p-2">
          <HeartIcon
            className={cn(
              "size-4",
              book.isWishlisted
                ? "fill-brand-pink text-brand-pink"
                : "text-muted-foreground",
            )}
            aria-label={book.isWishlisted ? "Wishlisted" : "Not wishlisted"}
          />
        </span>
        <div className="absolute inset-0 hidden items-center justify-center bg-gray-900/55 p-3 opacity-0 transition-opacity group-hover:flex group-hover:opacity-100 md:flex">
          <div className="grid w-full max-w-36 gap-2">
            <Button size="sm">
              {book.isInCart ? <ShoppingCartIcon /> : <ShoppingCartIcon />}
              {book.isInCart ? "In Cart" : "Add"}
            </Button>
            <Button size="sm" variant="success">
              <BookOpenIcon />
              Borrow
            </Button>
            <Button size="sm" variant="outline">
              <Repeat2Icon />
              Swap
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-2 p-3">
        <div>
          <Link
            href={`/books/${book.slug}`}
            className="text-foreground hover:text-primary line-clamp-2 min-h-10 leading-5 font-semibold"
          >
            {book.title}
          </Link>
          <p className="text-muted-foreground mt-1 truncate text-sm">
            {book.author}
          </p>
        </div>
        <div className="text-muted-foreground grid gap-1 text-xs">
          <div className="flex items-center justify-between gap-2">
            <RatingStars rating={book.rating} reviewCount={book.reviewCount} />
            {book.distance && <span>{book.distance}</span>}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                book.availability === "in-stock"
                  ? "text-success"
                  : "text-danger",
              )}
            >
              {book.availability === "in-stock" ? "In Stock" : "Out of Stock"}
            </span>
            {book.location && <span className="truncate">{book.location}</span>}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="capitalize">{book.condition}</span>
            {book.price !== undefined && (
              <span className="type-price text-foreground">
                ৳{book.price.toLocaleString("en-BD")}
              </span>
            )}
          </div>
        </div>
      </div>
      <Link
        href={`/books/${book.slug}`}
        className="bg-muted text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold transition-colors"
      >
        View Details
        {book.isVerifiedLibrary && (
          <BadgeCheckIcon className="size-4" aria-label="Verified library" />
        )}
      </Link>
    </article>
  );
}
