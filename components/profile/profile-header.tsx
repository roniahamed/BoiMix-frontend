"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MessageSquareIcon,
  ShieldCheckIcon,
  UserCheckIcon,
  UsersIcon,
  LibraryIcon,
  ArrowRightLeftIcon,
  BookDownIcon,
  BanknoteIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { BeautifulBadge } from "@/components/shared/beautiful-badge";
import type { UserProfile } from "@/types/user";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { PencilIcon } from "lucide-react";

const CustomShareArrow = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M13 21v-6C6 15 2 19 2 22c1-6 6-11 11-11V3l9 9l-9 9z" />
  </svg>
);

export function ProfileHeader({
  profile,
  isOwnProfile = false,
}: {
  profile: UserProfile;
  isOwnProfile?: boolean;
}) {
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Profile link copied to clipboard!");
    }
  };

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

        {/* Edit Profile Button - Top Right */}
        {isOwnProfile && (
          <div className="absolute top-4 right-4 z-20">
            <EditProfileDialog profile={profile}>
              <Button
                size="sm"
                variant="secondary"
                className="gap-2 bg-white/90 font-semibold text-black shadow-sm backdrop-blur-sm hover:bg-white"
              >
                <PencilIcon className="h-4 w-4" /> Edit Profile
              </Button>
            </EditProfileDialog>
          </div>
        )}
      </div>

      <div className="relative z-10 px-5 pb-0 sm:px-8 sm:pb-6">
        {/* ----- MOBILE VIEW ----- */}
        <div className="flex flex-col gap-5 sm:hidden">
          {/* Avatar + Name + Stats */}
          <div className="flex flex-row items-center gap-3">
            <div className="relative -mt-8 shrink-0">
              <UserAvatar
                name={profile.name}
                src={profile.avatarUrl}
                className="bg-card border-card text-foreground relative z-10 size-[76px] border-[3px] text-2xl shadow-sm dark:border-zinc-900"
              />
            </div>
            <div className="flex flex-col pt-3">
              <div className="flex items-center gap-1.5">
                <h1 className="text-foreground text-[20px] leading-none font-bold tracking-tight">
                  {profile.name}
                </h1>
                {profile.badges && profile.badges.length > 0 && (
                  <ShieldCheckIcon className="fill-primary text-primary size-4" />
                )}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium">
                <span className="text-foreground font-semibold">
                  {profile.stats.followers}{" "}
                  <span className="text-muted-foreground font-normal">
                    followers
                  </span>
                </span>
                <span className="text-muted-foreground font-normal">
                  &bull;
                </span>
                <span className="text-foreground font-semibold">
                  {profile.stats.following}{" "}
                  <span className="text-muted-foreground font-normal">
                    following
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Profile heading and Bio */}
            <div className="mt-1 flex flex-col gap-y-1">
              <div className="text-foreground text-[16px] font-bold">
                Profile
              </div>
              {profile.bio && (
                <p className="text-foreground text-[14px]">{profile.bio}</p>
              )}
            </div>

            {/* Action Buttons (Facebook Style) */}
            <div className="mt-4 flex w-full flex-row items-center gap-2">
              <Button className="bg-muted text-foreground hover:bg-muted/80 h-9 flex-1 rounded-md font-semibold shadow-none">
                Following
              </Button>
              <Button
                className="h-9 flex-1 rounded-md bg-[#0866ff] font-semibold text-white shadow-none hover:bg-[#0866ff]/90"
                asChild
              >
                <Link
                  href="/dashboard/messages"
                  className="flex items-center justify-center"
                >
                  <MessageSquareIcon className="mr-2 size-4" />
                  Message
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="bg-muted text-foreground hover:bg-muted/80 flex h-9 w-12 shrink-0 items-center justify-center rounded-md border-0 px-0 shadow-none"
              >
                <CustomShareArrow className="size-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>

            {/* Mobile Stats */}
            <div className="border-border/50 mt-5 flex w-full items-center justify-between gap-2 border-y py-3">
              <div className="flex min-w-0 flex-col items-center text-center">
                <div className="mb-1 flex items-center gap-1">
                  <LibraryIcon className="text-primary size-4" />
                  <span className="text-foreground text-[15px] font-bold">
                    {profile.stats.booksInLibrary}
                  </span>
                </div>
                <span className="text-muted-foreground text-[11px] leading-tight font-medium">
                  Books
                </span>
              </div>

              {/* Divider */}
              <div className="bg-border h-8 w-px" />

              <div className="flex min-w-0 flex-col items-center text-center">
                <div className="mb-1 flex items-center gap-1">
                  <ArrowRightLeftIcon className="text-primary size-4" />
                  <span className="text-foreground text-[15px] font-bold">
                    {profile.stats.successfulSwaps}
                  </span>
                </div>
                <span className="text-muted-foreground text-[11px] leading-tight font-medium">
                  Swaps
                </span>
              </div>

              {/* Divider */}
              <div className="bg-border h-8 w-px" />

              <div className="flex min-w-0 flex-col items-center text-center">
                <div className="mb-1 flex items-center gap-1">
                  <BookDownIcon className="text-primary size-4" />
                  <span className="text-foreground text-[15px] font-bold">
                    {profile.stats.booksBorrowed}
                  </span>
                </div>
                <span className="text-muted-foreground text-[11px] leading-tight font-medium">
                  Borrowed
                </span>
              </div>

              {/* Divider */}
              <div className="bg-border h-8 w-px" />

              <div className="flex min-w-0 flex-col items-center text-center">
                <div className="mb-1 flex items-center gap-1">
                  <BanknoteIcon className="text-primary size-4" />
                  <span className="text-foreground text-[15px] font-bold">
                    {profile.stats.booksSold}
                  </span>
                </div>
                <span className="text-muted-foreground text-[11px] leading-tight font-medium">
                  Sold
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----- DESKTOP VIEW ----- */}
        <div className="hidden flex-col gap-6 sm:flex lg:flex-row lg:items-start lg:justify-between">
          {/* Avatar and Info Block */}
          <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start lg:gap-6">
            {/* Avatar overlapping the cover */}
            <div className="relative -mt-12 shrink-0 md:-mt-16">
              <UserAvatar
                name={profile.name}
                src={profile.avatarUrl}
                className="bg-card relative z-10 size-24 border-4 border-white text-2xl text-white shadow-sm md:size-32 md:text-3xl dark:border-zinc-900"
              />
            </div>

            <div className="min-w-0 flex-1 pt-2 sm:pt-4">
              {/* Row 1: Name and Badge */}
              <div className="flex items-center gap-x-3">
                <h1 className="text-foreground text-[28px] font-bold tracking-tight">
                  {profile.name}
                </h1>
                {profile.badges && profile.badges.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-500">
                    <ShieldCheckIcon className="size-3.5 fill-orange-500 text-orange-500" />
                    {profile.badges[0].label}
                  </span>
                )}
              </div>

              {/* Row 2: Followers, Following */}
              <div className="mt-1.5 flex items-center gap-4 text-[13px]">
                <div className="flex items-center gap-1.5">
                  <UsersIcon className="text-primary size-4" />
                  <span className="text-foreground font-bold">
                    {profile.stats.followers}
                  </span>
                  <span className="text-muted-foreground font-medium">
                    Followers
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheckIcon className="text-primary size-4" />
                  <span className="text-foreground font-bold">
                    {profile.stats.following}
                  </span>
                  <span className="text-muted-foreground font-medium">
                    Following
                  </span>
                </div>
              </div>

              {/* Row 3: Role, Location */}
              <div className="mt-2.5 flex items-center gap-2 text-[14px]">
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

              {/* Row 4: Joined Date */}
              {profile.joinedAt && (
                <p className="text-muted-foreground mt-1.5 text-[14px]">
                  {profile.joinedAt}
                </p>
              )}

              {/* Row 5: Action Buttons grouped together */}
              <div className="mt-4 flex items-center gap-4">
                <Button className="h-9 w-[110px] rounded-md bg-[#0ea5e9] text-[14px] font-semibold text-white shadow-none transition-colors hover:bg-[#0284c7]">
                  Follow
                </Button>
                <Button
                  variant="outline"
                  className="bg-card text-muted-foreground h-9 w-[110px] rounded-md px-0 text-[14px] font-medium shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                  asChild
                >
                  <Link
                    href="/dashboard/messages"
                    className="flex items-center justify-center"
                  >
                    <MessageSquareIcon
                      className="mr-2 size-4"
                      aria-hidden="true"
                    />
                    Message
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="bg-card text-muted-foreground flex h-9 w-12 items-center justify-center rounded-md px-0 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <CustomShareArrow className="size-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Extreme Right Side: 4 Main Stats and Badges */}
          <div className="mt-4 flex shrink-0 flex-col items-end gap-4 lg:mt-6 lg:ml-auto">
            <div className="flex items-center gap-4 sm:gap-6">
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

            {/* Badges Area */}
            {profile.profileBadges &&
              profile.profileBadges.filter((b) => b.isEarned).length > 0 && (
                <div className="mt-2 flex flex-wrap items-center justify-end gap-5 lg:pr-4">
                  {profile.profileBadges
                    .filter((b) => b.isEarned)
                    .slice(0, 3)
                    .map((badge, idx) => {
                      const labelParts = badge.label.split(" ");
                      return (
                        <div
                          key={idx}
                          title={badge.description}
                          className="group flex w-14 cursor-default flex-col items-center gap-2"
                        >
                          <div className="transition-transform group-hover:-translate-y-0.5">
                            <BeautifulBadge
                              type={badge.icon}
                              color={badge.badgeColor || "red"}
                              isEarned={badge.isEarned}
                              className="h-[52px] w-[46px]"
                              iconClassName="size-5"
                            />
                          </div>
                          <span className="text-foreground/80 text-center text-[11px] leading-[1.15] font-bold">
                            {labelParts.map((part, i) => (
                              <span key={i} className="block">
                                {part}
                              </span>
                            ))}
                          </span>
                        </div>
                      );
                    })}
                  {profile.profileBadges.filter((b) => b.isEarned).length >
                    3 && (
                    <Link
                      href={`/u/${profile.username}/badges`}
                      className="text-primary hover:text-primary/80 mt-1 text-[13px] font-semibold hover:underline"
                    >
                      See more
                    </Link>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
