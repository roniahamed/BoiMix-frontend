"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookCard } from "@/components/shared/book-card";
import { Button } from "@/components/ui/button";
import { BookCardBook } from "@/types/book";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileBooksViewerProps {
  books: BookCardBook[];
  isOwnProfile?: boolean;
  libraryUrl?: string; // If provided, clicking filters/show more redirects here.
}

function BooksViewerContent({
  books,
  isOwnProfile = false,
  libraryUrl,
}: ProfileBooksViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = [
    "All",
    "Selling",
    "Swapping",
    "Borrowing",
    ...(isOwnProfile ? ["Wishlist"] : []),
    "Collection",
  ];

  const rawFilter = searchParams.get("filter") || "All";
  const activeFilter = filters.includes(rawFilter) ? rawFilter : "All";

  const [visibleCount, setVisibleCount] = useState(5);
  const [sortOption, setSortOption] = useState("newest");

  const handleFilterClick = (filter: string) => {
    if (libraryUrl) {
      // Redirect to library page with filter
      router.push(`${libraryUrl}?filter=${filter}`, { scroll: false });
    } else {
      // Update URL without reload to trigger filter change
      router.replace(`?filter=${filter}`, { scroll: false });
      setVisibleCount(5);
    }
  };

  const handleShowMore = () => {
    if (libraryUrl) {
      router.push(`${libraryUrl}#profile-content`);
    } else {
      setVisibleCount((prev) => prev + 5);
    }
  };

  // 1. Filter
  const filteredBooks = books.filter((book) => {
    if (activeFilter === "All") return true;
    const lowerFilter = activeFilter.toLowerCase();
    const tagMap: Record<string, string> = {
      selling: "sell",
      swapping: "swap",
      borrowing: "borrow",
      wishlist: "wishlist",
      collection: "collection",
    };
    const targetTag = tagMap[lowerFilter] || lowerFilter;
    return book.tags?.includes(targetTag);
  });

  // 2. Sort
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "newest") {
      // Assuming original array is newest first
      return 0;
    }
    if (sortOption === "oldest") {
      return -1; // Reverse original order
    }
    if (sortOption === "price-low") {
      const priceA = a.price ?? 0;
      const priceB = b.price ?? 0;
      return priceA - priceB;
    }
    if (sortOption === "price-high") {
      const priceA = a.price ?? 0;
      const priceB = b.price ?? 0;
      return priceB - priceA;
    }
    if (sortOption === "rating-high") {
      const ratingA = a.rating ?? 0;
      const ratingB = b.rating ?? 0;
      return ratingB - ratingA;
    }
    return 0;
  });

  const visibleBooks = sortedBooks.slice(0, visibleCount);

  return (
    <div className="space-y-4">
      {/* Library Filters and Sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={
                filter === activeFilter
                  ? "bg-primary/10 text-primary hover:bg-primary/20 rounded-[5px] px-4 py-1.5 text-[15px] font-semibold transition-colors"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted rounded-[5px] px-4 py-1.5 text-[15px] font-semibold transition-colors"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px] rounded-[5px] bg-transparent px-4 text-sm font-semibold">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Sort by: Newest</SelectItem>
                <SelectItem value="oldest">Sort by: Oldest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating-high">Rating: High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Books Grid - Scrollable Container */}
      <div className="scrollbar-thumb-muted-foreground/20 h-[calc(100vh-320px)] scrollbar-thin scrollbar-track-transparent overflow-y-auto pr-2 pb-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-muted-foreground py-10 text-center">
            No books found in this section.
          </div>
        )}
      </div>
    </div>
  );
}

export function ProfileBooksViewer(props: ProfileBooksViewerProps) {
  return (
    <Suspense
      fallback={<div className="bg-muted h-40 animate-pulse rounded-[5px]" />}
    >
      <BooksViewerContent {...props} />
    </Suspense>
  );
}
