"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SlidersHorizontal, Search, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterSidebar } from "@/components/shared/filter-sidebar";
import { BookCard } from "@/components/shared/book-card";
import { BookCardBook } from "@/types/book";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const MOCK_BOOKS: BookCardBook[] = [
  {
    id: "1",
    slug: "oparazito",
    title: "অপরাজিত",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600",
    tags: ["sell", "swap", "borrow"],
    rating: 4.8,
    reviewCount: 24,
    price: 250,
    originalPrice: 350,
    distance: "১.২ কি.মি.",
    location: "মিরপুর, ঢাকা",
    condition: "excellent",
    availability: "in-stock",
    providerType: "user",
    isVerifiedUser: true,
  },
  {
    id: "2",
    slug: "pother-pachali",
    title: "পথের পাঁচালী",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    coverUrl:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600",
    tags: ["borrow"],
    rating: 4.9,
    reviewCount: 156,
    distance: "০ কি.মি.",
    location: "সেন্ট্রাল লাইব্রেরি",
    condition: "good",
    availability: "in-stock",
    providerType: "library",
  },
  {
    id: "3",
    slug: "paradoxical-sajid",
    title: "প্যারাডক্সিক্যাল সাজিদ",
    author: "আরিফ আজাদ",
    coverUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600",
    tags: ["sell"],
    rating: 4.5,
    reviewCount: 89,
    price: 300,
    distance: "৩.৫ কি.মি.",
    location: "ধানমন্ডি, ঢাকা",
    condition: "new",
    availability: "in-stock",
    providerType: "user",
  },
  {
    id: "4",
    slug: "himu",
    title: "হিমু",
    author: "হুমায়ূন আহমেদ",
    coverUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600",
    tags: ["swap"],
    rating: 4.7,
    reviewCount: 210,
    distance: "৫.০ কি.মি.",
    location: "উত্তরা, ঢাকা",
    condition: "fair",
    availability: "out-of-stock",
    providerType: "user",
  },
  {
    id: "5",
    slug: "misir-ali",
    title: "মিসির আলি",
    author: "হুমায়ূন আহমেদ",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600",
    tags: ["borrow", "swap"],
    rating: 4.8,
    reviewCount: 320,
    distance: "১.০ কি.মি.",
    location: "মিরপুর ২, ঢাকা",
    condition: "excellent",
    availability: "in-stock",
    providerType: "user",
  },
];

const FILTER_GROUPS = [
  {
    id: "category",
    title: "ক্যাটাগরি",
    type: "checkbox" as const,
    searchable: true,
    options: [
      { label: "ফিকশন (Fiction)", value: "fiction", count: 120 },
      { label: "নন-ফিকশন (Non-Fiction)", value: "non-fiction", count: 85 },
      { label: "একাডেমিক (Academic)", value: "academic", count: 45 },
      { label: "ইসলামিক বই (Islamic)", value: "islamic", count: 210 },
      { label: "কবিতা (Poetry)", value: "poetry", count: 32 },
    ],
  },
  {
    id: "availability",
    title: "বইয়ের অবস্থা ও ধরণ",
    type: "checkbox" as const,
    options: [
      { label: "বিক্রি (Sell)", value: "sell", count: 320 },
      { label: "সোয়াপ (Swap)", value: "swap", count: 110 },
      { label: "ধার (Borrow)", value: "borrow", count: 89 },
      { label: "স্টকে আছে (In Stock)", value: "in-stock", count: 400 },
    ],
  },
  {
    id: "author",
    title: "লেখক",
    type: "checkbox" as const,
    searchable: true,
    options: [
      { label: "হুমায়ূন আহমেদ", value: "humayun", count: 145 },
      { label: "রবীন্দ্রনাথ ঠাকুর", value: "rabindranath", count: 90 },
      { label: "কাজী নজরুল ইসলাম", value: "nazrul", count: 76 },
      { label: "শরৎচন্দ্র চট্টোপাধ্যায়", value: "sarat", count: 65 },
      { label: "আরিফ আজাদ", value: "arif", count: 40 },
    ],
  },
  {
    id: "publisher",
    title: "প্রকাশনী",
    type: "checkbox" as const,
    searchable: true,
    options: [
      { label: "প্রথমা প্রকাশন", value: "prothoma", count: 85 },
      { label: "অন্যপ্রকাশ", value: "onnoprokash", count: 70 },
      { label: "বাতিঘর", value: "batighor", count: 65 },
      { label: "মাওলা ব্রাদার্স", value: "mowla", count: 50 },
      { label: "আদর্শ", value: "adorsho", count: 40 },
    ],
  },
  {
    id: "price",
    title: "দাম (Price)",
    type: "range" as const,
  },
  {
    id: "language",
    title: "ভাষা",
    type: "checkbox" as const,
    options: [
      { label: "বাংলা", value: "bengali", count: 450 },
      { label: "ইংরেজি", value: "english", count: 210 },
      { label: "আরবি", value: "arabic", count: 45 },
    ],
  },
  {
    id: "rating",
    title: "রেটিং",
    type: "rating" as const,
    options: [
      { label: "5", value: "5" },
      { label: "4", value: "4" },
      { label: "3", value: "3" },
      { label: "2", value: "2" },
      { label: "1", value: "1" },
    ],
  },
];

type BookListingProps = {
  title: string;
  description: string;
  defaultSearchQuery?: string;
};

export function BookListing({
  title,
  description,
  defaultSearchQuery = "",
}: BookListingProps) {
  const [books, setBooks] = useState<BookCardBook[]>(MOCK_BOOKS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [sortBy, setSortBy] = useState("newest");
  const [hasMore, setHasMore] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const pageCountRef = useRef(1);
  const isIntersecting = useIntersectionObserver(loadMoreRef, {
    rootMargin: "400px",
  });

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
    },
    [],
  );

  const handleFilterReset = useCallback(() => {
    setSelectedFilters({});
    setSearchQuery("");
  }, []);

  const loadMoreBooks = useCallback(() => {
    if (!hasMore) return;
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setBooks((prev) => [
        ...prev,
        ...MOCK_BOOKS.map((book) => ({
          ...book,
          id: book.id + "-" + Date.now() + Math.random(),
        })),
      ]);
      pageCountRef.current += 1;
      if (pageCountRef.current >= 3) {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 300);
  }, [hasMore]);

  // Continuous background loading for mock data
  useEffect(() => {
    if (!hasMore || isLoading) return;
    const timer = setTimeout(() => {
      loadMoreBooks();
    }, 500); // load next chunk after 500ms automatically
    return () => clearTimeout(timer);
  }, [hasMore, isLoading, loadMoreBooks]);

  useEffect(() => {
    if (isIntersecting && !isLoading && hasMore) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadMoreBooks();
    }
  }, [isIntersecting, isLoading, loadMoreBooks, hasMore]);

  // Derived state for filtering and sorting
  const filteredBooks = books
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
          // mock books don't have a specific genre property yet, but we'll assume they pass for now
          // Or filter by some property if it exists
        } else if (groupId === "availability") {
          // book.tags contains "sell", "swap", "borrow"
          // Also book.availability can be "in-stock"
          const hasMatch = values.some(
            (val) =>
              (book.tags as string[])?.includes(val) ||
              book.availability === val,
          );
          if (!hasMatch) return false;
        } else if (groupId === "author") {
          // value is author slug or something, we'll just check if author string includes label roughly
          // or just accept all since it's mock
        } else if (groupId === "rating") {
          const hasMatch = values.some(
            (val) => Math.floor(book.rating || 0) === Number(val),
          );
          if (!hasMatch) return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0; // default / newest / distance mocked
    });

  return (
    <div className="boimix-container py-6 md:py-8">
      {/* Page Header & Search */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="type-heading text-3xl md:text-4xl">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            {description}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <div className="relative w-full md:w-80">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বইয়ের নাম, লেখক বা ISBN..."
              className="pl-9"
            />
          </div>
          <Button className="shrink-0 gap-2 md:hidden">
            <SlidersHorizontal className="size-4" />
            ফিল্টার
          </Button>
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
          />
        </aside>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Active Filters & Sort */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">
                {filteredBooks.length}
              </span>{" "}
              টি বই পাওয়া গেছে
            </p>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                সর্ট করুন:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">নতুন যোগ করা</SelectItem>
                  <SelectItem value="price-low">দাম: কম থেকে বেশি</SelectItem>
                  <SelectItem value="price-high">দাম: বেশি থেকে কম</SelectItem>
                  <SelectItem value="rating">সর্বোচ্চ রেটিং</SelectItem>
                  <SelectItem value="distance">নিকটবর্তী</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <div className="text-muted-foreground col-span-full py-12 text-center">
                কোনো বই পাওয়া যায়নি। আবার চেষ্টা করুন।
              </div>
            )}
          </div>

          {/* Infinite Scroll trigger */}
          {hasMore ? (
            <div ref={loadMoreRef} className="mt-12 flex justify-center pb-12">
              {isLoading ? (
                <div className="text-primary flex items-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <span className="text-sm font-medium">
                    আরও বই লোড হচ্ছে...
                  </span>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  স্ক্রল করতে থাকুন
                </p>
              )}
            </div>
          ) : (
            <div className="mt-12 flex justify-center pb-12">
              <p className="text-muted-foreground text-sm">
                সব বই দেখানো হয়েছে
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
