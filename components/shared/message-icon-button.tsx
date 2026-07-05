"use client";

import Link from "next/link";
import { MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/lib/store/use-message-store";
import { cn } from "@/lib/utils";

type MessageIconButtonProps = {
  className?: string;
};

export function MessageIconButton({ className }: MessageIconButtonProps) {
  const unreadCount = useMessageStore((s) => s.unreadCount);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      asChild
    >
      <Link href="/dashboard/messages" aria-label="Messages">
        <MessageSquareIcon />
        {unreadCount > 0 && (
          <span
            className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none font-bold"
            aria-label={`${unreadCount} unread messages`}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
