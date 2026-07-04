import Link from "next/link";
import {
  BookOpen,
  Search,
  Filter,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { ScrollContainer } from "@/components/shared/scroll-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";

export default async function CentralLibraryPage() {
  const allBooks: BookCardBook[] = (await fetchLocal("/api/books")) || [];

  // Filter only library books
  const libraryBooks = allBooks.filter(
    (book) => book.providerType === "library",
  );

  // Create some featured/recommended splits
  const featuredBooks = libraryBooks.slice(0, 4);
  const newArrivals = libraryBooks.slice(4, 10);
  const trendingBooks = libraryBooks.slice(10, 16);

  // If there are not enough library books for splits, fallback to repeating
  const renderBooks = (books: BookCardBook[]) =>
    books.length > 0 ? books : libraryBooks.slice(0, 5);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-primary/5 dark:bg-primary/10 relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="relative z-10 container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 font-medium tracking-wide uppercase">
              <ShieldCheck className="size-4" />
              BoiMix Official
            </Badge>
            <h1 className="type-display-2 text-foreground mb-6 font-bold">
              Welcome to the Central Library
            </h1>
            <p className="type-body-lg text-muted-foreground mx-auto mb-8 max-w-2xl">
              Borrow from our verified official inventory. Guaranteed quality,
              fast delivery, and an ever-growing collection of premium books.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 w-full px-8 text-base sm:w-auto"
              >
                <Link href="#explore-inventory">
                  <BookOpen className="mr-2 size-5" />
                  Explore Inventory
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-background h-12 w-full px-8 text-base sm:w-auto"
              >
                <Link href="/explore/central-library/memberships">
                  View Memberships
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-background sticky top-16 z-20 border-b md:top-20">
        <div className="container px-4 py-4 md:px-6 md:py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                placeholder="Search official books by title, author, or genre..."
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
                <Filter className="size-4" />
                Filters
              </Button>
              <div className="flex items-center gap-2 border-r pr-2">
                {["All", "Borrow", "Buy"].map((type) => (
                  <Badge
                    key={type}
                    variant={type === "All" ? "default" : "outline"}
                    className="shrink-0 cursor-pointer"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
              {["Fiction", "Non-Fiction", "Academic", "Science", "History"].map(
                (category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="hover:bg-secondary/80 shrink-0 cursor-pointer"
                  >
                    {category}
                  </Badge>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div
        className="container space-y-16 px-4 py-12 md:px-6 md:py-16"
        id="explore-inventory"
      >
        {/* Featured Section */}
        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="type-display-4 text-foreground font-bold">
                Featured Collections
              </h2>
              <p className="text-muted-foreground mt-1">
                Curated by our librarians for the best reading experience.
              </p>
            </div>
            <Button
              variant="link"
              className="text-primary gap-1 px-0 font-semibold"
              asChild
            >
              <Link href="/explore/central-library/search">
                View All <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <ScrollContainer>
            {renderBooks(featuredBooks).map((book) => (
              <div
                key={book.id}
                className="w-[160px] shrink-0 sm:w-[180px] md:w-[220px]"
              >
                <BookCard book={book} />
              </div>
            ))}
          </ScrollContainer>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="type-display-4 text-foreground font-bold">
                New Arrivals
              </h2>
              <p className="text-muted-foreground mt-1">
                Freshly added to our official inventory.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {renderBooks(newArrivals).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Info Banners */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Membership Banner */}
          <div className="bg-primary/5 flex flex-col justify-center rounded-2xl border p-6 sm:p-8">
            <Badge className="bg-primary text-primary-foreground mb-4 w-fit">
              Library Pass
            </Badge>
            <h3 className="type-heading mb-2 text-xl font-bold">
              Unlimited Reading
            </h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to BoiMix Library Pass and get free delivery on all
              library borrows, extended reading periods, and no deposit fees.
            </p>
            <Button asChild className="w-fit">
              <Link href="/explore/central-library/memberships">
                Explore Plans
              </Link>
            </Button>
          </div>

          {/* Donate Banner */}
          <div className="bg-secondary/30 flex flex-col justify-center rounded-2xl border p-6 sm:p-8">
            <Badge
              variant="outline"
              className="border-primary text-primary mb-4 w-fit"
            >
              Community
            </Badge>
            <h3 className="type-heading mb-2 text-xl font-bold">
              Donate Your Books
            </h3>
            <p className="text-muted-foreground mb-6">
              Help us expand the central library. Donate your unused books and
              earn BoiMix points, badges, and free membership months.
            </p>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/explore/central-library/donate">
                Learn How to Donate
              </Link>
            </Button>
          </div>
        </div>

        {/* Trending Section */}
        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="type-display-4 text-foreground font-bold">
                Trending in Library
              </h2>
              <p className="text-muted-foreground mt-1">
                The most borrowed books this week.
              </p>
            </div>
          </div>

          <ScrollContainer>
            {renderBooks(trendingBooks).map((book) => (
              <div
                key={book.id}
                className="w-[160px] shrink-0 sm:w-[180px] md:w-[220px]"
              >
                <BookCard book={book} />
              </div>
            ))}
          </ScrollContainer>
        </section>
      </div>
    </MainLayout>
  );
}
