import { NotificationItem } from "@/components/shared/notification-item";

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated on your account activity.
        </p>
      </div>

      <div className="bg-card overflow-hidden rounded-lg border">
        <NotificationItem
          title="Swap Completed"
          description="Your swap with Hasan Mahmud for 'Rich Dad Poor Dad' is complete."
          time="2 hours ago"
          unread={true}
        />
        <NotificationItem
          title="New Message"
          description="Rakib sent you a message regarding 'Pather Panchali'."
          time="4 hours ago"
          unread={true}
        />
        <NotificationItem
          title="Borrow Request"
          description="Nusrat wants to borrow 'The Alchemist'."
          time="1 day ago"
        />
        <NotificationItem
          title="New Review"
          description="Fahim Ahmed left a 5-star review on your profile."
          time="2 days ago"
        />
        <NotificationItem
          title="Welcome to BoiMix!"
          description="Explore your library, list books, and join the reading community."
          time="1 week ago"
        />
      </div>
    </div>
  );
}
