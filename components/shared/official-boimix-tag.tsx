import { BadgeCheckIcon } from "lucide-react";

import { BadgePill } from "@/components/shared/badge-pill";

export function OfficialBoiMixTag() {
  return (
    <BadgePill tone="info" className="gap-1">
      <BadgeCheckIcon className="size-3" aria-hidden="true" />
      Official BoiMix
    </BadgePill>
  );
}
