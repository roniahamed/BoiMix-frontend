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
        "group bg-card shadow-soft hover:shadow-card-hover overflow-hidden rounded-md border transition-all duration-200 hover:-translate-y-0.5 hover:bg-white",
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
          className="bg-background/95 shadow-soft hover:bg-brand-pink focus-visible:ring-ring/50 absolute top-2 right-2 z-10 rounded-full p-2 transition-colors hover:text-white focus-visible:ring-[3px] focus-visible:outline-none"
          aria-label={
            book.isWishlisted ? "Open wishlisted book" : "Add to wishlist"
          }
        >
          <HeartIcon
            className={cn(
              "size-4",
              book.isWishlisted
                ? "fill-brand-pink text-brand-pink"
                : "text-muted-foreground",
            )}
            aria-label={book.isWishlisted ? "Wishlisted" : "Not wishlisted"}
          />
        </Link>
        <div className="absolute inset-2.5 hidden items-center justify-center rounded-md bg-gray-900/55 p-3 opacity-0 transition-opacity group-hover:flex group-hover:opacity-100 md:flex">
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
            {book.distance && <span>{book.distance}</span>}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1",
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
            {book.location && <span className="truncate">{book.location}</span>}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="capitalize">{book.condition}</span>
            {book.price !== undefined && (
              <span className="text-accent text-[0.82rem] font-bold">
                ৳{book.price.toLocaleString("en-BD")}
              </span>
            )}
          </div>
        </div>
      </div>
      <Link
        href={`/books/${book.slug}`}
        className="text-primary group-hover:bg-muted group-focus-within:bg-muted hover:bg-primary hover:text-primary-foreground flex h-8 items-center justify-center gap-1 bg-transparent px-3 py-1.5 text-sm font-semibold opacity-0 transition-all duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
      >
        View Details
        {book.isVerifiedLibrary && (
          <BadgeCheckIcon className="size-4" aria-label="Verified library" />
        )}
      </Link>
    </article>
  );
}
