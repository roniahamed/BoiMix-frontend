"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for the last 6 months
const chartData = [
  { month: "Jan", swaps: 12, lent: 5 },
  { month: "Feb", swaps: 15, lent: 8 },
  { month: "Mar", swaps: 10, lent: 12 },
  { month: "Apr", swaps: 22, lent: 15 },
  { month: "May", swaps: 18, lent: 10 },
  { month: "Jun", swaps: 28, lent: 20 },
];

export function OverviewActivityChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>
          Your reading and sharing activities over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4 h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-muted-foreground text-xs"
              />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--foreground)",
                }}
              />
              <Bar
                dataKey="swaps"
                name="Successful Swaps"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="lent"
                name="Books Lent"
                fill="var(--chart-2)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
