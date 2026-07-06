import type { ReactNode } from "react";
import {
  StarIcon,
  MessageCircleIcon,
  Repeat2Icon,
  ClockIcon,
} from "lucide-react";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileNav } from "@/components/profile/profile-nav";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { ProfileVerifications } from "@/components/profile/profile-verifications";
import { BeautifulBadge } from "@/components/shared/beautiful-badge";
import Link from "next/link";
import type { UserProfile } from "@/types/user";

type ProfileShellProps = {
  profile: UserProfile;
  active: "overview" | "reviews" | "library" | "activity" | "badges";
  children: ReactNode;
  sidebar?: ReactNode;
  isOwnProfile?: boolean;
};

export function ProfileShell({
  profile,
  active,
  children,
  sidebar,
  isOwnProfile = false,
}: ProfileShellProps) {
  return (
    <div className="relative pb-6 md:pb-8">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(3,151,211,0.16),_transparent_50%),radial-gradient(circle_at_top_right,_rgba(255,153,0,0.14),_transparent_42%)]" />
      <div className="relative container mx-auto max-w-7xl px-0 md:px-8">
        <main className="bg-card border-border/50 rounded-none border-y shadow-sm md:rounded-b-[5px] md:border-x md:border-t-0">
          <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

          <div
            id="profile-content"
            className="mt-2 grid grid-cols-1 items-start gap-6 px-4 pb-6 sm:mt-6 sm:px-6 lg:grid-cols-[1fr_280px] lg:px-8 xl:grid-cols-[1fr_300px]"
          >
            <div className="flex min-w-0 flex-col gap-4">
              <div className="hidden sm:block">
                <ProfileVerifications profile={profile} />
              </div>
              <div id="profile-nav-anchor" className="absolute -mt-4 h-0 w-0" />
              <ProfileNav username={profile.username} active={active} />

              {active === "overview" && (
                <div className="flex flex-col gap-3 sm:hidden">
                  <ProfileVerifications profile={profile} />

                  {/* About Section */}
                  <div className="mt-1 flex flex-col gap-y-2 px-1">
                    <div className="text-foreground text-[16px] font-bold">
                      About
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[14px]">
                      <span className="text-foreground font-semibold">
                        {profile.role || "Member"}
                      </span>
                      {profile.location && (
                        <>
                          <span className="text-muted-foreground">&bull;</span>
                          <span className="text-foreground flex items-center gap-1 font-semibold">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-4"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {profile.location}
                          </span>
                        </>
                      )}
                      {profile.joinedAt && (
                        <>
                          <span className="text-muted-foreground">&bull;</span>
                          <span className="text-muted-foreground">
                            Joined {profile.joinedAt}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Badges Section */}
                  {profile.profileBadges &&
                    profile.profileBadges.filter((b) => b.isEarned).length >
                      0 && (
                      <div className="mt-2 flex flex-wrap items-center justify-start gap-4 px-1">
                        {profile.profileBadges
                          .filter((b) => b.isEarned)
                          .slice(0, 3)
                          .map((badge, idx) => {
                            const labelParts = badge.label.split(" ");
                            return (
                              <div
                                key={idx}
                                title={badge.description}
                                className="group flex w-12 cursor-default flex-col items-center gap-2"
                              >
                                <div className="transition-transform group-hover:-translate-y-0.5">
                                  <BeautifulBadge
                                    type={badge.icon}
                                    color={badge.badgeColor || "red"}
                                    isEarned={badge.isEarned}
                                    className="h-[44px] w-[38px]"
                                    iconClassName="size-4"
                                  />
                                </div>
                                <span className="text-foreground/80 text-center text-[10px] leading-[1.15] font-bold">
                                  {labelParts.map((part, i) => (
                                    <span key={i} className="block">
                                      {part}
                                    </span>
                                  ))}
                                </span>
                              </div>
                            );
                          })}
                        {profile.profileBadges.filter((b) => b.isEarned)
                          .length > 3 && (
                          <Link
                            href={`/u/${profile.username}/badges`}
                            className="text-primary hover:text-primary/80 mt-1 text-[12px] font-semibold hover:underline"
                          >
                            See more
                          </Link>
                        )}
                      </div>
                    )}

                  {/* Reading Interests Section */}
                  {profile.readingInterests &&
                    profile.readingInterests.length > 0 && (
                      <div className="mt-5 flex flex-col gap-y-3 px-1">
                        <div className="text-foreground text-[16px] font-bold">
                          Reading Interests
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {profile.readingInterests
                            .slice(0, 5)
                            .map((interest) => (
                              <span
                                key={interest}
                                className="bg-muted/70 text-foreground rounded-xl px-3 py-1 text-[11px] font-medium"
                              >
                                {interest}
                              </span>
                            ))}
                          {profile.readingInterests.length > 5 && (
                            <span className="text-primary bg-primary/10 rounded-xl px-3 py-1 text-[11px] font-medium">
                              +{profile.readingInterests.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                  {/* Member Highlights Section */}
                  {profile.memberHighlights &&
                    profile.memberHighlights.length > 0 && (
                      <div className="mt-5 flex flex-col gap-y-4 px-1">
                        <div className="text-foreground text-[16px] font-bold">
                          Member Highlights
                        </div>
                        <ul className="flex flex-col gap-4">
                          {profile.memberHighlights.map((highlight, index) => {
                            let IconComp = (
                              <StarIcon className="size-5 fill-orange-500 text-orange-500" />
                            );
                            if (highlight.icon === "repeat")
                              IconComp = (
                                <Repeat2Icon className="size-5 text-blue-500" />
                              );
                            if (highlight.icon === "message")
                              IconComp = (
                                <MessageCircleIcon className="size-5 fill-emerald-500 text-emerald-500" />
                              );
                            if (highlight.icon === "clock")
                              IconComp = (
                                <ClockIcon className="size-5 text-emerald-500" />
                              );

                            return (
                              <li key={index} className="flex gap-3">
                                <div className="mt-0.5 shrink-0">
                                  {IconComp}
                                </div>
                                <div>
                                  <p className="text-foreground text-[13px] font-bold">
                                    {highlight.title}
                                  </p>
                                  <p className="text-muted-foreground mt-0.5 text-[12px]">
                                    {highlight.subtitle}
                                  </p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                </div>
              )}
              <div className="text-[13px]">{children}</div>
            </div>

            <div className="flex flex-col gap-6">
              {sidebar || <ProfileSidebar profile={profile} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
