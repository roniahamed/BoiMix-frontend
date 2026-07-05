"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  BadgeCheckIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  LibraryIcon,
  Repeat2Icon,
  ShoppingCartIcon,
  StarIcon,
  HeartIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BookCardBook } from "@/types/book";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useBorrowCartStore } from "@/lib/store/use-borrow-cart-store";
import { useWishlistStore } from "@/lib/store/use-wishlist-store";

const tagLabels: Record<string, string> = {
  sell: "Sale",
  swap: "Swap",
  borrow: "Borrow",
  wishlist: "Wishlist",
  collection: "Collection",
} as const;

const tagClasses: Record<string, string> = {
  sell: "bg-orange-400/90 backdrop-blur-sm text-white",
  swap: "bg-emerald-400/90 backdrop-blur-sm text-white",
  borrow: "bg-blue-400/90 backdrop-blur-sm text-white",
  wishlist: "bg-rose-400/90 backdrop-blur-sm text-white",
  collection: "bg-purple-400/90 backdrop-blur-sm text-white",
} as const;

type BookCardProps = {
  book: BookCardBook;
  className?: string;
  hidePrice?: boolean;
};

export function BookCard({ book, className, hidePrice }: BookCardProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const isInCart = mounted ? items.some((item) => item.id === book.id) : false;
  const [isAdding, setIsAdding] = useState(false);

  const addBorrowItem = useBorrowCartStore((state) => state.addItem);
  const borrowItems = useBorrowCartStore((state) => state.items);
  const isInBorrowCart = mounted
    ? borrowItems.some((item) => item.id === book.id)
    : false;
  const [isAddingBorrow, setIsAddingBorrow] = useState(false);

  const handleAddToBorrowCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInBorrowCart) {
      router.push("/cart?tab=borrow");
      return;
    }
    setIsAddingBorrow(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    addBorrowItem({
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl || "",
      ownerId: book.providerType === "library" ? "lib_1" : "usr_1",
      ownerName:
        book.providerType === "library" ? "Central Library" : "User Seller",
      borrowFee: book.price ? Math.floor(book.price * 0.1) : 0,
      depositRequired: book.price || 300,
      maxBorrowDays: 14,
      isPro: (book.tags as string[]).includes("pro"),
      isPremium: (book.tags as string[]).includes("premium"),
      minTrustScoreRequired: 80,
      minRatingRequired: 4.0,
    });

    toast.success("Added to Borrow Cart", {
      description: `${book.title} has been added to your borrow cart.`,
      action: {
        label: "Go to Cart",
        onClick: () => router.push("/cart?tab=borrow"),
      },
    });
    setIsAddingBorrow(false);
  };

  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = mounted ? isInWishlist(book.id) : false;

  const hasSell = book.tags.includes("sell");
  const hasSwap = book.tags.includes("swap");
  const hasBorrow = book.tags.includes("borrow");

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent linking to the book
    if (isInCart) {
      router.push("/cart");
      return;
    }

    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price || 0,
      condition: book.condition,
      coverUrl: book.coverUrl,
      sellerName:
        book.providerType === "library" ? "Central Library" : "User Seller",
      sellerId: book.providerType === "library" ? "lib_1" : "usr_1",
    });

    toast.success("Added to cart", {
      description: `${book.title} has been added to your cart.`,
      action: {
        label: "Go to Cart",
        onClick: () => router.push("/cart"),
      },
    });
    setIsAdding(false);
  };

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg transition-all duration-300",
        "max-sm:border max-sm:border-slate-200 max-sm:bg-white max-sm:shadow-sm max-sm:dark:border-slate-800 max-sm:dark:bg-slate-900",
        "md:border-transparent md:bg-transparent md:shadow-none",
        className,
      )}
    >
      {/* Outer Card Content */}
      <div className="flex h-full flex-col bg-transparent">
        {/* Cover Image Area */}
        <div
          className={cn(
            "relative overflow-hidden rounded-t-lg pt-3 pb-3 transition-colors duration-500 md:rounded-lg",
            [
              "bg-[#E3F2FD] dark:bg-[#1A365D]", // Light Blue
              "bg-[#E8F8F5] dark:bg-[#114B3E]", // Mint
              "bg-[#FEF5E7] dark:bg-[#5C3A11]", // Orange
              "bg-[#F5EEF8] dark:bg-[#3B1F4F]", // Purple
              "bg-[#FDEDEC] dark:bg-[#4A1516]", // Rose
            ][(book.id.length + (book.id.charCodeAt(0) || 0)) % 5],
          )}
        >
          {/* Heart Icon - Top Left */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(book.id);
              toast.success(
                inWishlist ? "Removed from wishlist" : "Added to wishlist",
                {
                  description: `${book.title} has been ${inWishlist ? "removed from" : "added to"} your wishlist.`,
                },
              );
            }}
            className={cn(
              "absolute top-2.5 left-2.5 z-30 rounded-full border border-white/30 bg-white/40 p-1.5 text-slate-700 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/60 hover:text-rose-500 dark:border-white/10 dark:bg-black/20 dark:text-slate-300",
              inWishlist && "bg-white/70 text-rose-500 dark:bg-black/40",
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <HeartIcon
              className={cn(
                "size-4.5 drop-shadow-sm",
                inWishlist && "fill-current",
              )}
            />
          </button>

          {/* Action Button - Bottom Right (Mobile Only) */}
          {hasSell && (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={cn(
                "absolute right-2.5 bottom-2.5 z-30 rounded-full border border-white/30 bg-white/40 p-1.5 text-slate-700 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/60 hover:text-[#f57224] md:hidden dark:border-white/10 dark:bg-black/20 dark:text-slate-300",
                isInCart && "bg-white/70 text-[#f57224] dark:bg-black/40",
              )}
              aria-label={isInCart ? "View cart" : "Add to cart"}
            >
              <ShoppingCartIcon
                className={cn(
                  "size-4.5 drop-shadow-sm",
                  isInCart && "fill-current",
                )}
              />
            </button>
          )}
          {hasBorrow && (
            <button
              onClick={handleAddToBorrowCart}
              disabled={isAddingBorrow}
              className={cn(
                "absolute right-2.5 bottom-2.5 z-30 rounded-full border border-white/30 bg-white/40 p-1.5 text-slate-700 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/60 hover:text-[#f57224] md:hidden dark:border-white/10 dark:bg-black/20 dark:text-slate-300",
                isInBorrowCart && "bg-white/70 text-[#f57224] dark:bg-black/40",
              )}
              aria-label={isInBorrowCart ? "View borrow cart" : "Add to borrow"}
            >
              <BookOpenIcon
                className={cn(
                  "size-4.5 drop-shadow-sm",
                  isInBorrowCart && "fill-current",
                )}
              />
            </button>
          )}
          {hasSwap && (
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/books/${book.slug}`);
              }}
              className="absolute right-2.5 bottom-2.5 z-30 rounded-full border border-white/30 bg-white/40 p-1.5 text-slate-700 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/60 hover:text-[#f57224] md:hidden dark:border-white/10 dark:bg-black/20 dark:text-slate-300"
              aria-label="Swap book"
            >
              <Repeat2Icon className="size-4.5 drop-shadow-sm" />
            </button>
          )}

          {/* Ribbon Tag - Top Right */}
          {book.tags.length > 0 && (
            <div
              className={cn(
                "absolute top-[10px] -right-[38px] z-20 w-[120px] rotate-45 py-0.5 text-center text-[9px] font-extrabold tracking-widest uppercase shadow-sm",
                tagClasses[book.tags[0]] || "bg-gray-500 text-white",
              )}
            >
              {tagLabels[book.tags[0]]}
            </div>
          )}

          <Link
            href={`/books/${book.slug}`}
            className="relative z-10 mx-auto block aspect-[3/4] w-[60%] sm:w-[65%] md:w-[65%]"
          >
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              sizes="(min-width: 1400px) 180px, (min-width: 992px) 16vw, 50vw"
              className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Info/Metadata Area */}
        <div className="flex flex-1 flex-col p-1.5 pt-1 md:p-2.5 md:pt-1.5">
          <div className="mt-1 flex flex-1 flex-col md:mt-0">
            <Link
              href={`/books/${book.slug}`}
              className="text-foreground hover:text-primary line-clamp-2 text-[15px] leading-tight font-semibold md:text-[14px]"
            >
              {book.title}
            </Link>
            <div className="mt-auto">
              <div className="text-muted-foreground flex items-center justify-between gap-1 text-[14px] md:text-[13px]">
                <span className="truncate">{book.author}</span>
                {book.providerType === "library" && (
                  <LibraryIcon
                    className="text-primary size-3.5 shrink-0"
                    aria-label="Central Library"
                  />
                )}
                {book.providerType === "user" && book.isVerifiedUser && (
                  <BadgeCheckIcon
                    className="text-primary size-3.5 shrink-0"
                    aria-label="Verified User"
                  />
                )}
              </div>
              <div className="text-muted-foreground mt-1.5 grid gap-0.5 text-[13px] md:text-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 font-medium">
                    <div className="relative inline-block h-3.5 w-3.5 shrink-0">
                      <StarIcon className="text-muted-foreground absolute inset-0 size-3.5 opacity-30" />
                      {book.rating > 0 && (
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${(book.rating / 5) * 100}%` }}
                        >
                          <StarIcon className="size-3.5 fill-amber-500 text-amber-500" />
                        </div>
                      )}
                    </div>
                    {book.rating > 0 && (
                      <>
                        <span className="text-foreground">{book.rating}</span>
                        <span className="opacity-70">({book.reviewCount})</span>
                      </>
                    )}
                  </div>
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
                    {book.availability === "in-stock"
                      ? "In Stock"
                      : "Out of Stock"}
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
                  {!hidePrice && book.price !== undefined && (
                    <div className="flex shrink-0 items-center gap-1.5">
                      {book.originalPrice !== undefined &&
                        book.originalPrice > book.price && (
                          <span className="text-muted-foreground text-[13px] line-through md:text-[12px]">
                            ৳{book.originalPrice.toLocaleString("en-BD")}
                          </span>
                        )}
                      <span className="text-accent text-[16px] font-bold md:text-[15px]">
                        ৳{book.price.toLocaleString("en-BD")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Full-card click target (z-10) */}
      <Link
        href={`/books/${book.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View details of ${book.title}`}
      />

      {/* Glassmorphism Hover Overlay over the entire card */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden rounded-lg border border-white/20 bg-white/60 opacity-0 backdrop-blur-[3px] transition-all duration-300 group-hover:opacity-100 md:block dark:border-white/5 dark:bg-black/65">
        <div className="absolute top-2 right-2 left-2 flex aspect-[3/4] flex-col items-center justify-center">
          <div className="flex w-full max-w-[136px] -translate-y-4 transform flex-col items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-y-0">
            {hasSell && (
              <Button
                size="sm"
                variant="default"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="pointer-events-auto flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 text-[15px] font-bold transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingCartIcon className="size-4" />
                <span>
                  {isAdding
                    ? "Adding..."
                    : isInCart
                      ? "Go to Cart"
                      : "Add to Cart"}
                </span>
              </Button>
            )}
            {hasBorrow && (
              <Button
                size="sm"
                variant="default"
                onClick={handleAddToBorrowCart}
                disabled={isAddingBorrow}
                className="pointer-events-auto flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#f57224] px-3 text-[15px] font-bold text-white transition-all hover:scale-105 hover:bg-[#d65e1c] active:scale-95"
              >
                <BookOpenIcon className="size-4" />
                <span>
                  {isAddingBorrow
                    ? "Adding..."
                    : isInBorrowCart
                      ? "Go to Cart"
                      : "Add to Borrow"}
                </span>
              </Button>
            )}
            {hasSwap && (
              <Button
                size="sm"
                variant="default"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/books/${book.slug}`);
                }}
                className="pointer-events-auto flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#f57224] px-3 text-[15px] font-bold text-white transition-all hover:scale-105 hover:bg-[#d65e1c] active:scale-95"
              >
                <Repeat2Icon className="size-4" />
                <span>Swap Now</span>
              </Button>
            )}
          </div>
        </div>
        <Link
          href={`/books/${book.slug}`}
          className="border-border bg-secondary/90 text-primary hover:bg-primary hover:text-primary-foreground pointer-events-auto absolute right-0 bottom-0 left-0 flex h-12 cursor-pointer items-center justify-center gap-1 rounded-b-[5px] border-t text-sm font-bold transition-all active:scale-95"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
