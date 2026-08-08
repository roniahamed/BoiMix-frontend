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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { fetchUserLibrary } from "@/lib/api-client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  inventoryStatus?:
    | "available"
    | "borrowed"
    | "draft"
    | "archived"
    | "sold"
    | "exchanged";
  isbn?: string;
  slug?: string;
  addedAt?: string;
  shelfLocation?: string;
  location?: string;
  borrower?: string;
  dueDate?: string;
  availabilityMode?: "sell" | "borrow" | "exchange";
};

// We don't need to pass books anymore as it's fetched internally.
export function LibraryGrid() {
  type FilterType =
    | "All"
    | "Available"
    | "Borrow"
    | "Exchange"
    | "Sell"
    | "Archived";

  const FILTER_CONFIG: { label: FilterType; activeClass: string }[] = [
    { label: "All", activeClass: "bg-[#0397d3] text-white shadow-sm" },
    { label: "Available", activeClass: "bg-emerald-500 text-white shadow-sm" },
    { label: "Borrow", activeClass: "bg-purple-600 text-white shadow-sm" },
    { label: "Exchange", activeClass: "bg-[#0397d3] text-white shadow-sm" },
    { label: "Sell", activeClass: "bg-orange-500 text-white shadow-sm" },
    { label: "Archived", activeClass: "bg-slate-600 text-white shadow-sm" },
  ];
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [search, setSearch] = useState("");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recently_added");

  const [isBulkActionLoading, setIsBulkActionLoading] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const loaderRef = useRef<HTMLDivElement>(null);

  // Use debounce for search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isGridLoading,
  } = useInfiniteQuery({
    queryKey: [
      "userLibrary",
      activeFilter,
      debouncedSearch,
      conditionFilter,
      genreFilter,
      sortBy,
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchUserLibrary({
        page: pageParam,
        search: debouncedSearch,
        status: activeFilter,
        condition: conditionFilter,
        genre: genreFilter,
        sort: sortBy,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.next ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const visible = data?.pages.flatMap((page) => page.results || []) || [];

  const handleFilterChange = (label: FilterType) => {
    setActiveFilter(label);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleResetFilters = () => {
    setActiveFilter("All");
    setSearch("");
    setConditionFilter("all");
    setGenreFilter("all");
    setSortBy("recently_added");
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

  const handleBulkDelete = async () => {
    if (!selectedBooks.size) return;
    setIsBulkActionLoading(true);
    try {
      await Promise.all(
        Array.from(selectedBooks).map((id) =>
          apiRequest({ url: `/books/${id}/`, method: "DELETE" }),
        ),
      );
      toast.success("Books deleted successfully");
      setSelectedBooks(new Set());
      queryClient.invalidateQueries({ queryKey: ["userLibrary"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete books");
    } finally {
      setIsBulkActionLoading(false);
      setIsBulkDeleteDialogOpen(false);
    }
  };

  const handleBulkArchive = async () => {
    if (!selectedBooks.size) return;
    setIsBulkActionLoading(true);
    try {
      await Promise.all(
        Array.from(selectedBooks).map((id) =>
          apiRequest({
            url: `/books/${id}/`,
            method: "PATCH",
            data: { quantity: 0 },
          }),
        ),
      );
      toast.success("Books archived successfully");
      setSelectedBooks(new Set());
      queryClient.invalidateQueries({ queryKey: ["userLibrary"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to archive books");
    } finally {
      setIsBulkActionLoading(false);
    }
  };

  // Infinite Scroll Observer
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
          <Select value={conditionFilter} onValueChange={setConditionFilter}>
            <SelectTrigger className="bg-card border-border/60 text-foreground w-[130px] rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger className="bg-card border-border/60 text-foreground w-[130px] rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {/* Since genres are dynamic, we could fetch them, but for now we'll provide standard ones or rely on a new endpoint if needed. */}
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              <SelectItem value="thriller">Thriller</SelectItem>
              <SelectItem value="romance">Romance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-card border-border/60 text-foreground w-[180px] rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recently_added">Recently Added</SelectItem>
              <SelectItem value="title_asc">Title (A-Z)</SelectItem>
              <SelectItem value="title_desc">Title (Z-A)</SelectItem>
              <SelectItem value="price_asc">Price (Low to High)</SelectItem>
              <SelectItem value="price_desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          {(activeFilter !== "All" ||
            search !== "" ||
            conditionFilter !== "all" ||
            genreFilter !== "all" ||
            sortBy !== "recently_added") && (
            <button
              onClick={handleResetFilters}
              className="px-2 text-xs font-bold text-red-500 transition-colors hover:text-red-600"
            >
              Reset Filters
            </button>
          )}
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
            <button
              onClick={handleBulkArchive}
              disabled={isBulkActionLoading}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200"
            >
              <Archive className="h-3.5 w-3.5" /> Archive
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
              Enable Borrow
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
              Enable Exchange
            </button>
            <button
              onClick={() => setIsBulkDeleteDialogOpen(true)}
              disabled={isBulkActionLoading}
              className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 shadow-sm transition-colors hover:bg-red-100 disabled:opacity-50 dark:bg-red-500/20 dark:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Result count */}
      {search || activeFilter !== "All" ? (
        <p className="text-muted-foreground text-xs">
          Showing{" "}
          <span className="text-foreground font-bold">
            {data?.pages[0]?.count || 0}
          </span>{" "}
          book{data?.pages[0]?.count !== 1 ? "s" : ""}
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

      {/* ── GRID OF BOOKS ── */}
      {isGridLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#0397d3]" />
        </div>
      ) : visible.length === 0 ? (
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

          {/* ── INFINITE SCROLL LOADER ── */}
          {hasNextPage && (
            <div
              ref={loaderRef}
              className="col-span-full mt-8 flex justify-center pb-12"
            >
              <Loader2 className="h-8 w-8 animate-spin text-[#0397d3]" />
            </div>
          )}

          {!hasNextPage && visible.length > 0 && (
            <div className="flex justify-center py-6">
              <p className="text-muted-foreground text-xs">
                You&apos;ve seen all {data?.pages[0]?.count || visible.length}{" "}
                books
              </p>
            </div>
          )}
        </>
      )}

      <AlertDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Books?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {selectedBooks.size} selected
              books? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleBulkDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
