import type { Metadata } from "next";

import { ProfileActivityList } from "@/components/profile/profile-activity-list";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { getUserProfile, profileActivity } from "@/lib/mock/profile";

export const metadata: Metadata = {
  title: "Reader Activity - BoiMix",
  description: "View public activity from a BoiMix reader.",
};

export default async function UserActivityPage({
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
    <ProfileShell profile={profile} active="activity">
      <section>
        <h2 className="text-foreground mb-3 text-xl font-bold">
          Recent activity
        </h2>
        <ProfileActivityList activities={profileActivity} />
      </section>
    </ProfileShell>
  );
}
