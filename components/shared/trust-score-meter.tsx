import { ShieldCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type TrustScoreMeterProps = {
  score: number;
  className?: string;
};

export function TrustScoreMeter({ score, className }: TrustScoreMeterProps) {
  const normalizedScore = Math.max(0, Math.min(100, score));

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-foreground flex items-center gap-1 font-medium">
          <ShieldCheckIcon className="text-success size-4" aria-hidden="true" />
          Trust Score
        </span>
        <span className="text-foreground font-semibold">
          {normalizedScore}%
        </span>
      </div>
      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <div
          className="bg-success h-full rounded-full"
          style={{ width: `${normalizedScore}%` }}
        />
      </div>
    </div>
  );
}
