"use client";

import { useState } from "react";
import { BellRing } from "lucide-react";
import { Notification } from "@/types/notification";
import { NotificationCard } from "./notification-card";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
}

export function NotificationList({
  notifications: initialNotifications,
  onMarkAsRead,
}: NotificationListProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

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

  const now = new Date();

  // Simple grouping logic for "Today" and "Earlier"
  const today: Notification[] = [];
  const earlier: Notification[] = [];

  notifications.forEach((notif) => {
    const date = new Date(notif.createdAt);
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) today.push(notif);
    else earlier.push(notif);
  });

  return (
    <div className="flex flex-col">
      {today.length > 0 && (
        <div className="mb-2">
          <h3 className="px-4 py-2 text-base font-bold">Today</h3>
          <div className="flex flex-col">
            {today.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        </div>
      )}

      {earlier.length > 0 && (
        <div>
          <h3 className="px-4 py-2 text-base font-bold">Earlier</h3>
          <div className="flex flex-col">
            {earlier.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
