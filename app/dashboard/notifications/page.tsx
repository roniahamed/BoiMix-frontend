import { mockNotifications } from "@/lib/mock/notifications";
import { NotificationList } from "@/components/notifications/notification-list";
import { Search } from "lucide-react";

export const metadata = {
  title: "Notifications | BoiMix",
  description: "View and manage your account notifications",
};

export default function NotificationsPage() {
  return (
    <div className="bg-background mx-auto max-w-2xl pb-10">
      <div className="flex items-center justify-between px-4 py-4 md:pt-8">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <Search className="text-foreground size-6" />
        </button>
      </div>

      {/* We pass the mock notifications to the client component which handles state */}
      <NotificationList notifications={mockNotifications} />
    </div>
  );
}
