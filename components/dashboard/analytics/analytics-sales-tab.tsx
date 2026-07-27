"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { salesData } from "@/lib/data/analytics";
import { ChartCard, ChartTooltip, StatCard } from "./analytics-cards";

export function AnalyticsSalesTab() {
  return (
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
        <ResponsiveContainer
          width="100%"
          height={260}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 260 }}
        >
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
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Area
              isAnimationActive={false}
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
        <ResponsiveContainer
          width="100%"
          height={220}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 220 }}
        >
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
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar
              isAnimationActive={false}
              dataKey="orders"
              name="Orders"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              isAnimationActive={false}
              dataKey="avgPrice"
              name="Avg Price (৳)"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
