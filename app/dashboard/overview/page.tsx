import { fetchLocal } from "@/lib/fetchLocal";
import { QuickSummary } from "@/components/dashboard/quick-summary";
import { SparklineCharts } from "@/components/dashboard/sparkline-charts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Crown,
  ChevronRight,
  BookDown,
  Repeat,
  Mail,
  Bell,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

export default async function OverviewPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");
  const upcomingBook = profileLibraryBooks[0] || null;

  return (
    <div className="max-w-5xl space-y-8">
      {/* 1. Profile Header & Premium Banner */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="border-border h-16 w-16 border-2">
            <AvatarImage
              src="https://i.pravatar.cc/150?u=roni"
              alt="Roni Ahamed"
            />
            <AvatarFallback>RA</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Roni Ahamed</h1>
            <div className="text-brand-blue mt-0.5 flex items-center text-sm font-medium">
              <BadgeCheck className="mr-1 h-4 w-4" />
              Verified Member
            </div>
          </div>
        </div>

        <div className="bg-warning-soft border-warning/20 flex items-center justify-between rounded-xl border px-4 py-3 sm:min-w-[280px]">
          <div className="flex flex-col">
            <div className="text-warning flex items-center text-sm font-bold">
              <Crown className="fill-warning mr-1 h-4 w-4" />
              Premium Member
            </div>
            <span className="text-muted-foreground mt-0.5 text-xs">
              Valid until 12 Aug 2025
            </span>
          </div>
          <Link
            href="/dashboard/settings"
            className="text-brand-pink ml-4 flex items-center text-sm font-medium hover:underline"
          >
            View Benefits <ChevronRight className="ml-0.5 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 2. Quick Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Quick Summary</h2>
        </div>
        <QuickSummary />
      </div>

      {/* 3. Requests & Alerts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Requests & Alerts</h2>
          <Link
            href="/dashboard/notifications"
            className="text-brand-blue text-sm font-medium hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            {
              label: "Borrow Requests",
              count: 2,
              icon: BookDown,
              color: "text-brand-pink",
              bg: "bg-brand-pink/10",
            },
            {
              label: "Swap Offers",
              count: 1,
              icon: Repeat,
              color: "text-success",
              bg: "bg-success/10",
            },
            {
              label: "Unread Messages",
              count: 5,
              icon: Mail,
              color: "text-brand-blue",
              bg: "bg-brand-blue/10",
            },
            {
              label: "Notifications",
              count: 3,
              icon: Bell,
              color: "text-warning",
              bg: "bg-warning/10",
            },
          ].map((alert, i) => (
            <Link
              key={i}
              href="#"
              className="bg-card hover:bg-muted/50 group flex items-center justify-between rounded-xl border p-3 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className={`rounded-lg p-1.5 ${alert.bg}`}>
                  <alert.icon className={`h-4 w-4 ${alert.color}`} />
                </div>
                {alert.label}
              </div>
              <div className="bg-danger flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm">
                {alert.count}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Analytics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Analytics (This Month)</h2>
          <select className="text-muted-foreground cursor-pointer border-none bg-transparent text-sm font-medium focus:ring-0">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
        <SparklineCharts />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 5. Upcoming Due */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Upcoming Due</h2>
            <Link
              href="/dashboard/borrowed"
              className="text-brand-blue text-sm font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          {upcomingBook && (
            <div className="bg-card hover:border-brand-blue/50 flex cursor-pointer items-center justify-between rounded-xl border p-4 shadow-sm transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-muted h-16 w-12 shrink-0 overflow-hidden rounded">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={upcomingBook.coverImage}
                    alt={upcomingBook.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="line-clamp-1 font-bold">
                    {upcomingBook.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {upcomingBook.author}
                  </p>
                  <p className="text-danger mt-1 text-sm font-bold">
                    Due in 2 days
                  </p>
                </div>
              </div>

              <div className="hidden flex-col items-start border-l px-4 sm:flex">
                <span className="text-muted-foreground text-xs">
                  Borrowed From
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://i.pravatar.cc/150?u=ahmed" />
                  </Avatar>
                  <span className="text-sm font-medium">Ahmed Rahman</span>
                </div>
              </div>

              <ChevronRight className="text-muted-foreground ml-2 h-5 w-5" />
            </div>
          )}
        </div>

        {/* 6. Recent Activity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <Link
              href="/dashboard/activity"
              className="text-brand-blue text-sm font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {[
              {
                icon: BookDown,
                title: "Ahmed requested to borrow",
                desc: "The Psychology of Money",
                time: "10m ago",
                bg: "bg-success/10",
                color: "text-success",
              },
              {
                icon: Repeat,
                title: "Swap request accepted",
                desc: "Rich Dad Poor Dad",
                time: "3h ago",
                bg: "bg-brand-blue/10",
                color: "text-brand-blue",
              },
              {
                icon: Star,
                title: "New review received",
                desc: "5 stars from Fahim",
                time: "5h ago",
                bg: "bg-warning/10",
                color: "text-warning",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="bg-card/50 flex items-center gap-3 rounded-xl border p-3"
              >
                <div className={`rounded-lg p-2 ${activity.bg}`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {activity.title}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {activity.desc}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
