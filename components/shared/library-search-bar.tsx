"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/api-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookCardBook } from "@/types/book";

type LibrarySearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  variant: "hero" | "minimal";
  className?: string;
  hiddenFields?: Record<string, string>;
  action?: string;
  mode?: "library" | "exchanges";
};

export function LibrarySearchBar({
  defaultValue = "",
  placeholder = "Search by title, author, ISBN or keyword...",
  variant,
  className,
  hiddenFields = {},
  action = "/explore/central-library/search",
  mode = "library",
}: LibrarySearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Sync state with defaultValue when it changes (e.g. URL changes) without triggering useEffect warning
  if (defaultValue !== prevDefaultValue) {
    setQuery(defaultValue);
    setPrevDefaultValue(defaultValue);
  }

  // Fetch all books
  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetchBooks(),
  });

  // Filter books based on mode
  const filteredSourceBooks = (books as BookCardBook[]).filter((book) => {
    if (mode === "library") {
      return book.providerType === "library" || book.tags?.includes("library");
    } else if (mode === "exchanges") {
      return book.providerType !== "library" || book.tags?.includes("exchange");
    }
    return true;
  });

  // Filter suggestion results
  const suggestions =
    query.trim().length > 1
      ? filteredSourceBooks
          .filter((book) => {
            const lowerQuery = query.toLowerCase();
            return (
              book.title.toLowerCase().includes(lowerQuery) ||
              book.author.toLowerCase().includes(lowerQuery) ||
              book.tags?.some((t) => t.toLowerCase().includes(lowerQuery))
            );
          })
          .slice(0, 5)
      : [];

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (variant === "hero") {
        if (formRef.current && !formRef.current.contains(target)) {
          setIsOpen(false);
        }
      } else {
        if (divRef.current && !divRef.current.contains(target)) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [variant]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);

    // Build next URL with all query parameters
    const nextParams = { ...hiddenFields, q: query.trim() };
    const queryParts = Object.entries(nextParams)
      .filter(([, val]) => val !== undefined && val !== "")
      .map(([key, val]) => `${key}=${encodeURIComponent(val!)}`);

    const path =
      queryParts.length > 0 ? `${action}?${queryParts.join("&")}` : action;

    router.push(path);
  };

  const handleSuggestionClick = (bookTitle: string) => {
    setQuery(bookTitle);
    setIsOpen(false);

    // Redirect to search with specific book title as query
    const nextParams = { ...hiddenFields, q: bookTitle };
    const queryParts = Object.entries(nextParams)
      .filter(([, val]) => val !== undefined && val !== "")
      .map(([key, val]) => `${key}=${encodeURIComponent(val!)}`);

    router.push(`${action}?${queryParts.join("&")}`);
  };

  if (variant === "hero") {
    return (
      <form ref={formRef} onSubmit={handleSearchSubmit} className={className}>
        {Object.entries(hiddenFields).map(([key, val]) =>
          val ? <input key={key} type="hidden" name={key} value={val} /> : null,
        )}

        <div className="relative flex flex-1 items-center pl-3">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="h-10 w-full border-0 bg-transparent px-0 text-sm text-slate-900 shadow-none placeholder:text-slate-500 focus-visible:ring-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="mr-2 text-slate-400 hover:text-slate-600 dark:text-slate-500"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          className="h-10 shrink-0 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white shadow-none hover:bg-blue-700"
        >
          <Search className="mr-2 size-4" />
          Search
        </Button>

        {/* Suggestion Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-1 absolute top-full right-0 left-0 z-50 mt-2 max-h-[300px] overflow-y-auto rounded-lg border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur-md duration-150 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-1 flex items-center gap-1 border-b border-slate-100 px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:border-slate-800/50 dark:text-slate-400">
              <Sparkles className="size-3 text-blue-500" />
              Suggested Books
            </div>
            {suggestions.map((book: BookCardBook) => (
              <button
                key={book.id}
                type="button"
                onClick={() => handleSuggestionClick(book.title)}
                className="dark:hover:bg-slate-850 flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-slate-50"
              >
                <div className="relative h-9 w-6 shrink-0 overflow-hidden rounded-sm border border-slate-200/50 bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-slate-950 dark:text-white">
                    {book.title}
                  </p>
                  <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                    by {book.author}
                  </p>
                </div>
                {book.condition && (
                  <span className="text-slate-650 rounded-full border border-slate-200/40 bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase dark:border-slate-700/40 dark:bg-slate-800 dark:text-slate-400">
                    {book.condition}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </form>
    );
  }

  return (
    <div ref={divRef} className={className}>
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="h-11 w-full border-slate-200 bg-slate-50 pl-10 dark:border-slate-800 dark:bg-slate-900"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex shrink-0 gap-4">
        {(defaultValue ||
          query ||
          Object.values(hiddenFields).some(Boolean)) && (
          <Button
            type="button"
            variant="ghost"
            className="h-11 px-4 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              router.push("/explore/central-library/search");
            }}
          >
            Clear
          </Button>
        )}
        <Button
          type="button"
          onClick={handleSearchSubmit}
          className="h-11 bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
        >
          Search
        </Button>
      </div>

      {/* Suggestion Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-1 absolute top-full right-0 left-0 z-50 mt-2 max-h-[300px] overflow-y-auto rounded-lg border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur-md duration-150 dark:border-slate-800 dark:bg-slate-900/95">
          <div className="mb-1 flex items-center gap-1 border-b border-slate-100 px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:border-slate-800/50 dark:text-slate-400">
            <Sparkles className="size-3 text-blue-500" />
            Suggested Books
          </div>
          {suggestions.map((book: BookCardBook) => (
            <button
              key={book.id}
              type="button"
              onClick={() => handleSuggestionClick(book.title)}
              className="dark:hover:bg-slate-850 flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-slate-50"
            >
              <div className="relative h-9 w-6 shrink-0 overflow-hidden rounded-sm border border-slate-200/50 bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-950 dark:text-white">
                  {book.title}
                </p>
                <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                  by {book.author}
                </p>
              </div>
              {book.condition && (
                <span className="text-slate-650 rounded-full border border-slate-200/40 bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase dark:border-slate-700/40 dark:bg-slate-800 dark:text-slate-400">
                  {book.condition}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
