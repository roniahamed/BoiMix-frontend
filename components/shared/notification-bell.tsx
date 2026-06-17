import Link from "next/link";
import { BellIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type NotificationBellProps = {
  count?: number;
  href?: string;
};

export function NotificationBell({
  count = 0,
  href = "/notifications/all",
}: NotificationBellProps) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href={href} aria-label={`${count} unread notifications`}>
        <span className="relative">
          <BellIcon />
          {count > 0 && (
            <span className="bg-danger text-danger-foreground absolute -top-2 -right-2 inline-flex min-w-4 items-center justify-center rounded-full px-1 text-[0.65rem] font-bold">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </span>
      </Link>
    </Button>
  );
}
