"use client";

import { useState } from "react";
import { RatingStars } from "@/components/shared/rating-stars";
import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, MessageSquareReply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ReviewCardProps = {
  reviewerName: string;
  reviewerAvatarUrl?: string;
  rating: number;
  body: string;
  createdAt?: string;
  className?: string;
  helpfulCount?: number;
  sellerReply?: string;
};

export function ReviewCard({
  reviewerName,
  reviewerAvatarUrl,
  rating,
  body,
  createdAt,
  className,
  helpfulCount = 0,
  sellerReply: initialSellerReply,
}: ReviewCardProps) {
  const [currentHelpfulCount, setCurrentHelpfulCount] = useState(helpfulCount);
  const [helpfulStatus, setHelpfulStatus] = useState<
    "helpful" | "not-helpful" | null
  >(null);

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sellerReply, setSellerReply] = useState(initialSellerReply);

  const handleHelpfulClick = (type: "helpful" | "not-helpful") => {
    if (helpfulStatus === type) {
      setHelpfulStatus(null);
      if (type === "helpful") setCurrentHelpfulCount((c) => c - 1);
    } else {
      if (helpfulStatus === "helpful" && type === "not-helpful") {
        setCurrentHelpfulCount((c) => c - 1);
      } else if (helpfulStatus !== "helpful" && type === "helpful") {
        setCurrentHelpfulCount((c) => c + 1);
      }
      setHelpfulStatus(type);
    }
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    setSellerReply(replyText);
    setIsReplying(false);
    setReplyText("");
  };

  return (
    <article className={cn("bg-card border-b py-4 last:border-0", className)}>
      <div className="flex items-start gap-4">
        <UserAvatar
          name={reviewerName}
          src={reviewerAvatarUrl}
          className="size-12 bg-orange-600 text-white"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">By</span>
              <h3 className="text-foreground font-semibold">{reviewerName}</h3>
              {createdAt && (
                <>
                  <span className="text-muted-foreground">,</span>
                  <time className="text-muted-foreground">{createdAt}</time>
                </>
              )}
            </div>
            <RatingStars rating={rating} />
          </div>
          <p className="text-foreground mt-2 text-sm leading-6">{body}</p>

          {sellerReply && (
            <div className="bg-muted/50 border-primary mt-4 rounded-md border-l-2 p-4">
              <p className="text-foreground mb-1 text-xs font-semibold">
                Seller Response
              </p>
              <p className="text-muted-foreground text-sm">{sellerReply}</p>
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-muted-foreground mb-2 text-xs">
                Was this review helpful to you?
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant={helpfulStatus === "helpful" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleHelpfulClick("helpful")}
                  className={cn(
                    "h-9 gap-2 rounded-md px-4 font-medium",
                    helpfulStatus !== "helpful" && "text-muted-foreground",
                  )}
                >
                  <ThumbsUp className="size-4" />
                  Helpful{" "}
                  {currentHelpfulCount > 0 && `(${currentHelpfulCount})`}
                </Button>
                <Button
                  variant={
                    helpfulStatus === "not-helpful" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleHelpfulClick("not-helpful")}
                  className={cn(
                    "h-9 gap-2 rounded-md px-4 font-medium",
                    helpfulStatus !== "not-helpful" && "text-muted-foreground",
                  )}
                >
                  <ThumbsDown className="size-4" />
                  Not Helpful
                </Button>
              </div>
            </div>

            {!sellerReply && !isReplying && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(true)}
                className="text-primary mt-auto"
              >
                <MessageSquareReply className="mr-2 size-4" />
                Reply
              </Button>
            )}
          </div>

          {isReplying && (
            <div className="mt-4 space-y-3">
              <Textarea
                placeholder="Write your response to this review..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleReplySubmit}>
                  Submit Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
