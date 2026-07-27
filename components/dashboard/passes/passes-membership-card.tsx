import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ticket, Crown, BadgeCheck } from "lucide-react";

export function PassesMembershipCard() {
  return (
    <div className="via-primary relative space-y-5 overflow-hidden rounded-[10px] border border-white/10 bg-gradient-to-br from-slate-950 to-purple-950 p-6 text-white shadow-xl sm:p-7">
      <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      {/* Top Tier Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Avatar className="h-14 w-14 shrink-0 border-2 border-amber-400 shadow-md">
            <AvatarImage
              src="https://ui-avatars.com/api/?name=Roni+Ahamed&background=0D8ABC&color=fff"
              alt="Roni Ahamed"
            />
            <AvatarFallback className="text-foreground font-bold">
              RA
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-black text-white sm:text-2xl">
              Roni Ahamed
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-black text-slate-950 shadow-xs">
              <Crown className="h-3.5 w-3.5 fill-slate-950" /> ⭐ Premium Member
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 px-3.5 py-1.5 text-right backdrop-blur-md">
          <p className="text-[10px] font-semibold tracking-wider text-white/70 uppercase">
            Active Passes
          </p>
          <p className="flex items-center justify-end gap-1 text-lg font-black text-amber-300">
            <Ticket className="h-4 w-4" /> 2 Passes
          </p>
        </div>
      </div>

      {/* Separator Divider 1 */}
      <div className="border-t border-white/15" />

      {/* Row 1 Details */}
      <div className="relative z-10 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        <div>
          <p className="text-[11px] font-medium text-white/70">Verification</p>
          <p className="flex items-center gap-1 font-extrabold text-emerald-300">
            <BadgeCheck className="h-3.5 w-3.5" /> Verified Member
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium text-white/70">Member ID</p>
          <p className="font-mono font-extrabold text-amber-200">
            BD-LIB-88421
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium text-white/70">
            Membership Level
          </p>
          <p className="font-extrabold text-white">৳ 1,000 (Standard)</p>
        </div>

        <div>
          <p className="text-[11px] font-medium text-white/70">Borrow Limit</p>
          <p className="font-extrabold text-white">Up to ৳ 1,000 / book</p>
        </div>
      </div>

      {/* Separator Divider 2 */}
      <div className="border-t border-white/15" />

      {/* Row 2 Footer Info */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs text-white/80">
        <span>
          📅 Valid Until: <strong className="text-white">15 Aug 2026</strong>{" "}
          (4-Year Plan)
        </span>
        <span className="font-bold text-amber-300">
          ⚡ 0% Platform Commission Included
        </span>
      </div>
    </div>
  );
}
