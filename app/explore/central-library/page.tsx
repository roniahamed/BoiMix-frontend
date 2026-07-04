import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Search,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
      <div className="bg-white pb-12 dark:bg-slate-950">
        {/* HERO SECTION */}
        <section className="relative mb-12 w-full overflow-hidden border-b border-slate-200 bg-slate-900 dark:border-slate-800">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <Image
              src="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80"
              alt="Library Interior"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/50"></div>

          <div className="boimix-container-wide relative z-10 grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:py-24">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h3 className="mb-4 text-sm font-bold tracking-widest text-blue-400 uppercase">
                BoiMix Central Library
              </h3>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Verified Books.
                <br />
                Trusted by Everyone.
              </h1>
              <p className="mb-8 max-w-xl text-lg text-slate-300">
                Explore 25,000+ verified books. Borrow or buy from the most
                trusted digital library in Bangladesh.
              </p>

              {/* Search Bar */}
              <div className="mb-10 flex max-w-xl flex-col gap-2 rounded-xl bg-white p-1 shadow-lg sm:flex-row">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search by title, author, ISBN or keyword..."
                    className="h-12 border-0 bg-transparent pl-4 text-base text-slate-900 shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                  />
                </div>
                <Button className="h-12 rounded-lg bg-blue-600 px-8 text-base font-semibold shadow-sm hover:bg-blue-700">
                  <Search className="mr-2 size-5" />
                  Search
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <BookOpen className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">25,000+</p>
                    <p className="text-xs text-slate-400">Verified Books</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">100%</p>
                    <p className="text-xs text-slate-400">Quality Checked</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">10,000+</p>
                    <p className="text-xs text-slate-400">Happy Members</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">64</p>
                    <p className="text-xs text-slate-400">Districts Covered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Floating Card */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800/60 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                  <Star className="size-6 fill-yellow-400 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">
                    Become a Member
                  </h3>
                </div>
                <p className="mb-6 text-sm text-slate-300">
                  Enjoy unlimited borrowing, exclusive discounts and member
                  benefits.
                </p>
                <div className="mb-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="size-5 shrink-0 text-yellow-400" />
                    <span className="text-sm text-slate-200">
                      Borrow books for up to 14 days
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="size-5 shrink-0 text-yellow-400" />
                    <span className="text-sm text-slate-200">
                      Priority access to new books
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="size-5 shrink-0 text-yellow-400" />
                    <span className="text-sm text-slate-200">
                      Special member discounts
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="size-5 shrink-0 text-yellow-400" />
                    <span className="text-sm text-slate-200">
                      No hidden charges
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  className="h-12 w-full rounded-xl bg-white font-bold text-slate-900 shadow-md hover:bg-slate-100"
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
        <section className="boimix-container-wide mb-14">
          <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
            Categories
          </h2>
          <ScrollContainer autoScroll={false} className="pb-4">
            <div className="flex gap-4">
              {CATEGORIES.map((cat, i) => (
                <Link
                  key={i}
                  href={`/books/categories/${cat.name.toLowerCase()}`}
                  className="group flex w-[140px] shrink-0 items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50/50 dark:border-slate-800 dark:hover:border-blue-900 dark:hover:bg-blue-900/20"
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${cat.border} ${cat.bg} dark:border-slate-700 dark:bg-slate-800`}
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
                href="/books/categories"
                className="group flex w-[100px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 p-3 transition-colors hover:border-slate-300 dark:border-slate-800"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <LayoutGrid className="size-5" />
                </div>
                <span className="text-[10px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-400">
                  View All
                </span>
              </Link>
            </div>
          </ScrollContainer>
        </section>

        {/* VERIFIED PICKS */}
        <section className="boimix-container-wide mb-14">
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

          <ScrollContainer className="pb-4">
            <div className="flex gap-4 md:gap-6">
              {renderFeat.map((book) => (
                <div
                  key={book.id}
                  className="w-[180px] shrink-0 sm:w-[200px] md:w-[220px]"
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </ScrollContainer>
        </section>

        {/* 2-COLUMN: NEW ARRIVALS & MOST BORROWED */}
        <section className="boimix-container-wide mb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* New Arrivals */}
            <div className="min-w-0">
              <div className="mb-5 flex items-center justify-between">
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
              <ScrollContainer className="pb-2" autoScroll={false}>
                <div className="flex gap-4">
                  {renderNew.map((book) => (
                    <div
                      key={book.id}
                      className="flex w-[140px] shrink-0 flex-col gap-2"
                    >
                      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md border border-slate-100 shadow-sm dark:border-slate-800">
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="line-clamp-2 text-sm leading-tight font-bold text-slate-900 dark:text-slate-100">
                          {book.title}
                        </h4>
                        <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                          {book.author}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-xs font-semibold">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          <span>{book.rating}</span>
                          <span className="font-normal text-slate-400">
                            ({book.totalReviews})
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-auto h-7 w-full rounded-md border-blue-200 text-xs text-blue-600 hover:bg-blue-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800"
                      >
                        Borrow
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollContainer>
            </div>

            {/* Most Borrowed */}
            <div className="min-w-0">
              <div className="mb-5 flex items-center justify-between">
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
              <ScrollContainer className="pb-2" autoScroll={false}>
                <div className="flex gap-4">
                  {renderMost.map((book) => (
                    <div
                      key={book.id}
                      className="flex w-[140px] shrink-0 flex-col gap-2"
                    >
                      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md border border-slate-100 shadow-sm dark:border-slate-800">
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="line-clamp-2 text-sm leading-tight font-bold text-slate-900 dark:text-slate-100">
                          {book.title}
                        </h4>
                        <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                          {book.author}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-xs font-semibold">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          <span>{book.rating}</span>
                          <span className="font-normal text-slate-400">
                            ({book.totalReviews})
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-auto h-7 w-full rounded-md border-blue-200 text-xs text-blue-600 hover:bg-blue-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800"
                      >
                        Borrow
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollContainer>
            </div>
          </div>
        </section>

        {/* POPULAR COLLECTIONS */}
        <section className="boimix-container-wide mb-16">
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
          <ScrollContainer className="pb-4" autoScroll={false}>
            <div className="flex gap-4">
              {POPULAR_COLLECTIONS.map((col, i) => (
                <Link
                  key={i}
                  href={`/explore/central-library/search?collection=${col.name}`}
                  className="group relative flex h-[160px] w-[260px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                  <div className="relative z-10 p-4">
                    <h3 className="text-lg font-bold text-white">{col.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-300">
                      {col.desc}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-slate-100">
                      {col.count}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollContainer>
        </section>

        {/* MEMBERSHIP PLANS */}
        <section className="boimix-container-wide mb-16">
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 md:p-10 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_2.5fr]">
              {/* Left Side */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h2 className="mb-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  Membership Plans
                </h2>
                <p className="mb-8 max-w-xs text-sm text-slate-600 dark:text-slate-400">
                  Choose the best plan for unlimited access.
                </p>
                {/* Illustration Placeholder */}
                <div className="relative h-40 w-48 opacity-80 mix-blend-multiply dark:opacity-60 dark:mix-blend-normal">
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-blue-200 text-blue-500">
                    <BookOpen className="size-16" />
                  </div>
                </div>
              </div>

              {/* Right Side - Plans */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Basic */}
                <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    Basic
                  </h3>
                  <div className="mb-6 flex items-baseline justify-center">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      ৳ 0
                    </span>
                    <span className="ml-1 text-sm text-slate-500">/month</span>
                  </div>
                  <ul className="mb-8 w-full space-y-3 text-left text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-green-500" />{" "}
                      Borrow up to 2 books
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-green-500" />{" "}
                      7 days duration
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-green-500" />{" "}
                      Standard support
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="mt-auto w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800"
                  >
                    Get Started
                  </Button>
                </div>

                {/* Premium */}
                <div className="relative z-10 flex scale-105 flex-col items-center rounded-2xl bg-white p-6 text-center shadow-xl ring-2 ring-blue-500 dark:bg-slate-900">
                  <Badge className="absolute -top-3 border-0 bg-blue-500 text-white shadow-sm hover:bg-blue-600">
                    Most Popular
                  </Badge>
                  <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    Premium
                  </h3>
                  <div className="mb-6 flex items-baseline justify-center">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      ৳ 199
                    </span>
                    <span className="ml-1 text-sm text-slate-500">/month</span>
                  </div>
                  <ul className="mb-8 w-full space-y-3 text-left text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-500" />{" "}
                      Borrow up to 5 books
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-500" />{" "}
                      14 days duration
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-500" />{" "}
                      Priority support
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-500" />{" "}
                      Access to new arrivals
                    </li>
                  </ul>
                  <Button className="mt-auto w-full rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700">
                    Choose Plan
                  </Button>
                </div>

                {/* Elite */}
                <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    Elite
                  </h3>
                  <div className="mb-6 flex items-baseline justify-center">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      ৳ 499
                    </span>
                    <span className="ml-1 text-sm text-slate-500">/month</span>
                  </div>
                  <ul className="mb-8 w-full space-y-3 text-left text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-green-500" />{" "}
                      Borrow up to 10 books
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-green-500" />{" "}
                      21 days duration
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-green-500" />{" "}
                      Priority support
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-green-500" />{" "}
                      Special member benefits
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="mt-auto w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800"
                  >
                    Choose Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE BOIMIX */}
        <section className="boimix-container-wide mb-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-slate-900 lg:text-3xl dark:text-white">
                  Why Choose BoiMix
                  <br />
                  Central Library?
                </h2>
                <div className="mb-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      100% verified and quality checked books
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Easy borrowing with simple process
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Affordable membership plans
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Nationwide delivery & return support
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Trusted by thousands of readers
                    </span>
                  </div>
                </div>
                <Button className="rounded-lg bg-[#0b3b8c] px-6 text-white shadow-sm hover:bg-[#082a66]">
                  Learn More <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>

            {/* Right Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
                  <BookOpen className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    25,000+
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Verified Books
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400">
                  <MonitorPlay className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    10,000+
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Active Members
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-12 items-center justify-center rounded-xl bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <Users className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    64
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Districts Covered
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-900/20 dark:text-amber-400">
                  <Star className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    4.8/5
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Average Rating
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400">
                  <MonitorPlay className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    98%
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Member Satisfaction
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500 dark:bg-rose-900/20 dark:text-rose-400">
                  <Heart className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    500+
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Books Added Monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="boimix-container-wide mb-16">
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
                className="group rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
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
        </section>

        {/* BOTTOM BANNER */}
        <section className="boimix-container-wide mb-8">
          <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl bg-[#0b284e] px-8 py-12 shadow-xl md:flex-row md:px-12">
            {/* Background design elements if any */}
            <div className="pointer-events-none absolute right-0 bottom-0 hidden opacity-20 md:block">
              {/* Just a decorative block */}
              <div className="h-64 w-64 rounded-full bg-blue-500 blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="mb-4 text-2xl font-extrabold text-white md:text-3xl">
                Join Thousands of Readers Today
              </h2>
              <p className="mb-8 text-blue-100">
                Start your reading journey with BoiMix Central Library.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-white px-8 font-bold text-slate-900 shadow-md hover:bg-slate-100"
              >
                <Link href="/explore/central-library/search">
                  Explore Books <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
            <div className="relative z-10 hidden shrink-0 items-center justify-center md:flex">
              <div className="relative h-40 w-48 lg:h-48 lg:w-64">
                {/* Illustration placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-blue-800 bg-blue-900/50">
                  <BookOpen className="size-16 text-blue-300" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
