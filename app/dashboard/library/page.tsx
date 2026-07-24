import { fetchLocal } from "@/lib/fetchLocal";
import { LibraryGrid } from "@/components/shared/library-grid";
import {
  Library,
  BookOpen,
  Repeat,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { AddBookButton } from "@/components/shared/add-book-button";
import { Book } from "@/components/shared/library-grid";

export default async function LibraryPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");

  const totalBooks = profileLibraryBooks.length;
  // Compute statuses based on our new inventoryStatus field
  // "available" | "borrowed" | "draft" | "archived" | "sold"
  const availableCount = profileLibraryBooks.filter(
    (b: Book) => b.inventoryStatus === "available",
  ).length;
  const lentCount = profileLibraryBooks.filter(
    (b: Book) => b.inventoryStatus === "borrowed",
  ).length;
  const sellCount = profileLibraryBooks.filter(
    (b: Book) => b.tags && b.tags.includes("sell"),
  ).length;
  const swapCount = profileLibraryBooks.filter(
    (b: Book) => b.tags && b.tags.includes("exchange"),
  ).length;

  return (
    <div className="space-y-5 pb-12">
      {/* ══════════════════════════════════════
          NEEDS ATTENTION
      ══════════════════════════════════════ */}
      {lentCount > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 sm:mt-0.5 dark:text-amber-500" />
              <h3 className="text-sm font-bold text-amber-800 sm:hidden dark:text-amber-400">
                Needs Attention
              </h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden text-sm font-bold text-amber-800 sm:block dark:text-amber-400">
                Needs Attention
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-amber-700 sm:mt-2 dark:text-amber-300">
                {lentCount > 0 && (
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />1
                    overdue borrow (Atomic Habits)
                  </span>
                )}
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />2
                  books missing cover image
                </span>
              </div>
            </div>
            <button className="flex w-full shrink-0 items-center justify-center gap-1 rounded-lg bg-amber-100 px-3 py-2 text-xs font-bold text-amber-800 transition-colors hover:bg-amber-200 sm:w-auto sm:py-1.5 dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/30">
              Update <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-[7px] px-5 pt-5 pb-6 shadow-lg sm:px-10 sm:pt-7 sm:pb-8"
        style={{
          background:
            "linear-gradient(135deg, #0397d3 0%, #5b5ef4 55%, #8b5cf6 100%)",
        }}
      >
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-purple-300/20 blur-2xl" />
        <div className="pointer-events-none absolute top-1/2 right-1/3 h-40 w-40 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-xl" />

        {/* Subtle dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── Row 1: Icon + Title + Button ── */}
        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-inner ring-2 ring-white/30 backdrop-blur-sm sm:h-16 sm:w-16">
              <Library className="h-6 w-6 text-white sm:h-8 sm:w-8" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-white/70 uppercase sm:text-xs">
                Personal Collection
              </p>
              <h1 className="mt-0.5 text-2xl font-black tracking-tight text-white sm:text-4xl">
                Library Manager
              </h1>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">
                Manage inventory, tracking, and book availability
              </p>
            </div>
          </div>

          <AddBookButton />
        </div>

        {/* ── Row 2: Management Stat cards ── */}
        <div className="relative z-10 mt-6 grid grid-cols-2 gap-2 sm:mt-7 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {[
            {
              icon: <Library className="h-4 w-4 sm:h-5 sm:w-5" />,
              count: totalBooks,
              label: "Total Books",
              iconBg: "bg-white/20 text-white",
              accent: "text-white",
            },
            {
              icon: <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />,
              count: availableCount,
              label: "Available",
              iconBg: "bg-emerald-400/30 text-emerald-200",
              accent: "text-emerald-200",
            },
            {
              icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
              count: lentCount,
              label: "Lent Out",
              iconBg: "bg-sky-400/30 text-sky-200",
              accent: "text-sky-200",
            },
            {
              icon: <Repeat className="h-4 w-4 sm:h-5 sm:w-5" />,
              count: swapCount,
              label: "Active Swaps",
              iconBg: "bg-purple-400/30 text-purple-200",
              accent: "text-purple-200",
            },
            {
              icon: <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />,
              count: sellCount,
              label: "Listed for Sale",
              sub: "৳ 2,450 earned",
              iconBg: "bg-orange-400/30 text-orange-200",
              accent: "text-orange-200",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`flex flex-row items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-sm backdrop-blur-sm transition-all hover:bg-white/20 sm:px-4 sm:py-3.5 ${
                s.label === "Listed for Sale" ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${s.iconBg}`}
              >
                {s.icon}
              </div>
              <div>
                <p
                  className={`text-xl leading-none font-black sm:text-2xl ${s.accent}`}
                >
                  {s.count}
                </p>
                <p className="mt-0.5 text-[10px] font-bold text-white/90 sm:text-xs">
                  {s.label}
                </p>
                {s.sub && (
                  <p className="mt-0.5 text-[9px] text-white/60 sm:text-[10px]">
                    {s.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <AddBookButton className="relative z-10 mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-[#0397d3] shadow-md transition-all hover:bg-white/90 active:scale-95 sm:hidden" />
      </div>

      {/* ══════ BOOK GRID ══════ */}
      <LibraryGrid books={profileLibraryBooks} />
    </div>
  );
}
