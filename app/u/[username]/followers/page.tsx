import type { Metadata } from "next";

import { UserCard } from "@/components/shared/user-card";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { ProfileShell } from "@/components/profile/profile-shell";
import { getUserProfile, profileFollowers } from "@/lib/mock/profile";

export const metadata: Metadata = {
  title: "Reader Followers - BoiMix",
  description: "View followers for a BoiMix reader.",
};

export default async function UserFollowersPage({
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
    <ProfileShell profile={profile} active="followers">
      <section>
        <h2 className="text-foreground mb-3 text-xl font-bold">Followers</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {profileFollowers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </ProfileShell>
  );
}
