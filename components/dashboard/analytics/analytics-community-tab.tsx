"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { communityData, reputationRadar } from "@/lib/data/analytics";
import { ChartCard, ChartTooltip, StatCard } from "./analytics-cards";

export function AnalyticsCommunityTab() {
  return (
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
        <ResponsiveContainer
          width="100%"
          height={260}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 260 }}
        >
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
              isAnimationActive={false}
              yAxisId="left"
              type="monotone"
              dataKey="xp"
              name="XP Points"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#f59e0b" }}
            />
            <Line
              isAnimationActive={false}
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
        <ResponsiveContainer
          width="100%"
          height={280}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 280 }}
        >
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
              isAnimationActive={false}
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
        <ResponsiveContainer
          width="100%"
          height={200}
          minWidth={0}
          minHeight={0}
          initialDimension={{ width: 320, height: 200 }}
        >
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
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              isAnimationActive={false}
              dataKey="reviews"
              name="Reviews"
              fill="#ec4899"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
