import { Repeat2Icon } from "lucide-react";

import { RequestCard } from "@/components/shared/request-card";
import { SwapBadge } from "@/components/shared/swap-badge";

type SwapOfferCardProps = {
  offeredBookTitle: string;
  requestedBookTitle: string;
  requesterName: string;
  requesterAvatarUrl?: string;
};

export function SwapOfferCard({
  offeredBookTitle,
  requestedBookTitle,
  requesterName,
  requesterAvatarUrl,
}: SwapOfferCardProps) {
  return (
    <RequestCard
      title={requestedBookTitle}
      requesterName={requesterName}
      requesterAvatarUrl={requesterAvatarUrl}
      description={`Offering: ${offeredBookTitle}`}
      meta={
        <div className="flex flex-wrap items-center gap-2">
          <Repeat2Icon className="text-primary size-4" aria-hidden="true" />
          <SwapBadge label="Swap Offer" />
        </div>
      }
      actions={[
        { label: "Counter", variant: "outline" },
        { label: "Accept", variant: "success" },
      ]}
    />
  );
}
