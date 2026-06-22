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
        <div className="mb-4">
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            Recent activity
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Public actions only. Private network and owner-only data stay out of
            this profile.
          </p>
        </div>
        <ProfileActivityList activities={profileActivity} />
      </section>
    </ProfileShell>
  );
}
