import { cn } from "@/lib/utils";

type MessageBubbleProps = {
  message: string;
  time?: string;
  mine?: boolean;
  className?: string;
};

export function MessageBubble({
  message,
  time,
  mine = false,
  className,
}: MessageBubbleProps) {
  return (
    <div
      className={cn("flex", mine ? "justify-end" : "justify-start", className)}
    >
      <div
        className={cn(
          "shadow-soft max-w-[78%] rounded-2xl px-4 py-2 text-sm leading-6",
          mine
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm",
        )}
      >
        <p>{message}</p>
        {time && (
          <time
            className={cn(
              "mt-1 block text-[0.7rem]",
              mine ? "text-primary-foreground/75" : "text-muted-foreground",
            )}
          >
            {time}
          </time>
        )}
      </div>
    </div>
  );
}
