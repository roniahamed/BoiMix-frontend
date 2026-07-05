import { cn } from "@/lib/utils";
import { Check, CheckCheck, FileIcon } from "lucide-react";
import Image from "next/image";

type MessageBubbleProps = {
  message?: string;
  time?: string;
  mine?: boolean;
  isRead?: boolean;
  attachment?: {
    type: "image" | "file";
    url: string;
    name?: string;
  };
  className?: string;
};

export function MessageBubble({
  message,
  time,
  mine = false,
  isRead = false,
  attachment,
  className,
}: MessageBubbleProps) {
  return (
    <div
      className={cn("flex", mine ? "justify-end" : "justify-start", className)}
    >
      <div
        className={cn(
          "shadow-soft max-w-[85%] rounded-2xl p-2 text-sm leading-6 sm:max-w-[70%]",
          mine
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm",
        )}
      >
        {attachment && (
          <div className="mb-2 overflow-hidden rounded-xl">
            {attachment.type === "image" ? (
              <div className="relative h-48 w-full sm:h-64 sm:w-64">
                <Image
                  src={attachment.url}
                  alt={attachment.name || "Attachment"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-black/10 p-3 dark:bg-white/10">
                <FileIcon className="h-6 w-6" />
                <span className="truncate text-xs font-medium">
                  {attachment.name || "Document.pdf"}
                </span>
              </div>
            )}
          </div>
        )}

        {message && <p className="px-2">{message}</p>}

        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1 px-2 text-[0.7rem]",
            mine ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {time && <time>{time}</time>}
          {mine && (
            <span>
              {isRead ? (
                <CheckCheck className="h-3.5 w-3.5" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
