"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/api-client";
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

export function BookListing({
  title,
  description,
  defaultSearchQuery = "",
  initialFilters = {},
  initialSortBy = "newest",
}: BookListingProps) {
  const { data: baseBooks = [] } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetchBooks(),
  });

  const MOCK_BOOKS = useMemo(() => {
    return baseBooks.map((b: BookCardBook, i: number) => ({
      ...b,
      category: ["Fiction", "Academic", "Business", "Literature", "History"][
        i % 5
      ],
      publisher: ["Prothoma", "Batighor", "Oitijjho", "Adarsha", "Anyaprokash"][
        i % 5
      ],
      language: ["Bengali", "English"][i % 2],
      location:
        b.location ||
        ["Dhanmondi", "Banani", "Mirpur", "Uttara", "Gulshan", "Chittagong"][
          i % 6
        ],
    })) as ExtendedBook[];
  }, [baseBooks]);

  const FILTER_GROUPS = useMemo(() => {
    const uniqueAuthors = Array.from(
      new Set(MOCK_BOOKS.map((b) => b.author)),
    ).sort();
    const uniquePublishers = Array.from(
      new Set(MOCK_BOOKS.map((b) => b.publisher)),
    ).sort();
    const uniqueCategories = Array.from(
      new Set(MOCK_BOOKS.map((b) => b.category)),
    ).sort();
    const uniqueLanguages = Array.from(
      new Set(MOCK_BOOKS.map((b) => b.language)),
    ).sort();

    return [
      {
        id: "availability",
        type: "checkbox" as const,
        title: "Book Type",
        options: [
          { label: "For Sale", value: "sell" },
          { label: "For Borrow", value: "borrow" },
          { label: "For Exchange", value: "exchange" },
        ],
      },
      {
        id: "category",
        type: "checkbox" as const,
        title: "Category",
        options: uniqueCategories.map((c) => ({
          label: c,
          value: c.toLowerCase(),
        })),
      },
      {
        id: "location",
        type: "checkbox" as const,
        title: "Location / Area",
        options: [
          { label: "Dhanmondi", value: "dhanmondi" },
          { label: "Banani", value: "banani" },
          { label: "Mirpur", value: "mirpur" },
          { label: "Uttara", value: "uttara" },
          { label: "Gulshan", value: "gulshan" },
          { label: "Chittagong", value: "chittagong" },
        ],
      },
      {
        id: "author",
        type: "checkbox" as const,
        title: "Author",
        options: uniqueAuthors.map((a) => ({
          label: a,
          value: a.toLowerCase(),
        })),
      },
      {
        id: "publisher",
        type: "checkbox" as const,
        title: "Publisher",
        options: uniquePublishers.map((p) => ({
          label: p,
          value: p.toLowerCase(),
        })),
      },
      {
        id: "language",
        type: "checkbox" as const,
        title: "Language",
        options: uniqueLanguages.map((l) => ({
          label: l,
          value: l.toLowerCase(),
        })),
      },
      {
        id: "condition",
        type: "checkbox" as const,
        title: "Condition",
        options: [
          { label: "New", value: "new" },
          { label: "Like New", value: "excellent" },
          { label: "Good", value: "good" },
          { label: "Acceptable", value: "fair" },
        ],
      },
    ];
  }, [MOCK_BOOKS]);

  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [selectedFilters, setSelectedFilters] =
    useState<Record<string, string[]>>(initialFilters);
  const [priceRange, setPriceRange] = useState<{
    min: string;
    max: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const listRef = useRef<HTMLDivElement>(null);

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

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    // 1. Text Search
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      if (
        !book.title.toLowerCase().includes(lowerQ) &&
        !book.author.toLowerCase().includes(lowerQ)
      ) {
        return false;
      }
    }

    // 2. Sidebar Filters
    for (const [groupId, values] of Object.entries(selectedFilters)) {
      if (!values || values.length === 0) continue;

      if (groupId === "category") {
        const hasMatch = values.some(
          (val) =>
            (book as ExtendedBook).category.toLowerCase() === val.toLowerCase(),
        );
        if (!hasMatch) return false;
      } else if (groupId === "availability") {
        const hasMatch = values.some(
          (val) =>
            (book.tags as string[])?.includes(val) || book.availability === val,
        );
        if (!hasMatch) return false;
      } else if (groupId === "location") {
        const bookLoc = ((book.location || "") as string).toLowerCase();
        const hasMatch = values.some((val) =>
          bookLoc.includes(val.toLowerCase()),
        );
        if (!hasMatch) return false;
      } else if (groupId === "author") {
        const hasMatch = values.some(
          (val) => book.author.toLowerCase() === val.toLowerCase(),
        );
        if (!hasMatch) return false;
      } else if (groupId === "publisher") {
        const hasMatch = values.some(
          (val) =>
            (book as ExtendedBook).publisher.toLowerCase() ===
            val.toLowerCase(),
        );
        if (!hasMatch) return false;
      } else if (groupId === "language") {
        const hasMatch = values.some(
          (val) =>
            (book as ExtendedBook).language.toLowerCase() === val.toLowerCase(),
        );
        if (!hasMatch) return false;
      } else if (groupId === "condition") {
        const hasMatch = values.some(
          (val) => (book.condition || "").toLowerCase() === val.toLowerCase(),
        );
        if (!hasMatch) return false;
      } else if (groupId === "rating") {
        const hasMatch = values.some(
          (val) => Math.floor(book.rating || 0) === Number(val),
        );
        if (!hasMatch) return false;
      }
    }

    // 3. Price Filter
    if (priceRange) {
      const p = book.price || 0;
      if (priceRange.min && p < Number(priceRange.min)) return false;
      if (priceRange.max && p > Number(priceRange.max)) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getPageNumbers = () => {
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
  };

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

          {/* Interactive Live Search Bar */}
          <div className="relative w-full md:w-[320px] lg:w-[360px]">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search title, author, or keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-background/80 h-11 rounded-xl pr-9 pl-9 text-sm shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live Trust Ticker Strip */}
        <div className="border-border/60 grid grid-cols-1 gap-2.5 border-t pt-4 sm:grid-cols-3">
          <div className="bg-background/80 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-2xs">
            <BookOpen className="text-primary size-4 shrink-0" />
            <div className="text-xs">
              <p className="text-foreground font-bold">1,420+ Books</p>
              <p className="text-muted-foreground text-[11px]">Available Now</p>
            </div>
          </div>

          <div className="bg-background/80 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-2xs">
            <HeartHandshake className="size-4 shrink-0 text-amber-500" />
            <div className="text-xs">
              <p className="text-foreground font-bold">98% Handover Rate</p>
              <p className="text-muted-foreground text-[11px]">Peer Verified</p>
            </div>
          </div>

          <div className="bg-background/80 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-2xs">
            <TrendingUp className="size-4 shrink-0 text-emerald-500" />
            <div className="text-xs">
              <p className="text-foreground font-bold">140+ New Arrivals</p>
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
                  {filteredBooks.length}
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {paginatedBooks.length > 0 ? (
                  paginatedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))
                ) : (
                  <div className="text-muted-foreground col-span-full py-12 text-center">
                    কোনো বই পাওয়া যায়নি। আবার চেষ্টা করুন।
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
