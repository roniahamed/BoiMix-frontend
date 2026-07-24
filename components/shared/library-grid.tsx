"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { DashboardLibraryCard } from "@/components/shared/dashboard-library-card";
import { Search, Loader2, BookX, SlidersHorizontal } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  price?: number;
  originalPrice?: number;
  condition: string;
  coverUrl: string;
  sellerName?: string;
  tags: string[];
  isSold?: boolean;
  isExchanged?: boolean;
};

type FilterType = "All" | "Sell" | "Exchange" | "Borrow" | "Sold";

const PAGE_SIZE = 10;

const FILTER_CONFIG: {
  label: FilterType;
  color: string;
  activeColor: string;
}[] = [
  { label: "All", color: "", activeColor: "bg-[#0397d3] text-white shadow-sm" },
  {
    label: "Sell",
    color: "",
    activeColor: "bg-emerald-500 text-white shadow-sm",
  },
  {
    label: "Exchange",
    color: "",
    activeColor: "bg-[#0397d3] text-white shadow-sm",
  },
  {
    label: "Borrow",
    color: "",
    activeColor: "bg-purple-600 text-white shadow-sm",
  },
  {
    label: "Sold",
    color: "",
    activeColor: "bg-slate-600 text-white shadow-sm",
  },
];

export function LibraryGrid({ books }: { books: Book[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filtered = books.filter((b) => {
    const matchSearch =
      search === "" ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Sold"
          ? b.isSold
          : b.tags.includes(activeFilter.toLowerCase());

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

  // IntersectionObserver for infinite scroll
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
      {/* ── TOOLBAR ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search title or author..."
            className="bg-card border-border/60 text-foreground placeholder:text-muted-foreground w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm shadow-sm transition-all focus:ring-2 focus:ring-[#0397d3]/30 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {FILTER_CONFIG.map(({ label, activeColor }) => (
            <button
              key={label}
              onClick={() => {
                setActiveFilter(label);
                setPage(1);
              }}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                activeFilter === label
                  ? activeColor
                  : "bg-card border-border/60 text-muted-foreground border hover:border-[#0397d3]/40 hover:text-[#0397d3]"
              }`}
            >
              {label}
            </button>
          ))}
          <button className="border-border/60 text-muted-foreground hover:bg-muted ml-1 flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Result count */}
      {search || activeFilter !== "All" ? (
        <p className="text-muted-foreground text-xs">
          Showing{" "}
          <span className="text-foreground font-bold">{filtered.length}</span>{" "}
          book
          {filtered.length !== 1 ? "s" : ""}
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
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              className="text-primary text-xs font-bold hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visible.map((book) => (
              <DashboardLibraryCard key={book.id} book={book} />
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
