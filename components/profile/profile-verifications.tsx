"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheckIcon,
  CheckCircle2Icon,
  BadgeCheckIcon,
  CrownIcon,
  InfoIcon,
  StarIcon,
} from "lucide-react";
import type { UserProfile } from "@/types/user";

export function ProfileVerifications({ profile }: { profile: UserProfile }) {
  const reputation = profile.reputation ?? 0;
  const [animatedOffset, setAnimatedOffset] = useState(100.5); // Start at 0% progress

  useEffect(() => {
    // Trigger animation shortly after mount
    const timer = setTimeout(() => {
      setAnimatedOffset(100.5 - reputation);
    }, 100);
    return () => clearTimeout(timer);
  }, [reputation]);

  const getScoreData = (score: number) => {
    if (score >= 90)
      return {
        color: "#0e9f6e",
        label: "Excellent",
        stars: 5,
        message: "You're a highly trusted member!",
      };
    if (score >= 75)
      return {
        color: "#3b82f6",
        label: "Very Good",
        stars: 4,
        message: "You're a trusted member!",
      };
    if (score >= 50)
      return {
        color: "#f59e0b",
        label: "Average",
        stars: 3,
        message: "You're a good member.",
      };
    return {
      color: "#ef4444",
      label: "Poor",
      stars: 2,
      message: "Your trust score needs improvement.",
    };
  };

  const { color, label, stars, message } = getScoreData(reputation);

  return (
    <>
      {/* --- DESKTOP VIEW (Original) --- */}
      <div className="border-muted hidden rounded-[5px] border bg-slate-50 px-5 py-2.5 sm:block dark:bg-zinc-900/50">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
          {/* Left: Trust Score */}
          <div className="flex shrink-0 items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl p-2"
              style={{ backgroundColor: `${color}25`, color }}
            >
              <ShieldCheckIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Trust Score
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold" style={{ color }}>
                  {reputation}%
                </span>
                <span className="text-foreground text-[12px] font-semibold">
                  {label}
                </span>
                <InfoIcon className="text-muted-foreground ml-0.5 size-3" />
              </div>
            </div>
          </div>

          {/* Right: Verifications */}
          <div className="flex w-full items-center justify-between gap-x-2.5 overflow-hidden whitespace-nowrap">
            <div className="text-foreground flex shrink items-center gap-1 text-[11px] font-semibold">
              {profile.verification?.email ? (
                <CheckCircle2Icon className="size-[16px] shrink-0 text-[#0e9f6e]" />
              ) : (
                <CheckCircle2Icon className="text-muted-foreground/50 size-[16px] shrink-0" />
              )}
              <span className="truncate">Email Verified</span>
            </div>
            <div className="text-foreground flex shrink items-center gap-1 text-[11px] font-semibold">
              {profile.verification?.phone ? (
                <CheckCircle2Icon className="size-[16px] shrink-0 text-[#0e9f6e]" />
              ) : (
                <CheckCircle2Icon className="text-muted-foreground/50 size-[16px] shrink-0" />
              )}
              <span className="truncate">Phone Verified</span>
            </div>
            <div className="text-foreground flex shrink items-center gap-1 text-[11px] font-semibold">
              {profile.verification?.identity ? (
                <BadgeCheckIcon className="size-[16px] shrink-0 text-[#3b82f6]" />
              ) : (
                <BadgeCheckIcon className="text-muted-foreground/50 size-[16px] shrink-0" />
              )}
              <span className="truncate">Identity Verified</span>
            </div>
            <div className="text-foreground flex shrink items-center gap-1 text-[11px] font-semibold">
              {profile.verification?.trustedSeller ? (
                <CheckCircle2Icon className="size-[16px] shrink-0 text-orange-500" />
              ) : (
                <CheckCircle2Icon className="text-muted-foreground/50 size-[16px] shrink-0" />
              )}
              <span className="truncate">Trusted Seller</span>
            </div>
            <div className="text-foreground flex shrink items-center gap-1 text-[11px] font-semibold">
              {profile.verification?.premium ? (
                <CrownIcon className="size-[16px] shrink-0 text-[#a855f7]" />
              ) : (
                <CrownIcon className="text-muted-foreground/50 size-[16px] shrink-0" />
              )}
              <span className="truncate">Premium Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW (New Layout) --- */}
      <div className="border-muted bg-card rounded-[8px] border p-4 shadow-sm sm:hidden">
        {/* Top: Score & Circular Progress */}
        <div className="flex items-center gap-4">
          {/* Circular Progress Ring */}
          <div className="relative size-[80px] shrink-0">
            <svg className="size-full -rotate-90 transform" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-muted/30"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="drop-shadow-sm transition-all duration-1000 ease-out"
                strokeWidth="2.5"
                strokeDasharray="100.5"
                strokeDashoffset={animatedOffset}
                strokeLinecap="round"
                style={{ stroke: color }}
              />
            </svg>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ color }}
            >
              <ShieldCheckIcon className="size-8 stroke-[1.5]" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wide uppercase">
              TRUST SCORE
            </span>
            <span
              className="text-[30px] leading-none font-bold tracking-tight"
              style={{ color }}
            >
              {reputation}%
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-foreground text-[14px] leading-none font-semibold">
                {label}
              </span>
              <InfoIcon className="text-muted-foreground size-3.5" />
            </div>
            <div className="mt-1.5 flex items-center gap-0.5">
              {[...Array(stars)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="size-[14px]"
                  style={{ fill: color, color }}
                />
              ))}
            </div>
            <span className="text-muted-foreground mt-1 text-[11px] font-medium">
              {message}
            </span>
          </div>
        </div>

        <hr className="border-border/60 my-5" />

        {/* Bottom: Verifications Grid */}
        <div className="flex items-center justify-between gap-1">
          {/* Verified */}
          <div className="flex items-center justify-start gap-1">
            <CheckCircle2Icon className="size-[18px] shrink-0 text-[#0e9f6e]" />
            <div className="flex flex-col text-left">
              <span className="text-foreground text-[10.5px] leading-tight font-bold whitespace-nowrap">
                Verified
              </span>
              <span className="text-muted-foreground mt-0.5 text-[9px] leading-tight whitespace-nowrap">
                All Verified
              </span>
            </div>
          </div>

          <div className="bg-border/60 h-8 w-px shrink-0" />

          {/* Trusted Seller */}
          <div className="flex items-center justify-center gap-1">
            <div className="flex size-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-orange-500">
              <StarIcon className="size-[10px] text-orange-500" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-foreground text-[10.5px] leading-tight font-bold whitespace-nowrap">
                Trusted Seller
              </span>
              <span className="text-muted-foreground mt-0.5 text-[9px] leading-tight whitespace-nowrap">
                Top Rated
              </span>
            </div>
          </div>

          <div className="bg-border/60 h-8 w-px shrink-0" />

          {/* Premium Member */}
          <div className="flex items-center justify-end gap-1">
            <CrownIcon className="size-[18px] shrink-0 text-[#a855f7]" />
            <div className="flex flex-col text-left">
              <span className="text-foreground text-[10.5px] leading-tight font-bold whitespace-nowrap">
                Premium Member
              </span>
              <span className="text-muted-foreground mt-0.5 text-[9px] leading-tight whitespace-nowrap">
                Exclusive Benefits
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
