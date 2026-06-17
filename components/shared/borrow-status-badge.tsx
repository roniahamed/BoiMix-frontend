import { BookOpenCheckIcon } from "lucide-react";

import { BadgePill } from "@/components/shared/badge-pill";
import type { BadgeTone } from "@/components/shared/badge-pill";

export type BorrowStatus =
  | "available"
  | "requested"
  | "borrowed"
  | "overdue"
  | "completed";

const statusTone: Record<BorrowStatus, BadgeTone> = {
  available: "success",
  requested: "warning",
  borrowed: "info",
  overdue: "danger",
  completed: "default",
};

type BorrowStatusBadgeProps = {
  status: BorrowStatus;
};

export function BorrowStatusBadge({ status }: BorrowStatusBadgeProps) {
  return (
    <BadgePill tone={statusTone[status]} className="gap-1 capitalize">
      <BookOpenCheckIcon className="size-3" aria-hidden="true" />
      {status}
    </BadgePill>
  );
}
