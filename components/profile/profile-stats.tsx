import { StatsWidget } from "@/components/shared/stats-widget";
import type { UserProfileStats } from "@/types/user";

type ProfileStatsProps = {
  stats: UserProfileStats;
};

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <StatsWidget
      className="grid-cols-2 lg:grid-cols-6"
      stats={[
        { label: "Books", value: stats.booksShared },
        { label: "Reviews", value: stats.reviewsWritten },
        { label: "Swaps", value: stats.swapsCompleted },
        { label: "Borrows", value: stats.borrowLends },
        { label: "Followers", value: stats.followers },
        { label: "Following", value: stats.following },
      ]}
    />
  );
}
