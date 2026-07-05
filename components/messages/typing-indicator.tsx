"use client";

import { cn } from "@/lib/utils";

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 p-2", className)}>
      <div
        className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}
