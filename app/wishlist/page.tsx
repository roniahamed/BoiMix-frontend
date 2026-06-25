"use client";

import { useEffect, useState } from "react";
import { BookCard } from "@/components/shared/book-card";
import { profileLibraryBooks } from "@/lib/mock/profile";
import { useWishlistStore } from "@/lib/store/use-wishlist-store";
import { useCartStore } from "@/lib/store/use-cart-store";
import type { BookCardBook } from "@/types/book";

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const cartItems = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto w-full max-w-[1200px] space-y-8 px-4 py-6 md:py-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
          <p className="text-muted-foreground mt-2">
            Books you&apos;ve saved to read or buy later.
          </p>
        </div>
      </div>
    );
  }

  // To display wishlist items, we try to find them in profileLibraryBooks first.
  // If not found, they might be in cartItems, so we construct a BookCardBook from CartItem.
  const wishlistBooks: BookCardBook[] = items.map((id) => {
    const fromProfile = profileLibraryBooks.find((b) => b.id === id);
    if (fromProfile) return fromProfile;

    const fromCart = cartItems.find((c) => c.id === id);
    if (fromCart) {
      return {
        id: fromCart.id,
        slug: fromCart.id,
        title: fromCart.title,
        author: fromCart.author,
        coverUrl: fromCart.coverUrl,
        tags: ["sell"],
        rating: 0,
        reviewCount: 0,
        condition:
          (fromCart.condition as
            | "new"
            | "excellent"
            | "good"
            | "fair"
            | "poor") || "good",
        availability: "in-stock",
        price: fromCart.price,
        providerType: fromCart.sellerId === "lib_1" ? "library" : "user",
      };
    }

    // Fallback dummy for unknown items
    return {
      id,
      slug: id,
      title: "Unknown Book",
      author: "Unknown Author",
      coverUrl: "/book-covers/default.svg",
      tags: [],
      rating: 0,
      reviewCount: 0,
      availability: "out-of-stock",
      providerType: "user",
      condition: "new",
    };
  });

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 px-4 py-6 md:py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground mt-2">
          Books you&apos;ve saved to read or buy later.
        </p>
      </div>

      {wishlistBooks.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {wishlistBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-24 text-center">
          <p className="text-muted-foreground text-sm">
            Your wishlist is empty. Browse books and add them to your wishlist.
          </p>
        </div>
      )}
    </div>
  );
}
