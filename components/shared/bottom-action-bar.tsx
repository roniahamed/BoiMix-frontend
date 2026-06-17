import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BottomActionBarProps = {
  children: ReactNode;
  className?: string;
};

export function BottomActionBar({ children, className }: BottomActionBarProps) {
  return (
    <div
      className={cn(
        "bg-background/95 sticky bottom-0 z-30 border-t p-3 backdrop-blur",
        className,
      )}
    >
      <div className="boimix-container flex flex-wrap justify-end gap-2">
        {children}
      </div>
    </div>
  );
}
