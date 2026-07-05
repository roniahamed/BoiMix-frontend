import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  BookOpen,
  Users,
  Star,
  Ticket,
  Mic2,
  Trophy,
  Clock,
  Heart,
  BadgeCheck,
  PartyPopper,
  ShoppingBag,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { BookCard } from "@/components/shared/book-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";

const FESTIVAL_CATEGORIES = [
  { label: "উপন্যাস", value: "Novel", icon: "📖" },
  { label: "কবিতা", value: "Poetry", icon: "✍️" },
  { label: "ইতিহাস", value: "History", icon: "🏛️" },
  { label: "বিজ্ঞান", value: "Science", icon: "🔬" },
  { label: "মুক্তিযুদ্ধ", value: "Liberation", icon: "🇧🇩" },
  { label: "শিশু", value: "Kids", icon: "🧸" },
  { label: "ইসলামিক", value: "Islamic", icon: "☪️" },
  { label: "আত্মজীবনী", value: "Biography", icon: "👤" },
];

const UPCOMING_EVENTS = [
  {
    date: "ফেব্রুয়ারি ১",
    month: "FEB",
    day: "01",
    title: "বইমেলা উদ্বোধন",
    time: "সকাল ১০টা",
    location: "বাংলা একাডেমি, ঢাকা",
    type: "ceremony",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50 dark:bg-rose-900/10",
    border: "border-rose-200 dark:border-rose-800",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    date: "ফেব্রুয়ারি ৫",
    month: "FEB",
    day: "05",
    title: "তরুণ লেখক সম্মেলন",
    time: "বিকেল ৩টা",
    location: "ঢাকা বিশ্ববিদ্যালয়, টিএসসি",
    type: "seminar",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-900/10",
    border: "border-violet-200 dark:border-violet-800",
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
  {
    date: "ফেব্রুয়ারি ১২",
    month: "FEB",
    day: "12",
    title: "সেরা বইয়ের পুরস্কার প্রদান",
    time: "সন্ধ্যা ৬টা",
    location: "জাতীয় জাদুঘর, শাহবাগ",
    type: "award",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-900/10",
    border: "border-amber-200 dark:border-amber-800",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    date: "ফেব্রুয়ারি ২১",
    month: "FEB",
    day: "21",
    title: "আন্তর্জাতিক মাতৃভাষা দিবস",
    time: "ভোর ৬টা",
    location: "কেন্দ্রীয় শহীদ মিনার",
    type: "special",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    border: "border-emerald-200 dark:border-emerald-800",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
];

const FESTIVAL_STATS = [
  { label: "প্রকাশক", value: "৬০০+", icon: BookOpen },
  { label: "পাঠক অংশগ্রহণ", value: "১৫ লাখ+", icon: Users },
  { label: "ডিসকাউন্ট পর্যন্ত", value: "৪০%", icon: ShoppingBag },
  { label: "পুরস্কারপ্রাপ্ত বই", value: "১২০+", icon: Trophy },
];

const FEATURED_AUTHORS = [
  {
    name: "হুমায়ূন আহমেদ",
    genre: "উপন্যাস",
    books: "২০০+",
    avatar: "হ",
    color: "bg-gradient-to-br from-rose-400 to-pink-600",
  },
  {
    name: "মুহম্মদ জাফর ইকবাল",
    genre: "বিজ্ঞান কল্পকাহিনী",
    books: "১৫০+",
    avatar: "জ",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
  },
  {
    name: "আনিসুল হক",
    genre: "উপন্যাস",
    books: "৭০+",
    avatar: "আ",
    color: "bg-gradient-to-br from-amber-400 to-orange-600",
  },
  {
    name: "সেলিনা হোসেন",
    genre: "মুক্তিযুদ্ধ",
    books: "৪০+",
    avatar: "স",
    color: "bg-gradient-to-br from-emerald-400 to-teal-600",
  },
];

const EVENT_TYPE_LABEL: Record<string, string> = {
  ceremony: "অনুষ্ঠান",
  seminar: "সেমিনার",
  award: "পুরস্কার",
  special: "বিশেষ দিন",
};

export default async function ExploreFestivalPage() {
  const allBooks: BookCardBook[] = (await fetchLocal("/api/books")) || [];

  const festivalBooks = allBooks.slice(0, 12);
  const featuredBooks = festivalBooks.slice(0, 6);
  const newArrivals = festivalBooks.slice(6, 12);

  return (
    <MainLayout>
      {/* HERO — বইমেলা ব্যানার */}
      <section className="boimix-container-wide relative mt-6 mb-6 overflow-hidden rounded-xl border border-rose-200 shadow-md dark:border-rose-900/40">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-pink-600 to-violet-700" />
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 size-48 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-12">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
                <Sparkles className="size-4" />
              </div>
              <Badge className="border-0 bg-white/20 font-semibold text-white backdrop-blur-sm hover:bg-white/30">
                🎉 বইমেলা ২০২৫
              </Badge>
            </div>

            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
              অমর একুশে <span className="text-yellow-300">বইমেলা</span>
            </h1>
            <p className="mb-2 text-base font-medium text-rose-100 md:text-lg">
              বাংলা সাহিত্যের সবচেয়ে বড় উৎসবে আপনাকে স্বাগতম!
            </p>
            <p className="mb-6 text-sm text-rose-200">
              ফেব্রুয়ারি ১–২৮ • বাংলা একাডেমি প্রাঙ্গণ, ঢাকা
            </p>

            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-rose-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" /> ২৮ দিন
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" /> বাংলা একাডেমি
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Ticket className="size-4" /> প্রবেশ বিনামূল্যে
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 rounded-lg bg-white px-6 font-bold text-rose-700 shadow-lg hover:bg-rose-50"
              >
                <Link href="/books">
                  বই দেখুন <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-lg border-white/40 bg-white/10 px-6 font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/explore/festival#events">ইভেন্ট দেখুন</Link>
              </Button>
            </div>
          </div>

          {/* Right — decorative books */}
          <div className="relative hidden shrink-0 md:block">
            <div className="relative flex h-56 w-72 items-end justify-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className="h-44 w-20 rotate-[-6deg] rounded-lg bg-gradient-to-b from-yellow-300 to-amber-400 shadow-xl" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-52 w-20 rounded-lg bg-gradient-to-b from-white to-rose-100 shadow-xl" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-40 w-20 rotate-[5deg] rounded-lg bg-gradient-to-b from-violet-300 to-purple-400 shadow-xl" />
              </div>
              {/* Floating sparkle */}
              <div className="absolute top-0 right-0 flex size-10 items-center justify-center rounded-full bg-yellow-300 shadow-lg">
                <Sparkles className="size-5 text-amber-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FESTIVAL STATS */}
      <section className="boimix-container-wide mb-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {FESTIVAL_STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20">
                  <Icon className="size-5 text-rose-600 dark:text-rose-400" />
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
              বিষয়ভিত্তিক বই
            </h2>
            <Link
              href="/books"
              className="flex items-center text-sm font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              সব দেখুন <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
            {FESTIVAL_CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/books/category/${cat.value.toLowerCase()}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center transition-colors hover:border-rose-200 hover:bg-rose-50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-rose-800 dark:hover:bg-rose-900/10"
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

      {/* UPCOMING EVENTS */}
      <section id="events" className="boimix-container-wide mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-5 flex items-center gap-2">
            <Calendar className="size-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              আসন্ন ইভেন্ট
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {UPCOMING_EVENTS.map((event, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 rounded-xl border p-4 transition-shadow hover:shadow-md ${event.bg} ${event.border}`}
              >
                {/* Date block */}
                <div
                  className={`flex shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br ${event.color} size-14 text-white shadow-md`}
                >
                  <span className="text-xs font-bold uppercase opacity-80">
                    {event.month}
                  </span>
                  <span className="text-2xl leading-none font-extrabold">
                    {event.day}
                  </span>
                </div>

                {/* Event details */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${event.badge}`}
                    >
                      {EVENT_TYPE_LABEL[event.type]}
                    </span>
                  </div>
                  <h3 className="mb-1.5 font-bold text-slate-900 dark:text-white">
                    {event.title}
                  </h3>
                  <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5 shrink-0" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0" /> {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED AUTHORS */}
      <section className="boimix-container-wide mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic2 className="size-5 text-rose-600 dark:text-rose-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                বিশেষ লেখক
              </h2>
            </div>
            <Link
              href="/books"
              className="flex items-center text-sm font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              সব লেখক <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FEATURED_AUTHORS.map((author, i) => (
              <div
                key={i}
                className="group flex flex-col items-center gap-3 rounded-xl border border-slate-100 p-4 text-center transition-all hover:border-rose-200 hover:shadow-md dark:border-slate-800 dark:hover:border-rose-800"
              >
                <div
                  className={`flex size-16 items-center justify-center rounded-2xl ${author.color} text-2xl font-extrabold text-white shadow-md transition-transform group-hover:scale-105`}
                >
                  {author.avatar}
                </div>
                <div>
                  <p className="text-sm leading-tight font-bold text-slate-900 dark:text-white">
                    {author.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {author.genre}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <BookOpen className="size-3 text-rose-500" />
                    <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                      {author.books} বই
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FESTIVAL BOOKS */}
      <section className="boimix-container-wide mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-amber-400 text-amber-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                বইমেলার বিশেষ বই
              </h2>
            </div>
            <Link
              href="/books"
              className="flex items-center text-sm font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              সব বই <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="boimix-container-wide mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-5 text-violet-600 dark:text-violet-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                নতুন প্রকাশনা
              </h2>
            </div>
            <Link
              href="/books/new"
              className="flex items-center text-sm font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              সব নতুন বই <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {newArrivals.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="boimix-container-wide mb-16">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-violet-700 px-8 py-10 shadow-xl">
          <div className="absolute -top-8 -right-8 size-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 left-1/3 size-28 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                <PartyPopper className="size-5 text-yellow-300" />
                <span className="text-sm font-bold tracking-wide text-rose-100 uppercase">
                  বইমেলা স্পেশাল অফার
                </span>
              </div>
              <h2 className="mb-2 text-2xl font-extrabold text-white md:text-3xl">
                বইমেলায় বই কিনুন,{" "}
                <span className="text-yellow-300">সাশ্রয় করুন!</span>
              </h2>
              <p className="text-sm text-rose-100">
                নির্বাচিত বইয়ে সর্বোচ্চ ৪০% ছাড় — শুধু বইমেলার সময়কালীন।
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3 md:justify-end">
              <Button
                asChild
                className="h-11 rounded-lg bg-white px-6 font-bold text-rose-700 shadow-sm hover:bg-rose-50"
              >
                <Link href="/books">
                  বই কিনুন <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-lg border-white/40 bg-white/10 px-6 font-bold text-white hover:bg-white/20"
              >
                <Link href="/explore/swaps">
                  <Heart className="mr-2 size-4" /> বই সোয়াপ করুন
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
