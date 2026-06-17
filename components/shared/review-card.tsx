import { RatingStars } from "@/components/shared/rating-stars";
import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  reviewerName: string;
  reviewerAvatarUrl?: string;
  rating: number;
  body: string;
  createdAt?: string;
  className?: string;
};

export function ReviewCard({
  reviewerName,
  reviewerAvatarUrl,
  rating,
  body,
  createdAt,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn("bg-card shadow-soft rounded-lg border p-4", className)}
    >
      <div className="flex items-start gap-3">
        <UserAvatar name={reviewerName} src={reviewerAvatarUrl} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-foreground font-semibold">{reviewerName}</h3>
            {createdAt && (
              <time className="text-muted-foreground text-xs">{createdAt}</time>
            )}
          </div>
          <RatingStars rating={rating} className="mt-1" />
          <p className="text-muted-foreground mt-3 text-sm leading-6">{body}</p>
        </div>
      </div>
    </article>
  );
}
