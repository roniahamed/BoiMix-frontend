import type { Metadata } from "next";

import { BookCard } from "@/components/shared/book-card";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { getUserProfile, profileLibraryBooks } from "@/lib/mock/profile";

export const metadata: Metadata = {
  title: "Reader Library - BoiMix",
  description: "Browse public books shared by a BoiMix reader.",
};

export default async function UserLibraryPage({
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
    <ProfileShell profile={profile} active="library">
      <section>
        <h2 className="text-foreground mb-3 text-xl font-bold">
          Public library
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {profileLibraryBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </ProfileShell>
  );
}
