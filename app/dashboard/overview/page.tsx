import { fetchLocal } from "@/lib/fetchLocal";
import { QuickSummary } from "@/components/dashboard/quick-summary";
import { SparklineCharts } from "@/components/dashboard/sparkline-charts";
import { OverviewActivityChart } from "@/components/dashboard/overview-charts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Crown,
  ChevronRight,
  BookDown,
  Repeat,
  Mail,
  Star,
  Plus,
  Flame,
  Clock,
  ArrowRight,
  Compass,
  Coins,
  Library,
  Heart,
  Shield,
  MessageSquare,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default async function OverviewPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");
  const upcomingBook = profileLibraryBooks[0] || null;

  const activeExchanges = [
    {
      id: "ex-1",
      bookTitle: "The Psychology of Money",
      bookAuthor: "Morgan Housel",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&fit=crop",
      type: "Borrow",
      partnerName: "Ahmed Rahman",
      partnerAvatar: "https://i.pravatar.cc/150?u=ahmed",
      status: "Due in 2 days",
      statusVariant: "danger",
      dueDate: "25 Jul 2026",
    },
    {
      id: "ex-2",
      bookTitle: "Atomic Habits",
      bookAuthor: "James Clear",
      coverImage:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&fit=crop",
      type: "Exchange Offer",
      partnerName: "Nusrat Jahan",
      partnerAvatar: "https://i.pravatar.cc/150?u=nusrat",
      status: "Pending Accept",
      statusVariant: "warning",
      dueDate: "Action Required",
    },
    {
      id: "ex-3",
      bookTitle: "Deep Work (Sold)",
      bookAuthor: "Cal Newport",
      coverImage:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&fit=crop",
      type: "Book Sale",
      partnerName: "Jannatul Ferdaus",
      partnerAvatar: "https://i.pravatar.cc/150?u=jannatul",
      status: "Sold for ৳ 450",
      statusVariant: "success",
      dueDate: "Completed",
    },
    {
      id: "ex-4",
      bookTitle: "Rich Dad Poor Dad",
      bookAuthor: "Robert Kiyosaki",
      coverImage:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=200&fit=crop",
      type: "Lent Out",
      partnerName: "Hasan Mahmud",
      partnerAvatar: "https://i.pravatar.cc/150?u=hasan",
      status: "Active Loan",
      statusVariant: "success",
      dueDate: "02 Aug 2026",
    },
  ];

  return (
    <div className="space-y-6 pb-24 sm:space-y-8 lg:pb-8">
      {/* 1. Mobile-First Hero Welcome & Reading Goal Banner */}
      <div className="from-brand-blue/90 via-primary to-brand-pink/90 relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-white shadow-xl sm:rounded-3xl sm:p-6 md:p-8">
        {/* Decorative background glow rings */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl sm:h-64 sm:w-64" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-black/10 blur-2xl sm:h-64 sm:w-64" />

        <div className="relative z-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          {/* User profile & greeting */}
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="relative shrink-0">
              <Avatar className="h-16 w-16 border-2 border-white/20 shadow-lg sm:h-20 sm:w-20 sm:border-4">
                <AvatarImage
                  src="https://i.pravatar.cc/240?u=roni"
                  alt="Roni Ahamed"
                />
                <AvatarFallback className="text-primary bg-white text-lg font-bold sm:text-xl">
                  RA
                </AvatarFallback>
              </Avatar>
              <span className="bg-success absolute right-0 bottom-0 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white sm:right-1 sm:bottom-1 sm:h-6 sm:w-6">
                <BadgeCheck className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
              </span>
            </div>

            <div className="min-w-0 space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
                  Welcome back, Roni! 👋
                </h1>
              </div>
              <p className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/80 sm:gap-2 sm:text-sm">
                <span>Backend Engineer</span>
                <span>•</span>
                <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold backdrop-blur-xs sm:text-xs">
                  <Crown className="text-warning fill-warning h-3 w-3 sm:h-3.5 sm:w-3.5" />{" "}
                  Pro Reader
                </span>
              </p>

              {/* Badges & streak row */}
              <div className="flex flex-wrap items-center gap-2 pt-1.5 sm:gap-3 sm:pt-2">
                <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[11px] font-bold backdrop-blur-md transition-colors hover:bg-white/20 sm:px-3 sm:py-1 sm:text-xs">
                  <Flame className="h-3.5 w-3.5 animate-pulse fill-amber-300 text-amber-300" />
                  <span>14d Streak</span>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[11px] font-bold backdrop-blur-md transition-colors hover:bg-white/20 sm:px-3 sm:py-1 sm:text-xs">
                  <Coins className="h-3.5 w-3.5 text-yellow-300" />
                  <span>350 Points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Reading Goal Progress & Quick Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:flex-col lg:items-end">
            {/* Goal card */}
            <div className="w-full space-y-2 rounded-xl border border-white/15 bg-black/25 p-3 backdrop-blur-md sm:w-auto sm:rounded-2xl sm:p-4 lg:min-w-[260px]">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1 text-[11px] text-white/90 sm:text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" /> Monthly
                  Goal
                </span>
                <span className="text-[11px] font-extrabold text-white sm:text-xs">
                  4 / 6 Books (67%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-amber-300 to-emerald-400 transition-all duration-500" />
              </div>
              <p className="text-right text-[10px] font-medium text-white/80 sm:text-[11px]">
                2 more books to unlock July Badge 🏆
              </p>
            </div>

            {/* CTAs */}
            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
              <Link
                href="/books/upload"
                className="text-primary flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-xs font-bold shadow-md transition-all hover:bg-white/90 active:scale-95 sm:text-sm"
              >
                <Plus className="h-4 w-4 stroke-[3]" /> Add Book
              </Link>
              <Link
                href="/explore/exchanges"
                className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/15 px-3.5 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/25 sm:text-sm"
              >
                <Compass className="h-4 w-4" /> Exchanges
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Summary Cards */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-base font-bold sm:text-lg">
            Platform Overview
          </h2>
          <span className="text-muted-foreground text-[11px] font-semibold sm:text-xs">
            Updated live
          </span>
        </div>
        <QuickSummary />
      </div>

      {/* 3. Analytics & Sparklines Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OverviewActivityChart />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold sm:text-base">
              Engagement Trends
            </h3>
            <span className="text-muted-foreground text-xs">7 Days</span>
          </div>
          <SparklineCharts />
        </div>
      </div>

      {/* 4. Active Exchanges & Exchange Requests */}
      <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-4 shadow-xs sm:p-5">
        <div className="border-border/40 flex flex-col gap-2 border-b pb-3 sm:flex-row sm:items-center sm:justify-between sm:pb-4">
          <div>
            <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
              <Repeat className="text-primary h-4 w-4 sm:h-5 sm:w-5" /> Active
              Exchanges & Requests
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Manage active borrow loans, lending, and pending exchange
              proposals
            </p>
          </div>
          <Link
            href="/dashboard/exchanges"
            className="text-primary flex items-center gap-1 self-start text-xs font-bold hover:underline sm:self-auto"
          >
            View All <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* MOBILE CARD LIST (block md:hidden) - Touch Friendly Mobile First */}
        <div className="block space-y-3 md:hidden">
          {activeExchanges.map((item) => (
            <div
              key={item.id}
              className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5"
            >
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.coverImage}
                  alt={item.bookTitle}
                  className="border-border h-14 w-10 shrink-0 rounded-md border object-cover shadow-xs"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-extrabold">
                      {item.type}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        item.statusVariant === "danger"
                          ? "bg-danger/15 text-danger"
                          : item.statusVariant === "warning"
                            ? "bg-warning/15 text-warning"
                            : "bg-success/15 text-success"
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-foreground truncate text-sm font-bold">
                    {item.bookTitle}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {item.bookAuthor}
                  </p>
                </div>
              </div>

              <div className="border-border/40 flex items-center justify-between border-t pt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.partnerAvatar} />
                    <AvatarFallback className="text-[10px]">P</AvatarFallback>
                  </Avatar>
                  <span className="text-foreground text-xs font-semibold">
                    {item.partnerName}
                  </span>
                </div>

                <Link
                  href="/dashboard/messages"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[36px] items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Message
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE VIEW (hidden md:block) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-border/50 text-muted-foreground border-b text-xs font-semibold uppercase">
                <th className="pb-3 pl-1 font-bold">Book Title</th>
                <th className="pb-3 font-bold">Type</th>
                <th className="pb-3 font-bold">Counterparty</th>
                <th className="pb-3 font-bold">Status / Due Date</th>
                <th className="pr-1 pb-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {activeExchanges.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <td className="py-3 pl-1">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.coverImage}
                        alt={item.bookTitle}
                        className="border-border h-11 w-8 rounded-md border object-cover shadow-2xs"
                      />
                      <div>
                        <p className="text-foreground line-clamp-1 font-bold">
                          {item.bookTitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.bookAuthor}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-foreground py-3 text-xs font-semibold">
                    {item.type}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={item.partnerAvatar} />
                        <AvatarFallback className="text-[10px]">
                          P
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground text-xs font-medium">
                        {item.partnerName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        item.statusVariant === "danger"
                          ? "bg-danger/15 text-danger"
                          : item.statusVariant === "warning"
                            ? "bg-warning/15 text-warning"
                            : "bg-success/15 text-success"
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 pr-1 text-right">
                    <Link
                      href="/dashboard/messages"
                      className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" /> Message
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Two-Column Layout: Currently Reading & Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Currently Borrowed / Spotlight Card */}
        <div className="bg-card border-border/70 flex flex-col justify-between space-y-4 rounded-2xl border p-4 shadow-xs sm:p-5">
          <div className="border-border/40 flex items-center justify-between border-b pb-3">
            <h2 className="text-foreground flex items-center gap-1.5 text-sm font-bold sm:gap-2 sm:text-base">
              <BookDown className="text-brand-pink h-4 w-4 shrink-0" />{" "}
              Currently Reading
            </h2>
            <span className="bg-danger/15 text-danger rounded-full px-2.5 py-0.5 text-[11px] font-bold sm:text-xs">
              Due in 2d
            </span>
          </div>

          {upcomingBook && (
            <div className="bg-muted/30 border-border/50 flex items-start gap-3.5 rounded-xl border p-3 sm:gap-4 sm:p-3.5">
              <div className="border-border h-20 w-14 shrink-0 overflow-hidden rounded-lg border shadow-xs sm:h-24 sm:w-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    upcomingBook.coverImage ||
                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&fit=crop"
                  }
                  alt={upcomingBook.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h3 className="text-foreground line-clamp-1 text-sm leading-snug font-extrabold sm:text-base">
                  {upcomingBook.title}
                </h3>
                <p className="text-muted-foreground truncate text-xs font-medium">
                  Author: {upcomingBook.author}
                </p>

                <div className="space-y-1 pt-0.5">
                  <div className="text-muted-foreground flex justify-between text-[11px] font-semibold">
                    <span>Reading Progress</span>
                    <span className="text-primary font-bold">68%</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full w-[68%] rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1.5">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src="https://i.pravatar.cc/150?u=ahmed" />
                    </Avatar>
                    <span className="text-foreground text-xs font-medium">
                      Ahmed
                    </span>
                  </div>

                  <Link
                    href="/dashboard/borrowed"
                    className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
                  >
                    Extend <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/dashboard/borrowed"
              className="bg-primary/10 hover:bg-primary/20 text-primary flex min-h-[40px] flex-1 items-center justify-center rounded-xl py-2.5 text-center text-xs font-bold transition-colors"
            >
              Borrow History
            </Link>
            <Link
              href="/explore/central-library"
              className="bg-muted hover:bg-muted/80 text-foreground flex min-h-[40px] flex-1 items-center justify-center rounded-xl py-2.5 text-center text-xs font-bold transition-colors"
            >
              Browse Library
            </Link>
          </div>
        </div>

        {/* Recent Community & Account Activity */}
        <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-4 shadow-xs sm:p-5">
          <div className="border-border/40 flex items-center justify-between border-b pb-3">
            <h2 className="text-foreground text-sm font-bold sm:text-base">
              Recent Activity
            </h2>
            <Link
              href="/dashboard/notifications"
              className="text-primary text-xs font-bold hover:underline"
            >
              View Feed
            </Link>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {[
              {
                icon: BookDown,
                title: "Ahmed requested to borrow",
                desc: "The Psychology of Money",
                time: "10m ago",
                bg: "bg-success/10",
                color: "text-success",
              },
              {
                icon: Repeat,
                title: "Exchange request accepted",
                desc: "Rich Dad Poor Dad with Nusrat",
                time: "3h ago",
                bg: "bg-brand-blue/10",
                color: "text-brand-blue",
              },
              {
                icon: Star,
                title: "New 5-star review received",
                desc: "Fahim praised quick response",
                time: "5h ago",
                bg: "bg-warning/10",
                color: "text-warning",
              },
              {
                icon: Flame,
                title: "Daily Reading Streak updated",
                desc: "Completed day 14 streak",
                time: "1d ago",
                bg: "bg-brand-pink/10",
                color: "text-brand-pink",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="bg-muted/30 hover:bg-muted/60 border-border/40 flex items-start gap-3 rounded-xl border p-2.5 transition-colors sm:p-3"
              >
                <div className={`shrink-0 rounded-lg p-2 ${activity.bg}`}>
                  <activity.icon
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${activity.color}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-xs font-bold">
                    {activity.title}
                  </p>
                  <p className="text-muted-foreground truncate text-[11px]">
                    {activity.desc}
                  </p>
                </div>
                <span className="text-muted-foreground text-[10px] font-medium whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Quick Command Center Launcher Grid */}
      <div className="space-y-3">
        <h2 className="text-foreground text-base font-bold sm:text-lg">
          Command Shortcuts
        </h2>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {[
            {
              title: "My Library",
              desc: "42 books listed",
              href: "/dashboard/library",
              icon: Library,
              color: "text-brand-blue",
              bg: "bg-brand-blue/10",
            },
            {
              title: "My Sales",
              desc: "5 sold • ৳ 2,450",
              href: "/dashboard/sales",
              icon: ShoppingBag,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              title: "Wishlist",
              desc: "12 saved books",
              href: "/dashboard/wishlist",
              icon: Heart,
              color: "text-brand-pink",
              bg: "bg-brand-pink/10",
            },
            {
              title: "Messages",
              desc: "5 unread chats",
              href: "/dashboard/messages",
              icon: MessageSquare,
              color: "text-success",
              bg: "bg-success/10",
            },
            {
              title: "Settings",
              desc: "Profile & address",
              href: "/dashboard/settings",
              icon: Shield,
              color: "text-warning",
              bg: "bg-warning/10",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-card hover:bg-muted/50 border-border/70 hover:border-primary/40 flex min-h-[96px] flex-col justify-between space-y-2.5 rounded-2xl border p-3.5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 sm:space-y-3 sm:p-4"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-2 sm:p-2.5 ${item.bg}`}>
                  <item.icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`}
                  />
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div>
                <p className="text-foreground group-hover:text-primary text-xs font-bold transition-colors sm:text-sm">
                  {item.title}
                </p>
                <p className="text-muted-foreground mt-0.5 truncate text-[11px] sm:text-xs">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
