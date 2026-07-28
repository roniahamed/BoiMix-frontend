import { cn } from "@/lib/utils";
import {
  Check,
  CheckCheck,
  FileIcon,
  ArrowLeftRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  exchangeProposal?: {
    id: string;
    offeringBook: {
      title: string;
      author: string;
      cover: string;
    };
    requestingBook: {
      title: string;
      author: string;
      cover: string;
    };
    status: "pending" | "accepted" | "declined";
    onAccept?: () => void;
    onDecline?: () => void;
  };
  className?: string;
};

export function MessageBubble({
  message,
  time,
  mine = false,
  isRead = false,
  attachment,
  exchangeProposal,
  className,
}: MessageBubbleProps) {
  return (
    <div
      className={cn("flex", mine ? "justify-end" : "justify-start", className)}
    >
      <div
        className={cn(
          "shadow-soft max-w-[90%] rounded-2xl p-2 text-sm leading-6 sm:max-w-[75%]",
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

        {exchangeProposal && (
          <div className="bg-card text-card-foreground mb-3 overflow-hidden rounded-xl border shadow-sm">
            <div className="bg-muted/50 flex items-center justify-between border-b px-3.5 py-2">
              <span className="flex items-center gap-1.5 text-xs font-bold">
                <ArrowLeftRight className="text-primary h-3.5 w-3.5" />
                Book Exchange Offer
              </span>
              <Badge
                variant={
                  exchangeProposal.status === "accepted"
                    ? "default"
                    : exchangeProposal.status === "declined"
                      ? "destructive"
                      : "outline"
                }
                className="text-[10px] font-bold uppercase"
              >
                {exchangeProposal.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between gap-2 p-3 sm:gap-4 sm:p-4">
              {/* Offering Book */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="relative mb-2 h-20 w-14 overflow-hidden rounded-md border shadow-xs sm:h-24 sm:w-16">
                  <Image
                    src={exchangeProposal.offeringBook.cover}
                    alt={exchangeProposal.offeringBook.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="line-clamp-1 text-xs font-bold">
                  {exchangeProposal.offeringBook.title}
                </span>
                <span className="text-muted-foreground line-clamp-1 text-[11px]">
                  {exchangeProposal.offeringBook.author}
                </span>
              </div>

              {/* Arrow */}
              <div className="bg-muted flex shrink-0 items-center justify-center rounded-full p-2">
                <ArrowLeftRight className="text-muted-foreground h-4 w-4" />
              </div>

              {/* Requesting Book */}
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="relative mb-2 h-20 w-14 overflow-hidden rounded-md border shadow-xs sm:h-24 sm:w-16">
                  <Image
                    src={exchangeProposal.requestingBook.cover}
                    alt={exchangeProposal.requestingBook.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="line-clamp-1 text-xs font-bold">
                  {exchangeProposal.requestingBook.title}
                </span>
                <span className="text-muted-foreground line-clamp-1 text-[11px]">
                  {exchangeProposal.requestingBook.author}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-muted/30 border-t p-2.5">
              {exchangeProposal.status === "pending" ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="h-8 flex-1 bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                    onClick={exchangeProposal.onAccept}
                  >
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                    Accept Exchange
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive h-8 flex-1 font-semibold"
                    onClick={exchangeProposal.onDecline}
                  >
                    Decline
                  </Button>
                </div>
              ) : exchangeProposal.status === "accepted" ? (
                <div className="flex items-center justify-center gap-1.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Exchange Confirmed! Arrange meetup details.
                </div>
              ) : (
                <div className="text-muted-foreground flex items-center justify-center gap-1.5 py-1 text-xs font-medium">
                  <XCircle className="h-4 w-4" />
                  Offer declined.
                </div>
              )}
            </div>
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
