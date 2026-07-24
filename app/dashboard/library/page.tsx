import { fetchLocal } from "@/lib/fetchLocal";
import { LibraryGrid } from "@/components/shared/library-grid";
import {
  PlusIcon,
  Library,
  BookOpen,
  Repeat,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
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
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-500" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400">
                Needs Attention
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-amber-700 dark:text-amber-300">
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
            <button className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800 transition-colors hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/30">
              Update <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-[7px] px-7 pt-5 shadow-lg sm:px-10 sm:pt-7"
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
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-inner ring-2 ring-white/30 backdrop-blur-sm">
              <Library className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-xs font-extrabold tracking-[0.18em] text-white/70 uppercase">
                Personal Collection
              </p>
              <h1 className="mt-0.5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Library Manager
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Manage inventory, tracking, and book availability
              </p>
            </div>
          </div>

          <Link
            href="/books/upload"
            className="group hidden shrink-0 items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-[#0397d3] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 sm:inline-flex"
          >
            <PlusIcon className="h-4 w-4 stroke-[3] transition-transform duration-200 group-hover:rotate-90" />
            Add New Book
          </Link>
        </div>

        {/* ── Row 2: Management Stat cards ── */}
        <div className="relative z-10 mt-7 grid grid-cols-2 gap-3 pb-8 sm:grid-cols-3 lg:grid-cols-5">
          {[
            {
              icon: <Library className="h-5 w-5" />,
              count: totalBooks,
              label: "Total Books",
              iconBg: "bg-white/20 text-white",
              accent: "text-white",
            },
            {
              icon: <CheckCircle2 className="h-5 w-5" />,
              count: availableCount,
              label: "Available",
              iconBg: "bg-emerald-400/30 text-emerald-200",
              accent: "text-emerald-200",
            },
            {
              icon: <BookOpen className="h-5 w-5" />,
              count: lentCount,
              label: "Lent Out",
              iconBg: "bg-sky-400/30 text-sky-200",
              accent: "text-sky-200",
            },
            {
              icon: <Repeat className="h-5 w-5" />,
              count: swapCount,
              label: "Active Swaps",
              iconBg: "bg-purple-400/30 text-purple-200",
              accent: "text-purple-200",
            },
            {
              icon: <ShoppingBag className="h-5 w-5" />,
              count: sellCount,
              label: "Listed for Sale",
              sub: "৳ 2,450 earned",
              iconBg: "bg-orange-400/30 text-orange-200",
              accent: "text-orange-200",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 shadow-sm backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}
              >
                {s.icon}
              </div>
              <div>
                <p className={`text-2xl leading-none font-black ${s.accent}`}>
                  {s.count}
                </p>
                <p className="mt-0.5 text-xs font-bold text-white/90">
                  {s.label}
                </p>
                {s.sub && (
                  <p className="mt-0.5 text-[10px] text-white/60">{s.sub}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <Link
          href="/books/upload"
          className="relative z-10 mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-[#0397d3] shadow-md transition-all hover:bg-white/90 active:scale-95 sm:hidden"
        >
          <PlusIcon className="h-4 w-4 stroke-[3]" />
          Add New Book
        </Link>
      </div>

      {/* ══════ BOOK GRID ══════ */}
      <LibraryGrid books={profileLibraryBooks} />
    </div>
  );
}
