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
    <div className="rounded-[12px] border bg-slate-50/50 px-5 py-4 shadow-sm dark:bg-zinc-900/30">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
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

        <div className="bg-border mx-1 hidden h-10 w-px lg:block" />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <div className="text-foreground flex items-center gap-1.5 text-[12px] font-semibold">
            {profile.verification?.email ? (
              <CheckCircle2Icon className="size-[18px] text-green-500" />
            ) : (
              <CheckCircle2Icon className="text-muted-foreground/50 size-[18px]" />
            )}
            Email Verified
          </div>
          <div className="text-foreground flex items-center gap-1.5 text-[12px] font-semibold">
            {profile.verification?.phone ? (
              <CheckCircle2Icon className="size-[18px] text-green-500" />
            ) : (
              <CheckCircle2Icon className="text-muted-foreground/50 size-[18px]" />
            )}
            Phone Verified
          </div>
          <div className="text-foreground flex items-center gap-1.5 text-[12px] font-semibold">
            {profile.verification?.identity ? (
              <BadgeCheckIcon className="size-[18px] text-blue-500" />
            ) : (
              <BadgeCheckIcon className="text-muted-foreground/50 size-[18px]" />
            )}
            Identity Verified
          </div>
          <div className="text-foreground flex items-center gap-1.5 text-[12px] font-semibold">
            {profile.verification?.trustedSeller ? (
              <CheckCircle2Icon className="size-[18px] text-orange-500" />
            ) : (
              <CheckCircle2Icon className="text-muted-foreground/50 size-[18px]" />
            )}
            Trusted Seller
          </div>
          <div className="text-foreground flex items-center gap-1.5 text-[12px] font-semibold">
            {profile.verification?.premium ? (
              <CrownIcon className="size-[18px] text-purple-500" />
            ) : (
              <CrownIcon className="text-muted-foreground/50 size-[18px]" />
            )}
            Premium Member
          </div>
        </div>
      </div>
    </div>
  );
}
