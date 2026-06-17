"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type CountdownProps = {
  targetDate: Date | string;
  className?: string;
};

function getRemainingTime(targetDate: Date | string) {
  const target = new Date(targetDate).getTime();
  const remaining = Math.max(0, target - Date.now());

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const [remainingTime, setRemainingTime] = useState(() =>
    getRemainingTime(targetDate),
  );
  const parts = useMemo(
    () => [
      { label: "Days", value: remainingTime.days },
      { label: "Hours", value: remainingTime.hours },
      { label: "Min", value: remainingTime.minutes },
      { label: "Sec", value: remainingTime.seconds },
    ],
    [remainingTime],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingTime(getRemainingTime(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={cn("grid grid-cols-4 gap-2", className)}>
      {parts.map((part) => (
        <div
          key={part.label}
          className="bg-card rounded-lg border p-2 text-center"
        >
          <div className="text-foreground font-semibold">
            {part.value.toString().padStart(2, "0")}
          </div>
          <div className="text-muted-foreground text-[0.7rem]">
            {part.label}
          </div>
        </div>
      ))}
    </div>
  );
}
