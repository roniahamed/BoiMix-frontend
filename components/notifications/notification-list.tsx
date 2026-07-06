import { BellRing } from "lucide-react";
import { Notification } from "@/types/notification";
import { NotificationCard } from "./notification-card";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onArchive?: (id: string) => void;
}

export function NotificationList({
  notifications,
  onMarkAsRead,
  onArchive,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-slate-50/50 p-12 text-center dark:bg-slate-900/20">
        <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <BellRing className="size-8 text-slate-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm">
          You&apos;re all caught up! When you receive new updates, messages, or
          activity, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}
