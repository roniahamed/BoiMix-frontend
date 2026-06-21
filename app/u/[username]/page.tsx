import type { Metadata } from "next";

import { BookCard } from "@/components/shared/book-card";
import { ReviewCard } from "@/components/shared/review-card";
import { UserCard } from "@/components/shared/user-card";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { ProfileStats } from "@/components/profile/profile-stats";
import {
  getUserProfile,
  profileFollowers,
  profileLibraryBooks,
  profileReviews,
} from "@/lib/mock/profile";

export const metadata: Metadata = {
  title: "Reader Profile - BoiMix",
  description: "View a reader profile on BoiMix.",
};

export default async function UserProfilePage({
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
    <ProfileShell profile={profile} active="">
      <div className="space-y-6">
        <ProfileStats stats={profile.stats} />

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-foreground text-xl font-bold">
              Public library
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4">
            {profileLibraryBooks.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="bg-card rounded-lg border p-4 shadow-sm">
            <h2 className="text-foreground text-xl font-bold">Recent review</h2>
            <ReviewCard
              reviewerName={profile.name}
              reviewerAvatarUrl={profile.avatarUrl}
              rating={profileReviews[0].rating}
              body={profileReviews[0].body}
              createdAt={profileReviews[0].createdAt}
              helpfulCount={profileReviews[0].helpfulCount}
            />
          </div>
          <div>
            <h2 className="text-foreground mb-3 text-xl font-bold">
              Readers nearby
            </h2>
            <div className="space-y-3">
              {profileFollowers.slice(0, 2).map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </ProfileShell>
  );
}
