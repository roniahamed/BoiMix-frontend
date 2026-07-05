import { StatsWidget } from "@/components/shared/stats-widget";
import { NotificationItem } from "@/components/shared/notification-item";
import { BookCard } from "@/components/shared/book-card";
import { fetchLocal } from "@/lib/fetchLocal";

export default async function OverviewPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");

  const recentBooks = profileLibraryBooks.slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, Roni!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here is a quick overview of your reading journey.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsWidget
          stats={[
            { label: "Books in Library", value: "152" },
            { label: "Successful Swaps", value: "78" },
            { label: "Books Borrowed", value: "63" },
            { label: "Total Earnings", value: "৳4,250" },
          ]}
          className="md:col-span-4"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <div className="bg-card overflow-hidden rounded-lg border">
            <NotificationItem
              title="Swap Completed"
              description="Your swap with Hasan Mahmud for 'Rich Dad Poor Dad' is complete."
              time="2 hours ago"
              unread={true}
            />
            <NotificationItem
              title="New Review"
              description="Fahim Ahmed left a 5-star review on your profile."
              time="5 hours ago"
            />
            <NotificationItem
              title="Borrow Request"
              description="Nusrat wants to borrow 'The Alchemist'."
              time="1 day ago"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Library Highlights</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {recentBooks.map((book: any) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
