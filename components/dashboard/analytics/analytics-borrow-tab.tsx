"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { borrowData } from "@/lib/data/analytics";
import { ChartCard, ChartTooltip, StatCard } from "./analytics-cards";

export function AnalyticsBorrowTab() {
  return (
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
        <ResponsiveContainer
          width="100%"
          height={260}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 260 }}
        >
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
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar
              isAnimationActive={false}
              dataKey="borrowed"
              name="Borrowed"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              isAnimationActive={false}
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
        <ResponsiveContainer
          width="100%"
          height={220}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 220 }}
        >
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
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Line
              isAnimationActive={false}
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
  );
}
