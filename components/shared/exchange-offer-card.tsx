import { Repeat2Icon } from "lucide-react";

import { ExchangeBadge } from "@/components/shared/exchange-badge";
import { RequestCard } from "@/components/shared/request-card";

type ExchangeOfferCardProps = {
  offeredBookTitle: string;
  requestedBookTitle: string;
  requesterName: string;
  requesterAvatarUrl?: string;
};

export function ExchangeOfferCard({
  offeredBookTitle,
  requestedBookTitle,
  requesterName,
  requesterAvatarUrl,
}: ExchangeOfferCardProps) {
  return (
    <RequestCard
      title={requestedBookTitle}
      requesterName={requesterName}
      requesterAvatarUrl={requesterAvatarUrl}
      description={`Offering: ${offeredBookTitle}`}
      meta={
        <div className="flex flex-wrap items-center gap-2">
          <Repeat2Icon className="text-primary size-4" aria-hidden="true" />
          <ExchangeBadge label="Exchange Offer" />
        </div>
      }
      actions={[
        { label: "Counter", variant: "outline" },
        { label: "Accept", variant: "success" },
      ]}
    />
  );
}
