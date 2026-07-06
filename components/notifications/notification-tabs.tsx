"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationList } from "./notification-list";
import { Notification } from "@/types/notification";
import { Bell, MessageSquare, Info } from "lucide-react";

interface NotificationTabsProps {
  initialNotifications: Notification[];
}

export function NotificationTabs({
  initialNotifications,
}: NotificationTabsProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const activeNotifications = notifications;

  const allTab = activeNotifications;
  const messagesTab = activeNotifications.filter((n) => n.type === "message");
  const systemTab = activeNotifications.filter((n) => n.type !== "message");

  const unreadCount = activeNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            You have {unreadCount} unread notification
            {unreadCount !== 1 ? "s" : ""}.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Mark all as read
          </button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 h-auto w-full justify-start overflow-x-auto rounded-none border-b bg-transparent p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <div className="flex items-center gap-2">
              <Bell className="size-4" />
              <span>All</span>
              {unreadCount > 0 && (
                <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  {unreadCount}
                </span>
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4" />
              <span>Messages</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <div className="flex items-center gap-2">
              <Info className="size-4" />
              <span>System & Activity</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0 outline-none">
          <NotificationList
            notifications={allTab}
            onMarkAsRead={handleMarkAsRead}
          />
        </TabsContent>

        <TabsContent value="messages" className="mt-0 outline-none">
          <NotificationList
            notifications={messagesTab}
            onMarkAsRead={handleMarkAsRead}
          />
        </TabsContent>

        <TabsContent value="system" className="mt-0 outline-none">
          <NotificationList
            notifications={systemTab}
            onMarkAsRead={handleMarkAsRead}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
