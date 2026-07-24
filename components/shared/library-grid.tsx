"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { DashboardLibraryCard } from "@/components/shared/dashboard-library-card";
import {
  Search,
  Loader2,
  BookX,
  ChevronDown,
  Archive,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";

export type Book = {
  id: string;
  title: string;
  author: string;
  price?: number;
  originalPrice?: number;
  condition: string;
  coverUrl: string;
  sellerName?: string;
  tags: string[];
  inventoryStatus?: "available" | "borrowed" | "draft" | "archived" | "sold";
  isbn?: string;
  addedAt?: string;
  shelfLocation?: string;
  borrower?: string;
  dueDate?: string;
};

type FilterType =
  | "All"
  | "Available"
  | "Borrow"
  | "Exchange"
  | "Sell"
  | "Archived";

const PAGE_SIZE = 10;

const FILTER_CONFIG: { label: FilterType; activeClass: string }[] = [
  { label: "All", activeClass: "bg-[#0397d3] text-white shadow-sm" },
  { label: "Available", activeClass: "bg-emerald-500 text-white shadow-sm" },
  { label: "Borrow", activeClass: "bg-purple-600 text-white shadow-sm" },
  { label: "Exchange", activeClass: "bg-[#0397d3] text-white shadow-sm" },
  { label: "Sell", activeClass: "bg-orange-500 text-white shadow-sm" },
  { label: "Archived", activeClass: "bg-slate-600 text-white shadow-sm" },
];

export function LibraryGrid({ books }: { books: Book[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());

  const loaderRef = useRef<HTMLDivElement>(null);

  // We do NOT use useEffect to reset page to avoid cascading renders.
  // Instead, handle search/filter state directly when user interacts.
  const handleFilterChange = (label: FilterType) => {
    setActiveFilter(label);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const toggleSelectBook = (id: string) => {
    const newSet = new Set(selectedBooks);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedBooks(newSet);
  };

  const selectAll = () => {
    if (selectedBooks.size === visible.length) {
      setSelectedBooks(new Set());
    } else {
      setSelectedBooks(new Set(visible.map((b) => b.id)));
    }
  };

  const filtered = books.filter((b) => {
    const matchSearch =
      search === "" ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      (b.isbn && b.isbn.includes(search));

    let matchFilter = true;
    if (activeFilter !== "All") {
      const status = b.inventoryStatus || "available";
      if (activeFilter === "Available") matchFilter = status === "available";
      if (activeFilter === "Archived") matchFilter = status === "archived";
      if (activeFilter === "Borrow") matchFilter = b.tags?.includes("borrow");
      if (activeFilter === "Exchange")
        matchFilter = b.tags?.includes("exchange");
      if (activeFilter === "Sell") matchFilter = b.tags?.includes("sell");
    }

    return matchSearch && matchFilter;
  });

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setPage((p) => p + 1);
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="space-y-4">
      {/* ── TOOLBAR ROW 1: Search & Basic Filters ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex [scrollbar-width:none] items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {FILTER_CONFIG.map(({ label, activeClass }) => (
            <button
              key={label}
              onClick={() => handleFilterChange(label)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                activeFilter === label
                  ? activeClass
                  : "bg-card border-border/60 text-muted-foreground border hover:border-[#0397d3]/40 hover:text-[#0397d3]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TOOLBAR ROW 2: Advanced Search & Sort ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search title, author, or ISBN..."
            className="bg-card border-border/60 text-foreground placeholder:text-muted-foreground w-full rounded-xl border py-2 pr-4 pl-10 text-sm shadow-sm transition-all focus:ring-2 focus:ring-[#0397d3]/30 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="bg-card border-border/60 text-foreground flex flex-1 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm transition-all hover:bg-slate-50 sm:flex-none sm:justify-center dark:hover:bg-slate-800">
            Status <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          <button className="bg-card border-border/60 text-foreground flex flex-1 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm transition-all hover:bg-slate-50 sm:flex-none sm:justify-center dark:hover:bg-slate-800">
            Genre <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          <button className="bg-card border-border/60 text-foreground flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm transition-all hover:bg-slate-50 sm:w-auto sm:flex-none sm:justify-center dark:hover:bg-slate-800">
            <span>
              Sort: <span className="font-medium">Recently Added</span>
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* ── BULK MANAGEMENT ROW ── */}
      {selectedBooks.size > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-[#0397d3]/20 bg-[#0397d3]/10 px-4 py-3 dark:bg-[#0397d3]/20">
          <div className="flex items-center gap-3">
            <button onClick={selectAll} className="text-[#0397d3]">
              {selectedBooks.size === visible.length ? (
                <CheckSquare className="h-5 w-5" />
              ) : (
                <Square className="h-5 w-5" />
              )}
            </button>
            <span className="text-sm font-bold text-[#0397d3]">
              {selectedBooks.size} selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
              <Archive className="h-3.5 w-3.5" /> Archive
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
              Enable Borrow
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
              Enable Exchange
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 shadow-sm transition-colors hover:bg-red-100 dark:bg-red-500/20 dark:text-red-400">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Result count */}
      {search || activeFilter !== "All" ? (
        <p className="text-muted-foreground text-xs">
          Showing{" "}
          <span className="text-foreground font-bold">{filtered.length}</span>{" "}
          book{filtered.length !== 1 ? "s" : ""}
          {search && (
            <>
              {" "}
              for &ldquo;
              <span className="text-primary font-semibold">{search}</span>
              &rdquo;
            </>
          )}
        </p>
      ) : null}

      {/* ── GRID ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-2xl">
            <BookX className="text-muted-foreground h-8 w-8" />
          </div>
          <p className="text-foreground font-bold">No books found</p>
          <p className="text-muted-foreground text-sm">
            {search
              ? `No results for "${search}"`
              : `You have no ${activeFilter.toLowerCase()} listings yet`}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visible.map((book) => (
              <DashboardLibraryCard
                key={book.id}
                book={book}
                isSelected={selectedBooks.has(book.id)}
                onToggleSelect={() => toggleSelectBook(book.id)}
              />
            ))}
          </div>

          {/* Infinite scroll trigger */}
          <div ref={loaderRef} className="flex justify-center py-6">
            {isLoading && (
              <div className="flex items-center gap-2">
                <Loader2 className="text-primary h-5 w-5 animate-spin" />
                <span className="text-muted-foreground text-sm font-medium">
                  Loading more books...
                </span>
              </div>
            )}
            {!hasMore && filtered.length > PAGE_SIZE && (
              <p className="text-muted-foreground text-xs">
                You&apos;ve seen all {filtered.length} books 🎉
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
