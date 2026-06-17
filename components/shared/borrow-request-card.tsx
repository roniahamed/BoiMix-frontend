import { BookOpenIcon } from "lucide-react";

import { BorrowStatusBadge } from "@/components/shared/borrow-status-badge";
import { RequestCard } from "@/components/shared/request-card";
import type { BorrowStatus } from "@/components/shared/borrow-status-badge";

type BorrowRequestCardProps = {
  bookTitle: string;
  requesterName: string;
  requesterAvatarUrl?: string;
  status?: BorrowStatus;
  dueText?: string;
};

export function BorrowRequestCard({
  bookTitle,
  requesterName,
  requesterAvatarUrl,
  status = "requested",
  dueText,
}: BorrowRequestCardProps) {
  return (
    <RequestCard
      title={bookTitle}
      requesterName={requesterName}
      requesterAvatarUrl={requesterAvatarUrl}
      description="Borrow request"
      meta={
        <div className="flex flex-wrap items-center gap-2">
          <BookOpenIcon className="text-primary size-4" aria-hidden="true" />
          <BorrowStatusBadge status={status} />
          {dueText && <span>{dueText}</span>}
        </div>
      }
      actions={[
        { label: "Decline", variant: "outline" },
        { label: "Approve", variant: "success" },
      ]}
    />
  );
}
