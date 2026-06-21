import type { Metadata } from "next";

import { ProfileLocationCard } from "@/components/profile/profile-location-card";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { getUserProfile } from "@/lib/mock/profile";

export const metadata: Metadata = {
  title: "Reader Location - BoiMix",
  description: "View public service-area details for a BoiMix reader.",
};

export default async function UserLocationPage({
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
    <ProfileShell profile={profile} active="location">
      <ProfileLocationCard location={profile.locationDetails} />
    </ProfileShell>
  );
}
