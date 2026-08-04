import Link from "next/link";
import Image from "next/image";
import { Star, Check, ArrowRight } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { ScrollContainer } from "@/components/shared/scroll-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { fetchBooks } from "@/lib/api-client";
import type { BookCardBook } from "@/types/book";

import { CENTRAL_LIBRARY_FAQS } from "@/lib/data/central-library";
import { CentralHero } from "@/components/explore/central-library/central-hero";
import { CentralCategories } from "@/components/explore/central-library/central-categories";
import { CentralCollections } from "@/components/explore/central-library/central-collections";
import { CentralWhyUs } from "@/components/explore/central-library/central-why-us";

export default async function CentralLibraryPage() {
  const allBooks: BookCardBook[] = (await fetchBooks()) || [];

  // Filter only library books
  const libraryBooks = allBooks.filter(
    (book) => book.providerType === "library" || book.tags?.includes("library"),
  );

  // Create splits
  const featuredBooks = libraryBooks.slice(0, 6);
  const newArrivals = libraryBooks.slice(6, 10);
  const mostBorrowed = libraryBooks.slice(10, 14);

  // Fillers if empty
  const fallbackBooks = allBooks.slice(0, 12);
  const renderFeat =
    featuredBooks.length > 0
      ? featuredBooks.slice(0, 6)
      : fallbackBooks.slice(0, 6);
  const renderNew =
    newArrivals.length > 0 ? newArrivals : fallbackBooks.slice(5, 9);
  const renderMost =
    mostBorrowed.length > 0 ? mostBorrowed : fallbackBooks.slice(0, 4);

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <CentralHero />

      {/* BROWSE BY CATEGORIES */}
      <CentralCategories />

      {/* FEATURED BOOKS */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="sm:rounded-lg sm:border sm:border-slate-200 sm:bg-white sm:p-6 sm:shadow-sm dark:sm:border-slate-800 dark:sm:bg-slate-900/50">
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-blue-600 text-white">
                <Star className="size-4 fill-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Featured Books
              </h2>
            </div>
            <Link
              href="/explore/central-library/search?tag=featured"
              className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View All <span className="hidden sm:inline">&nbsp;Books</span>{" "}
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {renderFeat.map((book) => (
              <div key={book.id}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2-COLUMN: NEW ARRIVALS & MOST BORROWED */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* New Arrivals */}
          <div className="min-w-0 sm:rounded-lg sm:border sm:border-slate-200 sm:bg-white sm:p-6 sm:shadow-sm dark:sm:border-slate-800 dark:sm:bg-slate-900/50">
            <div className="mb-4 flex items-center justify-between sm:mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                New Arrivals
              </h3>
              <Link
                href="/explore/central-library/search?sort=new"
                className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View All <ArrowRight className="ml-1 size-3" />
              </Link>
            </div>
            <ScrollContainer className="gap-3 pb-4 sm:gap-5" autoScroll={false}>
              {renderNew.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.slug}`}
                  className="group flex w-[140px] shrink-0 flex-col gap-2 max-sm:rounded-lg max-sm:border max-sm:border-slate-200 max-sm:bg-white max-sm:p-2 max-sm:shadow-sm max-sm:dark:border-slate-800 max-sm:dark:bg-slate-900"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-100 shadow-sm transition-transform group-hover:scale-[1.02] max-sm:rounded-md dark:border-slate-800">
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="line-clamp-2 text-sm leading-tight font-bold text-slate-900 group-hover:text-blue-600 dark:text-slate-100">
                      {book.title}
                    </h4>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                      {book.author}
                    </p>
                  </div>
                </Link>
              ))}
            </ScrollContainer>
          </div>

          {/* Most Borrowed */}
          <div className="min-w-0 sm:rounded-lg sm:border sm:border-slate-200 sm:bg-white sm:p-6 sm:shadow-sm dark:sm:border-slate-800 dark:sm:bg-slate-900/50">
            <div className="mb-4 flex items-center justify-between sm:mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Most Borrowed
              </h3>
              <Link
                href="/explore/central-library/search?sort=popular"
                className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View All <ArrowRight className="ml-1 size-3" />
              </Link>
            </div>
            <ScrollContainer className="gap-3 pb-4 sm:gap-5" autoScroll={false}>
              {renderMost.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.slug}`}
                  className="group flex w-[140px] shrink-0 flex-col gap-2 max-sm:rounded-lg max-sm:border max-sm:border-slate-200 max-sm:bg-white max-sm:p-2 max-sm:shadow-sm max-sm:dark:border-slate-800 max-sm:dark:bg-slate-900"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-100 shadow-sm transition-transform group-hover:scale-[1.02] max-sm:rounded-md dark:border-slate-800">
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="line-clamp-2 text-sm leading-tight font-bold text-slate-900 group-hover:text-blue-600 dark:text-slate-100">
                      {book.title}
                    </h4>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                      {book.author}
                    </p>
                  </div>
                </Link>
              ))}
            </ScrollContainer>
          </div>
        </div>
      </section>

      {/* POPULAR COLLECTIONS */}
      <CentralCollections />

      {/* MEMBERSHIP PLANS */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="rounded-lg bg-[#f5f9ff] p-8 md:p-12 dark:bg-slate-900/50">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_2fr]">
            {/* Left Side */}
            <div className="flex h-full flex-col items-center justify-between text-center lg:items-start lg:text-left">
              <div>
                <h2 className="mb-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  Membership Plans
                </h2>
                <p className="mb-8 max-w-xs text-sm text-slate-600 dark:text-slate-400">
                  Choose the best plan for unlimited access.
                </p>
              </div>
              <div className="relative hidden h-40 w-48 opacity-90 lg:block">
                <div className="absolute bottom-0 flex items-end gap-4">
                  <div className="h-24 w-10 rounded-t-full rounded-b-md bg-teal-600"></div>
                  <div className="flex w-24 flex-col gap-1">
                    <div className="h-4 rounded bg-orange-400"></div>
                    <div className="h-5 rounded bg-blue-500"></div>
                    <div className="h-6 rounded bg-slate-300"></div>
                    <div className="h-4 rounded bg-rose-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Plans */}
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Basic */}
              <div className="flex flex-col items-center rounded-lg border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                  Basic
                </h3>
                <div className="mb-6 flex items-baseline justify-center">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ৳ 0
                  </span>
                  <span className="ml-1 text-[11px] tracking-wider text-slate-500 uppercase">
                    /month
                  </span>
                </div>
                <ul className="mb-8 w-full space-y-3 text-left text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-slate-400"
                      strokeWidth={3}
                    />{" "}
                    Borrow up to 2 books
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-slate-400"
                      strokeWidth={3}
                    />{" "}
                    7 days duration
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-slate-400"
                      strokeWidth={3}
                    />{" "}
                    Standard support
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="mt-auto h-11 w-full rounded-lg border-blue-600 bg-transparent font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                >
                  <Link href="/explore/central-library/memberships?plan=basic">
                    Get Started
                  </Link>
                </Button>
              </div>

              {/* Premium */}
              <div className="relative z-10 flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-xl ring-2 ring-blue-500 sm:scale-105 dark:bg-slate-900">
                <Badge className="absolute -top-3 border-0 bg-blue-500 px-3 py-0.5 font-bold text-white shadow-sm hover:bg-blue-600">
                  Most Popular
                </Badge>
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                  Premium
                </h3>
                <div className="mb-6 flex items-baseline justify-center">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ৳ 199
                  </span>
                  <span className="ml-1 text-[11px] tracking-wider text-slate-500 uppercase">
                    /month
                  </span>
                </div>
                <ul className="mb-8 w-full space-y-3 text-left text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-blue-500"
                      strokeWidth={3}
                    />{" "}
                    Borrow up to 5 books
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-blue-500"
                      strokeWidth={3}
                    />{" "}
                    14 days duration
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-blue-500"
                      strokeWidth={3}
                    />{" "}
                    Priority support
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-blue-500"
                      strokeWidth={3}
                    />{" "}
                    Access to new arrivals
                  </li>
                </ul>
                <Button
                  asChild
                  className="mt-auto h-11 w-full rounded-lg bg-blue-600 font-bold text-white shadow-md hover:bg-blue-700"
                >
                  <Link href="/explore/central-library/memberships?plan=premium">
                    Choose Plan
                  </Link>
                </Button>
              </div>

              {/* Elite */}
              <div className="flex flex-col items-center rounded-lg border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                  Elite
                </h3>
                <div className="mb-6 flex items-baseline justify-center">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ৳ 499
                  </span>
                  <span className="ml-1 text-[11px] tracking-wider text-slate-500 uppercase">
                    /month
                  </span>
                </div>
                <ul className="mb-8 w-full space-y-3 text-left text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-slate-400"
                      strokeWidth={3}
                    />{" "}
                    Borrow up to 10 books
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-slate-400"
                      strokeWidth={3}
                    />{" "}
                    21 days duration
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-slate-400"
                      strokeWidth={3}
                    />{" "}
                    Priority support
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-slate-400"
                      strokeWidth={3}
                    />{" "}
                    Special member benefits
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="mt-auto h-11 w-full rounded-lg border-blue-600 bg-transparent font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                >
                  <Link href="/explore/central-library/memberships?plan=elite">
                    Choose Plan
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BOIMIX */}
      <CentralWhyUs />

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              সচরাচর জিজ্ঞাসা
            </h2>
            <Link
              href="/faq"
              className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              সব দেখুন <ArrowRight className="ml-1 size-3" />
            </Link>
          </div>
          <FaqAccordion faqs={CENTRAL_LIBRARY_FAQS} />
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="boimix-container-wide mb-16">
        <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-lg border border-white/10 bg-slate-800/90 px-8 py-10 shadow-xl backdrop-blur-xl md:flex-row md:px-12">
          <div
            className="absolute top-0 right-0 hidden h-full w-1/3 bg-blue-900/20 md:block"
            style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
          ></div>

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Join Thousands of Readers Today
            </h2>
            <p className="mb-6 text-sm text-slate-300">
              Start your reading journey with BoiMix Central Library.
            </p>
            <Button
              asChild
              className="h-10 rounded-lg border border-slate-200 bg-white px-6 font-bold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              <Link href="/explore/central-library/search">
                Explore Books <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <div className="relative z-10 hidden shrink-0 items-center justify-center md:flex">
            <div className="relative flex h-32 w-48 items-end justify-center gap-2">
              <div className="h-20 w-16 rounded bg-blue-600"></div>
              <div className="h-28 w-12 rounded bg-emerald-600"></div>
              <div className="h-16 w-14 rounded bg-slate-300"></div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
