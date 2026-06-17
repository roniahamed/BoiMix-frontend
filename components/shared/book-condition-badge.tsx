import { BadgePill } from "@/components/shared/badge-pill";
import type { BadgeTone } from "@/components/shared/badge-pill";
import type { BookCondition } from "@/types/book";

const conditionLabels: Record<BookCondition, string> = {
  new: "New",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

const conditionTones: Record<BookCondition, BadgeTone> = {
  new: "success",
  excellent: "success",
  good: "info",
  fair: "warning",
  poor: "danger",
};

type BookConditionBadgeProps = {
  condition: BookCondition;
};

export function BookConditionBadge({ condition }: BookConditionBadgeProps) {
  return (
    <BadgePill tone={conditionTones[condition]}>
      {conditionLabels[condition]}
    </BadgePill>
  );
}
