"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, BarChart2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const monthlyData = [
  { label: "Jan", swaps: 12, lent: 5, views: 110 },
  { label: "Feb", swaps: 15, lent: 8, views: 145 },
  { label: "Mar", swaps: 10, lent: 12, views: 130 },
  { label: "Apr", swaps: 22, lent: 15, views: 210 },
  { label: "May", swaps: 18, lent: 10, views: 185 },
  { label: "Jun", swaps: 28, lent: 20, views: 260 },
  { label: "Jul", swaps: 34, lent: 22, views: 310 },
];

export function OverviewActivityChart() {
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const [timeframe, setTimeframe] = useState<"monthly" | "weekly">("monthly");

  const totalSwaps = monthlyData.reduce((acc, curr) => acc + curr.swaps, 0);
  const totalLent = monthlyData.reduce((acc, curr) => acc + curr.lent, 0);

  return (
    <Card className="border-border/70 border shadow-xs">
      <CardHeader className="flex flex-col space-y-3 pb-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold sm:text-lg">
              Exchange Analytics
            </CardTitle>
            <span className="bg-brand-blue/10 text-brand-blue flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold sm:text-xs">
              <TrendingUp className="h-3 w-3" /> +24% growth
            </span>
          </div>
          <CardDescription className="text-muted-foreground mt-0.5 text-[11px] sm:text-xs">
            Book swaps, lending history, and engagement
          </CardDescription>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Timeframe pill */}
          <div className="bg-muted/60 flex items-center rounded-xl p-1 text-[11px] sm:text-xs">
            <button
              onClick={() => setTimeframe("monthly")}
              className={cn(
                "rounded-lg px-2 py-1 font-semibold transition-colors sm:px-2.5",
                timeframe === "monthly"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Months
            </button>
            <button
              onClick={() => setTimeframe("weekly")}
              className={cn(
                "rounded-lg px-2 py-1 font-semibold transition-colors sm:px-2.5",
                timeframe === "weekly"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Weeks
            </button>
          </div>

          {/* Chart type toggle */}
          <div className="bg-muted/60 flex items-center rounded-xl p-1 text-xs">
            <button
              onClick={() => setChartType("area")}
              title="Area Chart"
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                chartType === "area"
                  ? "bg-card text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={() => setChartType("bar")}
              title="Bar Chart"
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                chartType === "bar"
                  ? "bg-card text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <BarChart2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Metric summary legend bar */}
        <div className="border-border/40 mb-3 flex items-center gap-4 border-b pb-2.5 text-[11px] sm:mb-4 sm:gap-6 sm:pb-3 sm:text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="bg-brand-blue h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3" />
            <span className="text-muted-foreground">Swaps:</span>
            <span className="text-foreground font-bold">{totalSwaps}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="bg-brand-pink h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3" />
            <span className="text-muted-foreground">Lent:</span>
            <span className="text-foreground font-bold">{totalLent}</span>
          </div>
        </div>

        <div className="h-[210px] w-full sm:h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="area-swaps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="area-lent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card text-card-foreground border-border rounded-xl border p-3 shadow-lg">
                          <p className="mb-1.5 border-b pb-1 text-xs font-bold">
                            {label} Stats
                          </p>
                          {payload.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between gap-4 py-0.5 text-xs font-semibold"
                            >
                              <span style={{ color: item.color }}>
                                {item.name}:
                              </span>
                              <span>{item.value}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="swaps"
                  name="Swaps"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#area-swaps)"
                />
                <Area
                  type="monotone"
                  dataKey="lent"
                  name="Lent Books"
                  stroke="#ec4899"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#area-lent)"
                />
              </AreaChart>
            ) : (
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="swaps"
                  name="Swaps"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="lent"
                  name="Books Lent"
                  fill="#ec4899"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
