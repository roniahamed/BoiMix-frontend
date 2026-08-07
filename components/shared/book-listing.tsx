"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks, fetchNearbyBooks, fetchBookFilters, fetchBookStatistics, fetchSearchSuggestions } from "@/lib/api-client";
import {
  SlidersHorizontal,
  Search,
  X,
  Sparkles,
  BookOpen,
  HeartHandshake,
  TrendingUp,
  Tag,
  LayoutGrid,
  Repeat,
  ShoppingBag,
  Library,
  BookText,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { FilterSidebar } from "@/components/shared/filter-sidebar";
import { BookCard } from "@/components/shared/book-card";
import { BookCardBook } from "@/types/book";

type ExtendedBook = BookCardBook & {
  category: string;
  publisher: string;
  language: string;
};

type BookListingProps = {
  title: string;
  description: string;
  defaultSearchQuery?: string;
  initialFilters?: Record<string, string[]>;
  initialSortBy?: string;
};

function YouTubeBookSkeleton() {
  return (
    <div className="bg-card border-border/50 flex animate-pulse flex-col gap-3 rounded-2xl border p-3 shadow-xs">
      <div className="bg-muted/60 aspect-[3/4] w-full rounded-xl" />
      <div className="bg-muted/60 h-4 w-5/6 rounded-md" />
      <div className="bg-muted/40 h-3 w-1/2 rounded-md" />
      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="bg-muted/50 h-4 w-14 rounded-md" />
        <div className="bg-primary/20 h-8 w-20 rounded-xl" />
      </div>
    </div>
  );
}

export function BookListing({
  title,
  description,
  defaultSearchQuery = "",
  initialFilters = {},
  initialSortBy = "newest",
}: BookListingProps) {


  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [sortBy, setSortBy] = useState(initialSortBy);

  const { data: filtersData } = useQuery({
    queryKey: ["book-filters"],
    queryFn: fetchBookFilters,
  });

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string; } | null>(null);
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { data: statsData } = useQuery({
    queryKey: ["book-statistics"],
    queryFn: fetchBookStatistics,
  });

  const { data: suggestionsData = [] } = useQuery({
    queryKey: ["search-suggestions", searchQuery],
    queryFn: () => fetchSearchSuggestions(searchQuery),
    enabled: searchQuery.trim().length > 1,
  });

  const { data: booksResponse, isLoading } = useQuery({
    queryKey: ["books", sortBy === "distance" ? "nearby" : "all", userLocation, selectedFilters, currentPage, searchQuery],
    queryFn: () => {
      if (sortBy === "distance" && userLocation) {
        return fetchNearbyBooks(userLocation.lat, userLocation.lng).then(res => ({ results: res, count: res.length }));
      }
      return fetchBooks(undefined, selectedFilters, currentPage, searchQuery, itemsPerPage);
    },
  });

  const baseBooks = booksResponse?.results || [];
  const totalBooksCount = booksResponse?.count || 0;

  const FILTER_GROUPS = useMemo(() => {
    if (!filtersData) return [];
    
    return [
      {
        id: "availability",
        type: "checkbox" as const,
        title: "Book Type",
        options: filtersData.availability || [],
      },
      {
        id: "category",
        type: "checkbox" as const,
        title: "Category",
        options: filtersData.categories || [],
      },
      {
        id: "location",
        type: "checkbox" as const,
        title: "Location / Area",
        options: filtersData.locations || [],
      },
      {
        id: "author",
        type: "checkbox" as const,
        title: "Author",
        options: filtersData.authors || [],
      },
      {
        id: "publisher",
        type: "checkbox" as const,
        title: "Publisher",
        options: filtersData.publishers || [],
      },
      {
        id: "language",
        type: "checkbox" as const,
        title: "Language",
        options: filtersData.languages || [],
      },
      {
        id: "condition",
        type: "checkbox" as const,
        title: "Condition",
        options: filtersData.conditions || [],
      },
    ];
  }, [filtersData]);


  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sortBy === "distance" && !userLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, () => {
        // Handle error or default to Dhaka coordinates
        setUserLocation({ lat: 23.8103, lng: 90.4125 });
      });
    }
  }, [sortBy, userLocation]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const suggestions = useMemo(() => {
    if (searchQuery.trim().length <= 1) return [];
    return baseBooks.slice(0, 5);
  }, [searchQuery, baseBooks]);

  const handleFilterChange = useCallback(
    (groupId: string, value: string, checked: boolean) => {
      setSelectedFilters((prev) => {
        const groupValues = prev[groupId] || [];
        if (checked) {
          return { ...prev, [groupId]: [...groupValues, value] };
        } else {
          return { ...prev, [groupId]: groupValues.filter((v) => v !== value) };
        }
      });
      setCurrentPage(1);
    },
    [],
  );

  const removeFilter = useCallback((groupId: string, value: string) => {
    setSelectedFilters((prev) => {
      const groupValues = prev[groupId] || [];
      const updated = groupValues.filter((v) => v !== value);
      return { ...prev, [groupId]: updated };
    });
    setCurrentPage(1);
  }, []);

  const isFilterActive = useCallback(
    (groupId: string, value: string) => {
      return (selectedFilters[groupId] || []).includes(value);
    },
    [selectedFilters],
  );

  const toggleQuickFilter = useCallback(
    (groupId: string, value: string) => {
      handleFilterChange(groupId, value, !isFilterActive(groupId, value));
    },
    [handleFilterChange, isFilterActive],
  );

  const handleRangeChange = useCallback(
    (groupId: string, min: string, max: string) => {
      if (groupId === "price") {
        setPriceRange({ min, max });
        setCurrentPage(1);
      }
    },
    [],
  );

  const handleFilterReset = useCallback(() => {
    setSelectedFilters({});
    setPriceRange(null);
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery(defaultSearchQuery);
    setCurrentPage(1);
  }, [defaultSearchQuery]);

  const filteredBooks = useMemo(() => {
    return baseBooks.filter((book: any) => {
      // Backend does all text and category filtering.
      // We only keep price filter here if it's applied on the client side.
      if (priceRange) {
        const p = book.price || 0;
        if (priceRange.min && p < Number(priceRange.min)) return false;
        if (priceRange.max && p > Number(priceRange.max)) return false;
      }

      return true;
    }).sort((a: any, b: any) => {
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [baseBooks, priceRange, sortBy]);

  const totalPages = useMemo(
    () => Math.ceil(totalBooksCount / itemsPerPage),
    [totalBooksCount, itemsPerPage],
  );

  const paginatedBooks = filteredBooks;

  // Background Pre-fetching for Next Page Images & Covers
  useEffect(() => {
    // With server side pagination, this pre-fetch is less useful because we don't have next page data in memory.
    // Kept empty to avoid errors.
  }, [currentPage, filteredBooks, itemsPerPage]);

  const getPageNumbers = useCallback(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div ref={listRef} className="boimix-container py-6 md:py-8">
      {/* Page Header, Search & Live Stats */}
      <div className="border-border/60 from-primary/5 via-card to-muted/20 mb-6 flex flex-col gap-5 rounded-2xl border bg-gradient-to-br p-6 shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold">
                <Sparkles className="size-3.5" />
                Live Marketplace Feed
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                ● Active Catalog
              </span>
            </div>
            <h1 className="type-heading mt-2 text-3xl font-bold md:text-4xl">
              {title}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              {description}
            </p>
          </div>

          {/* Interactive Live Search Bar with Autocomplete Suggestions */}
          <div
            ref={searchRef}
            className="relative w-full md:w-[320px] lg:w-[360px]"
          >
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search title, author, or keyword..."
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
                setCurrentPage(1);
              }}
              className="bg-background/80 h-11 rounded-xl pr-9 pl-9 text-sm shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                  setCurrentPage(1);
                }}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}

            {/* Suggestion Dropdown - Reusing existing suggestion UI pattern */}
            {isSearchOpen && suggestions.length > 0 && (
              <div className="animate-in fade-in slide-in-from-top-1 border-border bg-card/95 absolute top-full right-0 left-0 z-50 mt-2 max-h-[320px] overflow-y-auto rounded-xl border p-2 shadow-lg backdrop-blur-md duration-150">
                <div className="border-border/50 text-muted-foreground mb-1 flex items-center gap-1.5 border-b px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase">
                  <Sparkles className="text-primary size-3" />
                  Suggested Books
                </div>
                {suggestions.map((book: any) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => {
                      setSearchQuery(book.title);
                      setIsSearchOpen(false);
                      setCurrentPage(1);
                    }}
                    className="hover:bg-muted/80 flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors"
                  >
                    <div className="border-border/50 bg-muted relative h-10 w-7 shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground truncate text-xs font-bold">
                        {book.title}
                      </p>
                      <p className="text-muted-foreground truncate text-[11px]">
                        by {book.author}
                      </p>
                    </div>
                    {book.condition && (
                      <span className="border-border/50 bg-muted text-muted-foreground shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase">
                        {book.condition}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Trust Ticker Strip */}
        <div className="border-border/60 grid grid-cols-1 gap-2.5 border-t pt-4 sm:grid-cols-3">
          <div className="bg-background/80 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-2xs">
            <BookOpen className="text-primary size-4 shrink-0" />
            <div className="text-xs">
              <p className="text-foreground font-bold">{statsData?.total_books ? `${statsData.total_books}+` : '1,420+'} Books</p>
              <p className="text-muted-foreground text-[11px]">Available Now</p>
            </div>
          </div>

          <div className="bg-background/80 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-2xs">
            <HeartHandshake className="size-4 shrink-0 text-amber-500" />
            <div className="text-xs">
              <p className="text-foreground font-bold">{statsData?.handover_rate || 98}% Handover Rate</p>
              <p className="text-muted-foreground text-[11px]">Peer Verified</p>
            </div>
          </div>

          <div className="bg-background/80 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-2xs">
            <TrendingUp className="size-4 shrink-0 text-emerald-500" />
            <div className="text-xs">
              <p className="text-foreground font-bold">{statsData?.new_arrivals ? `${statsData.new_arrivals}+` : '140+'} New Arrivals</p>
              <p className="text-muted-foreground text-[11px]">
                Added This Week
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Category & Type Pills Strip */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={
            Object.keys(selectedFilters).length === 0 && !searchQuery
              ? "default"
              : "outline"
          }
          onClick={handleFilterReset}
          className="h-8 rounded-full px-3.5 text-xs font-bold"
        >
          <LayoutGrid className="mr-1.5 size-3.5" />
          All Books
        </Button>
        <Button
          size="sm"
          variant={
            isFilterActive("availability", "exchange") ? "default" : "outline"
          }
          onClick={() => toggleQuickFilter("availability", "exchange")}
          className="h-8 rounded-full px-3.5 text-xs font-bold"
        >
          <Repeat className="mr-1.5 size-3.5" />
          Peer Exchanges
        </Button>
        <Button
          size="sm"
          variant={
            isFilterActive("availability", "sell") ? "default" : "outline"
          }
          onClick={() => toggleQuickFilter("availability", "sell")}
          className="h-8 rounded-full px-3.5 text-xs font-bold"
        >
          <ShoppingBag className="mr-1.5 size-3.5" />
          Marketplace (Sale)
        </Button>
        <Button
          size="sm"
          variant={
            isFilterActive("availability", "borrow") ? "default" : "outline"
          }
          onClick={() => toggleQuickFilter("availability", "borrow")}
          className="h-8 rounded-full px-3.5 text-xs font-bold"
        >
          <Library className="mr-1.5 size-3.5" />
          Central Library (Borrow)
        </Button>
        <Button
          size="sm"
          variant={
            isFilterActive("category", "fiction") ? "default" : "outline"
          }
          onClick={() => toggleQuickFilter("category", "fiction")}
          className="h-8 rounded-full px-3.5 text-xs font-bold"
        >
          <BookText className="mr-1.5 size-3.5" />
          Fiction
        </Button>
        <Button
          size="sm"
          variant={
            isFilterActive("category", "academic") ? "default" : "outline"
          }
          onClick={() => toggleQuickFilter("category", "academic")}
          className="h-8 rounded-full px-3.5 text-xs font-bold"
        >
          <GraduationCap className="mr-1.5 size-3.5" />
          Academic
        </Button>
        <Button
          size="sm"
          variant={
            isFilterActive("location", "dhanmondi") ? "default" : "outline"
          }
          onClick={() => toggleQuickFilter("location", "dhanmondi")}
          className="h-8 rounded-full px-3.5 text-xs font-bold"
        >
          <MapPin className="mr-1.5 size-3.5" />
          Dhanmondi Area
        </Button>
      </div>

      {/* Active Filters Bar */}
      {Object.values(selectedFilters).some((vals) => vals.length > 0) && (
        <div className="border-border/50 bg-muted/30 mb-6 flex flex-wrap items-center gap-2 rounded-xl border p-2.5">
          <span className="text-muted-foreground mr-1 text-xs font-bold">
            Active Filters:
          </span>
          {Object.entries(selectedFilters).flatMap(([groupId, values]) =>
            values.map((val) => (
              <span
                key={`${groupId}-${val}`}
                className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
              >
                <Tag className="size-3" />
                {val}
                <button
                  onClick={() => removeFilter(groupId, val)}
                  className="hover:text-primary/70 ml-0.5 rounded-full"
                  aria-label={`Remove ${val} filter`}
                >
                  <X className="size-3" />
                </button>
              </span>
            )),
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFilterReset}
            className="text-muted-foreground hover:text-foreground h-7 text-xs font-bold"
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block">
          <FilterSidebar
            groups={FILTER_GROUPS}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onFilterReset={handleFilterReset}
            onRangeChange={handleRangeChange}
          />
        </aside>

        {/* Main Content */}
        <div className="w-full">
          <div className="flex flex-col space-y-6">
            {/* Active Filters & Sort */}
            <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-6">
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-semibold">
                  {totalBooksCount}
                </span>{" "}
                টি বই পাওয়া গেছে
              </p>
              <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start">
                <div className="flex flex-1 items-center gap-2 sm:flex-none">
                  <span className="text-muted-foreground hidden text-sm whitespace-nowrap sm:inline-block">
                    সর্ট করুন:
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full bg-transparent sm:w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">নতুন যোগ করা</SelectItem>
                      <SelectItem value="price-low">
                        দাম: কম থেকে বেশি
                      </SelectItem>
                      <SelectItem value="price-high">
                        দাম: বেশি থেকে কম
                      </SelectItem>
                      <SelectItem value="rating">সর্বোচ্চ রেটিং</SelectItem>
                      <SelectItem value="distance">নিকটবর্তী</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 shrink-0 gap-2 sm:flex-none md:hidden"
                    >
                      <SlidersHorizontal className="size-4" />
                      ফিল্টার
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[85vh]">
                    <DrawerTitle className="sr-only">Filters</DrawerTitle>
                    <div className="overflow-y-auto pb-6">
                      <FilterSidebar
                        groups={FILTER_GROUPS}
                        selectedFilters={selectedFilters}
                        onFilterChange={handleFilterChange}
                        onFilterReset={handleFilterReset}
                        onRangeChange={handleRangeChange}
                        className="border-none shadow-none"
                      />
                    </div>
                    <DrawerFooter className="border-t pt-2 pb-6">
                      <DrawerClose asChild>
                        <Button className="w-full">এপ্লাই করুন (Close)</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            {/* Book Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <YouTubeBookSkeleton key={i} />
                  ))
                ) : paginatedBooks.length > 0 ? (
                  paginatedBooks.map((book: any, idx: number) => (
                    <BookCard key={book.id} book={book} priority={idx < 4} />
                  ))
                ) : (
                  <div className="border-border/80 bg-card/40 col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center">
                    <div className="bg-primary/10 text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                      <BookOpen className="h-7 w-7" />
                    </div>
                    <h3 className="text-foreground mb-1 text-lg font-bold">
                      কোনো বই পাওয়া যায়নি
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                      আপনার নির্বাচিত ফিল্টার বা সার্চ দিয়ে কোনো বই পাওয়া যায়নি।
                      ফিল্টার রিসেট করে আবার চেষ্টা করুন।
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleFilterReset}
                      className="rounded-xl font-bold"
                    >
                      সব ফিল্টার রিসেট করুন
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex shrink-0 justify-center pb-2 lg:mt-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      listRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </Button>

                  <div className="flex items-center gap-1.5">
                    {getPageNumbers().map((page, index) => {
                      if (page === "...") {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="text-muted-foreground flex h-9 w-9 items-center justify-center text-sm font-medium select-none"
                          >
                            ...
                          </span>
                        );
                      }

                      const pageNum = page as number;
                      const isActive = pageNum === currentPage;

                      return (
                        <Button
                          key={`page-${pageNum}`}
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          className={`h-9 w-9 p-0 ${
                            isActive ? "pointer-events-none" : ""
                          }`}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            listRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      listRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
