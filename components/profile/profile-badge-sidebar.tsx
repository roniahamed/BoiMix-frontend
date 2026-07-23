import type { UserProfile } from "@/types/user";
import { CheckCircleIcon } from "lucide-react";

type ProfileBadgeSidebarProps = {
  profile: UserProfile;
};

export function ProfileBadgeSidebar({ profile }: ProfileBadgeSidebarProps) {
  const earnedBadgesCount = profile.profileBadges.filter(
    (b) => b.isEarned,
  ).length;
  const inProgressBadgesCount = profile.profileBadges.filter(
    (b) => !b.isEarned,
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* How to earn badges */}
      <section className="bg-card border-border/50 rounded-[5px] border p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <h3 className="text-foreground mb-4 font-bold tracking-tight">
          How to earn badges?
        </h3>
        <ul className="text-muted-foreground space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="text-primary mt-0.5 size-4 shrink-0" />
            <span>Be active in the community</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="text-primary mt-0.5 size-4 shrink-0" />
            <span>Share reviews and help others</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="text-primary mt-0.5 size-4 shrink-0" />
            <span>Complete exchanges and returns</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="text-primary mt-0.5 size-4 shrink-0" />
            <span>Maintain high trust score</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="text-primary mt-0.5 size-4 shrink-0" />
            <span>Add quality books to library</span>
          </li>
        </ul>
      </section>

      {/* Badge Stats */}
      <section className="bg-card border-border/50 rounded-[5px] border p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <h3 className="text-foreground mb-4 font-bold tracking-tight">
          Badge Stats
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Badges Earned</span>
            <span className="text-foreground font-semibold">
              {earnedBadgesCount}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Badges in Progress</span>
            <span className="text-foreground font-semibold">
              {inProgressBadgesCount}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Rarest Badge</span>
            <span className="text-foreground font-semibold">
              Super Contributor
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Member Since</span>
            <span className="text-foreground font-semibold">May 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
}
