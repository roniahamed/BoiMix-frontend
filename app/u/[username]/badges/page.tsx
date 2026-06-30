import type { Metadata } from "next";

import { ProfileBadgeCollection } from "@/components/profile/profile-badge-collection";
import { ProfileBadgeSidebar } from "@/components/profile/profile-badge-sidebar";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";

export const metadata: Metadata = {
  title: "Reader Badges - BoiMix",
  description: "View public badges earned by a BoiMix reader.",
};

export default async function UserBadgesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const { mockProfiles } = await fetch(`${baseUrl}/api/profile`).then(r => r.json());
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  const getUserProfile = (username: string) => mockProfiles.find((p: any) => p.username === username);

  const { username } = await params;
  const profile = getUserProfile(username);

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
