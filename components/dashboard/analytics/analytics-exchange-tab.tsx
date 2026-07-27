"use client";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { exchangeData } from "@/lib/data/analytics";
import { ChartCard, ChartTooltip, StatCard } from "./analytics-cards";

export function AnalyticsExchangeTab() {
  return (
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
        <ResponsiveContainer
          width="100%"
          height={260}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 260 }}
        >
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
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar
              isAnimationActive={false}
              dataKey="success"
              name="Successful"
              stackId="a"
              fill="#10b981"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              isAnimationActive={false}
              dataKey="pending"
              name="Pending"
              stackId="a"
              fill="#f59e0b"
            />
            <Bar
              isAnimationActive={false}
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
        <ResponsiveContainer
          width="100%"
          height={220}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 220 }}
        >
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
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area
              isAnimationActive={false}
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
  );
}
