"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

const BASE_MOCK_BOOKS: BookCardBook[] = [
  {
    id: "rivers-of-dhaka",
    slug: "rivers-of-dhaka",
    title: "Rivers of Dhaka",
    author: "Nadia Rahman",
    coverUrl: "/book-covers/rivers-of-dhaka.svg",
    tags: ["sell", "borrow"],
    rating: 4.8,
    reviewCount: 42,
    price: 420,
    originalPrice: 550,
    distance: "1.2 km",
    location: "Dhanmondi",
    condition: "excellent",
    availability: "in-stock",
    providerType: "library",
  },
  {
    id: "borrowed-light",
    slug: "borrowed-light",
    title: "Borrowed Light",
    author: "Arif Hossain",
    coverUrl: "/book-covers/borrowed-light.svg",
    tags: ["borrow"],
    rating: 4.6,
    reviewCount: 31,
    distance: "0.8 km",
    location: "Mirpur",
    condition: "good",
    availability: "in-stock",
    isWishlisted: true,
    providerType: "library",
  },
  {
    id: "swap-stories",
    slug: "swap-stories",
    title: "Swap Stories",
    author: "Maliha Karim",
    coverUrl: "/book-covers/swap-stories.svg",
    tags: ["swap", "sell"],
    rating: 4.7,
    reviewCount: 28,
    price: 360,
    originalPrice: 450,
    distance: "2.4 km",
    location: "Uttara",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "the-reader-map",
    slug: "the-reader-map",
    title: "The Reader Map",
    author: "Samiul Islam",
    coverUrl: "/book-covers/the-reader-map.svg",
    tags: ["swap", "borrow"],
    rating: 4.5,
    reviewCount: 19,
    distance: "3.1 km",
    location: "Banani",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "market-lanes",
    slug: "market-lanes",
    title: "Market Lanes",
    author: "Tahsin Ahmed",
    coverUrl: "/book-covers/market-lanes.svg",
    tags: ["sell"],
    rating: 4.4,
    reviewCount: 16,
    price: 280,
    originalPrice: 350,
    location: "Bashundhara",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "quiet-reviews",
    slug: "quiet-reviews",
    title: "Quiet Reviews",
    author: "Raisa Chowdhury",
    coverUrl: "/book-covers/quiet-reviews.svg",
    tags: ["borrow", "swap"],
    rating: 4.9,
    reviewCount: 52,
    distance: "1.7 km",
    location: "Mohammadpur",
    condition: "excellent",
    availability: "in-stock",
    isInCart: true,
  },
  {
    id: "song-of-padma",
    slug: "song-of-padma",
    title: "The Song of the Padma",
    author: "Tasnim Ara",
    coverUrl: "/book-covers/song-of-padma.svg",
    tags: ["sell", "borrow"],
    rating: 4.5,
    reviewCount: 23,
    price: 350,
    distance: "1.5 km",
    location: "Savar",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "chhaya-bithi",
    slug: "chhaya-bithi",
    title: "Chhaya Bithi",
    author: "Humayun Ahmed",
    coverUrl: "/book-covers/chhaya-bithi.svg",
    tags: ["borrow"],
    rating: 4.9,
    reviewCount: 120,
    distance: "3.5 km",
    location: "Sylhet",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "programming-basics",
    slug: "programming-basics",
    title: "Programming Basics",
    author: "Tamim Shahriar Subeen",
    coverUrl: "/book-covers/programming-basics.svg",
    tags: ["sell"],
    rating: 4.8,
    reviewCount: 85,
    price: 250,
    originalPrice: 320,
    location: "Chittagong",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "struggles-of-life",
    slug: "struggles-of-life",
    title: "Struggles of Life",
    author: "Kazi Nazrul Islam",
    coverUrl: "/book-covers/struggles-of-life.svg",
    tags: ["swap", "sell"],
    rating: 4.7,
    reviewCount: 45,
    price: 180,
    distance: "4.2 km",
    location: "Mymensingh",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "lost-sonnet",
    slug: "lost-sonnet",
    title: "The Lost Sonnet",
    author: "Rabindranath Tagore",
    coverUrl: "/book-covers/lost-sonnet.svg",
    tags: ["borrow", "swap"],
    rating: 4.6,
    reviewCount: 60,
    distance: "2.8 km",
    location: "Khulna",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "boi-er-pata",
    slug: "boi-er-pata",
    title: "Boi-er Pata",
    author: "Shamsur Rahman",
    coverUrl: "/book-covers/quiet-reviews.svg",
    tags: ["swap"],
    rating: 4.3,
    reviewCount: 14,
    distance: "5.0 km",
    location: "Barisal",
    condition: "fair",
    availability: "in-stock",
  },
  {
    id: "dhaka-metro",
    slug: "dhaka-metro",
    title: "Dhaka Metro Diary",
    author: "Nayeem Islam",
    coverUrl: "/book-covers/dhaka-metro.svg",
    tags: ["sell", "borrow"],
    rating: 4.2,
    reviewCount: 18,
    price: 150,
    distance: "0.5 km",
    location: "Mirpur",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "sundarbans-adventure",
    slug: "sundarbans-adventure",
    title: "Sundarbans Adventure",
    author: "Muhammed Zafar Iqbal",
    coverUrl: "/book-covers/sundarbans-adventure.svg",
    tags: ["borrow"],
    rating: 4.8,
    reviewCount: 77,
    distance: "6.2 km",
    location: "Bagerhat",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "smart-entrepreneur",
    slug: "smart-entrepreneur",
    title: "Smart Entrepreneur",
    author: "Ayman Sadiq",
    coverUrl: "/book-covers/smart-entrepreneur.svg",
    tags: ["sell"],
    rating: 4.7,
    reviewCount: 110,
    price: 320,
    originalPrice: 400,
    providerType: "user",
    isVerifiedUser: true,
    location: "Banani",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "history-of-bengal",
    slug: "history-of-bengal",
    title: "History of Bengal",
    author: "Akbar Ali Khan",
    coverUrl: "/book-covers/history-of-bengal.svg",
    tags: ["swap", "sell", "borrow"],
    rating: 4.9,
    reviewCount: 65,
    price: 480,
    originalPrice: 600,
    distance: "1.9 km",
    location: "Dhanmondi",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "silent-whispers",
    slug: "silent-whispers",
    title: "Silent Whispers",
    author: "Tahmima Anam",
    coverUrl: "/book-covers/lost-sonnet.svg",
    tags: ["sell"],
    rating: 4.4,
    reviewCount: 21,
    price: 290,
    location: "Uttara",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "golden-age",
    slug: "golden-age",
    title: "A Golden Age",
    author: "Tahmima Anam",
    coverUrl: "/book-covers/struggles-of-life.svg",
    tags: ["borrow"],
    rating: 4.6,
    reviewCount: 39,
    distance: "2.1 km",
    location: "Gulshan",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "lalshalu",
    slug: "lalshalu",
    title: "Lalshalu",
    author: "Syed Waliullah",
    coverUrl: "/book-covers/chhaya-bithi.svg",
    tags: ["swap"],
    rating: 4.8,
    reviewCount: 94,
    distance: "3.7 km",
    location: "Comilla",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "pather-panchali",
    slug: "pather-panchali",
    title: "Pather Panchali",
    author: "Bibhutibhushan Bandyopadhyay",
    coverUrl: "/book-covers/song-of-padma.svg",
    tags: ["sell", "borrow"],
    rating: 4.9,
    reviewCount: 142,
    price: 190,
    distance: "4.5 km",
    location: "Jessore",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "chokher-bali",
    slug: "chokher-bali",
    title: "Chokher Bali",
    author: "Rabindranath Tagore",
    coverUrl: "/book-covers/programming-basics.svg",
    tags: ["swap", "sell"],
    rating: 4.7,
    reviewCount: 53,
    price: 220,
    distance: "2.9 km",
    location: "Pabna",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "gora-book",
    slug: "gora-book",
    title: "Gora",
    author: "Rabindranath Tagore",
    coverUrl: "/book-covers/history-of-bengal.svg",
    tags: ["borrow"],
    rating: 4.8,
    reviewCount: 88,
    distance: "3.2 km",
    location: "Rajshahi",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "shesher-kobita",
    slug: "shesher-kobita",
    title: "Shesher Kobita",
    author: "Rabindranath Tagore",
    coverUrl: "/book-covers/smart-entrepreneur.svg",
    tags: ["sell"],
    rating: 4.9,
    reviewCount: 115,
    price: 160,
    location: "Bogra",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "devdas-novel",
    slug: "devdas-novel",
    title: "Devdas",
    author: "Sarat Chandra Chattopadhyay",
    coverUrl: "/book-covers/dhaka-metro.svg",
    tags: ["swap", "borrow"],
    rating: 4.5,
    reviewCount: 67,
    distance: "5.1 km",
    location: "Rangpur",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "srikanta-novel",
    slug: "srikanta-novel",
    title: "Srikanta",
    author: "Sarat Chandra Chattopadhyay",
    coverUrl: "/book-covers/sundarbans-adventure.svg",
    tags: ["sell", "swap"],
    rating: 4.6,
    reviewCount: 41,
    price: 240,
    distance: "4.8 km",
    location: "Dinajpur",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "kopalkundala",
    slug: "kopalkundala",
    title: "Kopalkundala",
    author: "Bankim Chandra Chattopadhyay",
    coverUrl: "/book-covers/borrowed-light.svg",
    tags: ["borrow"],
    rating: 4.4,
    reviewCount: 33,
    distance: "2.7 km",
    location: "Kushtia",
    condition: "good",
    availability: "in-stock",
  },
  {
    id: "anandamath",
    slug: "anandamath",
    title: "Anandamath",
    author: "Bankim Chandra Chattopadhyay",
    coverUrl: "/book-covers/swap-stories.svg",
    tags: ["sell"],
    rating: 4.7,
    reviewCount: 59,
    price: 300,
    location: "Faridpur",
    condition: "new",
    availability: "in-stock",
  },
  {
    id: "byomkesh-samagra",
    slug: "byomkesh-samagra",
    title: "Byomkesh Samagra",
    author: "Sharadindu Bandyopadhyay",
    coverUrl: "/book-covers/byomkesh-samagra.svg",
    tags: ["swap", "sell", "borrow"],
    rating: 4.9,
    reviewCount: 156,
    price: 650,
    originalPrice: 800,
    distance: "3.4 km",
    location: "Tangail",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "feluda-somogro",
    slug: "feluda-somogro",
    title: "Feluda Somogro",
    author: "Satyajit Ray",
    coverUrl: "/book-covers/feluda-somogro.svg",
    tags: ["sell", "borrow"],
    rating: 4.9,
    reviewCount: 203,
    price: 750,
    originalPrice: 950,
    distance: "1.8 km",
    location: "Gazipur",
    condition: "excellent",
    availability: "in-stock",
  },
  {
    id: "professor-shonku",
    slug: "professor-shonku",
    title: "Professor Shonku",
    author: "Satyajit Ray",
    coverUrl: "/book-covers/professor-shonku.svg",
    tags: ["borrow", "swap"],
    rating: 4.8,
    reviewCount: 119,
    distance: "2.3 km",
    location: "Narayanganj",
    condition: "good",
    availability: "in-stock",
  },
];

type ExtendedBook = BookCardBook & {
  category: string;
  publisher: string;
  language: string;
};

const MOCK_BOOKS = BASE_MOCK_BOOKS.map((b, i) => ({
  ...b,
  category: ["Fiction", "Academic", "Business", "Literature", "History"][i % 5],
  publisher: ["Prothoma", "Batighor", "Oitijjho", "Adarsha", "Anyaprokash"][
    i % 5
  ],
  language: ["Bengali", "English"][i % 2],
})) as ExtendedBook[];

// Build options from mock data
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

const FILTER_GROUPS = [
  {
    id: "category",
    title: "Categories",
    type: "checkbox" as const,
    searchable: true,
    options: uniqueCategories.map((c) => ({ label: c, value: c })),
  },
  {
    id: "availability",
    title: "Book Type",
    type: "checkbox" as const,
    options: [
      { label: "Sell", value: "sell" },
      { label: "Swap", value: "swap" },
      { label: "Borrow", value: "borrow" },
      { label: "In Stock", value: "in-stock" },
    ],
  },
  {
    id: "author",
    title: "Author",
    type: "checkbox" as const,
    searchable: true,
    options: uniqueAuthors.map((a) => ({ label: a, value: a })),
  },
  {
    id: "publisher",
    title: "Publisher",
    type: "checkbox" as const,
    searchable: true,
    options: uniquePublishers.map((p) => ({ label: p, value: p })),
  },
  {
    id: "price",
    title: "Price",
    type: "range" as const,
  },
  {
    id: "language",
    title: "Language",
    type: "checkbox" as const,
    options: uniqueLanguages.map((l) => ({ label: l, value: l })),
  },
  {
    id: "rating",
    title: "Rating",
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
  const [books] = useState<BookCardBook[]>(MOCK_BOOKS);
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery(defaultSearchQuery);
    setCurrentPage(1);
  }, [defaultSearchQuery]);

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
