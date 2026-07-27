"use client";

import { useState } from "react";
import { OverviewActivityChart } from "@/components/dashboard/overview-charts";
import { SparklineCharts } from "@/components/dashboard/sparkline-charts";
import { BookOpen, Repeat, ShoppingBag, Star, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/analytics/analytics-cards";
import { AnalyticsBooksTab } from "@/components/dashboard/analytics/analytics-books-tab";
import { AnalyticsBorrowTab } from "@/components/dashboard/analytics/analytics-borrow-tab";
import { AnalyticsExchangeTab } from "@/components/dashboard/analytics/analytics-exchange-tab";
import { AnalyticsSalesTab } from "@/components/dashboard/analytics/analytics-sales-tab";
import { AnalyticsCommunityTab } from "@/components/dashboard/analytics/analytics-community-tab";

const tabs = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "books", label: "Books Analytics", icon: BookOpen },
  { key: "borrow", label: "Borrowing Insights", icon: BookOpen },
  { key: "exchange", label: "Exchanges", icon: Repeat },
  { key: "marketplace", label: "Marketplace & Sales", icon: ShoppingBag },
  { key: "community", label: "Community & Reputation", icon: Star },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

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

      {/* Tabs */}
      <div className="border-border/60 border-b pb-3">
        <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
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

      {/* ── Tab 1: Overview ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Total Book Views"
              value="1,245"
              trend="+15% vs last month"
            />
            <StatCard
              label="Reader Profile Visits"
              value="342"
              trend="+5% this week"
            />
            <StatCard
              label="Exchange Conversion Rate"
              value="12.4%"
              trend="Top 5% among swappers"
            />
          </div>
          <OverviewActivityChart />
          <SparklineCharts />
        </div>
      )}

      {/* ── Tab 2: Books Analytics ── */}
      {activeTab === "books" && <AnalyticsBooksTab />}

      {/* ── Tab 3: Borrowing Insights ── */}
      {activeTab === "borrow" && <AnalyticsBorrowTab />}

      {/* ── Tab 4: Exchanges ── */}
      {activeTab === "exchange" && <AnalyticsExchangeTab />}

      {/* ── Tab 5: Marketplace & Sales ── */}
      {activeTab === "marketplace" && <AnalyticsSalesTab />}

      {/* ── Tab 6: Community & Reputation ── */}
      {activeTab === "community" && <AnalyticsCommunityTab />}
    </div>
  );
}
