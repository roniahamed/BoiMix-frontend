"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { booksViewData } from "@/lib/data/analytics";
import { ChartCard, ChartTooltip, StatCard } from "./analytics-cards";

export function AnalyticsBooksTab() {
  return (
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
        <StatCard label="Wishlist Saves" value="56 Times" trend="+20% saved" />
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
        <ResponsiveContainer
          width="100%"
          height={260}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 260 }}
        >
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
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="views"
              name="Views"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#bv-views)"
            />
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="wishlists"
              name="Wishlists"
              stroke="#ec4899"
              strokeWidth={2.5}
              fill="url(#bv-wish)"
            />
            <Area
              isAnimationActive={false}
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
  );
}
