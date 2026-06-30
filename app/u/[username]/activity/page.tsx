import type { Metadata } from "next";

import { ProfileActivityList } from "@/components/profile/profile-activity-list";
import { ProfileActivitySidebar } from "@/components/profile/profile-activity-sidebar";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";

export const metadata: Metadata = {
  title: "Reader Activity - BoiMix",
  description: "View public activity from a BoiMix reader.",
};

export default async function UserActivityPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const { mockProfiles, profileActivity } = await fetch(`${baseUrl}/api/profile`).then(r => r.json());
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  const getUserProfile = (username: string) => mockProfiles.find((p: any) => p.username === username);

  const { username } = await params;
  const profile = getUserProfile(username);

  if (!profile) {
    return <ProfileNotFound />;
  }

  return (
    <ProfileShell profile={profile} active="activity">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {/* Left Sidebar */}
        <ProfileActivitySidebar />

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          <ProfileActivityList activities={profileActivity} />
        </div>
      </div>
    </ProfileShell>
  );
}
