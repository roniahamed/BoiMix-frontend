import { BookCard } from "@/components/shared/book-card";
import { fetchLocal } from "@/lib/fetchLocal";
import type { BookCardBook } from "@/types/book";
import {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  PackageCheck,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default async function SalesPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");

  const soldBooks = profileLibraryBooks.slice(0, 6);

  return (
    <div className="space-y-6 pb-12 sm:space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <ShoppingBag className="h-7 w-7 text-emerald-500" /> Sales & Revenue
          </h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Track books sold to other readers, earnings, and payout history.
          </p>
        </div>

        <Link
          href="/books/upload"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[40px] items-center justify-center gap-2 self-start rounded-xl px-4 py-2.5 text-xs font-bold shadow-xs transition-all active:scale-95 sm:self-auto sm:text-sm"
        >
          <Plus className="h-4 w-4 stroke-[3]" /> List Book for Sale
        </Link>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Total Sales Revenue</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-foreground text-2xl font-extrabold sm:text-3xl">
            ৳ 2,450
          </p>
          <p className="text-success flex items-center gap-0.5 pt-0.5 text-[11px] font-bold">
            <TrendingUp className="h-3 w-3" /> +৳ 800 this month
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Completed Sales</span>
            <PackageCheck className="text-brand-blue h-4 w-4" />
          </div>
          <p className="text-foreground text-2xl font-extrabold sm:text-3xl">
            5 Books
          </p>
          <p className="text-muted-foreground pt-0.5 text-[11px] font-medium">
            100% positive reviews
          </p>
        </div>

        <div className="bg-card border-border/70 col-span-2 space-y-1 rounded-2xl border p-4 shadow-2xs sm:col-span-1">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Available Balance</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              Ready to Withdraw
            </span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
            ৳ 1,800
          </p>
          <p className="text-muted-foreground pt-0.5 text-[11px] font-medium">
            bKash / Nagad payout
          </p>
        </div>
      </div>

      {/* Sold Books List */}
      <div className="space-y-4">
        <div className="border-border/50 flex items-center justify-between border-b pb-3">
          <h2 className="text-foreground text-base font-bold sm:text-lg">
            Sold Books History
          </h2>
          <span className="text-muted-foreground text-xs font-semibold">
            Showing 6 sales
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {soldBooks.map((book: Record<string, unknown>) => (
            <BookCard
              key={book.id as string}
              book={book as unknown as BookCardBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
