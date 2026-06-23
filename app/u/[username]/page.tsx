import type { Metadata } from "next";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import {
  getUserProfile,
  profileLibraryBooks,
  profileReviews,
} from "@/lib/mock/profile";
import Image from "next/image";
import Link from "next/link";
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
          books={profileLibraryBooks.slice(0, 20)}
          isOwnProfile={isOwnProfile}
          libraryUrl={`/u/${profile.username}/library`}
        />

        {/* Reviews Section */}
        <section className="bg-card border-border/50 relative rounded-[10px] border p-5 shadow-none">
          <Link
            href={`/u/${profile.username}/reviews#profile-content`}
            className="text-primary hover:text-primary/80 absolute top-5 right-5 z-10 text-sm font-semibold transition-colors"
          >
            View all
          </Link>

          <div className="flex flex-col gap-8 md:flex-row md:gap-8">
            {/* Column 1: Rating Summary */}
            <div className="flex w-full shrink-0 flex-col md:w-[280px]">
              <h2 className="text-foreground mb-4 text-lg font-bold tracking-tight">
                Reviews (238)
              </h2>
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1">
                  <div className="text-foreground text-4xl font-bold">4.8</div>
                  <div className="text-warning flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="size-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs">
                    Based on 238
                    <br />
                    reviews
                  </div>
                </div>

                <div className="mt-1 flex-1 space-y-1.5">
                  {[
                    { stars: 5, pct: 80, count: 180 },
                    { stars: 4, pct: 15, count: 45 },
                    { stars: 3, pct: 3, count: 8 },
                    { stars: 2, pct: 1, count: 3 },
                    { stars: 1, pct: 1, count: 2 },
                  ].map((row) => (
                    <div
                      key={row.stars}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span className="text-muted-foreground w-3 font-medium">
                        {row.stars}
                      </span>
                      <svg
                        className="text-muted-foreground size-2.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
                        <div
                          className="bg-warning h-full rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground w-5 text-right">
                        {row.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Reviews (Columns 2 and 3) */}
            <div className="relative grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {profileReviews.slice(0, 2).map((review) => (
                <div key={review.id} className="relative flex flex-col">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="bg-muted relative size-10 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${review.id}`}
                        alt="Reviewer"
                        fill
                        sizes="(max-width: 768px) 40px, 40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm font-bold">
                        Hasan Mahmud
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {review.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="text-warning mb-2 flex">
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
                  <p className="text-foreground mb-3 line-clamp-3 text-sm leading-relaxed">
                    {review.body}
                  </p>
                  <div className="mt-auto flex items-center gap-2">
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
