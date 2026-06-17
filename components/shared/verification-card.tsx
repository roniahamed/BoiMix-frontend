import { ShieldCheckIcon } from "lucide-react";

import { BadgePill } from "@/components/shared/badge-pill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VerificationCardProps = {
  title: string;
  description?: string;
  status: "pending" | "verified" | "rejected";
  className?: string;
};

export function VerificationCard({
  title,
  description,
  status,
  className,
}: VerificationCardProps) {
  return (
    <article
      className={cn("bg-card shadow-soft rounded-lg border p-4", className)}
    >
      <div className="flex items-start gap-3">
        <span className="bg-info-soft text-info inline-flex size-10 shrink-0 items-center justify-center rounded-lg">
          <ShieldCheckIcon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-foreground font-semibold">{title}</h3>
            <BadgePill
              tone={
                status === "verified"
                  ? "success"
                  : status === "rejected"
                    ? "danger"
                    : "warning"
              }
              className="capitalize"
            >
              {status}
            </BadgePill>
          </div>
          {description && (
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" size="sm" variant="outline">
          Review
        </Button>
      </div>
    </article>
  );
}
