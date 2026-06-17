import { cn } from "@/lib/utils";

type LoadingSkeletonProps = {
  className?: string;
  rows?: number;
};

export function LoadingSkeleton({ className, rows = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="bg-muted h-4 animate-pulse rounded-md"
          style={{ width: `${100 - index * 12}%` }}
        />
      ))}
    </div>
  );
}
