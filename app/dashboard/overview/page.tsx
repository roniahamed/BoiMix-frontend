import { fetchLocal } from "@/lib/fetchLocal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookCard } from "@/components/shared/book-card";
import type { BookCardBook } from "@/types/book";
import {
  ChevronRight,
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
  Crown,
  Ticket,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default async function OverviewPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");
  const recommendedBooks = profileLibraryBooks.slice(0, 4);

  return (
    <div className="space-y-6 pb-24 sm:space-y-8 lg:pb-8">
      {/* 1. Gamified Welcome & Streak Progress Hero Header (Restored Rich Gradient & Subscription Badges) */}
      <div className="from-brand-blue via-primary text-primary-foreground shadow-primary/15 relative overflow-hidden rounded-[10px] bg-gradient-to-br to-purple-900 p-6 shadow-xl sm:p-8">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 -mb-20 h-60 w-60 rounded-full bg-amber-400/10 blur-2xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* User Info & Subscription Tier Status */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <Avatar className="h-16 w-16 border-2 border-white/30 shadow-lg sm:h-20 sm:w-20">
                <AvatarImage
                  src="https://i.pravatar.cc/150?u=roni"
                  alt="Roni Ahamed"
                />
                <AvatarFallback className="text-foreground font-bold">
                  RA
                </AvatarFallback>
              </Avatar>
              <span className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-extrabold text-slate-950 shadow-md">
                L12
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Good Afternoon 👋 Roni!
                </h1>

                {/* User Status / Pro Member Tier */}
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-black text-slate-950 shadow-xs">
                  <Crown className="h-3.5 w-3.5 fill-slate-950" /> Premium Pro
                  Member
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-md">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />{" "}
                  Central Library Verified
                </span>
              </div>

              <p className="text-primary-foreground/90 text-xs font-medium sm:text-sm">
                Backend Engineer • Dhaka Central Reader Community
              </p>

              {/* XP Level Progress Bar */}
              <div className="max-w-xs space-y-1 pt-2 sm:max-w-sm">
                <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                  <span>350 / 500 XP to Level 13</span>
                  <span>70%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full border border-white/10 bg-black/30">
                  <div className="h-full w-[70%] rounded-full bg-amber-300 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Streak & Today's Summary & Borrow Passes */}
          <div className="flex flex-col gap-3 border-t border-white/15 pt-4 lg:items-end lg:border-t-0 lg:pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-2xl bg-white/20 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-xs backdrop-blur-md">
                <Flame className="h-4 w-4 animate-pulse fill-amber-300 text-amber-300" />
                <span>14 Day Streak!</span>
              </div>

              {/* Borrow Pass Status Pill */}
              <Link
                href="/dashboard/passes"
                className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-400/30 bg-emerald-400/20 px-3.5 py-1.5 text-xs font-bold text-emerald-200 backdrop-blur-md transition-colors hover:bg-emerald-400/30"
              >
                <Ticket className="h-4 w-4 text-emerald-300" />
                <span>2 Borrow Passes Active</span>
              </Link>

              <div className="inline-flex items-center gap-1 rounded-2xl bg-amber-400/20 px-3 py-1.5 text-xs font-bold text-amber-200 backdrop-blur-md">
                <Coins className="h-3.5 w-3.5" /> 350 Pts
              </div>
            </div>

            <p className="text-[11px] font-semibold text-white/80">
              Today: 1 borrow due tomorrow • 2 exchange offers • 5 unread
              messages
            </p>

            {/* Quick Action CTAs */}
            <div className="flex w-full items-center gap-2 pt-1 lg:w-auto">
              <Link
                href="/books/upload"
                className="text-primary inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold shadow-md transition-all hover:bg-white/90 active:scale-95 lg:flex-none"
              >
                <Plus className="h-4 w-4 stroke-[3]" /> Add Book
              </Link>
              <Link
                href="/books"
                className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/15 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/25 lg:flex-none"
              >
                <Compass className="h-4 w-4" /> Browse
              </Link>
              <Link
                href="/dashboard/passes"
                className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-3.5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:bg-amber-300 active:scale-95 lg:flex-none"
              >
                <Ticket className="h-4 w-4" /> Buy Pass
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

          {/* Action 4: Renew Borrow Pass */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-purple-500/30 bg-purple-500/10 p-3.5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-xs font-bold text-purple-600">
                🎫
              </span>
              <div className="space-y-0.5">
                <p className="text-foreground text-xs font-bold">
                  Borrow Pass Expiring
                </p>
                <p className="text-muted-foreground text-[11px]">
                  1 Borrow Pass expires in 3 days
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/passes"
              className="shrink-0 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-2xs transition-transform active:scale-95"
            >
              Renew Pass
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Actionable Quick Stat Cards (With View All) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-base font-bold sm:text-lg">
            Account Summary & Status
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

          {/* Card 2: Borrowing & Passes */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="bg-success/10 text-success flex h-8 w-8 items-center justify-center rounded-xl">
                <Bookmark className="h-4 w-4" />
              </div>
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                2 Passes
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

          {/* Card 6: User Status Tier */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-2 rounded-2xl border p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10 text-amber-500">
                <Crown className="h-4 w-4 fill-amber-400" />
              </div>
              <span className="rounded bg-amber-400/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
                Pro Tier
              </span>
            </div>
            <div>
              <p className="text-foreground text-xl font-extrabold">4.9 ⭐</p>
              <p className="text-muted-foreground text-[11px] font-semibold">
                Premium Member
              </p>
            </div>
            <Link
              href="/dashboard/settings"
              className="text-primary border-border/40 flex items-center justify-between border-t pt-1.5 text-[11px] font-bold hover:underline"
            >
              <span>Manage Tier</span> <ArrowRight className="h-3 w-3" />
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
                Borrow request for 14 days • Central Library Pickup
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
