import type { ReactNode } from "react";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileNav } from "@/components/profile/profile-nav";
import type { UserProfile } from "@/types/user";

type ProfileShellProps = {
  profile: UserProfile;
  active:
    | ""
    | "reviews"
    | "library"
    | "activity"
    | "badges"
    | "followers"
    | "following"
    | "location";
  children: ReactNode;
};

export function ProfileShell({ profile, active, children }: ProfileShellProps) {
  return (
    <div className="boimix-container py-6 md:py-8">
      <ProfileHeader profile={profile} />
      <div className="mt-4">
        <ProfileNav username={profile.username} active={active} />
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
