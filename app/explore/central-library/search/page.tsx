import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { BookOpen } from "lucide-react";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";
import { LibrarySearchBar } from "@/components/shared/library-search-bar";
import Link from "next/link";

const POPULAR_CATEGORIES = [
  "Academic",
  "Novel",
  "Science",
  "History",
  "Islamic",
  "Engineering",
  "Medical",
  "BCS",
  "Kids",
  "Comics",
];

export default async function CentralLibrarySearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    sort?: string;
    collection?: string;
    category?: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q || "";
  const tag = resolvedParams?.tag || "";
  const sort = resolvedParams?.sort || "";
  const collection = resolvedParams?.collection || "";
  const category = resolvedParams?.category || "";

  const allBooks: BookCardBook[] = (await fetchLocal("/api/books")) || [];

  // Filter only library books
  let libraryBooks = allBooks.filter(
    (book) => book.providerType === "library" || book.tags?.includes("library"),
  );

  // Apply search query (q)
  if (q) {
    const query = q.toLowerCase().trim();
    libraryBooks = libraryBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.tags?.some((t) => t.toLowerCase().includes(query)),
    );
  }

  // Apply tag filter (tag)
  if (tag) {
    const lowercaseTag = tag.toLowerCase().trim();
    libraryBooks = libraryBooks.filter((book) =>
      book.tags?.some((t) => t.toLowerCase() === lowercaseTag),
    );
  }

  // Apply collection filter (collection)
  if (collection) {
    const lowercaseCol = collection.toLowerCase().trim();
    libraryBooks = libraryBooks.filter(
      (book) =>
        book.tags?.some((t) => t.toLowerCase() === lowercaseCol) ||
        book.title.toLowerCase().includes(lowercaseCol),
    );
  }

  // Apply category filter (category)
  if (category) {
    const lowercaseCat = category.toLowerCase().trim();
    libraryBooks = libraryBooks.filter(
      (book) =>
        book.tags?.some((t) => t.toLowerCase() === lowercaseCat) ||
        book.title.toLowerCase().includes(lowercaseCat),
    );
  }

  // Apply sorting
  if (sort === "new" || sort === "newest") {
    libraryBooks = [...libraryBooks].reverse();
  } else if (sort === "popular") {
    libraryBooks = [...libraryBooks].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });
  }

  // Helper to generate filter URLs
  const getFilterUrl = (
    paramsToRemove: string[],
    paramsToAdd: Record<string, string> = {},
  ) => {
    const nextParams = { q, tag, sort, collection, category };

    // Remove specified parameters
    paramsToRemove.forEach((p) => {
      delete nextParams[p as keyof typeof nextParams];
    });

    // Add new parameters
    Object.entries(paramsToAdd).forEach(([key, val]) => {
      nextParams[key as keyof typeof nextParams] = val;
    });

    // Build query string
    const queryParts = Object.entries(nextParams)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`);

    return queryParts.length > 0
      ? `/explore/central-library/search?${queryParts.join("&")}`
      : "/explore/central-library/search";
  };

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-[1400px] bg-white pt-8 pb-16 dark:bg-slate-950">
        <div className="mb-8 px-4 md:px-8">
          <div className="mb-2 flex items-center gap-2">
            <Link
              href="/explore/central-library"
              className="text-sm text-slate-500 transition-colors hover:text-blue-600"
            >
              Central Library
            </Link>
            <span className="text-sm text-slate-400">/</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              All Books
            </span>
          </div>
          <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            Browse Library Books
          </h1>

          {/* Search Bar */}
          <LibrarySearchBar
            defaultValue={q}
            placeholder="Search by title, author, or keyword..."
            variant="minimal"
            className="relative mb-8 flex flex-col gap-4 sm:flex-row"
            hiddenFields={{
              ...(tag ? { tag } : {}),
              ...(sort ? { sort } : {}),
              ...(collection ? { collection } : {}),
              ...(category ? { category } : {}),
            }}
          />

          {/* Active Filters Display */}
          {(q || tag || collection || category || (sort && sort !== "")) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Active Filters:
              </span>
              {q && (
                <Link
                  href={getFilterUrl(["q"])}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  Search: &ldquo;{q}&rdquo;
                  <span className="text-[14px] leading-none font-bold">
                    &times;
                  </span>
                </Link>
              )}
              {tag && (
                <Link
                  href={getFilterUrl(["tag"])}
                  className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300"
                >
                  Tag: {tag}
                  <span className="text-[14px] leading-none font-bold">
                    &times;
                  </span>
                </Link>
              )}
              {collection && (
                <Link
                  href={getFilterUrl(["collection"])}
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
                >
                  Collection: {collection}
                  <span className="text-[14px] leading-none font-bold">
                    &times;
                  </span>
                </Link>
              )}
              {category && (
                <Link
                  href={getFilterUrl(["category"])}
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300"
                >
                  Category: {category}
                  <span className="text-[14px] leading-none font-bold">
                    &times;
                  </span>
                </Link>
              )}
              {sort && (
                <Link
                  href={getFilterUrl(["sort"])}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300"
                >
                  Sort: {sort === "new" ? "New Arrivals" : "Popular"}
                  <span className="text-[14px] leading-none font-bold">
                    &times;
                  </span>
                </Link>
              )}
              <Link
                href="/explore/central-library/search"
                className="ml-2 text-xs font-medium text-slate-500 underline underline-offset-2 transition-colors hover:text-blue-600"
              >
                Clear all
              </Link>
            </div>
          )}

          {/* Filters Bar */}
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            {/* Quick Categories filter */}
            <div className="flex-1">
              <span className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Popular Categories
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_CATEGORIES.map((cat) => {
                  const isSelected =
                    category.toLowerCase() === cat.toLowerCase();
                  const targetUrl = isSelected
                    ? getFilterUrl(["category"])
                    : getFilterUrl([], { category: cat });

                  return (
                    <Link
                      key={cat}
                      href={targetUrl}
                      className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-all ${
                        isSelected
                          ? "animate-in zoom-in-95 border-blue-600 bg-blue-600 text-white shadow-sm duration-150"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sort Options */}
            <div className="shrink-0">
              <span className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Sort By
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
                <Link
                  href={getFilterUrl([], { sort: "new" })}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    sort === "new" || !sort
                      ? "bg-white font-semibold text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white"
                      : "hover:text-slate-850 text-slate-500 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  New Arrivals
                </Link>
                <Link
                  href={getFilterUrl([], { sort: "popular" })}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    sort === "popular"
                      ? "bg-white font-semibold text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white"
                      : "hover:text-slate-850 text-slate-500 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  Popular
                </Link>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {libraryBooks.length > 0 ? (
            <div className="animate-in fade-in grid grid-cols-2 gap-4 duration-300 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {libraryBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in flex flex-col items-center justify-center py-20 text-center duration-300">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <BookOpen className="size-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                No books found
              </h3>
              <p className="max-w-md text-slate-500 dark:text-slate-400">
                We couldn&apos;t find any books matching your criteria. Try
                adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
