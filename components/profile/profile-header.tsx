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
  BookOpenIcon,
  StarIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import type { UserProfile } from "@/types/user";
import { cn } from "@/lib/utils";

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

export function ProfileHeader({ profile }: { profile: UserProfile }) {
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
      </div>

      <div className="relative z-10 px-5 pb-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
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
              <div className="mt-4 flex items-center gap-4 sm:mt-5">
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
            {profile.profileBadges && profile.profileBadges.length > 0 && (
              <div className="mt-2 flex flex-wrap items-start justify-end gap-5 lg:pr-4">
                {profile.profileBadges.map((badge, idx) => {
                  let IconComponent = ShieldCheckIcon;
                  if (badge.tone === "default") IconComponent = BookOpenIcon;
                  if (badge.tone === "info") IconComponent = ArrowRightLeftIcon;
                  if (badge.tone === "warning") IconComponent = StarIcon;

                  let gradientClass = "from-purple-400 to-purple-600";
                  if (badge.tone === "info")
                    gradientClass = "from-blue-400 to-blue-500";
                  if (badge.tone === "warning")
                    gradientClass = "from-orange-400 to-orange-500";
                  if (badge.tone === "success")
                    gradientClass = "from-emerald-400 to-emerald-500";

                  const labelParts = badge.label.split(" ");

                  return (
                    <div
                      key={idx}
                      title={badge.description}
                      className="group flex w-14 cursor-default flex-col items-center gap-2"
                    >
                      <div className="relative size-[52px] drop-shadow-sm transition-transform group-hover:-translate-y-0.5">
                        <div
                          className={cn(
                            "absolute inset-0 flex items-center justify-center bg-gradient-to-br text-white",
                            gradientClass,
                            "[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]",
                          )}
                        >
                          <div
                            className={cn(
                              "absolute inset-[2px] flex items-center justify-center bg-gradient-to-br",
                              gradientClass,
                              "[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]",
                            )}
                          >
                            <IconComponent
                              className="size-[22px] drop-shadow-md"
                              strokeWidth={2.5}
                            />
                          </div>
                        </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
