"use client";

import { useState, useRef, useEffect } from "react";
import {
  SearchIcon,
  HistoryIcon,
  TrendingUpIcon,
  XIcon,
  BookOpenIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
};

// Dummy database for search suggestions
const dummyBooksSuggestions = [
  {
    title: "Rivers of Dhaka",
    author: "Nadia Rahman",
    slug: "rivers-of-dhaka",
    type: "sell",
    cover: "/book-covers/rivers-of-dhaka.svg",
  },
  {
    title: "Borrowed Light",
    author: "Arif Hossain",
    slug: "borrowed-light",
    type: "borrow",
    cover: "/book-covers/borrowed-light.svg",
  },
  {
    title: "Swap Stories",
    author: "Maliha Karim",
    slug: "swap-stories",
    type: "swap",
    cover: "/book-covers/swap-stories.svg",
  },
  {
    title: "The Reader Map",
    author: "Samiul Islam",
    slug: "the-reader-map",
    type: "borrow",
    cover: "/book-covers/the-reader-map.svg",
  },
  {
    title: "Chhaya Bithi",
    author: "Humayun Ahmed",
    slug: "chhaya-bithi",
    type: "borrow",
    cover: "/book-covers/borrowed-light.svg",
  },
  {
    title: "Programming Basics",
    author: "Tamim Shahriar Subeen",
    slug: "programming-basics",
    type: "sell",
    cover: "/book-covers/swap-stories.svg",
  },
  {
    title: "Feluda Somogro",
    author: "Satyajit Ray",
    slug: "feluda-somogro",
    type: "sell",
    cover: "/book-covers/market-lanes.svg",
  },
];

const initialTrending = [
  "হুমায়ূন আহমেদ",
  "Programming Basics",
  "Ayman Sadiq",
  "Feluda",
  "Academic Book Swap",
];

const initialRecents = ["Rivers of Dhaka", "English Grammar"];

export function SearchBar({
  className,
  placeholder = "Search books, authors, ISBN...",
  autoFocus = false,
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") || "";
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [recents, setRecents] = useState<string[]>(initialRecents);
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when autoFocus prop changes to true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Use timeout to bypass Drawer/Dialog focus return animations
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setIsOpen(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  // Sync query if URL changes
  useEffect(() => {
    const q = searchParams?.get("q") || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(q);
  }, [searchParams]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Save to recents
    if (!recents.includes(query.trim())) {
      setRecents((prev) => [query.trim(), ...prev.slice(0, 4)]);
    }
    setIsOpen(false);
    router.push(`/books/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    setIsOpen(false);
    router.push(`/books/search?q=${encodeURIComponent(term)}`);
  };

  const handleClearRecents = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setRecents([]);
  };

  const handleRemoveRecentItem = (
    e: React.MouseEvent,
    indexToRemove: number,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setRecents((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Filter book suggestions based on user query
  const filteredSuggestions = query
    ? dummyBooksSuggestions.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()),
      )
    : dummyBooksSuggestions.slice(0, 3); // default suggestions if empty

  return (
    <form
      ref={containerRef}
      onSubmit={handleSearchSubmit}
      className={cn("relative flex w-full items-center gap-2", className)}
      role="search"
    >
      <div className="relative flex-1" suppressHydrationWarning>
        {!isOpen && (
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2" />
        )}
        <Input
          ref={inputRef}
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            "bg-background border-primary/40 focus-visible:border-primary focus-visible:ring-primary/20 h-[38px] rounded-full border pr-8 text-[15px] focus-visible:ring-1 sm:h-10 [&::-webkit-search-cancel-button]:appearance-none",
            isOpen ? "px-4" : "pl-10",
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 p-0.5"
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>
      <Button type="submit" size="sm" className="hidden sm:inline-flex">
        Search
      </Button>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="bg-card border-border shadow-soft absolute top-full left-0 z-50 mt-1.5 w-full overflow-hidden rounded-xl border p-4 pt-8 backdrop-blur-md md:min-w-[450px]">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-muted absolute top-2 right-2 rounded-md p-1.5"
            aria-label="Close suggestions"
          >
            <XIcon className="size-4" />
          </button>
          {/* Quick search UI split */}
          {!query ? (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left Column: Recent and Trending */}
              <div className="space-y-4">
                {/* Recent Searches */}
                {recents.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-[0.7rem] font-bold tracking-wider uppercase">
                        <HistoryIcon className="size-3.5" />
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={handleClearRecents}
                        className="text-muted-foreground hover:text-danger text-[0.68rem] font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {recents.map((item, idx) => (
                        <li
                          key={`${item}-${idx}`}
                          className="hover:bg-muted/65 group flex items-center justify-between rounded-md px-2 py-1 text-xs transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => handleRecentClick(item)}
                            className="text-foreground flex-1 truncate text-left font-medium"
                          >
                            {item}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveRecentItem(e, idx)}
                            className="text-muted-foreground hover:text-foreground p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <XIcon className="size-3" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <span className="text-muted-foreground mb-2 flex items-center gap-1.5 text-[0.7rem] font-bold tracking-wider uppercase">
                    <TrendingUpIcon className="size-3.5" />
                    Trending Searches
                  </span>
                  <ul className="space-y-1">
                    {initialTrending.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => handleRecentClick(item)}
                          className="hover:bg-muted/65 text-foreground flex w-full items-center rounded-md px-2 py-1 text-left text-xs font-medium transition-colors"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Trending Recommendations */}
              <div>
                <span className="text-muted-foreground mb-3 flex items-center gap-1.5 text-[0.7rem] font-bold tracking-wider uppercase">
                  <BookOpenIcon className="size-3.5" />
                  Recommended For You
                </span>
                <div className="space-y-3">
                  {filteredSuggestions.map((book) => (
                    <Link
                      key={book.slug}
                      href={`/books/${book.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-muted/50 flex items-center gap-2.5 rounded-lg p-1.5 transition-colors"
                    >
                      <div className="bg-muted relative h-10 w-7.5 shrink-0 overflow-hidden rounded-sm shadow-xs">
                        <div className="from-primary/10 to-info/10 absolute inset-0 bg-gradient-to-br" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground truncate text-xs leading-tight font-bold">
                          {book.title}
                        </p>
                        <p className="text-muted-foreground truncate text-[0.65rem]">
                          by {book.author}
                        </p>
                      </div>
                      <span className="bg-muted text-muted-foreground border-border rounded-full border px-2 py-0.5 text-[0.6rem] font-bold capitalize">
                        {book.type}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Match Search Suggestions */
            <div>
              <span className="text-muted-foreground mb-2 block text-[0.7rem] font-bold tracking-wider uppercase">
                Matching Suggestions
              </span>
              {filteredSuggestions.length > 0 ? (
                <div className="space-y-2">
                  {filteredSuggestions.map((book) => (
                    <Link
                      key={book.slug}
                      href={`/books/${book.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-muted/50 flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <div className="bg-muted relative h-11 w-8 shrink-0 overflow-hidden rounded-sm shadow-xs">
                        <div className="from-primary/10 to-info/10 absolute inset-0 bg-gradient-to-br" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground truncate text-xs font-bold">
                          {book.title}
                        </p>
                        <p className="text-muted-foreground truncate text-[0.68rem]">
                          by {book.author}
                        </p>
                      </div>
                      <span className="bg-muted text-muted-foreground border-border rounded-full border px-2 py-0.5 text-[0.6rem] font-bold capitalize">
                        {book.type}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground py-4 text-center text-xs">
                  No books found matching &quot;{query}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
