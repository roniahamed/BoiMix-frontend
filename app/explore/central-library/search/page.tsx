import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen } from "lucide-react";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";
import Link from "next/link";

export default async function CentralLibrarySearchPage() {
  const allBooks: BookCardBook[] = (await fetchLocal("/api/books")) || [];

  // Filter only library books
  const libraryBooks = allBooks.filter(
    (book) => book.providerType === "library" || book.tags?.includes("library"),
  );

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-[1400px] bg-white pt-8 pb-16 dark:bg-slate-950">
        <div className="mb-8 px-4 md:px-8">
          <div className="mb-2 flex items-center gap-2">
            <Link
              href="/explore/central-library"
              className="text-sm text-slate-500 hover:text-blue-600"
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

          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by title, author, or keyword..."
                className="h-11 w-full border-slate-200 bg-slate-50 pl-10 dark:border-slate-800 dark:bg-slate-900"
              />
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-11 border-slate-200 px-4 dark:border-slate-800"
              >
                <Filter className="mr-2 size-4" />
                Filters
              </Button>
              <Button className="h-11 bg-blue-600 px-6 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          {libraryBooks.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {libraryBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
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
