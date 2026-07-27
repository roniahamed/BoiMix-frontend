import { Zap, Building, CheckCircle2, Sparkles } from "lucide-react";

type StorePlansProps = {
  onOpenCheckout: (
    title: string,
    price: string,
    type: "pass" | "membership",
    details?: string,
  ) => void;
};

export function PassesStorePlans({ onOpenCheckout }: StorePlansProps) {
  return (
    <div className="space-y-8">
      {/* QUICK BUY PASS STORE */}
      <div className="space-y-4 pt-2">
        <div className="border-border/50 flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
              <Zap className="h-5 w-5 text-amber-500" /> Quick Buy Pass Store
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              1-tap pass top-ups to order books whenever you need them.
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600">
            Instant Top-Up
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Mini Pass */}
          <div className="bg-card border-border/70 hover:border-primary/40 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs transition-all">
            <div className="space-y-2">
              <div className="bg-primary/10 text-primary inline-block rounded-full px-2.5 py-0.5 text-[11px] font-extrabold">
                Mini Pack
              </div>
              <h3 className="text-foreground text-base font-extrabold">
                Mini Pass
              </h3>
              <p className="text-foreground text-2xl font-black">
                ৳ 40{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  / 2 books
                </span>
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                🕒 Valid for 1 Month
              </p>
            </div>
            <button
              onClick={() =>
                onOpenCheckout(
                  "Mini Pass",
                  "৳ 40",
                  "pass",
                  "2 Books Capacity • 1 Month Validity",
                )
              }
              className="bg-primary/10 text-primary hover:bg-primary/20 w-full rounded-xl py-2 text-xs font-bold transition-transform active:scale-95"
            >
              Buy Mini (৳ 40)
            </button>
          </div>

          {/* Standard Pass (Most Popular) */}
          <div className="bg-card relative flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border-2 border-amber-500 p-5 shadow-md">
            <span className="absolute top-0 right-0 rounded-bl-xl bg-amber-500 px-3 py-0.5 text-[10px] font-black tracking-wider text-slate-950 uppercase">
              Popular
            </span>
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-700 dark:text-amber-300">
                Best Seller
              </div>
              <h3 className="text-foreground text-base font-extrabold">
                Standard Pass
              </h3>
              <p className="text-foreground text-2xl font-black">
                ৳ 70{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  / 4 books
                </span>
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                🕒 Valid for 1 Month
              </p>
            </div>
            <button
              onClick={() =>
                onOpenCheckout(
                  "Standard Pass",
                  "৳ 70",
                  "pass",
                  "4 Books Capacity • 1 Month Validity",
                )
              }
              className="w-full rounded-xl bg-amber-500 py-2 text-xs font-black text-slate-950 shadow-xs transition-transform hover:bg-amber-400 active:scale-95"
            >
              Buy Standard (৳ 70)
            </button>
          </div>

          {/* Pro Pass (Best Value) */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs transition-all hover:border-emerald-500/40">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-600">
                Best Value
              </div>
              <h3 className="text-foreground text-base font-extrabold">
                Pro Pass
              </h3>
              <p className="text-foreground text-2xl font-black">
                ৳ 100{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  / 7 books
                </span>
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                🕒 Valid for 2 Months
              </p>
            </div>
            <button
              onClick={() =>
                onOpenCheckout(
                  "Pro Pass",
                  "৳ 100",
                  "pass",
                  "7 Books Capacity • 2 Months Validity",
                )
              }
              className="w-full rounded-xl bg-emerald-500 py-2 text-xs font-extrabold text-white shadow-xs transition-transform hover:bg-emerald-600 active:scale-95"
            >
              Buy Pro (৳ 100)
            </button>
          </div>
        </div>
      </div>

      {/* ONE-TIME MEMBERSHIP PLANS */}
      <div className="space-y-4 pt-2">
        <div className="border-border/50 flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
              <Building className="text-primary h-5 w-5" /> One-Time Library
              Membership Plans
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Lead with borrow limits and reading benefits. Valid for 4 years.
            </p>
          </div>
          <span className="text-primary bg-primary/10 rounded-full px-2.5 py-1 text-xs font-bold">
            4-Year Membership
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Basic Member Card */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-[10px] font-extrabold">
                  Casual Reader
                </span>
                <span className="text-muted-foreground text-[10px] font-bold">
                  🕒 4 Years
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-base font-extrabold">
                  Basic Member
                </h3>
                <p className="text-foreground pt-1 text-2xl font-black">
                  ৳ 500{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    / one-time
                  </span>
                </p>
              </div>

              <div className="border-border/40 space-y-2 border-t pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borrow Limit:</span>
                  <strong className="text-foreground">৳ 500 / book</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Borrow Duration:
                  </span>
                  <strong className="text-foreground">14 Days</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Welcome Gift:</span>
                  <strong className="text-emerald-600">5 Free Books</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                onOpenCheckout(
                  "Basic Membership",
                  "৳ 500",
                  "membership",
                  "Borrow limit up to ৳500 • 4 Years Valid",
                )
              }
              className="bg-muted hover:bg-muted/80 text-foreground w-full rounded-xl py-2 text-xs font-bold"
            >
              Choose Basic
            </button>
          </div>

          {/* Standard Member Card (Recommended) */}
          <div className="bg-card border-primary relative flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border-2 p-5 shadow-md">
            <span className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-xl px-3 py-0.5 text-[10px] font-black uppercase">
              Recommended
            </span>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="bg-primary/15 text-primary rounded-full px-2.5 py-0.5 text-[10px] font-extrabold">
                  Active Tier
                </span>
                <span className="text-primary text-[10px] font-bold">
                  🕒 4 Years
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-base font-extrabold">
                  Standard Member
                </h3>
                <p className="text-foreground pt-1 text-2xl font-black">
                  ৳ 1,000{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    / one-time
                  </span>
                </p>
              </div>

              <div className="border-border/40 space-y-2 border-t pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borrow Limit:</span>
                  <strong className="text-foreground">৳ 1,000 / book</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority Queue:</span>
                  <strong className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Included
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Welcome Gift:</span>
                  <strong className="text-emerald-600">5 Free Books</strong>
                </div>
              </div>
            </div>

            <button
              disabled
              className="bg-primary/20 text-primary w-full cursor-default rounded-xl py-2 text-xs font-black"
            >
              Current Active Tier
            </button>
          </div>

          {/* Premium Member Card */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs transition-all hover:border-purple-500/40">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-purple-600">
                  VIP Reader
                </span>
                <span className="text-[10px] font-bold text-purple-600">
                  🕒 4 Years
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-base font-extrabold">
                  Premium Member
                </h3>
                <p className="text-foreground pt-1 text-2xl font-black">
                  ৳ 2,000{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    / one-time
                  </span>
                </p>
              </div>

              <div className="border-border/40 space-y-2 border-t pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borrow Limit:</span>
                  <strong className="text-purple-600">৳ 2,000+ / book</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority Queue:</span>
                  <strong className="font-bold text-purple-600">
                    Express VIP
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VIP Badge:</span>
                  <strong className="flex items-center gap-1 text-amber-500">
                    <Sparkles className="h-3.5 w-3.5" /> Included
                  </strong>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                onOpenCheckout(
                  "Premium Membership Upgrade",
                  "৳ 1,000 (Top-Up)",
                  "membership",
                  "Upgrades limit from ৳1,000 to ৳2,000+ • 4 Years Valid",
                )
              }
              className="w-full rounded-xl bg-purple-600 py-2 text-xs font-extrabold text-white shadow-xs transition-transform active:scale-95"
            >
              Upgrade Tier (৳ 1,000)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
