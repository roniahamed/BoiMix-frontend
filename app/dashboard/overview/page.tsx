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
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";

import Link from "next/link";
import { AddBookButton } from "@/components/shared/add-book-button";

export default async function OverviewPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");
  const recommendedBooks = profileLibraryBooks.slice(0, 4);

  return (
    <div className="space-y-5 pb-24 sm:space-y-6 lg:pb-8">
      {/* ── HERO WELCOME BANNER ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b2a5b] via-[#0397d3] to-[#7c3aed] p-6 shadow-2xl sm:p-8">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-1/4 h-48 w-48 rounded-full bg-amber-400/15 blur-2xl" />
        <div className="pointer-events-none absolute top-1/2 right-1/3 h-32 w-32 -translate-y-1/2 rounded-full bg-purple-400/10 blur-xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: User info */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="h-[72px] w-[72px] rounded-full bg-gradient-to-br from-amber-300 to-amber-500 p-0.5 shadow-lg sm:h-[88px] sm:w-[88px]">
                <Avatar className="h-full w-full border-2 border-[#0b2a5b]/30">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=roni"
                    alt="Roni Ahamed"
                  />
                  <AvatarFallback className="text-foreground font-bold">
                    RA
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="absolute -right-1.5 -bottom-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0397d3] bg-amber-400 text-[10px] font-black text-slate-950 shadow-md">
                L12
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Good Afternoon 👋 Roni!
              </h1>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-0.5 text-[11px] font-black text-slate-950 shadow-sm">
                  <Crown className="h-3 w-3 fill-slate-950" /> Premium Pro
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                  <ShieldCheck className="h-3 w-3 text-emerald-300" /> Verified
                </span>
              </div>

              <p className="text-[12px] font-medium text-white/70">
                Backend Engineer · Dhaka Central Reader Community
              </p>

              {/* XP Bar */}
              <div className="max-w-[260px] space-y-1 pt-1 sm:max-w-sm">
                <div className="flex items-center justify-between text-[10px] font-bold text-white/80">
                  <span>350 / 500 XP · Level 13</span>
                  <span className="text-amber-300">70%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "70%",
                      background:
                        "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Badges + Actions */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 lg:items-end lg:border-t-0 lg:pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-extrabold text-white backdrop-blur-sm">
                <Flame className="h-3.5 w-3.5 animate-pulse fill-amber-300 text-amber-300" />
                14 Day Streak!
              </div>
              <Link
                href="/dashboard/passes"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3.5 py-1.5 text-[11px] font-bold text-emerald-200 backdrop-blur-sm transition-colors hover:bg-emerald-400/25"
              >
                <Ticket className="h-3.5 w-3.5 text-emerald-300" />2 Borrow
                Passes
              </Link>
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1.5 text-[11px] font-bold text-amber-200 backdrop-blur-sm">
                <Coins className="h-3.5 w-3.5" /> 350 Pts
              </div>
            </div>

            <p className="text-[11px] font-medium text-white/60">
              Today: 1 return due · 2 exchange offers · 5 messages
            </p>

            <div className="flex w-full items-center gap-2 lg:w-auto">
              <AddBookButton className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-5 py-2 text-xs font-extrabold text-[#0397d3] shadow-md transition-all hover:bg-white/90 active:scale-95 lg:flex-none">
                <Plus className="h-4 w-4 stroke-[3]" /> Add Book
              </AddBookButton>
              <Link
                href="/books"
                className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 lg:flex-none"
              >
                <Compass className="h-4 w-4" /> Browse
              </Link>
              <Link
                href="/dashboard/passes"
                className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 shadow-md transition-all hover:bg-amber-300 active:scale-95 lg:flex-none"
              >
                <Ticket className="h-4 w-4" /> Buy Pass
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-base font-bold sm:text-lg">
            Account Summary
          </h2>
          <Link
            href="/dashboard/analytics"
            className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
          >
            All Insights <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            icon={<Library className="h-4 w-4" />}
            iconBg="bg-[#e91e63]/10 text-[#e91e63]"
            badge="35 Avail"
            badgeBg="bg-[#e91e63]/10 text-[#e91e63]"
            value="42"
            label="My Books"
            link="/dashboard/library"
            linkLabel="Manage"
          />
          <StatCard
            icon={<Bookmark className="h-4 w-4" />}
            iconBg="bg-emerald-500/10 text-emerald-500"
            badge="2 Passes"
            badgeBg="bg-emerald-500/10 text-emerald-600"
            value="2 Active"
            label="Borrowing"
            link="/dashboard/borrowed"
            linkLabel="View Loans"
          />
          <StatCard
            icon={<Repeat className="h-4 w-4" />}
            iconBg="bg-[#0397d3]/10 text-[#0397d3]"
            badge="+1 Pending"
            badgeBg="bg-emerald-500/10 text-emerald-600"
            value="5 Deals"
            label="Exchanges"
            link="/dashboard/exchanges"
            linkLabel="View Deals"
          />
          <StatCard
            icon={<ShoppingBag className="h-4 w-4" />}
            iconBg="bg-emerald-500/10 text-emerald-500"
            badge="৳ 2,450"
            badgeBg="bg-emerald-500/10 text-emerald-600"
            value="3 Orders"
            label="Customer Sales"
            link="/dashboard/sales"
            linkLabel="Sales Hub"
          />
          <StatCard
            icon={<Coins className="h-4 w-4" />}
            iconBg="bg-amber-500/10 text-amber-500"
            badge="Ready"
            badgeBg="bg-emerald-500/10 text-emerald-600"
            value="৳ 1,800"
            label="Wallet Balance"
            link="/dashboard/wallet"
            linkLabel="Withdraw"
          />
          <StatCard
            icon={<Crown className="h-4 w-4 fill-amber-400" />}
            iconBg="bg-amber-400/10 text-amber-500"
            badge="Pro Tier"
            badgeBg="bg-amber-400/10 text-amber-600"
            value="4.9 ⭐"
            label="Premium Member"
            link="/dashboard/settings"
            linkLabel="Manage Tier"
          />
        </div>
      </div>

      {/* ── ACTION CENTER + ACTIVITY TIMELINE ── */}
      <div className="grid gap-5 lg:grid-cols-5">
        {/* Action Center */}
        <div className="bg-card border-border/60 flex flex-col rounded-2xl border shadow-sm lg:col-span-3">
          <div className="border-border/40 flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </span>
              <div>
                <h2 className="text-foreground text-sm font-bold">
                  Action Center
                </h2>
                <p className="text-muted-foreground text-[11px]">
                  High-priority tasks
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/notifications"
              className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
            >
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 p-4">
            <ActionItem
              emoji="⏰"
              emojiColor="bg-amber-400/15 text-amber-600"
              borderColor="border-amber-400/30"
              bgColor="bg-amber-400/5"
              title="Return Book Due Tomorrow"
              subtitle="Atomic Habits · Owner: Ahmed Rahman"
              tag="⏱ 1 day left"
              tagColor="bg-amber-400/15 text-amber-600"
              linkHref="/dashboard/borrowed"
              linkLabel="Return / Extend"
              linkColor="bg-amber-400 text-slate-950"
            />
            <ActionItem
              emoji="🔄"
              emojiColor="bg-[#0397d3]/15 text-[#0397d3]"
              borderColor="border-[#0397d3]/30"
              bgColor="bg-[#0397d3]/5"
              title="Exchange Offer Received"
              subtitle="Nusrat wants Rich Dad Poor Dad"
              tag="⏱ 2 hrs ago"
              tagColor="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
              linkHref="/dashboard/exchanges/offers"
              linkLabel="Accept / View"
              linkColor="bg-[#0397d3] text-white"
            />
            <ActionItem
              emoji="💬"
              emojiColor="bg-emerald-500/15 text-emerald-600"
              borderColor="border-emerald-500/30"
              bgColor="bg-emerald-500/5"
              title="5 Unread Messages"
              subtitle='Ahmed: "Is the book ready for pickup?"'
              tag="⏱ 14 min ago"
              tagColor="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              linkHref="/dashboard/messages"
              linkLabel="Reply Now"
              linkColor="bg-emerald-500 text-white"
            />
            <ActionItem
              emoji="🎫"
              emojiColor="bg-purple-500/15 text-purple-600"
              borderColor="border-purple-500/30"
              bgColor="bg-purple-500/5"
              title="Borrow Pass Expiring"
              subtitle="1 Borrow Pass expires in 3 days"
              tag="⏱ 3 days left"
              tagColor="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300"
              linkHref="/dashboard/passes"
              linkLabel="Renew Pass"
              linkColor="bg-purple-600 text-white"
            />
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-card border-border/60 flex flex-col rounded-2xl border shadow-sm lg:col-span-2">
          <div className="border-border/40 flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-foreground text-sm font-bold">Activity</h2>
                <p className="text-muted-foreground text-[11px]">
                  Your recent actions
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/exchanges"
              className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
            >
              All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex-1 p-5">
            <div className="border-primary/20 space-y-4 border-l-2 pl-4">
              <TimelineItem
                dotColor="bg-primary"
                title={
                  <>
                    Ahmed requested{" "}
                    <span className="text-primary">
                      The Psychology of Money
                    </span>
                  </>
                }
                time="10 min ago"
                desc="Borrow request · 14 days · Central Library"
              />
              <TimelineItem
                dotColor="bg-emerald-500"
                title="Exchange Accepted with Nusrat"
                time="1 hour ago"
                desc="Traded Rich Dad Poor Dad for Deep Work"
              />
              <TimelineItem
                dotColor="bg-[#0397d3]"
                title="Returned Atomic Habits to Central Library"
                time="Yesterday"
                desc="Loan completed on time · +20 XP Earned"
              />
              <TimelineItem
                dotColor="bg-amber-400"
                title="Received 5⭐ from Hasan Mahmud"
                time="2 days ago"
                desc='"Great condition book and super fast handover!"'
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTINUE READING ── */}
      <div className="bg-card border-border/60 overflow-hidden rounded-2xl border shadow-sm">
        <div className="border-border/40 flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-foreground text-sm font-bold">
                Continue Reading
              </h2>
              <p className="text-muted-foreground text-[11px]">
                Pick up where you left off
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/reading"
            className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
          >
            View All <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="p-4 sm:p-5">
          <div className="border-border/40 flex flex-col items-center gap-5 rounded-2xl border bg-gradient-to-r from-[#0397d3]/5 via-transparent to-purple-500/5 p-5 sm:flex-row">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&fit=crop"
                alt="Atomic Habits"
                className="border-border h-32 w-[88px] rounded-xl border-2 object-cover shadow-lg sm:h-36 sm:w-24"
              />
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-slate-950 shadow">
                68%
              </span>
            </div>

            <div className="w-full flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-foreground text-lg leading-tight font-extrabold">
                    Atomic Habits
                  </h3>
                  <p className="text-muted-foreground text-xs font-medium">
                    James Clear · Self Development
                  </p>
                </div>
                <span className="self-center rounded-full bg-amber-400/15 px-3 py-1 text-xs font-extrabold text-amber-600 sm:self-auto">
                  <Clock className="mr-1 inline h-3 w-3" />
                  Due in 2 days
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
                  <span>Reading Progress</span>
                  <span className="text-foreground font-bold">
                    Page 210 of 320
                  </span>
                </div>
                <div className="bg-muted h-2.5 w-full overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "68%",
                      background:
                        "linear-gradient(90deg, #0397d3 0%, #7c3aed 100%)",
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold transition-all active:scale-95">
                  <Zap className="h-3.5 w-3.5" /> Continue
                </button>
                <Link
                  href="/dashboard/borrowed"
                  className="bg-muted hover:bg-muted/80 text-foreground flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors"
                >
                  Return / Extend
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RECOMMENDED BOOKS ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-base font-bold sm:text-lg">
              Recommended For You
            </h2>
            <p className="text-muted-foreground text-xs">
              Based on your recent reading in Self Help &amp; Technology
            </p>
          </div>
          <Link
            href="/books"
            className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
          >
            View All <ChevronRight className="h-3.5 w-3.5" />
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

/* ─── Sub-components ─── */

function StatCard({
  icon,
  iconBg,
  badge,
  badgeBg,
  value,
  label,
  link,
  linkLabel,
}: {
  icon: React.ReactNode;
  iconBg: string;
  badge: string;
  badgeBg: string;
  value: string;
  label: string;
  link: string;
  linkLabel: string;
}) {
  return (
    <div className="bg-card border-border/60 group flex flex-col justify-between gap-3 rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>
        <span
          className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${badgeBg}`}
        >
          {badge}
        </span>
      </div>
      <div>
        <p className="text-foreground text-xl leading-none font-extrabold">
          {value}
        </p>
        <p className="text-muted-foreground mt-0.5 text-[11px] font-semibold">
          {label}
        </p>
      </div>
      <Link
        href={link}
        className="text-primary border-border/40 flex items-center justify-between border-t pt-2 text-[11px] font-bold transition-colors hover:underline"
      >
        <span>{linkLabel}</span>
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

function ActionItem({
  emoji,
  emojiColor,
  borderColor,
  bgColor,
  title,
  subtitle,
  tag,
  tagColor,
  linkHref,
  linkLabel,
  linkColor,
}: {
  emoji: string;
  emojiColor: string;
  borderColor: string;
  bgColor: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  linkHref: string;
  linkLabel: string;
  linkColor: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border ${borderColor} ${bgColor} p-3`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${emojiColor}`}
        >
          {emoji}
        </span>
        <div className="space-y-0.5">
          <p className="text-foreground text-xs leading-tight font-bold">
            {title}
          </p>
          <p className="text-muted-foreground text-[11px]">{subtitle}</p>
          <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold ${tagColor}`}
          >
            {tag}
          </span>
        </div>
      </div>
      <Link
        href={linkHref}
        className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-extrabold shadow-sm transition-all hover:opacity-90 active:scale-95 ${linkColor}`}
      >
        {linkLabel}
      </Link>
    </div>
  );
}

function TimelineItem({
  dotColor,
  title,
  time,
  desc,
}: {
  dotColor: string;
  title: React.ReactNode;
  time: string;
  desc: string;
}) {
  return (
    <div className="relative flex items-start gap-3">
      <span
        className={`ring-card absolute top-1 -left-[21px] flex h-3 w-3 rounded-full ring-4 ${dotColor}`}
      />
      <div className="space-y-0.5">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="text-foreground text-xs leading-tight font-bold">
            {title}
          </p>
          <span className="text-muted-foreground text-[10px] font-semibold">
            {time}
          </span>
        </div>
        <p className="text-muted-foreground text-[11px] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
