"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface SparklineData {
  day: string;
  value: number;
}

interface SparklineCardProps {
  title: string;
  value: string;
  trend: string;
  data: SparklineData[];
  color: string;
}

function SparklineCard({
  title,
  value,
  trend,
  data,
  color,
}: SparklineCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-foreground/80 text-sm font-medium">
              {title}
            </span>
            <span className="mt-1 text-2xl font-bold">{value}</span>
          </div>
          <div className="text-success bg-success/10 flex items-center rounded-full px-2 py-0.5 text-xs font-medium">
            <ArrowUpRight className="mr-0.5 h-3 w-3" />
            {trend}
          </div>
        </div>
        <div className="mt-4 h-[60px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background rounded-md border px-2 py-1 text-xs font-medium shadow-sm">
                        {payload[0].value}
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ r: 3, fill: color, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Generate some smooth mock data
const generateData = (base: number) => {
  return Array.from({ length: 7 }).map((_, i) => ({
    day: `Day ${i + 1}`,
    value: Math.floor(base + Math.random() * (base * 0.5) + i * base * 0.1),
  }));
};

const dataBooks = generateData(20);
const dataProfile = generateData(10);
const dataDeals = generateData(2);

export function SparklineCharts() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <SparklineCard
        title="Books Viewed"
        value="128"
        trend="16%"
        data={dataBooks}
        color="var(--chart-1)"
      />
      <SparklineCard
        title="Profile Views"
        value="56"
        trend="12%"
        data={dataProfile}
        color="var(--chart-2)"
      />
      <SparklineCard
        title="Successful Deals"
        value="8"
        trend="33%"
        data={dataDeals}
        color="var(--chart-3)"
      />
    </div>
  );
}
