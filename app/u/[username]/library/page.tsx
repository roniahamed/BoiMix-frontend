import type { Metadata } from "next";

import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { ProfileBooksViewer } from "@/components/profile/profile-books-viewer";
import { fetchPublicProfile, fetchPublicUserLibrary } from "@/lib/api-client";

export const metadata: Metadata = {
  title: "Reader Library - BoiMix",
  description: "Browse public books shared by a BoiMix reader.",
};

export default async function UserLibraryPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { username } = await params;
  const resolvedSearchParams = await searchParams;
  const filter =
    typeof resolvedSearchParams?.filter === "string"
      ? resolvedSearchParams.filter
      : undefined;
  const sort =
    typeof resolvedSearchParams?.sort === "string"
      ? resolvedSearchParams.sort
      : undefined;

  let profile = null;
  try {
    profile = await fetchPublicProfile(username);
  } catch (error) {
    console.error("Failed to fetch public profile:", error);
  }

  if (!profile) {
    return <ProfileNotFound />;
  }

  // Fetch library with server-side filtering

  let profileLibraryBooks: any[] = [];
  try {
    profileLibraryBooks = await fetchPublicUserLibrary(username, filter, sort);
  } catch {
    console.error("Failed to fetch public user library");
  }

  const isOwnProfile = false; // isOwnProfile determined client-side via auth store

  return (
    <ProfileShell profile={profile} active="library">
      <ProfileBooksViewer
        books={profileLibraryBooks}
        isOwnProfile={isOwnProfile}
      />
    </ProfileShell>
  );
}
