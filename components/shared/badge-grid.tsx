import { BadgePill } from "@/components/shared/badge-pill";
import { cn } from "@/lib/utils";
import type { BadgeTone } from "@/components/shared/badge-pill";

type BadgeGridItem = {
  label: string;
  tone?: BadgeTone;
};

type BadgeGridProps = {
  items: BadgeGridItem[];
  className?: string;
};

export function BadgeGrid({ items, className }: BadgeGridProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <BadgePill key={item.label} tone={item.tone}>
          {item.label}
        </BadgePill>
      ))}
    </div>
  );
}
