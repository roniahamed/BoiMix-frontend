import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  CheckCircle2,
  Star,
  Shield,
  BookMarked,
  MapPin,
  Users,
  Check,
  Heart,
  MonitorPlay,
  BriefcaseMedical,
  GraduationCap,
  ChevronDown,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";

import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { ScrollContainer } from "@/components/shared/scroll-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LibrarySearchBar } from "@/components/shared/library-search-bar";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";

// Categories Mock
const CATEGORIES = [
  {
    name: "Academic",
    count: "2,400 Books",
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    name: "Novel",
    count: "3,120 Books",
    icon: BookMarked,
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    name: "Science",
    count: "1,980 Books",
    icon: Star,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    name: "History",
    count: "1,250 Books",
    icon: MapPin,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    name: "Islamic",
    count: "1,870 Books",
    icon: Heart,
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    name: "Engineering",
    count: "2,100 Books",
    icon: MonitorPlay,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    name: "Medical",
    count: "950 Books",
    icon: BriefcaseMedical,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    name: "BCS",
    count: "1,400 Books",
    icon: Shield,
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    name: "Kids",
    count: "1,860 Books",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
  },
  {
    name: "Comics",
    count: "870 Books",
    icon: Heart,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
];

const POPULAR_COLLECTIONS = [
  {
    name: "Exam Preparation",
    desc: "Best books for BCS, university & job exams.",
    count: "120+ Books",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Self Improvement",
    desc: "Build skills, habits and become your best self.",
    count: "85+ Books",
    image:
      "https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Business & Finance",
    desc: "Grow your career and financial knowledge.",
    count: "150+ Books",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Classic Literature",
    desc: "Timeless stories from world's best writers.",
    count: "200+ Books",
    image:
      "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Motivational Reads",
    desc: "Inspire your mind and change your life.",
    count: "90+ Books",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b62f4d34?auto=format&fit=crop&q=80&w=400",
  },
];

const FAQS = [
  {
    q: "How does borrowing work?",
    a: "You can borrow books by subscribing to a membership plan. Once subscribed, you can request books from our Central Library and we will deliver them to your address.",
  },
  {
    q: "How long can I keep a book?",
    a: "The duration depends on your membership plan. Basic allows 7 days, Premium allows 14 days, and Elite allows up to 21 days.",
  },
  {
    q: "How can I join the membership?",
    a: "Simply click on 'View Membership Plans' at the top of this page, select the plan that suits you best, and follow the checkout process.",
  },
  {
    q: "Can I renew a borrowed book?",
    a: "Yes, subject to availability. If no one else has requested the book, you can renew it from your dashboard before the due date.",
  },
  {
    q: "Is delivery available?",
    a: "Yes, we provide nationwide delivery. Premium and Elite members enjoy free or express delivery.",
  },
  {
    q: "Can I cancel the membership?",
    a: "You can cancel your membership at any time from your account settings. Benefits will continue until the end of your billing cycle.",
  },
];

export default async function CentralLibraryPage() {
  const allBooks: BookCardBook[] = (await fetchLocal("/api/books")) || [];

  // Filter only library books
  const libraryBooks = allBooks.filter(
    (book) => book.providerType === "library" || book.tags?.includes("library"),
  );

  // Create splits
  const featuredBooks = libraryBooks.slice(0, 5);
  const newArrivals = libraryBooks.slice(5, 9);
  const mostBorrowed = libraryBooks.slice(9, 13);

  // Fillers if empty
  const fallbackBooks = allBooks.slice(0, 10);
  const renderFeat =
    featuredBooks.length > 0 ? featuredBooks : fallbackBooks.slice(0, 5);
  const renderNew =
    newArrivals.length > 0 ? newArrivals : fallbackBooks.slice(5, 9);
  const renderMost =
    mostBorrowed.length > 0 ? mostBorrowed : fallbackBooks.slice(0, 4);

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="boimix-container-wide relative mt-6 mb-2.5 flex min-h-[400px] rounded-lg border border-slate-200 bg-white shadow-sm lg:h-[400px] lg:max-h-[400px] dark:border-slate-800 dark:bg-slate-950">
        {/* Split Background with Gradient Transition */}
        <div className="absolute inset-0 flex w-full overflow-hidden rounded-lg">
          <div className="z-10 w-full bg-white lg:w-[45%] dark:bg-slate-950"></div>
          <div className="relative hidden lg:block lg:w-[55%]">
            <Image
              src="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80"
              alt="Library Interior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-slate-900/30"></div>
            {/* Gradient fade transition */}
            <div className="absolute inset-y-0 left-0 z-10 w-48 bg-gradient-to-r from-white to-transparent dark:from-slate-950"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 grid w-full items-center px-6 md:px-12 lg:grid-cols-[1.2fr_1fr] lg:px-16">
          {/* Left Content (White Background area) */}
          <div className="py-8 pr-6 lg:py-10 lg:pr-12">
            <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-blue-600 uppercase">
              BoiMix Central Library
            </h3>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.15] dark:text-white">
              Verified Books.
              <br />
              Trusted by Everyone.
            </h1>
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Explore 25,000+ verified books. Borrow or buy from the most
              trusted digital library in Bangladesh.
            </p>

            {/* Search Bar */}
            <LibrarySearchBar
              variant="hero"
              className="relative mb-6 flex max-w-xl flex-col gap-2 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm sm:flex-row"
            />

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:flex-nowrap lg:gap-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    25,000+
                  </p>
                  <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    Verified Books
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    100%
                  </p>
                  <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    Quality Checked
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                  <Users className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    10,000+
                  </p>
                  <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    Happy Members
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    64
                  </p>
                  <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    Districts Covered
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content (Floating Card) */}
          <div className="relative hidden h-full items-center justify-end lg:flex">
            {/* Floating Card */}
            <div className="-mt-2.5 w-[340px] rounded-lg border border-white/10 bg-slate-800/90 p-5 shadow-2xl backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3">
                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">
                  Become a Member
                </h3>
              </div>
              <p className="mb-3 text-sm leading-snug text-slate-300">
                Enjoy unlimited borrowing, exclusive discounts and member
                benefits.
              </p>
              <div className="mb-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-yellow-400"
                    strokeWidth={3}
                  />
                  <span className="text-sm text-slate-200">
                    Borrow books for up to 21 days
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-yellow-400"
                    strokeWidth={3}
                  />
                  <span className="text-sm text-slate-200">
                    Priority access to new books
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-yellow-400"
                    strokeWidth={3}
                  />
                  <span className="text-sm text-slate-200">
                    Special member discounts
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-yellow-400"
                    strokeWidth={3}
                  />
                  <span className="text-sm text-slate-200">
                    No hidden charges
                  </span>
                </div>
              </div>
              <Button
                asChild
                className="h-10 w-full rounded-lg bg-white font-bold text-slate-900 shadow-md hover:bg-slate-100"
              >
                <Link href="/explore/central-library/memberships">
                  View Membership Plans <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORIES */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div>
          <h2 className="mb-0 text-xl font-bold text-slate-900 dark:text-white">
            Categories
          </h2>
          <ScrollContainer autoScroll={false} className="mt-[15px] pb-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                href={`/explore/central-library/search?category=${encodeURIComponent(cat.name)}`}
                className="group flex w-[160px] shrink-0 items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${cat.bg} dark:bg-slate-800`}
                >
                  <cat.icon
                    className={`size-5 ${cat.color} dark:text-slate-300`}
                    strokeWidth={2}
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {cat.name}
                  </h4>
                  <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                    {cat.count}
                  </p>
                </div>
              </Link>
            ))}
            <Link
              href="/books/category"
              className="group flex w-[100px] shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <LayoutGrid className="size-5" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-400">
                View All
              </span>
            </Link>
          </ScrollContainer>
        </div>
      </section>

      {/* VERIFIED PICKS */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-blue-600 text-white">
                <Check className="size-4" strokeWidth={3} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Verified Picks
              </h2>
            </div>
            <Link
              href="/explore/central-library/search?tag=featured"
              className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View All Books <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>

          <ScrollContainer className="gap-4 pb-4 md:gap-6">
            {renderFeat.map((book) => (
              <div
                key={book.id}
                className="w-[180px] shrink-0 sm:w-[200px] md:w-[220px]"
              >
                <BookCard book={book} />
              </div>
            ))}
          </ScrollContainer>
        </div>
      </section>

      {/* 2-COLUMN: NEW ARRIVALS & MOST BORROWED */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* New Arrivals */}
          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-6 flex items-center justify-between">
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
            <ScrollContainer className="gap-5 pb-4" autoScroll={false}>
              {renderNew.map((book) => (
                <div
                  key={book.id}
                  className="flex w-[140px] shrink-0 flex-col gap-3"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-100 shadow-sm dark:border-slate-800">
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h4 className="mb-1 line-clamp-2 text-sm leading-tight font-bold text-slate-900 dark:text-slate-100">
                      {book.title}
                    </h4>
                    <p className="mb-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                      {book.author}
                    </p>
                    <div className="mt-auto mb-3 flex items-center gap-1 text-xs font-semibold">
                      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating > 0 ? book.rating : "New"}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-full rounded-full border-blue-600 bg-transparent text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      Borrow
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollContainer>
          </div>

          {/* Most Borrowed */}
          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-6 flex items-center justify-between">
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
            <ScrollContainer className="gap-5 pb-4" autoScroll={false}>
              {renderMost.map((book) => (
                <div
                  key={book.id}
                  className="flex w-[140px] shrink-0 flex-col gap-3"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-100 shadow-sm dark:border-slate-800">
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h4 className="mb-1 line-clamp-2 text-sm leading-tight font-bold text-slate-900 dark:text-slate-100">
                      {book.title}
                    </h4>
                    <p className="mb-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                      {book.author}
                    </p>
                    <div className="mt-auto mb-3 flex items-center gap-1 text-xs font-semibold">
                      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating > 0 ? book.rating : "4.5"}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-full rounded-full border-blue-600 bg-transparent text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      Borrow
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollContainer>
          </div>
        </div>
      </section>

      {/* POPULAR COLLECTIONS */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Popular Collections
            </h2>
            <Link
              href="/explore/central-library/search?type=collections"
              className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View All Collections <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <ScrollContainer className="gap-5 pb-4" autoScroll={false}>
            {POPULAR_COLLECTIONS.map((col, i) => (
              <Link
                key={i}
                href={`/explore/central-library/search?collection=${col.name}`}
                className="group relative flex h-[160px] w-[260px] shrink-0 flex-col justify-end overflow-hidden rounded-lg shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20"></div>
                <div className="relative z-10 p-5">
                  <h3 className="mb-1 text-base font-bold text-white">
                    {col.name}
                  </h3>
                  <p className="mb-2 line-clamp-2 text-[11px] leading-tight text-slate-200">
                    {col.desc}
                  </p>
                  <p className="text-[11px] font-bold text-white">
                    {col.count}
                  </p>
                </div>
              </Link>
            ))}
          </ScrollContainer>
        </div>
      </section>

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
              {/* Illustration Placeholder - plants and books */}
              <div className="relative hidden h-40 w-48 opacity-90 lg:block">
                <div className="absolute bottom-0 flex items-end gap-4">
                  {/* Fake Plant */}
                  <div className="h-24 w-10 rounded-t-full rounded-b-md bg-teal-600"></div>
                  {/* Fake Books */}
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
                  variant="outline"
                  className="mt-auto h-11 w-full rounded-lg border-blue-600 bg-transparent font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                >
                  Get Started
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
                <Button className="mt-auto h-11 w-full rounded-lg bg-blue-600 font-bold text-white shadow-md hover:bg-blue-700">
                  Choose Plan
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
                  variant="outline"
                  className="mt-auto h-11 w-full rounded-lg border-blue-600 bg-transparent font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                >
                  Choose Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BOIMIX */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          {/* Left Box */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-slate-100 bg-white p-8 shadow-sm md:p-10 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative z-10">
              <h2 className="mb-6 text-2xl font-bold text-slate-900 lg:text-3xl lg:leading-tight dark:text-white">
                Why Choose BoiMix
                <br className="hidden lg:block" />
                Central Library?
              </h2>
              <div className="mb-8 space-y-3.5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    100% verified and quality checked books
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Easy borrowing with simple process
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Affordable membership plans
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Nationwide delivery & return support
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Trusted by thousands of readers
                  </span>
                </div>
              </div>
              <Button className="h-10 rounded-lg bg-[#0f449e] px-6 font-bold text-white shadow-none hover:bg-[#0a3175]">
                Learn More <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>

            {/* Illustration (absolute positioned) */}
            <div className="absolute -right-6 -bottom-6 hidden h-[280px] w-[240px] opacity-100 md:block">
              {/* Using a placeholder SVG from an open source illustration set */}
              <Image
                src="https://illustrations.popsy.co/amber/reading.svg"
                alt="Reading Book"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Right Grid (Stats) */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-900/20">
                <BookOpen className="size-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  25,000+
                </h4>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                  Verified Books
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-500 dark:bg-purple-900/20">
                <Users className="size-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  10,000+
                </h4>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                  Active Members
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600 dark:bg-slate-800">
                <MapPin className="size-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  64
                </h4>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                  Districts Covered
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500 dark:bg-amber-900/20">
                <Star className="size-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  4.8/5
                </h4>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                  Average Rating
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  98%
                </h4>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                  Member Satisfaction
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500 dark:bg-rose-900/20">
                <Heart className="size-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  500+
                </h4>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase dark:text-slate-400">
                  Books Added Monthly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="boimix-container-wide mb-6 md:mb-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <Link
              href="/faq"
              className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View All <ArrowRight className="ml-1 size-3" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-slate-800 dark:text-slate-200 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="size-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="boimix-container-wide mb-16">
        <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-lg border border-white/10 bg-slate-800/90 px-8 py-10 shadow-xl backdrop-blur-xl md:flex-row md:px-12">
          {/* Background design elements */}
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
            {/* Illustration placeholder */}
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
