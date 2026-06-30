"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/api-client";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    queryKey: ['books'],
    queryFn: () => fetchBooks()
  });

  const MOCK_BOOKS = useMemo(() => {
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    return baseBooks.map((b: any, i: number) => ({
      ...b,
      category: ["Fiction", "Academic", "Business", "Literature", "History"][i % 5],
      publisher: ["Prothoma", "Batighor", "Oitijjho", "Adarsha", "Anyaprokash"][i % 5],
      language: ["Bengali", "English"][i % 2],
    })) as ExtendedBook[];
  }, [baseBooks]);

  const FILTER_GROUPS = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(MOCK_BOOKS.map((b) => b.author))).sort();
    const uniquePublishers = Array.from(new Set(MOCK_BOOKS.map((b) => b.publisher))).sort();
    const uniqueCategories = Array.from(new Set(MOCK_BOOKS.map((b) => b.category))).sort();
    const uniqueLanguages = Array.from(new Set(MOCK_BOOKS.map((b) => b.language))).sort();

    return [
      {
        id: "category", type: "checkbox" as const,
        title: "Category",
        options: uniqueCategories.map((c) => ({ label: c, value: c.toLowerCase() })),
      },
      {
        id: "author", type: "checkbox" as const,
        title: "Author",
        options: uniqueAuthors.map((a) => ({ label: a, value: a.toLowerCase() })),
      },
      {
        id: "publisher", type: "checkbox" as const,
        title: "Publisher",
        options: uniquePublishers.map((p) => ({ label: p, value: p.toLowerCase() })),
      },
      {
        id: "language", type: "checkbox" as const,
        title: "Language",
        options: uniqueLanguages.map((l) => ({ label: l, value: l.toLowerCase() })),
      },
      {
        id: "condition", type: "checkbox" as const,
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
      setCurrentPage(1); // Reset to first page on filter change
    },
    [],
  );

  const handleRangeChange = useCallback(
    (groupId: string, min: string, max: string) => {
      if (groupId === "price") {
        setPriceRange({ min, max });
        setCurrentPage(1); // Reset to first page on filter change
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

  // Sync defaultSearchQuery from URL params to local state
  useEffect(() => {
    {/* eslint-disable-next-line react-hooks/set-state-in-effect */}
    setSearchQuery(defaultSearchQuery);
    setCurrentPage(1);
  }, [defaultSearchQuery]);

  // Derived state for filtering and sorting
  const filteredBooks = MOCK_BOOKS
    .filter((book) => {
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
            (val) => (book as ExtendedBook).category === val,
          );
          if (!hasMatch) return false;
        } else if (groupId === "availability") {
          const hasMatch = values.some(
            (val) =>
              (book.tags as string[])?.includes(val) ||
              book.availability === val,
          );
          if (!hasMatch) return false;
        } else if (groupId === "author") {
          const hasMatch = values.some((val) => book.author === val);
          if (!hasMatch) return false;
        } else if (groupId === "publisher") {
          const hasMatch = values.some(
            (val) => (book as ExtendedBook).publisher === val,
          );
          if (!hasMatch) return false;
        } else if (groupId === "language") {
          const hasMatch = values.some(
            (val) => (book as ExtendedBook).language === val,
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
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0; // default / newest / distance mocked
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
      // Always include page 1
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

      // Always include last page
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div ref={listRef} className="boimix-container py-6 md:py-8">
      {/* Page Header & Search */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="type-heading text-3xl md:text-4xl">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>

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
