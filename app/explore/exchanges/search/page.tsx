import Link from "next/link";
import { RefreshCw, ArrowRight, BookOpen } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { LibrarySearchBar } from "@/components/shared/library-search-bar";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";

const EXCHANGE_CATEGORIES = [
  { label: "উপন্যাস", value: "Novel" },
  { label: "একাডেমিক", value: "Academic" },
  { label: "বিজ্ঞান", value: "Science" },
  { label: "ইসলামিক", value: "Islamic" },
  { label: "ইতিহাস", value: "History" },
  { label: "কমিক্স", value: "Comics" },
  { label: "শিশু", value: "Kids" },
  { label: "মোটিভেশন", value: "Motivation" },
  { label: "ইঞ্জিনিয়ারিং", value: "Engineering" },
  { label: "মেডিকেল", value: "Medical" },
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Near Me", value: "nearby" },
  { label: "Most Popular", value: "popular" },
  { label: "A–Z", value: "az" },
];

export default async function ExchangesSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q || "";
  const category = resolvedParams?.category || "";
  const sort = resolvedParams?.sort || "";

  const allBooks: BookCardBook[] = (await fetchLocal("/api/books")) || [];

  // Use all non-library books as exchange books (fallback: all books)
  let exchangeBooks = allBooks.filter(
    (b) => b.providerType !== "library" || b.tags?.includes("exchange"),
  );
  if (exchangeBooks.length < 6) exchangeBooks = [...allBooks];

  // Apply search query
  if (q) {
    const query = q.toLowerCase().trim();
    exchangeBooks = exchangeBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.tags?.some((t) => t.toLowerCase().includes(query)),
    );
  }

  // Apply category filter
  if (category) {
    const lowercaseCat = category.toLowerCase().trim();
    exchangeBooks = exchangeBooks.filter(
      (book) =>
        book.tags?.some((t) => t.toLowerCase() === lowercaseCat) ||
        book.title.toLowerCase().includes(lowercaseCat),
    );
  }

  // Apply sorting
  if (sort === "newest") {
    exchangeBooks = [...exchangeBooks].reverse();
  } else if (sort === "popular") {
    exchangeBooks = [...exchangeBooks].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });
  } else if (sort === "az") {
    exchangeBooks = [...exchangeBooks].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }

  // Helper to generate filter URLs
  const getFilterUrl = (
    paramsToRemove: string[],
    paramsToAdd: Record<string, string> = {},
  ) => {
    const nextParams: Record<string, string> = { q, category, sort };
    paramsToRemove.forEach((p) => delete nextParams[p]);
    Object.entries(paramsToAdd).forEach(([k, v]) => (nextParams[k] = v));
    const queryParts = Object.entries(nextParams)
      .filter(([, v]) => v !== "")
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`);
    return queryParts.length > 0
      ? `/explore/exchanges/search?${queryParts.join("&")}`
      : "/explore/exchanges/search";
  };

  const activeFiltersCount = [q, category, sort].filter(Boolean).length;

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-[1400px] bg-white pt-8 pb-16 dark:bg-slate-950">
        {/* Breadcrumb */}
        <div className="mb-6 px-4 md:px-8">
          <div className="mb-2 flex items-center gap-2">
            <Link
              href="/explore/exchanges"
              className="text-sm text-slate-500 transition-colors hover:text-emerald-600"
            >
              Exchange Books
            </Link>
            <span className="text-sm text-slate-400">/</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              Browse Exchanges
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Browse Exchange Books
            </h1>
            <Link
              href="/books/upload"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <RefreshCw className="size-4" />
              List Your Book for Exchange
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 px-4 md:px-8">
          <LibrarySearchBar
            defaultValue={q}
            placeholder="Search exchange books by title, author, or keyword..."
            variant="minimal"
            mode="exchanges"
            action="/explore/exchanges/search"
            className="relative mb-4 flex flex-col gap-4 sm:flex-row"
            hiddenFields={{
              ...(category ? { category } : {}),
              ...(sort ? { sort } : {}),
            }}
          />

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Clear All */}
            {activeFiltersCount > 0 && (
              <Link
                href="/explore/exchanges/search"
                className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:border-red-300 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Clear All ×
              </Link>
            )}

            {/* Sort */}
            <span className="text-xs font-semibold text-slate-500 uppercase">
              Sort:
            </span>
            {SORT_OPTIONS.map((s) => (
              <Link
                key={s.value}
                href={
                  sort === s.value
                    ? getFilterUrl(["sort"])
                    : getFilterUrl([], { sort: s.value })
                }
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  sort === s.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-6 px-4 md:px-8">
          {/* Left Sidebar — Categories */}
          <aside className="hidden w-48 shrink-0 lg:block">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-3 text-xs font-bold text-slate-500 uppercase">
                Categories
              </h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={getFilterUrl(["category"])}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      !category
                        ? "bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    All Categories
                  </Link>
                </li>
                {EXCHANGE_CATEGORIES.map((cat) => (
                  <li key={cat.value}>
                    <Link
                      href={
                        category === cat.value
                          ? getFilterUrl(["category"])
                          : getFilterUrl([], { category: cat.value })
                      }
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        category === cat.value
                          ? "bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {/* Mobile Category Pills */}
            <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
              <Link
                href={getFilterUrl(["category"])}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  !category
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                All
              </Link>
              {EXCHANGE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.value}
                  href={
                    category === cat.value
                      ? getFilterUrl(["category"])
                      : getFilterUrl([], { category: cat.value })
                  }
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    category === cat.value
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Results count */}
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
              {exchangeBooks.length} book{exchangeBooks.length !== 1 ? "s" : ""}{" "}
              found
              {q ? ` for "${q}"` : ""}
              {category ? ` in ${category}` : ""}
            </p>

            {/* Book Grid */}
            {exchangeBooks.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                {exchangeBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-24 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <BookOpen className="size-8 text-slate-400" />
                </div>
                <div>
                  <p className="mb-1 text-lg font-bold text-slate-800 dark:text-white">
                    No books found
                  </p>
                  <p className="text-sm text-slate-500">
                    Try different keywords or browse all categories
                  </p>
                </div>
                <Link
                  href="/explore/exchanges/search"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Browse all exchanges <ArrowRight className="size-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
