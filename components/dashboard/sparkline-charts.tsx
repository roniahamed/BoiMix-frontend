"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
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
  gradientId: string;
  strokeColor: string;
  fillColor: string;
}

function SparklineCard({
  title,
  value,
  trend,
  data,
  gradientId,
  strokeColor,
  fillColor,
}: SparklineCardProps) {
  return (
    <Card className="border-border/70 overflow-hidden border shadow-xs transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              {title}
            </p>
            <p className="text-foreground mt-1 text-2xl font-extrabold">
              {value}
            </p>
          </div>
          <div className="bg-success/15 text-success flex items-center rounded-full px-2.5 py-1 text-xs font-bold">
            <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" />
            {trend}
          </div>
        </div>

        <div className="mt-3 h-[64px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={fillColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={fillColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card text-card-foreground border-border rounded-lg border px-2.5 py-1 text-xs font-bold shadow-md">
                        {payload[0].value} views
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={false}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#${gradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

const dataBooks = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 24 },
  { day: "Fri", value: 30 },
  { day: "Sat", value: 28 },
  { day: "Sun", value: 38 },
];

const dataProfile = [
  { day: "Mon", value: 5 },
  { day: "Tue", value: 9 },
  { day: "Wed", value: 7 },
  { day: "Thu", value: 14 },
  { day: "Fri", value: 12 },
  { day: "Sat", value: 18 },
  { day: "Sun", value: 22 },
];

const dataDeals = [
  { day: "Mon", value: 1 },
  { day: "Tue", value: 2 },
  { day: "Wed", value: 2 },
  { day: "Thu", value: 4 },
  { day: "Fri", value: 5 },
  { day: "Sat", value: 6 },
  { day: "Sun", value: 8 },
];

export function SparklineCharts() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <SparklineCard
        title="Books Viewed"
        value="128"
        trend="+16%"
        data={dataBooks}
        gradientId="spark-books"
        strokeColor="#3b82f6"
        fillColor="#3b82f6"
      />
      <SparklineCard
        title="Profile Visits"
        value="56"
        trend="+12%"
        data={dataProfile}
        gradientId="spark-profile"
        strokeColor="#ec4899"
        fillColor="#ec4899"
      />
      <SparklineCard
        title="Successful Exchanges"
        value="8"
        trend="+33%"
        data={dataDeals}
        gradientId="spark-deals"
        strokeColor="#10b981"
        fillColor="#10b981"
      />
    </div>
  );
}
