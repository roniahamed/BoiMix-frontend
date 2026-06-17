import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
  className?: string;
};

export function RatingStars({
  rating,
  reviewCount,
  className,
}: RatingStarsProps) {
  const normalizedRating = Math.max(0, Math.min(5, rating));

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span
        className="inline-flex items-center gap-0.5"
        aria-label={`${normalizedRating} out of 5`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon
            key={index}
            className={cn(
              "size-3.5",
              index < Math.round(normalizedRating)
                ? "fill-warning text-warning"
                : "fill-gray-200 text-gray-200",
            )}
            aria-hidden="true"
          />
        ))}
      </span>
      {reviewCount !== undefined && (
        <span className="text-muted-foreground text-xs">({reviewCount})</span>
      )}
    </span>
  );
}
