import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheckIcon,
  MessageSquareIcon,
  Share2Icon,
  ShieldCheckIcon,
  UserCheckIcon,
  UsersIcon,
  PhoneIcon,
  MailIcon,
  CrownIcon,
  ShieldIcon,
  LibraryIcon,
  ArrowRightLeftIcon,
  BookDownIcon,
  BanknoteIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import type { UserProfile } from "@/types/user";
import { cn } from "@/lib/utils";

type ProfileHeaderProps = {
  profile: UserProfile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <section>
      {/* Cover Image */}
      <div className="bg-muted relative h-36 md:h-48 lg:h-56">
        <Image
          src={profile.coverUrl}
          alt={`${profile.name} profile cover`}
          fill
          priority
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-5 pb-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Avatar and Info Block */}
          <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start lg:gap-6">
            {/* Avatar overlapping the cover */}
            <div className="relative -mt-16 shrink-0 md:-mt-20">
              <UserAvatar
                name={profile.name}
                src={profile.avatarUrl}
                className="bg-card relative z-10 size-32 border-4 border-white text-3xl text-white shadow-sm md:size-40 dark:border-zinc-900"
              />
            </div>

            <div className="min-w-0 flex-1 pt-2 sm:pt-4">
              {/* Row 1: Name, Badge, Followers, Following */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-[28px]">
                  {profile.name}
                </h1>
                {profile.badges && profile.badges.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-500">
                    <ShieldCheckIcon className="size-3.5 fill-orange-500 text-orange-500" />
                    {profile.badges[0].label}
                  </span>
                )}

                <div className="bg-muted-foreground/40 mx-1 hidden h-1 w-1 rounded-full sm:block" />

                <div className="mt-1 flex items-center gap-4 text-sm sm:mt-0">
                  <div className="flex items-center gap-1.5">
                    <UsersIcon className="text-primary size-4" />
                    <span className="text-foreground font-bold">
                      {profile.stats.followers}
                    </span>
                    <span className="text-muted-foreground text-xs font-medium">
                      Followers
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserCheckIcon className="text-primary size-4" />
                    <span className="text-foreground font-bold">
                      {profile.stats.following}
                    </span>
                    <span className="text-muted-foreground text-xs font-medium">
                      Following
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Role, Location */}
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px]">
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-semibold">
                    {profile.role || "Member"}
                  </span>
                  {profile.location && (
                    <span className="text-muted-foreground">&bull;</span>
                  )}
                  {profile.location && (
                    <span className="text-muted-foreground">
                      {profile.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 3: Joined Date */}
              {profile.joinedAt && (
                <p className="text-muted-foreground mt-2 text-[14px]">
                  {profile.joinedAt}
                </p>
              )}

              {/* Row 4: Action Buttons grouped together */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button className="rounded-lg px-6 font-semibold shadow-sm">
                  Follow
                </Button>
                <Button
                  variant="outline"
                  className="rounded-lg bg-transparent px-5 shadow-sm"
                  asChild
                >
                  <Link href="/dashboard/messages">
                    <MessageSquareIcon
                      className="mr-2 size-4"
                      aria-hidden="true"
                    />
                    Message
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg bg-transparent shadow-sm"
                >
                  <Share2Icon className="size-4" aria-hidden="true" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Extreme Right Side: 4 Main Stats */}
          <div className="mt-4 flex shrink-0 items-center gap-4 sm:gap-6 lg:mt-6 lg:ml-auto">
            {/* Added left divider as requested */}
            <div className="bg-border mr-2 hidden h-12 w-px lg:block" />

            <div className="flex min-w-[70px] flex-col items-center text-center sm:min-w-[85px]">
              <div className="mb-1 flex items-center gap-1.5">
                <LibraryIcon className="text-primary size-4 sm:size-5" />
                <span className="text-foreground text-base font-bold sm:text-lg">
                  {profile.stats.booksInLibrary}
                </span>
              </div>
              <span className="text-muted-foreground text-[11px] font-medium sm:text-[12px]">
                Books in Library
              </span>
            </div>

            <div className="bg-border h-8 w-px" />

            <div className="flex min-w-[70px] flex-col items-center text-center sm:min-w-[85px]">
              <div className="mb-1 flex items-center gap-1.5">
                <ArrowRightLeftIcon className="text-primary size-4 sm:size-5" />
                <span className="text-foreground text-base font-bold sm:text-lg">
                  {profile.stats.successfulSwaps}
                </span>
              </div>
              <span className="text-muted-foreground text-[11px] font-medium sm:text-[12px]">
                Successful Swaps
              </span>
            </div>

            <div className="bg-border h-8 w-px" />

            <div className="flex min-w-[70px] flex-col items-center text-center sm:min-w-[85px]">
              <div className="mb-1 flex items-center gap-1.5">
                <BookDownIcon className="text-primary size-4 sm:size-5" />
                <span className="text-foreground text-base font-bold sm:text-lg">
                  {profile.stats.booksBorrowed}
                </span>
              </div>
              <span className="text-muted-foreground text-[11px] font-medium sm:text-[12px]">
                Books Borrowed
              </span>
            </div>

            <div className="bg-border h-8 w-px" />

            <div className="flex min-w-[70px] flex-col items-center text-center sm:min-w-[85px]">
              <div className="mb-1 flex items-center gap-1.5">
                <BanknoteIcon className="text-primary size-4 sm:size-5" />
                <span className="text-foreground text-base font-bold sm:text-lg">
                  {profile.stats.booksSold}
                </span>
              </div>
              <span className="text-muted-foreground text-[11px] font-medium sm:text-[12px]">
                Books Sold
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Verifications Bar */}
      <div className="bg-muted/30 border-y px-5 py-4 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-success-soft text-success flex items-center justify-center rounded-full p-1.5">
              <ShieldCheckIcon className="size-5" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-semibold">
                Trust Score
              </p>
              <p className="text-foreground flex items-center gap-2 font-bold">
                <span className="text-success text-xl">
                  {profile.reputation ?? 0}%
                </span>
                <span>Excellent</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium",
                profile.verification?.email
                  ? "text-success"
                  : "text-muted-foreground",
              )}
            >
              <MailIcon className="size-4" />
              Email Verified
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium",
                profile.verification?.phone
                  ? "text-success"
                  : "text-muted-foreground",
              )}
            >
              <PhoneIcon className="size-4" />
              Phone Verified
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium",
                profile.verification?.identity
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              <BadgeCheckIcon className="size-4" />
              Identity Verified
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium",
                profile.verification?.trustedSeller
                  ? "text-warning"
                  : "text-muted-foreground",
              )}
            >
              <ShieldIcon className="size-4" />
              Trusted Seller
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium",
                profile.verification?.premium
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-muted-foreground",
              )}
            >
              <CrownIcon className="size-4" />
              Premium Member
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
