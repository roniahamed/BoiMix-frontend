import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  MessageSquare,
  RefreshCcw,
  Star,
  BookOpen,
  MoreHorizontal,
  Check,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notification } from "@/types/notification";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case "message":
      return <MessageSquare className="size-3 text-white" />;
    case "exchange_offer":
    case "exchange_accepted":
      return <RefreshCcw className="size-3 text-white" />;
    case "borrow_request":
    case "borrow_approved":
    case "borrow_returned":
      return <BookOpen className="size-3 text-white" />;
    case "review":
      return <Star className="size-3 text-white" />;
    case "system":
      return <Bell className="size-3 text-white" />;
    default:
      return <Bell className="size-3 text-white" />;
  }
};

const getIconBg = (type: string) => {
  switch (type) {
    case "message":
      return "bg-blue-500";
    case "exchange_offer":
    case "exchange_accepted":
      return "bg-purple-500";
    case "borrow_request":
    case "borrow_approved":
    case "borrow_returned":
      return "bg-orange-500";
    case "review":
      return "bg-yellow-500";
    case "system":
      return "bg-emerald-500";
    default:
      return "bg-slate-500";
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
        "group relative flex gap-2 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50",
        isRead ? "bg-background" : "bg-blue-50/60 dark:bg-blue-900/20",
      )}
    >
      {/* Clickable Area */}
      {actionUrl ? (
        <Link href={actionUrl} className="absolute inset-0 z-0">
          <span className="sr-only">View notification</span>
        </Link>
      ) : null}

      {/* Avatar */}
      <div className="relative z-10 mt-1 flex-shrink-0">
        {notification.actorAvatar || notification.actorName ? (
          <div className="relative">
            <Avatar className="size-12">
              <AvatarImage src={notification.actorAvatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-base font-medium">
                {notification.actorName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "border-background absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border-2",
                getIconBg(notification.type),
              )}
            >
              {getIcon(notification.type)}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Bell className="size-5 text-slate-500" />
            </div>
            <div
              className={cn(
                "border-background absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border-2",
                getIconBg(notification.type),
              )}
            >
              {getIcon(notification.type)}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 space-y-0.5 self-center pr-2">
        <p className="text-foreground line-clamp-2 text-sm leading-snug">
          {notification.actorName ? (
            <>
              <span className="font-bold">{notification.actorName}</span>{" "}
              {notification.description}
            </>
          ) : (
            notification.description || notification.title
          )}
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            isRead
              ? "text-muted-foreground"
              : "text-blue-600 dark:text-blue-400",
          )}
        >
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          }).replace("about ", "")}
        </p>
      </div>

      {/* Actions */}
      <div className="relative z-10 flex-shrink-0 self-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <MoreHorizontal className="size-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {!isRead && (
              <DropdownMenuItem
                onClick={() => onMarkAsRead?.(notification.id)}
                className="cursor-pointer"
              >
                <Check className="mr-2 size-4" />
                Mark as read
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
              <Trash className="mr-2 size-4" />
              Remove this notification
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
