import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddBookButton } from "@/components/shared/add-book-button";
import {
  Plus,
  Flame,
  Compass,
  Coins,
  Crown,
  Ticket,
  ShieldCheck,
} from "lucide-react";

export function OverviewHeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b2a5b] via-[#0397d3] to-[#7c3aed] p-6 shadow-2xl sm:p-8">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-1/4 h-48 w-48 rounded-full bg-amber-400/15 blur-2xl" />
      <div className="pointer-events-none absolute top-1/2 right-1/3 h-32 w-32 -translate-y-1/2 rounded-full bg-purple-400/10 blur-xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: User info */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="h-[72px] w-[72px] rounded-full bg-gradient-to-br from-amber-300 to-amber-500 p-0.5 shadow-lg sm:h-[88px] sm:w-[88px]">
              <Avatar className="h-full w-full border-2 border-[#0b2a5b]/30">
                <AvatarImage
                  src="https://ui-avatars.com/api/?name=Roni+Ahamed&background=0D8ABC&color=fff"
                  alt="Roni Ahamed"
                />
                <AvatarFallback className="text-foreground font-bold">
                  RA
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="absolute -right-1.5 -bottom-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0397d3] bg-amber-400 text-[10px] font-black text-slate-950 shadow-md">
              L12
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Good Afternoon 👋 Roni!
            </h1>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-0.5 text-[11px] font-black text-slate-950 shadow-sm">
                <Crown className="h-3 w-3 fill-slate-950" /> Premium Pro
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                <ShieldCheck className="h-3 w-3 text-emerald-300" /> Verified
              </span>
            </div>

            <p className="text-[12px] font-medium text-white/70">
              Backend Engineer · Dhaka Central Reader Community
            </p>

            {/* XP Bar */}
            <div className="max-w-[260px] space-y-1 pt-1 sm:max-w-sm">
              <div className="flex items-center justify-between text-[10px] font-bold text-white/80">
                <span>350 / 500 XP · Level 13</span>
                <span className="text-amber-300">70%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "70%",
                    background:
                      "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Badges + Actions */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 lg:items-end lg:border-t-0 lg:pt-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-extrabold text-white backdrop-blur-sm">
              <Flame className="h-3.5 w-3.5 animate-pulse fill-amber-300 text-amber-300" />
              14 Day Streak!
            </div>
            <Link
              href="/dashboard/passes"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3.5 py-1.5 text-[11px] font-bold text-emerald-200 backdrop-blur-sm transition-colors hover:bg-emerald-400/25"
            >
              <Ticket className="h-3.5 w-3.5 text-emerald-300" />2 Borrow Passes
            </Link>
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1.5 text-[11px] font-bold text-amber-200 backdrop-blur-sm">
              <Coins className="h-3.5 w-3.5" /> 350 Pts
            </div>
          </div>

          <p className="text-[11px] font-medium text-white/60">
            Today: 1 return due · 2 exchange offers · 5 messages
          </p>

          <div className="flex w-full items-center gap-2 lg:w-auto">
            <AddBookButton className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-5 py-2 text-xs font-extrabold text-[#0397d3] shadow-md transition-all hover:bg-white/90 active:scale-95 lg:flex-none">
              <Plus className="h-4 w-4 stroke-[3]" /> Add Book
            </AddBookButton>
            <Link
              href="/books"
              className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 lg:flex-none"
            >
              <Compass className="h-4 w-4" /> Browse
            </Link>
            <Link
              href="/dashboard/passes"
              className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 shadow-md transition-all hover:bg-amber-300 active:scale-95 lg:flex-none"
            >
              <Ticket className="h-4 w-4" /> Buy Pass
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
