import { Repeat2Icon } from "lucide-react";

import { BadgePill } from "@/components/shared/badge-pill";

type SwapBadgeProps = {
  label?: string;
};

export function SwapBadge({ label = "Swap" }: SwapBadgeProps) {
  return (
    <BadgePill tone="info" className="gap-1">
      <Repeat2Icon className="size-3" aria-hidden="true" />
      {label}
    </BadgePill>
  );
}
