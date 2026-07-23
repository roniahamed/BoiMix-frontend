"use client";

import { useState } from "react";
import { OverviewActivityChart } from "@/components/dashboard/overview-charts";
import { SparklineCharts } from "@/components/dashboard/sparkline-charts";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
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

// ─── Mock Data ──────────────────────────────────────────────────────────────

const booksViewData = [
  { month: "Jan", views: 85, wishlists: 12, clicks: 40 },
  { month: "Feb", views: 110, wishlists: 18, clicks: 55 },
  { month: "Mar", views: 95, wishlists: 14, clicks: 48 },
  { month: "Apr", views: 145, wishlists: 22, clicks: 70 },
  { month: "May", views: 130, wishlists: 20, clicks: 65 },
  { month: "Jun", views: 200, wishlists: 30, clicks: 95 },
  { month: "Jul", views: 245, wishlists: 38, clicks: 120 },
];

const borrowData = [
  { month: "Jan", borrowed: 2, returned: 2, avgDays: 12 },
  { month: "Feb", borrowed: 3, returned: 3, avgDays: 10 },
  { month: "Mar", borrowed: 2, returned: 2, avgDays: 14 },
  { month: "Apr", borrowed: 4, returned: 4, avgDays: 9 },
  { month: "May", borrowed: 3, returned: 3, avgDays: 11 },
  { month: "Jun", borrowed: 5, returned: 5, avgDays: 8 },
  { month: "Jul", borrowed: 4, returned: 4, avgDays: 10 },
];

const exchangeData = [
  { month: "Jan", success: 8, pending: 2, rejected: 1 },
  { month: "Feb", success: 10, pending: 3, rejected: 1 },
  { month: "Mar", success: 7, pending: 1, rejected: 2 },
  { month: "Apr", success: 14, pending: 4, rejected: 1 },
  { month: "May", success: 12, pending: 2, rejected: 0 },
  { month: "Jun", success: 18, pending: 3, rejected: 1 },
  { month: "Jul", success: 22, pending: 5, rejected: 0 },
];

const salesData = [
  { month: "Jan", revenue: 480, orders: 1, avgPrice: 480 },
  { month: "Feb", revenue: 960, orders: 2, avgPrice: 480 },
  { month: "Mar", revenue: 350, orders: 1, avgPrice: 350 },
  { month: "Apr", revenue: 1200, orders: 2, avgPrice: 600 },
  { month: "May", revenue: 750, orders: 1, avgPrice: 750 },
  { month: "Jun", revenue: 1800, orders: 3, avgPrice: 600 },
  { month: "Jul", revenue: 2200, orders: 4, avgPrice: 550 },
];

const communityData = [
  { month: "Jan", xp: 800, followers: 92, reviews: 34 },
  { month: "Feb", xp: 950, followers: 98, reviews: 37 },
  { month: "Mar", xp: 1050, followers: 103, reviews: 39 },
  { month: "Apr", xp: 1200, followers: 110, reviews: 42 },
  { month: "May", xp: 1350, followers: 115, reviews: 44 },
  { month: "Jun", xp: 1520, followers: 120, reviews: 46 },
  { month: "Jul", xp: 1750, followers: 128, reviews: 48 },
];

const reputationRadar = [
  { subject: "On-Time Return", A: 100 },
  { subject: "Exchange Rating", A: 92 },
  { subject: "Response Rate", A: 95 },
  { subject: "Review Score", A: 98 },
  { subject: "Community XP", A: 85 },
  { subject: "Listing Quality", A: 88 },
];

// ─── Shared tooltip style ────────────────────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border-border rounded-lg border px-3 py-2 text-xs shadow-md">
      <p className="text-muted-foreground mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-bold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border-border/70 rounded-[7px] border p-5 shadow-2xs">
      <div className="mb-4">
        <h3 className="text-foreground text-sm font-bold sm:text-base">
          {title}
        </h3>
        {subtitle && (
          <p className="text-muted-foreground mt-0.5 text-[11px]">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Stat mini card ──────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  trend,
  trendPositive = true,
}: {
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
}) {
  return (
    <div className="bg-card border-border/70 rounded-[7px] border p-4 shadow-2xs">
      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {label}
      </p>
      <p className="text-foreground mt-1 text-2xl font-extrabold">{value}</p>
      {trend && (
        <p
          className={`mt-1 text-xs font-bold ${
            trendPositive ? "text-emerald-500" : "text-red-400"
          }`}
        >
          {trend}
        </p>
      )}
    </div>
  );
}

// ─── Tab definitions ──────────────────────────────────────────────────────────
const tabs = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "books", label: "Books Analytics", icon: BookOpen },
  { key: "borrow", label: "Borrowing Insights", icon: BookOpen },
  { key: "exchange", label: "Exchanges", icon: Repeat },
  { key: "marketplace", label: "Marketplace & Sales", icon: ShoppingBag },
  { key: "community", label: "Community & Reputation", icon: Star },
] as const;

type TabKey = (typeof tabs)[number]["key"];

// ─── Page ────────────────────────────────────────────────────────────────────
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

      {/* ── Tab 1: Overview ─────────────────────────────────────────────── */}
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

      {/* ── Tab 2: Books Analytics ──────────────────────────────────────── */}
      {activeTab === "books" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Listings"
              value="42 Books"
              trend="+4 added this month"
            />
            <StatCard
              label="Search Appearances"
              value="890 Impressions"
              trend="High search visibility"
            />
            <StatCard
              label="Wishlist Saves"
              value="56 Times"
              trend="+20% saved"
            />
            <StatCard
              label="Click-Through Rate"
              value="8.5%"
              trend="Above average CTR"
            />
          </div>

          {/* Monthly views + wishlists */}
          <ChartCard
            title="Book Views & Wishlist Trend"
            subtitle="Monthly impressions, wishlist saves and click-throughs"
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={booksViewData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="bv-views" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bv-wish" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bv-click" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Views"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#bv-views)"
                />
                <Area
                  type="monotone"
                  dataKey="wishlists"
                  name="Wishlists"
                  stroke="#ec4899"
                  strokeWidth={2.5}
                  fill="url(#bv-wish)"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  name="Clicks"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fill="url(#bv-click)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Top books table */}
          <ChartCard
            title="Top Viewed Books"
            subtitle="Most popular listings this period"
          >
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
              ].map((book, i) => (
                <div
                  key={book.title}
                  className="bg-muted/40 flex items-center gap-3 rounded-xl p-3"
                >
                  <span className="text-muted-foreground w-5 text-center text-xs font-black">
                    #{i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-foreground text-xs font-bold">
                      {book.title}
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      {book.wishlisted} saved · {book.rating}
                    </p>
                  </div>
                  <p className="text-primary text-xs font-bold">
                    {book.views} views
                  </p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      {/* ── Tab 3: Borrowing Insights ───────────────────────────────────── */}
      {activeTab === "borrow" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Total Borrowed Books"
              value="18 Books"
              trend="100% On-time returns"
            />
            <StatCard
              label="Average Reading Time"
              value="11 Days"
              trend="3 days before deadline"
            />
            <StatCard
              label="Pass Renewals"
              value="4 Renewals"
              trend="Zero late fees"
            />
          </div>

          {/* Borrowed vs Returned bars */}
          <ChartCard
            title="Monthly Borrow & Return Activity"
            subtitle="Books borrowed and returned per month"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={borrowData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar
                  dataKey="borrowed"
                  name="Borrowed"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="returned"
                  name="Returned"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Avg reading days trend */}
          <ChartCard
            title="Average Reading Days Per Borrow"
            subtitle="How long each book was kept — lower is faster"
          >
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={borrowData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="avgDays"
                  name="Avg Days"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* ── Tab 4: Exchanges ────────────────────────────────────────────── */}
      {activeTab === "exchange" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Successful Exchanges"
              value="14 Deals"
              trend="+3 this month"
            />
            <StatCard
              label="Exchange Approval Rate"
              value="92%"
              trend="Instant responder"
            />
            <StatCard
              label="Avg Completion Time"
              value="1.5 Days"
              trend="Dhaka Metro Area"
            />
          </div>

          {/* Success / Pending / Rejected stacked bar */}
          <ChartCard
            title="Exchange Outcomes by Month"
            subtitle="Successful, pending, and rejected exchange requests"
          >
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={exchangeData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar
                  dataKey="success"
                  name="Successful"
                  stackId="a"
                  fill="#10b981"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  name="Pending"
                  stackId="a"
                  fill="#f59e0b"
                />
                <Bar
                  dataKey="rejected"
                  name="Rejected"
                  stackId="a"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Cumulative success trend */}
          <ChartCard
            title="Cumulative Exchange Success Trend"
            subtitle="Monthly trend of completed deals"
          >
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={exchangeData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="ex-success" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="success"
                  name="Successful"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#ex-success)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* ── Tab 5: Marketplace & Sales ──────────────────────────────────── */}
      {activeTab === "marketplace" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Total Revenue Earned"
              value="৳ 2,450"
              trend="+৳ 800 this month"
            />
            <StatCard
              label="Books Sold"
              value="5 Books"
              trend="Average price ৳ 490"
            />
            <StatCard
              label="Escrow Payout Success"
              value="100%"
              trend="Direct to bKash"
            />
          </div>

          {/* Revenue area chart */}
          <ChartCard
            title="Monthly Revenue Trend"
            subtitle="Total revenue earned from marketplace sales"
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={salesData}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue (৳)"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#rev-fill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Orders vs Avg price combo */}
          <ChartCard
            title="Orders Count & Average Book Price"
            subtitle="Monthly orders and price per sale"
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={salesData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar
                  dataKey="orders"
                  name="Orders"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="avgPrice"
                  name="Avg Price (৳)"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* ── Tab 6: Community & Reputation ──────────────────────────────── */}
      {activeTab === "community" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Community Reputation"
              value="4.9 ⭐"
              trend="48 Verified Reviews"
            />
            <StatCard
              label="Community Followers"
              value="128 Readers"
              trend="+12 followers this week"
            />
            <StatCard
              label="XP Level Rank"
              value="Level 12"
              trend="Top 5% Reader Level"
            />
          </div>

          {/* XP + Followers growth */}
          <ChartCard
            title="XP Points & Followers Growth"
            subtitle="Monthly progression of experience points and community reach"
          >
            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={communityData}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="xp"
                  name="XP Points"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#f59e0b" }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="followers"
                  name="Followers"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Radar chart — reputation breakdown */}
          <ChartCard
            title="Reputation Breakdown"
            subtitle="Scores across key community trust metrics"
          >
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart
                data={reputationRadar}
                margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
              >
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip content={<ChartTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Reviews bar */}
          <ChartCard
            title="Verified Reviews Count"
            subtitle="Cumulative review growth over time"
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={communityData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="reviews"
                  name="Reviews"
                  fill="#ec4899"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  );
}
