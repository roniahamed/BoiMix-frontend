import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { CustomerOrder } from "@/lib/data/sales";

type SalesStatsProps = {
  orders: CustomerOrder[];
};

export function SalesStats({ orders }: SalesStatsProps) {
  const totalRevenue = orders.reduce(
    (sum, o) => (o.status !== "cancelled" ? sum + o.price : sum),
    0,
  );
  const pendingCount = orders.filter(
    (o) => o.status === "pending" || o.status === "confirmed",
  ).length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
        <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
          <span>Total Sales Revenue</span>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-foreground text-2xl font-extrabold sm:text-3xl">
          ৳ {totalRevenue}
        </p>
        <p className="text-success flex items-center gap-0.5 pt-0.5 text-[11px] font-bold">
          <TrendingUp className="h-3 w-3" /> +৳ 800 this month
        </p>
      </div>

      <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
        <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
          <span>Customer Orders</span>
          <ShoppingBag className="text-brand-blue h-4 w-4" />
        </div>
        <p className="text-foreground text-2xl font-extrabold sm:text-3xl">
          {orders.length} Orders
        </p>
        <p className="text-muted-foreground pt-0.5 text-[11px] font-medium">
          4 active buyers
        </p>
      </div>

      <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
        <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
          <span>Pending Delivery</span>
          <Clock className="text-warning h-4 w-4" />
        </div>
        <p className="text-warning text-2xl font-extrabold sm:text-3xl">
          {pendingCount}
        </p>
        <p className="text-muted-foreground pt-0.5 text-[11px] font-medium">
          Action required
        </p>
      </div>

      <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
        <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
          <span>Available Balance</span>
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
        </div>
        <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
          ৳ 1,800
        </p>
        <p className="text-muted-foreground pt-0.5 text-[11px] font-medium">
          Ready for bKash payout
        </p>
      </div>
    </div>
  );
}
