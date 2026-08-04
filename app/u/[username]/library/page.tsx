import type { Metadata } from "next";

import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { ProfileBooksViewer } from "@/components/profile/profile-books-viewer";
import { fetchPublicProfile, fetchUserLibrary } from "@/lib/api-client";

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

  let profile = null;
  try {
    profile = await fetchPublicProfile(username);
  } catch (error) {
    console.error("Failed to fetch public profile:", error);
  }

  if (!profile) {
    return <ProfileNotFound />;
  }

  // Fetch library — falls back to empty if unauthenticated or error
  let profileLibraryBooks: any[] = [];
  try {
    profileLibraryBooks = await fetchUserLibrary();
  } catch {
    // Library is only available to own authenticated profile
  }

  const isOwnProfile = false; // isOwnProfile determined client-side via auth store

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
