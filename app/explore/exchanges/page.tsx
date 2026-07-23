import Link from "next/link";
import {
  ArrowRight,
  RefreshCw,
  Search,
  MapPin,
  BookOpen,
  Users,
  Star,
  ArrowLeftRight,
  Upload,
  Handshake,
  PackageCheck,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { LibrarySearchBar } from "@/components/shared/library-search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";

const EXCHANGE_CATEGORIES = [
  { label: "উপন্যাস", value: "Novel", icon: "📖" },
  { label: "একাডেমিক", value: "Academic", icon: "🎓" },
  { label: "বিজ্ঞান", value: "Science", icon: "🔬" },
  { label: "ইসলামিক", value: "Islamic", icon: "☪️" },
  { label: "ইতিহাস", value: "History", icon: "🏛️" },
  { label: "কমিক্স", value: "Comics", icon: "🎨" },
  { label: "শিশু", value: "Kids", icon: "🧸" },
  { label: "মোটিভেশন", value: "Motivation", icon: "💡" },
];

const HOW_IT_WORKS = [
  {
    icon: Upload,
    step: "01",
    title: "List Your Book",
    desc: "আপনার পুরনো বই আপলোড করুন এবং এক্সচেঞ্জের জন্য লিস্ট করুন।",
  },
  {
    icon: Search,
    step: "02",
    title: "Find a Match",
    desc: "অন্যদের বই ব্রাউজ করুন এবং পছন্দের বইয়ে এক্সচেঞ্জ অফার পাঠান।",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Agree & Exchange",
    desc: "দুইজন রাজি হলে এক্সচেঞ্জ কনফার্ম হবে এবং বই পাঠানো শুরু হবে।",
  },
  {
    icon: PackageCheck,
    step: "04",
    title: "Receive & Enjoy",
    desc: "বই পেয়ে কনফার্ম করুন। এক্সচেঞ্জ সম্পন্ন!",
  },
];

const STATS = [
  { label: "Active Exchanges", value: "3,200+", icon: ArrowLeftRight },
  { label: "Happy Readers", value: "12,000+", icon: Users },
  { label: "Books Listed", value: "18,000+", icon: BookOpen },
  { label: "Average Rating", value: "4.7/5", icon: Star },
];

export default async function ExploreExchangesPage() {
  const allBooks: BookCardBook[] = (await fetchLocal("/api/books")) || [];

  // For exchanges, use books that are not library type as "available for exchange"
  const exchangeBooks = allBooks.filter(
    (b) => b.providerType !== "library" && b.tags?.includes("exchange"),
  );
  const renderBooks =
    exchangeBooks.length > 0 ? exchangeBooks : allBooks.slice(0, 12);

  const recentlyAdded = renderBooks.slice(0, 6);
  const nearYou = renderBooks.slice(6, 12);

  return (
    <MainLayout>
      {/* HERO */}
      <section className="boimix-container-wide relative mt-6 mb-6 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="relative z-10 flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-12">
          {/* Left */}
          <div className="max-w-lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <RefreshCw className="size-4" />
              </div>
              <Badge className="border-0 bg-emerald-100 font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                Exchange Books
              </Badge>
            </div>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              Exchange Books,{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Discover New Stories
              </span>
            </h1>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              আপনার পড়া শেষ হয়ে যাওয়া বই অন্যজনকে দিন, বদলে পান নতুন বই —
              সম্পূর্ণ বিনামূল্যে।
            </p>

            {/* Search bar */}
            <LibrarySearchBar
              variant="hero"
              mode="exchanges"
              action="/explore/exchanges/search"
              placeholder="Search books to exchange..."
              className="relative mb-6 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm sm:flex-row"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {EXCHANGE_CATEGORIES.slice(0, 4).map((cat) => (
                <Link
                  key={cat.value}
                  href={`/explore/exchanges/search?category=${cat.value}`}
                  className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {cat.icon} {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — Illustration */}
          <div className="relative hidden shrink-0 md:block">
            <div className="relative flex h-52 w-64 items-end justify-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="h-40 w-24 rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-lg" />
                <div className="h-3 w-24 rounded-full bg-slate-200" />
              </div>
              <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-white shadow-md">
                <ArrowLeftRight className="size-5 text-emerald-600" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-40 w-24 rounded-lg bg-gradient-to-b from-teal-400 to-teal-600 shadow-lg" />
                <div className="h-3 w-24 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="boimix-container-wide mb-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20">
                  <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {s.value}
                </p>
                <p className="text-xs font-medium text-slate-500 uppercase dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="boimix-container-wide mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Browse by Category
            </h2>
            <Link
              href="/explore/exchanges/search"
              className="flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              View All <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
            {EXCHANGE_CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/explore/exchanges/search?category=${cat.value}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center transition-colors hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/10"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="boimix-container-wide mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                      <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-2xl font-extrabold text-slate-200 dark:text-slate-700">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECENTLY ADDED */}
      <section className="boimix-container-wide mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recently Added
            </h2>
            <Link
              href="/explore/exchanges/search?sort=newest"
              className="flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              View All <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {recentlyAdded.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* NEAR YOU */}
      <section className="boimix-container-wide mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Near You
              </h2>
            </div>
            <Link
              href="/explore/exchanges/search?sort=nearby"
              className="flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              View All <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {nearYou.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="boimix-container-wide mb-16">
        <div className="flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-10 text-center shadow-xl md:flex-row md:text-left">
          <div>
            <h2 className="mb-2 text-2xl font-extrabold text-white md:text-3xl">
              Got books to exchange?
            </h2>
            <p className="text-sm text-emerald-100">
              আপনার পুরনো বই লিস্ট করুন এবং নতুন কিছু পড়ার সুযোগ নিন।
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button
              asChild
              className="h-11 rounded-lg bg-white px-6 font-bold text-emerald-700 shadow-sm hover:bg-emerald-50"
            >
              <Link href="/books/upload">
                List Your Book <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-lg border-white/40 bg-white/10 px-6 font-bold text-white hover:bg-white/20"
            >
              <Link href="/explore/exchanges/search">Browse Exchanges</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
