import { Wallet, Coins, Lock } from "lucide-react";

export function PassesWalletBreakdown() {
  const depositLimit = 1000;
  const lockedLimit = 380;
  const availableLimit = depositLimit - lockedLimit;
  const capacityPercent = Math.round((availableLimit / depositLimit) * 100);

  return (
    <div className="space-y-6">
      {/* WALLET SUMMARY FINANCIAL BREAKDOWN */}
      <div className="space-y-3">
        <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
          <Wallet className="text-primary h-5 w-5" /> Financial Wallet Breakdown
        </h2>

        <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
            <p className="text-muted-foreground text-[11px] font-semibold">
              Membership Fee
            </p>
            <p className="text-foreground text-xl font-black">৳ 1,000</p>
            <p className="text-muted-foreground text-[10px]">
              Valid for 4 years
            </p>
          </div>

          <div className="bg-card border-primary/50 space-y-1 rounded-2xl border-2 p-4 shadow-2xs">
            <p className="text-muted-foreground text-[11px] font-semibold">
              Available Credit
            </p>
            <p className="text-primary text-xl font-black">
              ৳ {availableLimit}
            </p>
            <p className="text-[10px] font-bold text-emerald-600">
              Ready to borrow
            </p>
          </div>

          <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
            <p className="text-muted-foreground text-[11px] font-semibold">
              Total Saved
            </p>
            <p className="text-xl font-black text-emerald-600">৳ 1,200</p>
            <p className="text-muted-foreground text-[10px]">
              From library books
            </p>
          </div>

          <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
            <p className="text-muted-foreground text-[11px] font-semibold">
              Rewards & Coins
            </p>
            <p className="flex items-center gap-1 text-xl font-black text-purple-600">
              <Coins className="h-4 w-4" /> 150 Pts
            </p>
            <p className="text-[10px] font-bold text-purple-600">
              +120 Level XP
            </p>
          </div>
        </div>
      </div>

      {/* BORROW CAPACITY PROGRESS CARD */}
      <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-5 shadow-2xs">
        <div className="border-border/40 flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
              <Lock className="h-5 w-5 text-emerald-500" /> Live Borrow Capacity
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Track how much of your ৳ 1,000 limit is currently available or
              locked in active loans.
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-bold text-emerald-600">
            {capacityPercent}% Available
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
            <div
              className="to-primary h-full rounded-full bg-gradient-to-r from-emerald-500 transition-all duration-500"
              style={{ width: `${capacityPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 pt-1 text-xs">
            <div>
              <p className="text-muted-foreground text-[11px]">
                Available Limit
              </p>
              <p className="text-sm font-extrabold text-emerald-600">
                ৳ {availableLimit}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-[11px]">Maximum Limit</p>
              <p className="text-foreground text-sm font-extrabold">
                ৳ {depositLimit}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-[11px]">
                Currently Locked
              </p>
              <p className="text-sm font-extrabold text-amber-600">
                ৳ {lockedLimit}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/40 text-muted-foreground flex items-center justify-between rounded-xl p-3 text-xs font-medium">
          <span>
            🔒 Locked by active loan: <strong>Atomic Habits</strong> (৳ 380
            value)
          </span>
          <span className="text-foreground text-[11px] font-bold">
            Unlocks upon return
          </span>
        </div>
      </div>
    </div>
  );
}
