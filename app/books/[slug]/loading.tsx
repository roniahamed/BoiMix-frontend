import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function BookDetailsLoading() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-4 pb-20 md:px-6 md:pt-8 md:pb-12">
      <div className="bg-card border p-4 shadow-sm sm:rounded-xl sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Image Gallery Skeleton */}
          <div className="lg:col-span-4 lg:col-start-1">
            <div className="bg-muted mx-auto aspect-[3/4] w-full animate-pulse rounded-md sm:max-w-[320px]" />
            <div className="mt-4 flex justify-center gap-2">
              <div className="bg-muted size-16 animate-pulse rounded-md" />
              <div className="bg-muted size-16 animate-pulse rounded-md" />
              <div className="bg-muted size-16 animate-pulse rounded-md" />
            </div>
          </div>

          {/* Right Column: Info & Actions Skeleton */}
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="mb-4 flex gap-2">
              <div className="bg-muted h-6 w-16 animate-pulse rounded-md" />
              <div className="bg-muted h-6 w-20 animate-pulse rounded-md" />
            </div>

            <LoadingSkeleton rows={1} className="mb-2 h-10 w-3/4" />
            <LoadingSkeleton rows={1} className="mb-6 h-6 w-1/2" />

            <LoadingSkeleton rows={3} className="mb-6" />

            <div className="my-6 hidden border-t sm:block" />

            <div className="hidden space-y-4 sm:block">
              <LoadingSkeleton rows={2} className="w-1/3" />
              <div className="bg-muted mt-4 h-12 w-full max-w-[500px] animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {/* Seller Info Skeleton */}
        <div className="bg-card rounded-xl border p-5 shadow-sm lg:p-6">
          <LoadingSkeleton rows={1} className="mb-4 h-6 w-48" />
          <div className="flex items-start gap-4">
            <div className="bg-muted size-12 animate-pulse rounded-full" />
            <div className="flex-1 space-y-2">
              <LoadingSkeleton rows={2} className="w-1/3" />
            </div>
          </div>
        </div>

        {/* Summary Skeleton */}
        <div className="bg-card rounded-xl border p-5 shadow-sm lg:p-6">
          <LoadingSkeleton rows={1} className="mb-4 h-6 w-32" />
          <LoadingSkeleton rows={5} />
        </div>
      </div>
    </div>
  );
}
