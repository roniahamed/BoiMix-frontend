import type { Metadata } from "next";

import { ProfileBadgeCollection } from "@/components/profile/profile-badge-collection";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { getUserProfile } from "@/lib/mock/profile";

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
  const profile = getUserProfile(username);

  if (!profile) {
    return <ProfileNotFound />;
  }

  return (
    <ProfileShell profile={profile} active="badges">
      <section>
        <h2 className="text-foreground mb-3 text-xl font-bold">Badges</h2>
        <ProfileBadgeCollection badges={profile.profileBadges} />
      </section>
    </ProfileShell>
  );
}
