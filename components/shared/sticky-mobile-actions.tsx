import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type StickyMobileActionsProps = {
  children: ReactNode;
  className?: string;
};

export function StickyMobileActions({
  children,
  className,
}: StickyMobileActionsProps) {
  return (
    <div
      className={cn(
        "bg-background/95 fixed inset-x-0 bottom-16 z-30 border-t p-3 backdrop-blur md:hidden",
        className,
      )}
    >
      <div className="grid gap-2">{children}</div>
    </div>
  );
}
