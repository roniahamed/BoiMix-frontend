import Link from "next/link";
import { BellIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type NotificationItemProps = {
  title: string;
  description?: string;
  href?: string;
  unread?: boolean;
  time?: string;
  className?: string;
};

export function NotificationItem({
  title,
  description,
  href,
  unread = false,
  time,
  className,
}: NotificationItemProps) {
  const content = (
    <div
      className={cn(
        "bg-card shadow-soft hover:bg-muted/50 flex gap-3 rounded-lg border p-3 transition-colors",
        unread && "border-primary/30 bg-info-soft/40",
        className,
      )}
    >
      <span className="bg-info-soft text-info mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full">
        <BellIcon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-foreground font-medium">{title}</p>
          {time && (
            <time className="text-muted-foreground text-xs">{time}</time>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm leading-5">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      className="focus-visible:ring-ring/50 block focus-visible:ring-[3px] focus-visible:outline-none"
    >
      {content}
    </Link>
  );
}
