import { AnalyticsCard } from "@/components/shared/analytics-card";
import {
  EyeIcon,
  UsersIcon,
  SearchIcon,
  HeartIcon,
  MessageSquareIcon,
  TrendingUpIcon,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track the performance of your book listings.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnalyticsCard
          title="Total Views"
          value="1,245"
          trend="+15%"
          icon={EyeIcon}
        />
        <AnalyticsCard
          title="Profile Visits"
          value="342"
          trend="+5%"
          icon={UsersIcon}
        />
        <AnalyticsCard
          title="Search Appearances"
          value="890"
          trend="-2%"
          icon={SearchIcon}
        />
        <AnalyticsCard
          title="Wishlist Adds"
          value="56"
          trend="+20%"
          icon={HeartIcon}
        />
        <AnalyticsCard
          title="Message Inquiries"
          value="23"
          trend="+10%"
          icon={MessageSquareIcon}
        />
        <AnalyticsCard
          title="Conversion Rate"
          value="12%"
          trend="+1%"
          icon={TrendingUpIcon}
        />
      </div>

      <div className="bg-card flex min-h-[300px] items-center justify-center rounded-lg border p-6">
        <p className="text-muted-foreground text-center">
          Detailed charts will be generated here in Phase 11.
        </p>
      </div>
    </div>
  );
}
