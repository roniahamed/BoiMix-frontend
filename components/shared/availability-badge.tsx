import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

import { BadgePill } from "@/components/shared/badge-pill";
import type { BookAvailabilityStatus } from "@/types/book";

type AvailabilityBadgeProps = {
  status: BookAvailabilityStatus;
};

export function AvailabilityBadge({ status }: AvailabilityBadgeProps) {
  const inStock = status === "in-stock";
  const Icon = inStock ? CheckCircle2Icon : XCircleIcon;

  return (
    <BadgePill tone={inStock ? "success" : "danger"} className="gap-1">
      <Icon className="size-3" aria-hidden="true" />
      {inStock ? "In Stock" : "Out of Stock"}
    </BadgePill>
  );
}
