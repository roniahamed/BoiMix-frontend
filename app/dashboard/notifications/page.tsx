import { NotificationTabs } from "@/components/notifications/notification-tabs";
import { mockNotifications } from "@/lib/mock/notifications";

export const metadata = {
  title: "Notifications | BoiMix",
  description: "View and manage your account notifications",
};

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-4xl pb-10">
      {/* We pass the mock notifications to the client component which handles state */}
      <NotificationTabs initialNotifications={mockNotifications} />
    </div>
  );
}
