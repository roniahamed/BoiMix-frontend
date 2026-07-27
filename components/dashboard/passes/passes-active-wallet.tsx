import Link from "next/link";
import {
  Ticket,
  Crown,
  CheckCircle2,
  Clock,
  ArrowRight,
  History,
} from "lucide-react";
import {
  ActivePassWalletItem,
  MOCK_SATISFYING_HISTORY,
} from "@/lib/data/passes";

type ActiveWalletProps = {
  passes: ActivePassWalletItem[];
};

export function PassesActiveWallet({ passes }: ActiveWalletProps) {
  return (
    <div className="space-y-8">
      {/* SELF-EXPLAINING ACTIVE PASS WALLET */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
            <Ticket className="h-5 w-5 text-emerald-500" /> Active Pass Wallet (
            {passes.length})
          </h2>
          <span className="text-muted-foreground text-xs font-semibold">
            Cards explain full borrowing terms
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className="bg-card border-border/70 hover:border-primary/40 relative space-y-3 overflow-hidden rounded-2xl border p-5 shadow-2xs transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`rounded-xl p-2.5 ${pass.type === "vip" ? "bg-amber-400/20 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`}
                  >
                    {pass.type === "vip" ? (
                      <Crown className="h-5 w-5" />
                    ) : (
                      <Ticket className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-foreground text-sm font-bold">
                      {pass.name}
                    </h3>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      {pass.id}
                    </p>
                  </div>
                </div>

                <span className="bg-success/15 text-success flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-extrabold">
                  <CheckCircle2 className="h-3 w-3" /> Ready
                </span>
              </div>

              {/* Self-explaining details grid */}
              <div className="border-border/40 grid grid-cols-3 gap-2 border-t pt-2 text-xs">
                <div>
                  <p className="text-muted-foreground text-[10px]">
                    Loan Duration
                  </p>
                  <p className="text-foreground flex items-center gap-1 font-extrabold">
                    <Clock className="text-primary h-3 w-3" />{" "}
                    {pass.durationDays} Days
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px]">
                    Borrow Limit
                  </p>
                  <p className="text-foreground font-extrabold">
                    {pass.borrowLimit}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px]">
                    Expires On
                  </p>
                  <p className="text-foreground font-extrabold">
                    {pass.expires}
                  </p>
                </div>
              </div>

              <div className="border-border/40 flex items-center justify-between border-t pt-2 text-xs">
                <span className="text-muted-foreground text-[11px]">
                  0% Platform Fee • Escrow Protected
                </span>
                <Link
                  href="/books?type=borrow"
                  className="text-primary flex items-center gap-1 font-bold hover:underline"
                >
                  Use Pass <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SATISFYING USAGE HISTORY LOG */}
      <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-5 shadow-2xs">
        <div className="border-border/40 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <History className="text-primary h-5 w-5" />
            <h2 className="text-foreground text-base font-bold sm:text-lg">
              Satisfying Usage History Log
            </h2>
          </div>
          <span className="text-muted-foreground text-xs font-semibold">
            3 Completed Loans
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-border/40 text-muted-foreground border-b text-[11px] uppercase">
                <th className="pb-2 font-bold">Book Title & ID</th>
                <th className="pb-2 font-bold">Borrowed</th>
                <th className="pb-2 font-bold">Returned</th>
                <th className="pb-2 font-bold">Status</th>
                <th className="pb-2 text-right font-bold">XP Earned</th>
              </tr>
            </thead>
            <tbody className="divide-border/30 divide-y">
              {MOCK_SATISFYING_HISTORY.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="text-foreground flex items-center gap-2 py-3 font-bold">
                    <span className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                      {item.id}
                    </span>
                    {item.bookTitle}
                  </td>
                  <td className="text-muted-foreground py-3 font-medium">
                    {item.borrowedDate}
                  </td>
                  <td className="text-muted-foreground py-3 font-medium">
                    {item.returnedDate}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" /> {item.status} On Time
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-emerald-600">
                    {item.xpEarned}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
