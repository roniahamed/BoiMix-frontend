import type { ComponentProps, ReactNode } from "react";

import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RequestCardAction = {
  label: string;
  onClick?: () => void;
  variant?: ComponentProps<typeof Button>["variant"];
};

type RequestCardProps = {
  title: string;
  description?: string;
  requesterName: string;
  requesterAvatarUrl?: string;
  meta?: ReactNode;
  actions?: RequestCardAction[];
  className?: string;
};

export function RequestCard({
  title,
  description,
  requesterName,
  requesterAvatarUrl,
  meta,
  actions = [],
  className,
}: RequestCardProps) {
  return (
    <article
      className={cn("bg-card shadow-soft rounded-lg border p-4", className)}
    >
      <div className="flex items-start gap-3">
        <UserAvatar name={requesterName} src={requesterAvatarUrl} />
        <div className="min-w-0 flex-1">
          <h3 className="text-foreground font-semibold">{title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{requesterName}</p>
          {description && (
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {description}
            </p>
          )}
          {meta && (
            <div className="text-muted-foreground mt-3 text-sm">{meta}</div>
          )}
        </div>
      </div>
      {!!actions.length && (
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              type="button"
              size="sm"
              variant={action.variant ?? "default"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </article>
  );
}
