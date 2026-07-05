import { ReviewCard } from "@/components/shared/review-card";
import { fetchLocal } from "@/lib/fetchLocal";

export default async function ReviewsPage() {
  const { profileReviews } = await fetchLocal("/api/profile");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Reviews</h1>
        <p className="text-muted-foreground mt-2">
          Reviews you&apos;ve received from others.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profileReviews.map(
          (review: {
            id: string;
            reviewerName: string;
            reviewerAvatar?: string;
            rating: number;
            body: string;
            createdAt: string;
            bookCover?: string;
            transactionType?: string;
          }) => (
            <ReviewCard
              key={review.id}
              reviewerName={review.reviewerName}
              reviewerAvatarUrl={review.reviewerAvatar}
              rating={review.rating}
              body={review.body}
              createdAt={review.createdAt}
              bookCover={review.bookCover}
              transactionType={review.transactionType}
            />
          ),
        )}
      </div>
    </div>
  );
}
