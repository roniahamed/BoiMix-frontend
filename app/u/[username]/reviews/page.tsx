import type { Metadata } from "next";
import Link from "next/link";

import { ReviewCard } from "@/components/shared/review-card";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { getUserProfile, profileReviews } from "@/lib/mock/profile";

export const metadata: Metadata = {
  title: "Reader Reviews - BoiMix",
  description: "Read public reviews from a BoiMix reader.",
};

export default async function UserReviewsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = getUserProfile(username);

  if (!profile) {
    return <ProfileNotFound />;
  }

  return (
    <ProfileShell profile={profile} active="reviews">
      <section className="bg-card rounded-lg border p-4 shadow-sm">
        <h2 className="text-foreground text-xl font-bold">Reviews</h2>
        <div className="mt-2">
          {profileReviews.map((review) => (
            <div key={review.id}>
              <Link
                href={`/books/${review.bookSlug}`}
                className="text-primary mt-4 inline-block text-sm font-semibold hover:underline"
              >
                {review.bookTitle}
              </Link>
              <ReviewCard
                reviewerName={profile.name}
                reviewerAvatarUrl={profile.avatarUrl}
                rating={review.rating}
                body={review.body}
                createdAt={review.createdAt}
                helpfulCount={review.helpfulCount}
              />
            </div>
          ))}
        </div>
      </section>
    </ProfileShell>
  );
}
