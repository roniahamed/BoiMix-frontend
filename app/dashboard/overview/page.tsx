import { fetchLocal } from "@/lib/fetchLocal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookCard } from "@/components/shared/book-card";
import type { BookCardBook } from "@/types/book";
import {
  BadgeCheck,
  ChevronRight,
  Star,
  Plus,
  Flame,
  ArrowRight,
  Compass,
  Coins,
  Library,
  ShoppingBag,
  AlertTriangle,
  Repeat,
  Bookmark,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default async function OverviewPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");
  const recommendedBooks = profileLibraryBooks.slice(0, 4);

  return (
    <div className="space-y-6 pb-24 sm:space-y-8 lg:pb-8">
      {/* 1. Gamified Welcome & Streak Progress Hero Header */}
      <div className="from-primary via-primary/95 to-brand-blue/80 text-primary-foreground shadow-primary/10 relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 shadow-lg sm:p-7">
        <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* User Info & Level */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <Avatar className="h-14 w-14 border-2 border-white/30 shadow-md sm:h-16 sm:w-16">
                <AvatarImage
                  src="https://i.pravatar.cc/150?u=roni"
                  alt="Roni Ahamed"
                />
                <AvatarFallback className="text-foreground font-bold">
                  RA
                </AvatarFallback>
              </Avatar>
              <span className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[10px] font-extrabold text-slate-950 shadow-sm">
                L12
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  Good Afternoon, Roni! 👋
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold backdrop-blur-md">
                  <BadgeCheck className="h-3.5 w-3.5 text-amber-300" /> Level 12
                  Reader
                </span>
              </div>
              <p className="text-primary-foreground/90 text-xs font-medium sm:text-sm">
                Backend Engineer • Dhaka Central Reader Community
              </p>

              {/* XP Level Progress Bar */}
              <div className="max-w-xs space-y-1 pt-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                  <span>350 / 500 XP to Level 13</span>
                  <span>70%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-black/20">
                  <div className="h-full w-[70%] rounded-full bg-amber-300 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Streak & Today's Summary */}
          <div className="flex flex-col gap-3 border-t border-white/15 pt-3 sm:items-end sm:border-t-0 sm:pt-0">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-2xl bg-white/20 px-3 py-1.5 text-xs font-extrabold shadow-xs backdrop-blur-md">
                <Flame className="h-4 w-4 animate-pulse fill-amber-300 text-amber-300" />
                <span>14 Day Streak!</span>
              </div>

              <div className="inline-flex items-center gap-1 rounded-2xl bg-amber-400/20 px-3 py-1.5 text-xs font-bold text-amber-200 backdrop-blur-md">
                <Coins className="h-3.5 w-3.5" /> 350 Pts
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Link
                href="/books/upload"
                className="text-primary inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold shadow-md transition-all hover:bg-white/90 active:scale-95 sm:flex-none"
              >
                <Plus className="h-4 w-4 stroke-[3]" /> Add Book
              </Link>
              <Link
                href="/books"
                className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/15 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/25 sm:flex-none"
              >
                <Compass className="h-4 w-4" /> Browse
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Action Center ⭐ (Urgent Action Items) */}
      <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-4 shadow-2xs sm:p-5">
        <div className="border-border/40 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="bg-warning/15 text-warning flex h-7 w-7 items-center justify-center rounded-lg">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-foreground text-base font-bold sm:text-lg">
                Action Center
              </h2>
              <p className="text-muted-foreground text-xs">
                High-priority tasks requiring your attention today
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/notifications"
            className="text-primary flex items-center gap-1 text-xs font-bold hover:underline"
          >
            View All <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Action Grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Action 1: Return Book */}
          <div className="bg-warning/10 border-warning/30 flex items-center justify-between gap-3 rounded-xl border p-3.5">
            <div className="flex items-start gap-3">
              <span className="bg-warning/20 text-warning mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                ⏰
              </span>
              <div className="space-y-0.5">
                <p className="text-foreground text-xs font-bold">
                  Return Book Due Tomorrow
                </p>
                <p className="text-muted-foreground text-[11px]">
                  Atomic Habits • Owner: Ahmed Rahman
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/borrowed"
              className="bg-warning text-warning-foreground shrink-0 rounded-lg px-3 py-1.5 text-xs font-extrabold shadow-2xs transition-transform active:scale-95"
            >
              Return / Extend
            </Link>
          </div>

          {/* Action 2: Exchange Request */}
          <div className="bg-brand-blue/10 border-brand-blue/30 flex items-center justify-between gap-3 rounded-xl border p-3.5">
            <div className="flex items-start gap-3">
              <span className="bg-brand-blue/20 text-brand-blue mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                🔄
              </span>
              <div className="space-y-0.5">
                <p className="text-foreground text-xs font-bold">
                  Exchange Offer Received
                </p>
                <p className="text-muted-foreground text-[11px]">
                  Nusrat wants Rich Dad Poor Dad
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/exchanges/offers"
              className="bg-brand-blue shrink-0 rounded-lg px-3 py-1.5 text-xs font-extrabold text-white shadow-2xs transition-transform active:scale-95"
            >
              Accept / View
            </Link>
          </div>

          {/* Action 3: Unread Message */}
          <div className="bg-success/10 border-success/30 flex items-center justify-between gap-3 rounded-xl border p-3.5">
            <div className="flex items-start gap-3">
              <span className="bg-success/20 text-success mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                💬
              </span>
              <div className="space-y-0.5">
                <p className="text-foreground text-xs font-bold">
                  5 Unread Messages
                </p>
                <p className="text-muted-foreground text-[11px]">
                  Ahmed: &quot;Is the book ready for pickup?&quot;
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/messages"
              className="bg-success text-success-foreground shrink-0 rounded-lg px-3 py-1.5 text-xs font-extrabold shadow-2xs transition-transform active:scale-95"
            >
              Reply Now
            </Link>
          </div>

          {/* Action 4: Write Review */}
          <div className="bg-brand-pink/10 border-brand-pink/30 flex items-center justify-between gap-3 rounded-xl border p-3.5">
            <div className="flex items-start gap-3">
              <span className="bg-brand-pink/20 text-brand-pink mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                ⭐
              </span>
              <div className="space-y-0.5">
                <p className="text-foreground text-xs font-bold">
                  Review Received Transaction
                </p>
                <p className="text-muted-foreground text-[11px]">
                  Rate your deal with Hasan Mahmud
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/reviews"
              className="bg-brand-pink shrink-0 rounded-lg px-3 py-1.5 text-xs font-extrabold text-white shadow-2xs transition-transform active:scale-95"
            >
              Write Review
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Actionable Quick Stat Cards (With View All) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-base font-bold sm:text-lg">
            Quick Overview & Actions
          </h2>
          <Link
            href="/dashboard/analytics"
            className="text-primary flex items-center gap-1 text-xs font-bold hover:underline"
          >
            View All Insights <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {/* Card 1: My Books */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="bg-brand-pink/10 text-brand-pink flex h-8 w-8 items-center justify-center rounded-xl">
                <Library className="h-4 w-4" />
              </div>
              <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px] font-bold">
                35 Avail
              </span>
            </div>
            <div>
              <p className="text-foreground text-xl font-extrabold">42</p>
              <p className="text-muted-foreground text-[11px] font-semibold">
                My Books
              </p>
            </div>
            <Link
              href="/dashboard/library"
              className="text-primary border-border/40 flex items-center justify-between border-t pt-1.5 text-[11px] font-bold hover:underline"
            >
              <span>Manage</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 2: Borrowing */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="bg-success/10 text-success flex h-8 w-8 items-center justify-center rounded-xl">
                <Bookmark className="h-4 w-4" />
              </div>
              <span className="bg-warning/15 text-warning rounded px-1.5 py-0.5 text-[10px] font-bold">
                1 Due
              </span>
            </div>
            <div>
              <p className="text-foreground text-xl font-extrabold">2 Active</p>
              <p className="text-muted-foreground text-[11px] font-semibold">
                Borrowing
              </p>
            </div>
            <Link
              href="/dashboard/borrowed"
              className="text-primary border-border/40 flex items-center justify-between border-t pt-1.5 text-[11px] font-bold hover:underline"
            >
              <span>View Loans</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 3: Exchanges */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="bg-brand-blue/10 text-brand-blue flex h-8 w-8 items-center justify-center rounded-xl">
                <Repeat className="h-4 w-4" />
              </div>
              <span className="bg-success/15 text-success rounded px-1.5 py-0.5 text-[10px] font-bold">
                +1 Pending
              </span>
            </div>
            <div>
              <p className="text-foreground text-xl font-extrabold">5 Deals</p>
              <p className="text-muted-foreground text-[11px] font-semibold">
                Exchanges
              </p>
            </div>
            <Link
              href="/dashboard/exchanges"
              className="text-primary border-border/40 flex items-center justify-between border-t pt-1.5 text-[11px] font-bold hover:underline"
            >
              <span>View Deals</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 4: Selling */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                ৳ 2,450
              </span>
            </div>
            <div>
              <p className="text-foreground text-xl font-extrabold">3 Orders</p>
              <p className="text-muted-foreground text-[11px] font-semibold">
                Customer Sales
              </p>
            </div>
            <Link
              href="/dashboard/sales"
              className="text-primary border-border/40 flex items-center justify-between border-t pt-1.5 text-[11px] font-bold hover:underline"
            >
              <span>Sales Hub</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 5: Wallet */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <Coins className="h-4 w-4" />
              </div>
              <span className="bg-success/15 text-success rounded px-1.5 py-0.5 text-[10px] font-bold">
                Ready
              </span>
            </div>
            <div>
              <p className="text-foreground text-xl font-extrabold">৳ 1,800</p>
              <p className="text-muted-foreground text-[11px] font-semibold">
                Wallet Balance
              </p>
            </div>
            <Link
              href="/dashboard/wallet"
              className="text-primary border-border/40 flex items-center justify-between border-t pt-1.5 text-[11px] font-bold hover:underline"
            >
              <span>Withdraw</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 6: Reputation */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10 text-amber-500">
                <Star className="h-4 w-4 fill-amber-400" />
              </div>
              <span className="bg-brand-blue/15 text-brand-blue rounded px-1.5 py-0.5 text-[10px] font-bold">
                Top 5%
              </span>
            </div>
            <div>
              <p className="text-foreground text-xl font-extrabold">4.9 ⭐</p>
              <p className="text-muted-foreground text-[11px] font-semibold">
                48 Reviews
              </p>
            </div>
            <Link
              href="/dashboard/reviews"
              className="text-primary border-border/40 flex items-center justify-between border-t pt-1.5 text-[11px] font-bold hover:underline"
            >
              <span>Reviews</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Active Transactions Timeline (With View All) */}
      <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-4 shadow-2xs sm:p-5">
        <div className="border-border/40 flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-foreground text-base font-bold sm:text-lg">
              Activity Timeline
            </h2>
            <p className="text-muted-foreground text-xs">
              Real-time chronology of your exchanges, loans, and reviews
            </p>
          </div>
          <Link
            href="/dashboard/exchanges"
            className="text-primary flex items-center gap-1 text-xs font-bold hover:underline"
          >
            View All <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Chronological Feed */}
        <div className="border-primary/20 space-y-4 border-l-2 pl-3">
          <div className="relative flex items-start gap-3">
            <span className="bg-primary ring-background absolute top-1 -left-[19px] flex h-3 w-3 rounded-full ring-4" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-foreground text-xs font-bold">
                  Ahmed requested{" "}
                  <span className="text-primary">The Psychology of Money</span>
                </p>
                <span className="text-muted-foreground text-[10px] font-semibold">
                  10 min ago
                </span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Borrow request for 14 days • Dhanmondi Pick up point
              </p>
            </div>
          </div>

          <div className="relative flex items-start gap-3">
            <span className="bg-success ring-background absolute top-1 -left-[19px] flex h-3 w-3 rounded-full ring-4" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-foreground text-xs font-bold">
                  Exchange Accepted with Nusrat
                </p>
                <span className="text-muted-foreground text-[10px] font-semibold">
                  1 hour ago
                </span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Traded Rich Dad Poor Dad for Deep Work
              </p>
            </div>
          </div>

          <div className="relative flex items-start gap-3">
            <span className="bg-brand-blue ring-background absolute top-1 -left-[19px] flex h-3 w-3 rounded-full ring-4" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-foreground text-xs font-bold">
                  Returned Atomic Habits to Central Library
                </p>
                <span className="text-muted-foreground text-[10px] font-semibold">
                  Yesterday
                </span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Loan completed on time (+20 XP Earned)
              </p>
            </div>
          </div>

          <div className="relative flex items-start gap-3">
            <span className="ring-background absolute top-1 -left-[19px] flex h-3 w-3 rounded-full bg-amber-400 ring-4" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-foreground text-xs font-bold">
                  Received 5⭐ Review from Hasan Mahmud
                </p>
                <span className="text-muted-foreground text-[10px] font-semibold">
                  2 days ago
                </span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                &quot;Great condition book and super fast handover!&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Continue Reading Card (With View All) */}
      <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-4 shadow-2xs sm:p-5">
        <div className="border-border/40 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary h-5 w-5" />
            <h2 className="text-foreground text-base font-bold sm:text-lg">
              Continue Reading
            </h2>
          </div>
          <Link
            href="/dashboard/reading"
            className="text-primary flex items-center gap-1 text-xs font-bold hover:underline"
          >
            View All Reading <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="bg-muted/30 border-border/40 flex flex-col items-center gap-4 rounded-xl border p-4 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&fit=crop"
            alt="Atomic Habits"
            className="border-border h-24 w-16 shrink-0 rounded-lg border object-cover shadow-xs"
          />

          <div className="w-full flex-1 space-y-2 text-center sm:text-left">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-foreground text-base font-bold">
                  Atomic Habits
                </h3>
                <p className="text-muted-foreground text-xs">
                  James Clear • Self Development
                </p>
              </div>

              <span className="bg-warning/15 text-warning self-center rounded-full px-3 py-1 text-xs font-extrabold sm:self-auto">
                Due in 2 days
              </span>
            </div>

            {/* Reading Progress */}
            <div className="space-y-1 pt-1">
              <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
                <span>Reading Progress</span>
                <span className="text-foreground font-bold">
                  68% (Page 210 of 320)
                </span>
              </div>
              <div className="bg-muted h-2.5 w-full overflow-hidden rounded-full">
                <div className="bg-primary h-full w-[68%] rounded-full transition-all duration-300" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 sm:justify-start">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4 py-2 text-xs font-bold transition-transform active:scale-95">
                Continue Reading
              </button>
              <Link
                href="/dashboard/borrowed"
                className="bg-muted hover:bg-muted/80 text-foreground rounded-xl px-4 py-2 text-xs font-bold transition-colors"
              >
                Return / Extend
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Personalized Book Recommendations (Replacing Duplicate Shortcuts, With View All) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-base font-bold sm:text-lg">
              Recommended For You
            </h2>
            <p className="text-muted-foreground text-xs">
              Based on your recent reading preferences in Self Help & Technology
            </p>
          </div>
          <Link
            href="/books"
            className="text-primary flex items-center gap-1 text-xs font-bold hover:underline"
          >
            View All Books <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {recommendedBooks.map((book: Record<string, unknown>) => (
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
