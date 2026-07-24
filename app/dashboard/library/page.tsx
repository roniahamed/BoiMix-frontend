import { fetchLocal } from "@/lib/fetchLocal";
import { LibraryGrid } from "@/components/shared/library-grid";
import { PlusIcon, Library, BookOpen, Repeat, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function LibraryPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");

  const totalBooks = profileLibraryBooks.length;
  const sellCount = profileLibraryBooks.filter((b: { tags: string[] }) =>
    b.tags.includes("sell"),
  ).length;
  const exchangeCount = profileLibraryBooks.filter((b: { tags: string[] }) =>
    b.tags.includes("exchange"),
  ).length;
  const borrowCount = profileLibraryBooks.filter((b: { tags: string[] }) =>
    b.tags.includes("borrow"),
  ).length;

  return (
    <div className="space-y-5 pb-12">
      {/* ══════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 shadow-lg sm:p-10"
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
                My Library
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Manage all your books for sell, exchange, or borrow
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

        {/* ── Row 2: Stat cards ── */}
        <div className="relative z-10 mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              icon: <Library className="h-5 w-5" />,
              count: totalBooks,
              label: "Total Books",
              sub: "+2 this month",
              iconBg: "bg-white/20 text-white",
              accent: "text-white",
            },
            {
              icon: <ShoppingBag className="h-5 w-5" />,
              count: sellCount,
              label: "For Sale",
              sub: "৳ 2,450 earned",
              iconBg: "bg-emerald-400/30 text-emerald-200",
              accent: "text-emerald-200",
            },
            {
              icon: <Repeat className="h-5 w-5" />,
              count: exchangeCount,
              label: "Exchange",
              sub: "1 active deal",
              iconBg: "bg-yellow-300/25 text-yellow-200",
              accent: "text-yellow-200",
            },
            {
              icon: <BookOpen className="h-5 w-5" />,
              count: borrowCount,
              label: "Borrow",
              sub: "2 currently out",
              iconBg: "bg-pink-300/25 text-pink-200",
              accent: "text-pink-200",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/20"
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
                <p className="text-[10px] text-white/50">{s.sub}</p>
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
