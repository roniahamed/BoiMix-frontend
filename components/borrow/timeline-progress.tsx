import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineProgressProps {
  currentStatus: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const STEPS = [
  { key: "requested", label: "Requested" },
  { key: "accepted", label: "Accepted" },
  { key: "paid", label: "Paid" },
  { key: "handover_scheduled", label: "Handover Scheduled" },
  { key: "handed_over", label: "Handed Over" },
  { key: "received", label: "Received" },
  { key: "borrow_active", label: "Borrow Active" },
  { key: "returning", label: "Returning" },
  { key: "completed", label: "Completed" },
];

export function TimelineProgress({
  currentStatus,
  className,
  orientation = "horizontal",
}: TimelineProgressProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStatus) ?? 0;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative flex justify-between",
          orientation === "vertical"
            ? "h-full flex-col space-y-8"
            : "items-center",
        )}
      >
        {/* Connecting Lines Background */}
        <div
          className={cn(
            "bg-muted-foreground/20 absolute",
            orientation === "vertical"
              ? "top-2 left-2.5 h-[calc(100%-1rem)] w-[2px]"
              : "top-2.5 left-4 h-[2px] w-[calc(100%-2rem)]",
          )}
        >
          <div
            className={cn(
              "bg-green-500 transition-all duration-500 ease-in-out",
              orientation === "vertical" ? "w-full" : "h-full",
            )}
            style={{
              [orientation === "vertical" ? "height" : "width"]:
                `${Math.max(0, (currentIndex / (STEPS.length - 1)) * 100)}%`,
            }}
          />
        </div>

        {STEPS.map((step, i) => {
          const isCompleted = i <= currentIndex;
          const isActive = i === currentIndex;

          return (
            <div
              key={step.key}
              className={cn(
                "relative z-10 flex",
                orientation === "vertical"
                  ? "flex-row items-start gap-4"
                  : "flex-col items-center gap-2",
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isCompleted
                    ? "bg-green-500 text-white"
                    : "border-muted bg-background border-2 text-transparent",
                )}
              >
                {isCompleted && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
              <div
                className={cn(
                  "text-[10px] md:text-xs",
                  isCompleted
                    ? "text-foreground font-medium"
                    : "text-muted-foreground",
                  orientation === "horizontal" && "-ml-8 w-20 text-center",
                )}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
