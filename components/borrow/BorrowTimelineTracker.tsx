"use client";

import { BorrowStatus } from "@/lib/store/use-borrow-store";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BorrowTimelineTrackerProps {
  status: BorrowStatus;
}

const STEPS = [
  { key: "requested", label: "Requested", states: ["pending_owner_review"] },
  { key: "accepted", label: "Accepted", states: ["accepted"] },
  { key: "paid", label: "Paid", states: ["paid", "handed_over_by_owner"] },
  { key: "active", label: "Borrow Active", states: ["borrow_active"] },
  {
    key: "returning",
    label: "Returning",
    states: ["return_initiated", "disputed"],
  },
  { key: "completed", label: "Completed", states: ["completed"] },
];

export function BorrowTimelineTracker({ status }: BorrowTimelineTrackerProps) {
  // Determine current step index
  let currentStepIndex = -1;
  const orderOfStates = [
    "pending_owner_review",
    "accepted",
    "paid",
    "handed_over_by_owner",
    "borrow_active",
    "return_initiated",
    "disputed",
    "completed",
  ];

  const statusIndex = orderOfStates.indexOf(status);

  STEPS.forEach((step, index) => {
    if (step.states.some((s) => orderOfStates.indexOf(s) <= statusIndex)) {
      currentStepIndex = index;
    }
  });

  if (status === "rejected") {
    return (
      <div className="border-destructive/50 bg-destructive/10 text-destructive rounded-lg border p-4 text-center">
        <p className="font-semibold">Borrow Request Rejected</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="bg-muted absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isPending = index > currentStepIndex;

          return (
            <div
              key={step.key}
              className="bg-background relative z-10 flex flex-col items-center gap-2 px-2"
            >
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border-2 transition-colors duration-300",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-background text-primary",
                  isPending &&
                    "border-muted bg-background text-muted-foreground",
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="size-5" />
                ) : isCurrent ? (
                  <Clock className="size-4 animate-pulse" />
                ) : (
                  <Circle className="size-3" />
                )}
              </div>
              <span
                className={cn(
                  "hidden text-xs font-medium whitespace-nowrap sm:block md:text-sm",
                  isCompleted
                    ? "text-foreground"
                    : isCurrent
                      ? "text-primary"
                      : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
