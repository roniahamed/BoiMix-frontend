import type { Metadata } from "next";

import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { ProfileBooksViewer } from "@/components/profile/profile-books-viewer";
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

  const isOwnProfile = true; // TODO: Replace with actual auth check

  return (
    <ProfileShell profile={profile} active="library">
      <ProfileBooksViewer
        books={profileLibraryBooks}
        isOwnProfile={isOwnProfile}
      />
    </ProfileShell>
  );
}
