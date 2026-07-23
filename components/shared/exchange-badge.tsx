import { Repeat2Icon } from "lucide-react";

import { BadgePill } from "@/components/shared/badge-pill";

type ExchangeBadgeProps = {
  label?: string;
};

export function ExchangeBadge({ label = "Exchange" }: ExchangeBadgeProps) {
  return (
    <BadgePill tone="info" className="gap-1">
      <Repeat2Icon className="size-3" aria-hidden="true" />
      {label}
    </BadgePill>
  );
}
