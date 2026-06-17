import { TriangleAlertIcon } from "lucide-react";

import { BadgePill } from "@/components/shared/badge-pill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DisputeCardProps = {
  title: string;
  reason: string;
  status: "open" | "investigating" | "resolved";
  className?: string;
};

export function DisputeCard({
  title,
  reason,
  status,
  className,
}: DisputeCardProps) {
  return (
    <article
      className={cn("bg-card shadow-soft rounded-lg border p-4", className)}
    >
      <div className="flex items-start gap-3">
        <span className="bg-danger-soft text-danger inline-flex size-10 shrink-0 items-center justify-center rounded-lg">
          <TriangleAlertIcon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-foreground font-semibold">{title}</h3>
            <BadgePill
              tone={
                status === "resolved"
                  ? "success"
                  : status === "open"
                    ? "danger"
                    : "warning"
              }
              className="capitalize"
            >
              {status}
            </BadgePill>
          </div>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            {reason}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="button" size="sm" variant="outline">
          View Details
        </Button>
      </div>
    </article>
  );
}
