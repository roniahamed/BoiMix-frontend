"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Heart,
  Users,
  Trophy,
  Clock,
  ChevronRight,
  Sparkles,
  BookOpen,
  Search,
  Star,
  Mic2,
  Pencil,
  Baby,
  Globe,
  LayoutGrid,
  MoreHorizontal,
  Bookmark,
  ArrowUpRight,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type FilterTab = {
  id: string;
  label: string;
  icon: React.ElementType;
};

/* ─── Static data ─────────────────────────────────────────────────────────── */

const FILTER_TABS: FilterTab[] = [
  { id: "all", label: "সব ইভেন্ট", icon: LayoutGrid },
  { id: "bookfair", label: "বইমেলা", icon: BookOpen },
  { id: "literary", label: "সাহিত্য উৎসব", icon: Pencil },
  { id: "authors", label: "লেখক আলোচনা", icon: Mic2 },
  { id: "meetup", label: "মিটআপ", icon: Users },
  { id: "children", label: "শিশু", icon: Baby },
  { id: "online", label: "অনলাইন", icon: Globe },
  { id: "more", label: "আরো", icon: MoreHorizontal },
];

const EVENTS = [
  {
    id: 1,
    tag: "বইমেলা",
    tagColor: "bg-emerald-500",
    title: "ঢাকা আন্তর্জাতিক বইমেলা ২০২৫",
    location: "বাংলা একাডেমি, ঢাকা",
    dateRange: "১–২৮ ফেব্রুয়ারি ২০২৫",
    day: "১–২৮",
    month: "FEB",
    desc: "বাংলাদেশের সবচেয়ে বড় বইমেলা — হাজার প্রকাশক, লেখক ও পাঠকের মিলনক্ষেত্র।",
    price: "Free",
    going: "১.২ হাজার+",
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    accent: "#10B981",
  },
  {
    id: 2,
    tag: "সাহিত্য উৎসব",
    tagColor: "bg-orange-500",
    title: "চট্টগ্রাম সাহিত্য উৎসব ২০২৫",
    location: "শিল্পকলা একাডেমি, চট্টগ্রাম",
    dateRange: "১৫–১৬ মার্চ ২০২৫",
    day: "১৫–১৬",
    month: "MAR",
    desc: "লেখক, কবি ও চিন্তকদের সাথে সাহিত্য, ভাবনা ও সৃজনশীলতার উদযাপন।",
    price: "৳ ২০০",
    going: "৩২০",
    gradient: "from-orange-900 via-orange-800 to-slate-900",
    accent: "#F97316",
  },
  {
    id: 3,
    tag: "লেখক আলোচনা",
    tagColor: "bg-rose-500",
    title: "হুমায়ূন আহমেদ: জীবন ও সাহিত্য",
    location: "ইনডিপেন্ডেন্স লাইব্রেরি, ঢাকা",
    dateRange: "১২ এপ্রিল ২০২৫",
    day: "১২",
    month: "APR",
    desc: "কিংবদন্তী লেখকের জীবন ও সাহিত্যকর্ম নিয়ে একটি বিশেষ আলোচনা সভা।",
    price: "Free",
    going: "২৫০",
    gradient: "from-rose-900 via-pink-900 to-slate-900",
    accent: "#F43F5E",
  },
  {
    id: 4,
    tag: "ওয়ার্কশপ",
    tagColor: "bg-violet-500",
    title: "সৃজনশীল লেখালেখি ওয়ার্কশপ",
    location: "গুলশান লাইব্রেরি, ঢাকা",
    dateRange: "৫ এপ্রিল ২০২৫",
    day: "০৫",
    month: "APR",
    desc: "আপনার গল্প বলার দক্ষতা বাড়ান — অভিজ্ঞ লেখকদের সাথে হাতে-কলমে শিক্ষা।",
    price: "৳ ৫০০",
    going: "১৮০",
    gradient: "from-violet-900 via-purple-900 to-slate-900",
    accent: "#8B5CF6",
  },
];

const NEARBY_EVENTS = [
  {
    title: "সিলেট বইমেলা ২০২৫",
    date: "১০–২০ ফেব্রু",
    location: "সিলেট",
    price: "Free",
    accent: "text-emerald-600",
  },
  {
    title: "রাজশাহী সাহিত্য উৎসব",
    date: "১৮ ফেব্রু",
    location: "রাজশাহী",
    price: "৳ ১৫০",
    accent: "text-amber-600",
  },
  {
    title: "শিশু গল্প বলার আসর",
    date: "২২ ফেব্রু",
    location: "ঢাকা",
    price: "Free",
    accent: "text-emerald-600",
  },
];

const WHY_JOIN = [
  {
    icon: Mic2,
    title: "লেখকদের সাথে পরিচয়",
    desc: "প্রিয় লেখকের সাথে সরাসরি কথা বলুন",
    color: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
  },
  {
    icon: Sparkles,
    title: "নতুন বই আবিষ্কার",
    desc: "পরবর্তী পছন্দের বই খুঁজে নিন",
    color:
      "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  },
  {
    icon: Users,
    title: "পাঠক সম্প্রদায়",
    desc: "হাজার পাঠকের সাথে সংযুক্ত হন",
    color:
      "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  },
  {
    icon: BookOpen,
    title: "পড়ুন ও বেড়ে উঠুন",
    desc: "ওয়ার্কশপ ও আলোচনায় অংশ নিন",
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
];

const POPULAR_SEARCHES = [
  "বইমেলা",
  "কবিতা উৎসব",
  "লেখক আলোচনা",
  "শিশু অনুষ্ঠান",
  "অনলাইন মিটআপ",
  "লেখকের সাথে সাক্ষাৎ",
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function ExploreFestivalPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedEvents((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <MainLayout>
      {/* ══════════════════════════════════════════════
           HERO — full dark photo-style banner
      ══════════════════════════════════════════════ */}
      <section className="boimix-container-wide mt-6 mb-6">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ minHeight: 320 }}
        >
          {/* Background — dark festival atmosphere */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0a0a1a 0%, #0f1929 30%, #1a0a2e 60%, #0a1520 100%)",
            }}
          />
          {/* Bokeh light effects */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute top-8 left-1/3 size-40 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, #FBBF24, transparent)",
                filter: "blur(30px)",
              }}
            />
            <div
              className="absolute right-1/4 bottom-4 size-32 rounded-full opacity-15"
              style={{
                background: "radial-gradient(circle, #F43F5E, transparent)",
                filter: "blur(25px)",
              }}
            />
            <div
              className="absolute top-4 right-1/3 size-24 rounded-full opacity-15"
              style={{
                background: "radial-gradient(circle, #8B5CF6, transparent)",
                filter: "blur(20px)",
              }}
            />
          </div>
          {/* String lights decoration */}
          <div className="pointer-events-none absolute top-0 right-0 left-0 h-6 overflow-hidden opacity-40">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1 size-2 rounded-full"
                style={{
                  left: `${i * 5.2}%`,
                  background: [
                    "#F43F5E",
                    "#FBBF24",
                    "#10B981",
                    "#8B5CF6",
                    "#3B82F6",
                  ][i % 5],
                  boxShadow: `0 0 6px 2px ${["#F43F5E", "#FBBF24", "#10B981", "#8B5CF6", "#3B82F6"][i % 5]}`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 grid items-center gap-0 p-8 md:grid-cols-[1fr_300px] md:p-10 lg:p-12">
            {/* Left */}
            <div className="pr-0 md:pr-8">
              {/* Live badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-rose-400" />
                </span>
                <span className="text-[11px] font-black tracking-widest text-white uppercase">
                  LIVE NOW
                </span>
              </div>

              <h1 className="mb-3 leading-tight font-black tracking-tight text-white">
                <span className="block text-3xl md:text-4xl lg:text-5xl">
                  বই উৎসব
                </span>
                <span
                  className="block text-3xl md:text-4xl lg:text-5xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #F43F5E 0%, #EC4899 50%, #A78BFA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  & ইভেন্ট
                </span>
              </h1>

              <p className="mb-5 max-w-sm text-sm leading-relaxed text-slate-300">
                বইমেলা, সাহিত্য উৎসব, লেখক আলোচনা ও ওয়ার্কশপ — আপনার কাছের সব
                অনুষ্ঠান।
              </p>

              {/* Meta row */}
              <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-rose-400" />
                  ১৫–২৮ ফেব্রু, ২০২৫
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-violet-400" />
                  বাংলাদেশ
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5 text-emerald-400" />
                  ১.২ হাজার+ যাচ্ছেন
                </span>
              </div>

              {/* Search bar */}
              <div className="flex max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/10 backdrop-blur-md">
                <div className="flex flex-1 items-center gap-2 px-4">
                  <Search className="size-4 shrink-0 text-slate-400" />
                  <input
                    className="flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-400"
                    placeholder="উৎসব, লোকেশন খুঁজুন..."
                  />
                </div>
                <button
                  className="px-5 py-3 text-xs font-black text-white"
                  style={{
                    background: "linear-gradient(135deg, #F43F5E, #8B5CF6)",
                  }}
                >
                  খুঁজুন
                </button>
              </div>
            </div>

            {/* Right — Featured Event card */}
            <div className="hidden md:block">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-lg">
                {/* Event image placeholder */}
                <div
                  className="relative flex h-36 w-full items-end p-3"
                  style={{
                    background:
                      "linear-gradient(160deg, #1a3a2a 0%, #2d5a3d 50%, #1a2a3a 100%)",
                  }}
                >
                  {/* Mini string lights */}
                  <div className="absolute inset-x-0 top-2 flex justify-around">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="size-2 rounded-full shadow-lg"
                        style={{
                          background: [
                            "#FBBF24",
                            "#F43F5E",
                            "#10B981",
                            "#8B5CF6",
                            "#3B82F6",
                            "#FBBF24",
                          ][i],
                        }}
                      />
                    ))}
                  </div>
                  {/* Decorative books */}
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-end gap-1.5">
                    <div className="h-14 w-8 rotate-[-4deg] rounded-sm bg-gradient-to-b from-amber-400 to-amber-600 shadow-lg" />
                    <div className="h-16 w-8 rounded-sm bg-gradient-to-b from-rose-400 to-rose-600 shadow-lg" />
                    <div className="h-12 w-8 rotate-[3deg] rounded-sm bg-gradient-to-b from-violet-400 to-violet-600 shadow-lg" />
                  </div>
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-amber-900">
                      ⭐ বিশেষ ইভেন্ট
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-sm leading-snug font-black text-white">
                    ঢাকা আন্তর্জাতিক বইমেলা ২০২৫
                  </h3>
                  <div className="flex flex-col gap-1 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3 text-rose-400" />
                      ১–২৮ ফেব্রুয়ারি ২০২৫
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3 text-violet-400" />
                      বাংলা একাডেমি, ঢাকা
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                    বাংলাদেশের সবচেয়ে বড় বইমেলা — হাজার প্রকাশক, লেখক ও পাঠক।
                  </p>
                  <Link
                    href="#"
                    className="mt-3 flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-rose-300"
                  >
                    বিস্তারিত দেখুন <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           FILTER TABS
      ══════════════════════════════════════════════ */}
      <section className="boimix-container-wide mb-6">
        <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {FILTER_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-200 dark:shadow-rose-900/30"
                    : "border-slate-200 bg-white text-slate-600 hover:border-rose-200 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-700 dark:hover:text-rose-400"
                }`}
              >
                <Icon className="size-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           MAIN — events grid + sidebar
      ══════════════════════════════════════════════ */}
      <section className="boimix-container-wide mb-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* ── Events grid ── */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  আসন্ন ইভেন্ট
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ২৪টি ইভেন্ট পাওয়া গেছে
                </p>
              </div>
              <Link
                href="#"
                className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400"
              >
                সব দেখুন <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {EVENTS.map((ev) => (
                <div
                  key={ev.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Card image area */}
                  <div
                    className={`relative h-44 bg-gradient-to-br ${ev.gradient} flex items-end p-4`}
                  >
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-black text-white ${ev.tagColor}`}
                      >
                        {ev.tag}
                      </span>
                    </div>

                    {/* Wishlist button */}
                    <button
                      className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30"
                      onClick={() => toggleLike(ev.id)}
                    >
                      <Heart
                        className={`size-4 transition-colors ${
                          likedEvents.includes(ev.id)
                            ? "fill-rose-500 text-rose-500"
                            : "text-white"
                        }`}
                      />
                    </button>

                    {/* Date badge */}
                    <div className="relative z-10 overflow-hidden rounded-xl border border-white/20 bg-white/15 px-3 py-1.5 text-center backdrop-blur-md">
                      <p className="text-lg leading-none font-black text-white">
                        {ev.day}
                      </p>
                      <p className="text-[9px] font-bold text-white/70 uppercase">
                        {ev.month}
                      </p>
                    </div>

                    {/* Bokeh dots decoration */}
                    <div className="pointer-events-none absolute inset-0">
                      <div
                        className="absolute top-6 right-8 size-16 rounded-full opacity-20"
                        style={{
                          background: `radial-gradient(circle, ${ev.accent}, transparent)`,
                          filter: "blur(12px)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <h3 className="mb-1 line-clamp-2 leading-snug font-black text-slate-900 dark:text-white">
                      {ev.title}
                    </h3>
                    <p className="mb-2 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="size-3 shrink-0" /> {ev.location}
                    </p>
                    <p className="mb-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="size-3 shrink-0" /> {ev.dateRange}
                    </p>
                    <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {ev.desc}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-black ${
                            ev.price === "Free"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {ev.price}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Users className="size-3" /> {ev.going} যাচ্ছেন
                        </span>
                      </div>
                      <Link
                        href="#"
                        className="flex items-center gap-1 text-xs font-black text-rose-500 hover:text-rose-600 dark:text-rose-400"
                      >
                        বিস্তারিত <ArrowUpRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more */}
            <div className="mt-6 flex justify-center">
              <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-700">
                আরো ইভেন্ট দেখুন
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="flex flex-col gap-4">
            {/* Why join */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 font-black text-slate-900 dark:text-white">
                কেন ইভেন্টে যোগ দেবেন?
              </h3>
              <div className="flex flex-col gap-3">
                {WHY_JOIN.map((w, i) => {
                  const Icon = w.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${w.color}`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 dark:text-white">
                          {w.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {w.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nearby events */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-black text-slate-900 dark:text-white">
                  কাছের ইভেন্ট
                </h3>
                <Link
                  href="#"
                  className="text-[11px] font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400"
                >
                  সব দেখুন →
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {NEARBY_EVENTS.map((ne, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-all hover:border-rose-200 hover:bg-rose-50 dark:border-slate-800 dark:hover:border-rose-800 dark:hover:bg-rose-900/10"
                  >
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl text-lg"
                      style={{
                        background: "linear-gradient(135deg, #1a0a2e, #0f172a)",
                      }}
                    >
                      📚
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-black text-slate-900 dark:text-white">
                        {ne.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {ne.date} · {ne.location}
                      </p>
                    </div>
                    <span className={`text-xs font-black ${ne.accent}`}>
                      {ne.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit event CTA */}
            <div
              className="relative overflow-hidden rounded-2xl p-5 text-white"
              style={{
                background: "linear-gradient(145deg, #7C3AED, #4F46E5)",
              }}
            >
              <div className="pointer-events-none absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
              <Bookmark className="mb-3 size-8 text-violet-200" />
              <h3 className="mb-1 font-black">আপনার ইভেন্ট যোগ করুন?</h3>
              <p className="mb-4 text-xs leading-relaxed text-violet-200">
                আপনার বইমেলা, উৎসব বা ওয়ার্কশপ হাজার পাঠকের কাছে পৌঁছে দিন।
              </p>
              <Button
                asChild
                size="sm"
                className="w-full rounded-xl bg-white text-xs font-black text-violet-700 hover:bg-violet-50"
              >
                <Link href="#">ইভেন্ট জমা দিন →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           BOOKS TO EXPLORE BEFORE YOU GO
      ══════════════════════════════════════════════ */}
      <section className="boimix-container-wide mb-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-rose-500 uppercase dark:text-rose-400">
                যাওয়ার আগে পড়ুন
              </p>
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                উৎসবের আগে বই খুঁজুন
              </h2>
            </div>
            <Link
              href="/books"
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-700 dark:hover:text-rose-400"
            >
              সব বই <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Horizontal scroll */}
          <div className="flex [scrollbar-width:none] gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              {
                title: "একাত্তরের দিনগুলি",
                author: "জাহানারা ইমাম",
                price: "৳ ২৪০",
                rating: "৪.৮",
                color: "from-slate-800 to-slate-900",
              },
              {
                title: "নরওয়েজিয়ান উড",
                author: "হারুকি মুরাকামি",
                price: "৳ ৩৫০",
                rating: "৪.৬",
                color: "from-emerald-800 to-slate-900",
              },
              {
                title: "স্যাপিয়েন্স",
                author: "ইউভাল নোয়া হারারি",
                price: "৳ ৫৬০",
                rating: "৪.৭",
                color: "from-amber-800 to-slate-900",
              },
              {
                title: "দ্য আলকেমিস্ট",
                author: "পাউলো কোয়েলহো",
                price: "৳ ৩২০",
                rating: "৪.৫",
                color: "from-rose-800 to-slate-900",
              },
              {
                title: "বর্ণ অপরাধ",
                author: "ট্রেভর নোয়া",
                price: "৳ ৪৫০",
                rating: "৪.৭",
                color: "from-violet-800 to-slate-900",
              },
              {
                title: "অভ্যাসের শক্তি",
                author: "চার্লস ডুহিগ",
                price: "৳ ৩৮০",
                rating: "৪.৬",
                color: "from-teal-800 to-slate-900",
              },
              {
                title: "মিসির আলির অমীমাংসিত",
                author: "হুমায়ূন আহমেদ",
                price: "৳ ২৮০",
                rating: "৪.৯",
                color: "from-blue-800 to-slate-900",
              },
            ].map((book, i) => (
              <Link
                key={i}
                href="/books"
                className="group flex shrink-0 flex-col gap-2 transition-all hover:-translate-y-1"
              >
                {/* Book cover */}
                <div
                  className={`relative h-32 w-24 overflow-hidden rounded-xl bg-gradient-to-b ${book.color} shadow-md transition-shadow group-hover:shadow-lg`}
                >
                  <div className="absolute right-2 bottom-2 left-2 text-[9px] leading-tight font-black text-white">
                    {book.title}
                  </div>
                  {/* Spine effect */}
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-black/20" />
                </div>
                <div className="w-24">
                  <p className="line-clamp-1 text-xs font-black text-slate-900 dark:text-white">
                    {book.title}
                  </p>
                  <p className="line-clamp-1 text-[10px] text-slate-500">
                    {book.author}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                      {book.price}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] text-amber-500">
                      <Star className="size-2.5 fill-amber-400" /> {book.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           POPULAR CATEGORIES — icon grid
      ══════════════════════════════════════════════ */}
      <section className="boimix-container-wide mb-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-black text-slate-900 dark:text-white">
            জনপ্রিয় ইভেন্ট ক্যাটাগরি
          </h2>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {[
              {
                label: "বইমেলা",
                icon: "📚",
                count: "৪২+",
                color: "bg-emerald-50 dark:bg-emerald-900/20",
              },
              {
                label: "সাহিত্য উৎসব",
                icon: "✍️",
                count: "১৮+",
                color: "bg-amber-50 dark:bg-amber-900/20",
              },
              {
                label: "লেখক আলোচনা",
                icon: "🎤",
                count: "২৫+",
                color: "bg-rose-50 dark:bg-rose-900/20",
              },
              {
                label: "ওয়ার্কশপ",
                icon: "🛠️",
                count: "৩৬+",
                color: "bg-violet-50 dark:bg-violet-900/20",
              },
              {
                label: "মিটআপ",
                icon: "🤝",
                count: "২২+",
                color: "bg-blue-50 dark:bg-blue-900/20",
              },
              {
                label: "শিশু",
                icon: "🧸",
                count: "১৯+",
                color: "bg-pink-50 dark:bg-pink-900/20",
              },
              {
                label: "অনলাইন",
                icon: "💻",
                count: "১৫+",
                color: "bg-teal-50 dark:bg-teal-900/20",
              },
              {
                label: "আরো",
                icon: "➕",
                count: "দেখুন",
                color: "bg-slate-50 dark:bg-slate-800",
              },
            ].map((cat, i) => (
              <button
                key={i}
                className={`flex flex-col items-center gap-2 rounded-2xl border border-transparent p-3 text-center transition-all hover:border-rose-200 hover:shadow-sm dark:hover:border-rose-800 ${cat.color}`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[10px] font-black text-slate-700 dark:text-slate-200">
                  {cat.label}
                </span>
                <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-400">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           LATEST UPDATES + NEWSLETTER
      ══════════════════════════════════════════════ */}
      <section className="boimix-container-wide mb-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* News */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-black text-slate-900 dark:text-white">
              সর্বশেষ আপডেট
            </h2>
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {[
                {
                  badge: "নিউজ",
                  badgeColor:
                    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
                  title: "ঢাকা বইমেলা ২০২৫: সম্পূর্ণ সময়সূচি প্রকাশিত",
                  desc: "লেখক আলোচনা, বই লঞ্চ ও বিশেষ অধিবেশনের পূর্ণ সূচি দেখুন।",
                  time: "২ দিন আগে",
                  img: "📰",
                },
                {
                  badge: "আপডেট",
                  badgeColor:
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                  title: "সাহিত্য উৎসবে আর্লি বার্ড ছাড় পাওয়া যাচ্ছে",
                  desc: "ফেব্রুয়ারি ২৮ পর্যন্ত ৩০% পর্যন্ত ছাড়ে ফেস্টিভ্যাল পাস।",
                  time: "৫ দিন আগে",
                  img: "🎟️",
                },
                {
                  badge: "ঘোষণা",
                  badgeColor:
                    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
                  title: "আপনার ইভেন্ট জমা দিন ও হাজার পাঠকের কাছে পৌঁছান",
                  desc: "আপনার বইমেলা, উৎসব বা ওয়ার্কশপ এখন BoiMix Events এ যোগ করুন।",
                  time: "১ সপ্তাহ আগে",
                  img: "📢",
                },
              ].map((n, i) => (
                <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl dark:bg-slate-800">
                    {n.img}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${n.badgeColor}`}
                      >
                        {n.badge}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {n.time}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-xs font-black text-slate-900 dark:text-white">
                      {n.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500">
                      {n.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div
            className="relative overflow-hidden rounded-2xl p-6"
            style={{
              background:
                "linear-gradient(145deg, #eff6ff 0%, #f5f3ff 50%, #fdf2f8 100%)",
            }}
          >
            <div className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-violet-200/40" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  ✉️
                </div>
              </div>
              <h3 className="mb-2 text-center text-base font-black text-slate-900">
                আপডেট পান
              </h3>
              <p className="mb-5 text-center text-xs leading-relaxed text-slate-600">
                নতুন ইভেন্ট, বই সুপারিশ ও অফার সরাসরি আপনার ইনবক্সে।
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল লিখুন"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200"
                />
                <button
                  className="w-full rounded-xl py-2.5 text-xs font-black text-white"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                  }}
                >
                  সাবস্ক্রাইব করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           POPULAR SEARCHES
      ══════════════════════════════════════════════ */}
      <section className="boimix-container-wide mb-16">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
            জনপ্রিয় সার্চ:
          </p>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-700 dark:hover:text-rose-400"
            >
              {term}
            </button>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
