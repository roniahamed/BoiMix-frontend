import type { Metadata } from "next";

import { ProfileBadgeCollection } from "@/components/profile/profile-badge-collection";
import { ProfileBadgeSidebar } from "@/components/profile/profile-badge-sidebar";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { fetchPublicProfile } from "@/lib/api-client";

export const metadata: Metadata = {
  title: "Reader Badges - BoiMix",
  description: "View public badges earned by a BoiMix reader.",
};

export default async function UserBadgesPage({
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

  return (
    <ProfileShell
      profile={profile}
      active="badges"
      sidebar={<ProfileBadgeSidebar profile={profile} />}
    >
      <div className="space-y-10">
        <ProfileBadgeCollection badges={profile.profileBadges} />
      </div>
    </ProfileShell>
  );
}
