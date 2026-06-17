import { CheckIcon, CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type TimelineItem = {
  title: string;
  description?: string;
  completed?: boolean;
  time?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className="flex gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border",
              item.completed
                ? "border-success bg-success text-success-foreground"
                : "border-border bg-background text-muted-foreground",
            )}
          >
            {item.completed ? (
              <CheckIcon className="size-3.5" aria-hidden="true" />
            ) : (
              <CircleIcon className="size-3" aria-hidden="true" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-foreground font-medium">{item.title}</h3>
              {item.time && (
                <time className="text-muted-foreground text-xs">
                  {item.time}
                </time>
              )}
            </div>
            {item.description && (
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
