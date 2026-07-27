import Link from "next/link";
import {
  ChevronRight,
  Library,
  Bookmark,
  Repeat,
  ShoppingBag,
  Coins,
  Crown,
  ArrowRight,
} from "lucide-react";

function StatCard({
  icon,
  iconBg,
  badge,
  badgeBg,
  value,
  label,
  link,
  linkLabel,
}: {
  icon: React.ReactNode;
  iconBg: string;
  badge: string;
  badgeBg: string;
  value: string;
  label: string;
  link: string;
  linkLabel: string;
}) {
  return (
    <div className="bg-card border-border/60 group flex flex-col justify-between gap-3 rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>
        <span
          className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${badgeBg}`}
        >
          {badge}
        </span>
      </div>
      <div>
        <p className="text-foreground text-xl leading-none font-extrabold">
          {value}
        </p>
        <p className="text-muted-foreground mt-0.5 text-[11px] font-semibold">
          {label}
        </p>
      </div>
      <Link
        href={link}
        className="text-primary border-border/40 flex items-center justify-between border-t pt-2 text-[11px] font-bold transition-colors hover:underline"
      >
        <span>{linkLabel}</span>
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export function OverviewStatCards() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-base font-bold sm:text-lg">
          Account Summary
        </h2>
        <Link
          href="/dashboard/analytics"
          className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
        >
          All Insights <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          icon={<Library className="h-4 w-4" />}
          iconBg="bg-[#e91e63]/10 text-[#e91e63]"
          badge="35 Avail"
          badgeBg="bg-[#e91e63]/10 text-[#e91e63]"
          value="42"
          label="My Books"
          link="/dashboard/library"
          linkLabel="Manage"
        />
        <StatCard
          icon={<Bookmark className="h-4 w-4" />}
          iconBg="bg-emerald-500/10 text-emerald-500"
          badge="2 Passes"
          badgeBg="bg-emerald-500/10 text-emerald-600"
          value="2 Active"
          label="Borrowing"
          link="/dashboard/borrowed"
          linkLabel="View Loans"
        />
        <StatCard
          icon={<Repeat className="h-4 w-4" />}
          iconBg="bg-[#0397d3]/10 text-[#0397d3]"
          badge="+1 Pending"
          badgeBg="bg-emerald-500/10 text-emerald-600"
          value="5 Deals"
          label="Exchanges"
          link="/dashboard/exchanges"
          linkLabel="View Deals"
        />
        <StatCard
          icon={<ShoppingBag className="h-4 w-4" />}
          iconBg="bg-emerald-500/10 text-emerald-500"
          badge="৳ 2,450"
          badgeBg="bg-emerald-500/10 text-emerald-600"
          value="3 Orders"
          label="Customer Sales"
          link="/dashboard/sales"
          linkLabel="Sales Hub"
        />
        <StatCard
          icon={<Coins className="h-4 w-4" />}
          iconBg="bg-amber-500/10 text-amber-500"
          badge="Ready"
          badgeBg="bg-emerald-500/10 text-emerald-600"
          value="৳ 1,800"
          label="Wallet Balance"
          link="/dashboard/wallet"
          linkLabel="Withdraw"
        />
        <StatCard
          icon={<Crown className="h-4 w-4 fill-amber-400" />}
          iconBg="bg-amber-400/10 text-amber-500"
          badge="Pro Tier"
          badgeBg="bg-amber-400/10 text-amber-600"
          value="4.9 ⭐"
          label="Premium Member"
          link="/dashboard/settings"
          linkLabel="Manage Tier"
        />
      </div>
    </div>
  );
}
