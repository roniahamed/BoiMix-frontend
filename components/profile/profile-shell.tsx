import type { ReactNode } from "react";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileNav } from "@/components/profile/profile-nav";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { ProfileVerifications } from "@/components/profile/profile-verifications";
import type { UserProfile } from "@/types/user";

type ProfileShellProps = {
  profile: UserProfile;
  active: "overview" | "reviews" | "library" | "activity" | "badges";
  children: ReactNode;
};

export function ProfileShell({ profile, active, children }: ProfileShellProps) {
  return (
    <div className="relative pb-6 md:pb-8">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(3,151,211,0.16),_transparent_50%),radial-gradient(circle_at_top_right,_rgba(255,153,0,0.14),_transparent_42%)]" />
      <div className="relative container mx-auto max-w-7xl px-4 md:px-8">
        <main className="bg-card overflow-hidden rounded-b-[5px] border shadow-sm">
          <ProfileHeader profile={profile} />

          <div
            id="profile-content"
            className="mt-6 grid grid-cols-1 items-start gap-6 px-4 pb-6 sm:px-6 lg:grid-cols-[1fr_280px] lg:px-8 xl:grid-cols-[1fr_300px]"
          >
            <div className="flex min-w-0 flex-col gap-4">
              <ProfileVerifications profile={profile} />
              <ProfileNav username={profile.username} active={active} />
              <div className="text-[13px]">{children}</div>
            </div>

            <div className="flex flex-col gap-6">
              <ProfileSidebar profile={profile} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
