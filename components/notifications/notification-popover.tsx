"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { NotificationList } from "./notification-list";
import { mockNotifications } from "@/lib/mock/notifications";

export function NotificationPopover({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex size-2 rounded-full bg-blue-600">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="w-[calc(100vw-32px)] max-w-[380px] p-0 sm:w-96"
        align="end"
        sideOffset={8}
        collisionPadding={16}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="text-sm font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {unreadCount} unread
            </span>
          )}
        </div>
        <div className="max-h-[350px] scrollbar-thin overflow-y-auto p-2">
          <NotificationList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
        <div className="border-t p-2">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-center text-sm"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/dashboard/notifications">View all notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
