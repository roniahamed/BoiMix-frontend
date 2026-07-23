"use client";

import { useState } from "react";
import { OverviewActivityChart } from "@/components/dashboard/overview-charts";
import { SparklineCharts } from "@/components/dashboard/sparkline-charts";
import {
  Eye,
  Users,
  TrendingUp,
  BookOpen,
  Repeat,
  ShoppingBag,
  Star,
  Activity,
} from "lucide-react";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "books" | "borrow" | "exchange" | "marketplace" | "community"
  >("overview");

  return (
    <div className="space-y-6 pb-16 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
          <Activity className="text-primary h-7 w-7" /> Insights & Analytics Hub
        </h1>
        <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
          Deep engagement metrics, exchange performance, and marketplace
          analytics.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="border-border/60 border-b pb-3">
        <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { key: "overview", label: "Overview", icon: Activity },
            { key: "books", label: "Books Analytics", icon: BookOpen },
            { key: "borrow", label: "Borrowing Insights", icon: BookOpen },
            { key: "exchange", label: "Exchanges", icon: Repeat },
            {
              key: "marketplace",
              label: "Marketplace & Sales",
              icon: ShoppingBag,
            },
            { key: "community", label: "Community & Reputation", icon: Star },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-bold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
              <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
                <span>Total Book Views</span>
                <Eye className="text-primary h-4 w-4" />
              </div>
              <p className="text-foreground text-2xl font-extrabold">1,245</p>
              <p className="text-success text-[11px] font-bold">
                +15% vs last month
              </p>
            </div>

            <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
              <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
                <span>Reader Profile Visits</span>
                <Users className="text-brand-blue h-4 w-4" />
              </div>
              <p className="text-foreground text-2xl font-extrabold">342</p>
              <p className="text-success text-[11px] font-bold">
                +5% this week
              </p>
            </div>

            <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
              <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
                <span>Exchange Conversion Rate</span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-foreground text-2xl font-extrabold">12.4%</p>
              <p className="text-success text-[11px] font-bold">
                Top 5% among swappers
              </p>
            </div>
          </div>

          {/* Activity Chart */}
          <OverviewActivityChart />

          {/* Sparkline Charts */}
          <SparklineCharts />
        </div>
      )}

      {/* Tab 2: Books Analytics */}
      {activeTab === "books" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                Total Listings
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                42 Books
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                +4 added this month
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                Search Appearances
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                890 Impressions
              </p>
              <p className="text-muted-foreground mt-1 text-xs font-medium">
                High search visibility
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                Wishlist Saves
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                56 Times
              </p>
              <p className="text-success mt-1 text-xs font-bold">+20% saved</p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                Click-Through Rate
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                8.5%
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                Above average CTR
              </p>
            </div>
          </div>

          <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-5 shadow-2xs">
            <h3 className="text-foreground text-base font-bold">
              Top Viewed Books
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Atomic Habits",
                  views: 420,
                  wishlisted: 18,
                  rating: "4.9 ⭐",
                },
                {
                  title: "The Psychology of Money",
                  views: 310,
                  wishlisted: 14,
                  rating: "4.8 ⭐",
                },
                {
                  title: "Rich Dad Poor Dad",
                  views: 240,
                  wishlisted: 9,
                  rating: "4.7 ⭐",
                },
              ].map((book) => (
                <div
                  key={book.title}
                  className="bg-muted/40 flex items-center justify-between rounded-xl p-3"
                >
                  <div>
                    <p className="text-foreground text-xs font-bold">
                      {book.title}
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      {book.wishlisted} saved to wishlist
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary text-xs font-bold">
                      {book.views} views
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      {book.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Borrowing Insights */}
      {activeTab === "borrow" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Total Borrowed Books
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                18 Books
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                100% On-time returns
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Average Reading Time
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                11 Days
              </p>
              <p className="text-muted-foreground mt-1 text-xs font-medium">
                3 days before deadline
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Pass Renewals
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                4 Renewals
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                Zero late fees
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Exchanges */}
      {activeTab === "exchange" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Successful Exchanges
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                14 Deals
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                +3 this month
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Exchange Approval Rate
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                92%
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                Instant responder
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Average Completion Time
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                1.5 Days
              </p>
              <p className="text-muted-foreground mt-1 text-xs font-medium">
                Dhaka Metro Area
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Marketplace & Sales */}
      {activeTab === "marketplace" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Total Revenue Earned
              </p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-600">
                ৳ 2,450
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                +৳ 800 this month
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Books Sold
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                5 Books
              </p>
              <p className="text-muted-foreground mt-1 text-xs font-medium">
                Average price ৳ 490
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Escrow Payout Success
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                100%
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                Direct to bKash
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Community & Reputation */}
      {activeTab === "community" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Community Reputation
              </p>
              <p className="mt-1 flex items-center gap-1 text-2xl font-extrabold text-amber-500">
                4.9 <Star className="h-5 w-5 fill-amber-400" />
              </p>
              <p className="text-muted-foreground mt-1 text-xs font-medium">
                48 Verified Reviews
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                Community Followers
              </p>
              <p className="text-foreground mt-1 text-2xl font-extrabold">
                128 Readers
              </p>
              <p className="text-success mt-1 text-xs font-bold">
                +12 followers this week
              </p>
            </div>

            <div className="bg-card border-border/70 rounded-2xl border p-4 shadow-2xs">
              <p className="text-muted-foreground text-xs font-semibold">
                XP Level Rank
              </p>
              <p className="text-primary mt-1 text-2xl font-extrabold">
                Level 12
              </p>
              <p className="text-muted-foreground mt-1 text-xs font-medium">
                Top 5% Reader Level
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
