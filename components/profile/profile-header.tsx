import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  MapPinIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  StarIcon,
  UserPlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { UserBadge } from "@/components/shared/user-badge";
import type { UserProfile } from "@/types/user";

type ProfileHeaderProps = {
  profile: UserProfile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <section className="bg-card overflow-hidden border shadow-sm md:rounded-xl">
      <div className="bg-muted relative h-36 md:h-48">
        <Image
          src={profile.coverUrl}
          alt={`${profile.name} profile cover`}
          fill
          priority
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
      </div>

      <div className="px-4 pb-5 sm:px-6">
        <div className="-mt-10 flex flex-col gap-4 md:-mt-12 md:flex-row md:items-end md:justify-between">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end">
            <UserAvatar
              name={profile.name}
              src={profile.avatarUrl}
              className="ring-card bg-primary size-24 border-4 border-white text-xl text-white ring-2 md:size-28"
            />
            <div className="min-w-0 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-foreground text-2xl font-bold md:text-3xl">
                  {profile.name}
                </h1>
                <ShieldCheckIcon
                  className="text-primary size-5"
                  aria-label="Verified reader"
                />
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                @{profile.username}
              </p>
              <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {profile.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPinIcon className="size-4" aria-hidden="true" />
                    {profile.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <CalendarDaysIcon className="size-4" aria-hidden="true" />
                  {profile.joinedAt}
                </span>
                {profile.rating !== undefined && (
                  <span className="inline-flex items-center gap-1">
                    <StarIcon
                      className="fill-warning text-warning size-4"
                      aria-hidden="true"
                    />
                    {profile.rating.toFixed(1)} rating
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <UserPlusIcon className="size-4" aria-hidden="true" />
              Follow
            </Button>
            <Button asChild>
              <Link href="/dashboard/messages">
                <MessageCircleIcon className="size-4" aria-hidden="true" />
                Message
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mt-5 max-w-3xl text-sm leading-6 md:text-base">
          {profile.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.badges?.map((badge) => (
            <UserBadge key={badge.label} {...badge} />
          ))}
        </div>

        <div className="text-muted-foreground mt-4 grid gap-2 text-sm sm:grid-cols-3">
          <p>
            <span className="text-foreground font-semibold">
              {profile.reputation ?? 0}%
            </span>{" "}
            reputation
          </p>
          <p>
            <span className="text-foreground font-semibold">
              {profile.responseRate}%
            </span>{" "}
            response rate
          </p>
          <p>{profile.responseTime}</p>
        </div>
      </div>
    </section>
  );
}
