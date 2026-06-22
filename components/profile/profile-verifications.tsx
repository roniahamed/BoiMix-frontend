import {
  ShieldCheckIcon,
  CheckCircle2Icon,
  BadgeCheckIcon,
  CrownIcon,
  InfoIcon,
} from "lucide-react";
import type { UserProfile } from "@/types/user";

export function ProfileVerifications({ profile }: { profile: UserProfile }) {
  return (
    <div className="border-muted rounded-[5px] border bg-slate-50 px-5 py-2.5 dark:bg-zinc-900/50">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
        {/* Left: Trust Score */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center justify-center rounded-xl bg-green-100 p-2 text-green-500 dark:bg-green-900/40">
            <ShieldCheckIcon className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              Trust Score
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-green-500">
                {profile.reputation ?? 0}%
              </span>
              <span className="text-foreground text-[12px] font-semibold">
                Excellent
              </span>
              <InfoIcon className="text-muted-foreground ml-0.5 size-3" />
            </div>
          </div>
        </div>

        {/* Right: Verifications */}
        <div className="flex w-full items-center justify-between gap-x-2.5 overflow-hidden whitespace-nowrap">
          <div className="text-foreground flex shrink items-center gap-1 text-[11px] font-semibold">
            {profile.verification?.email ? (
              <CheckCircle2Icon className="size-[16px] shrink-0 text-green-500" />
            ) : (
              <CheckCircle2Icon className="text-muted-foreground/50 size-[16px] shrink-0" />
            )}
            <span className="truncate">Email Verified</span>
          </div>
          <div className="text-foreground flex shrink items-center gap-1 text-[11px] font-semibold">
            {profile.verification?.phone ? (
              <CheckCircle2Icon className="size-[16px] shrink-0 text-green-500" />
            ) : (
              <CheckCircle2Icon className="text-muted-foreground/50 size-[16px] shrink-0" />
            )}
            <span className="truncate">Phone Verified</span>
          </div>
          <div className="text-foreground flex shrink items-center gap-1 text-[11px] font-semibold">
            {profile.verification?.identity ? (
              <BadgeCheckIcon className="size-[16px] shrink-0 text-blue-500" />
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
              <CrownIcon className="size-[16px] shrink-0 text-purple-500" />
            ) : (
              <CrownIcon className="text-muted-foreground/50 size-[16px] shrink-0" />
            )}
            <span className="truncate">Premium Member</span>
          </div>
        </div>
      </div>
    </div>
  );
}
