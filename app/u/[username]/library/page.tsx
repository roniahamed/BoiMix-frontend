import type { Metadata } from "next";

import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { ProfileBooksViewer } from "@/components/profile/profile-books-viewer";
import { fetchLocal } from "@/lib/fetchLocal";

export const metadata: Metadata = {
  title: "Reader Library - BoiMix",
  description: "Browse public books shared by a BoiMix reader.",
};

export default async function UserLibraryPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { mockProfiles, profileLibraryBooks } =
    await fetchLocal("/api/profile");
  const getUserProfile = (username: string) =>
    mockProfiles.find((p: { username: string }) => p.username === username);

  const { username } = await params;
  const profile = getUserProfile(username);

  if (!profile) {
    return <ProfileNotFound />;
  }

  const isOwnProfile = true; // TODO: Replace with actual auth check

  return (
    <ProfileShell
      profile={profile}
      active="library"
      isOwnProfile={isOwnProfile}
    >
      <ProfileBooksViewer
        books={profileLibraryBooks}
        isOwnProfile={isOwnProfile}
      />
    </ProfileShell>
  );
}
