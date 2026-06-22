import type { Metadata } from "next";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import {
  getUserProfile,
  profileLibraryBooks,
  profileReviews,
} from "@/lib/mock/profile";
import Image from "next/image";
import { ProfileBooksViewer } from "@/components/profile/profile-books-viewer";

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

  const isOwnProfile = true; // TODO: Replace with actual auth check

  return (
    <ProfileShell profile={profile} active="overview">
      <div className="space-y-6">
        {/* Interactive Books Viewer */}
        <ProfileBooksViewer
          books={profileLibraryBooks}
          isOwnProfile={isOwnProfile}
          libraryUrl={`/u/${profile.username}/library`}
        />

        {/* Reviews Section */}
        <section className="bg-card rounded-[24px] border p-6 shadow-[0_18px_40px_rgba(51,51,51,0.08)]">
          <h2 className="text-foreground mb-6 text-lg font-bold tracking-tight">
            Reviews (238)
          </h2>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* Rating Summary */}
            <div className="flex min-w-[200px] flex-col gap-2">
              <div className="text-foreground text-5xl font-bold">4.8</div>
              <div className="text-warning flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="size-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-muted-foreground mt-1 text-sm font-medium">
                Based on 238 reviews
              </div>

              <div className="mt-4 space-y-2">
                {[
                  { stars: 5, pct: 80, count: 180 },
                  { stars: 4, pct: 15, count: 45 },
                  { stars: 3, pct: 3, count: 8 },
                  { stars: 2, pct: 1, count: 3 },
                  { stars: 1, pct: 1, count: 2 },
                ].map((row) => (
                  <div
                    key={row.stars}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="text-muted-foreground w-4 font-medium">
                      {row.stars}
                    </span>
                    <svg
                      className="text-muted-foreground size-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                      <div
                        className="bg-warning h-full rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-6 text-right">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="grid flex-1 gap-6 md:grid-cols-3">
              {profileReviews.slice(0, 3).map((review) => (
                <div key={review.id} className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted relative size-10 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${review.id}`}
                        alt="Reviewer"
                        fill
                        sizes="(max-width: 768px) 40px, 40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-foreground text-sm font-bold">
                        Anonymous Reviewer
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        {review.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="text-warning flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`size-4 ${star <= review.rating ? "fill-current" : "fill-muted text-muted"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">
                    {review.body}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    {/* Using placeholder book cover to simulate the book attachment in the review as per image */}
                    <div className="relative size-8 overflow-hidden rounded shadow-xs">
                      <Image
                        src={`/book-covers/${review.bookSlug}.svg`}
                        alt={review.bookTitle}
                        fill
                        sizes="(max-width: 768px) 32px, 32px"
                        className="bg-muted object-cover"
                      />
                    </div>
                    <span className="text-primary text-xs font-semibold">
                      {review.bookTitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ProfileShell>
  );
}
