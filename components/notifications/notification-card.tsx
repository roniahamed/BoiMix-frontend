import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  MessageSquare,
  RefreshCcw,
  Star,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notification } from "@/types/notification";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case "message":
      return <MessageSquare className="size-4 text-blue-500" />;
    case "swap_offer":
    case "swap_accepted":
      return <RefreshCcw className="size-4 text-purple-500" />;
    case "borrow_request":
    case "borrow_approved":
    case "borrow_returned":
      return <BookOpen className="size-4 text-orange-500" />;
    case "review":
      return <Star className="size-4 text-yellow-500" />;
    case "system":
      return <Bell className="size-4 text-emerald-500" />;
    default:
      return <Bell className="size-4 text-slate-500" />;
  }
};

export function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const { isRead, actionUrl } = notification;

  return (
    <div
      className={cn(
        "group relative flex gap-4 rounded-lg border p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50",
        isRead ? "bg-background" : "bg-blue-50/50 dark:bg-blue-950/20",
      )}
    >
      {/* Unread indicator */}
      {!isRead && (
        <div className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-blue-600 dark:bg-blue-500" />
      )}

      {/* Icon or Avatar */}
      <div className="mt-1 flex-shrink-0">
        {notification.actorAvatar || notification.actorName ? (
          <div className="relative">
            <Avatar className="size-10">
              <AvatarImage src={notification.actorAvatar} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {notification.actorName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="bg-background absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border shadow-sm">
              {getIcon(notification.type)}
            </div>
          </div>
        ) : (
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            {getIcon(notification.type)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 pr-8">
        <div className="flex items-start justify-between gap-2">
          <p className="text-foreground text-sm leading-none font-semibold">
            {notification.title}
          </p>
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm">
          {notification.description}
        </p>

        {actionUrl && (
          <div className="pt-2">
            <Button
              asChild
              variant={isRead ? "outline" : "default"}
              size="sm"
              className="h-8 text-xs"
            >
              <Link href={actionUrl}>View Details</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 transition-opacity group-hover:opacity-100 sm:relative sm:top-0 sm:right-0 sm:opacity-0 sm:opacity-100">
        {!isRead && (
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:text-blue-400"
            title="Mark as read"
            onClick={() => onMarkAsRead?.(notification.id)}
          >
            <CheckCircle2 className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
