import React from "react";

export function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border-border rounded-lg border px-3 py-2 text-xs shadow-md">
      <p className="text-muted-foreground mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-bold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

export function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border-border/70 min-h-0 min-w-0 rounded-[7px] border p-5 shadow-2xs">
      <div className="mb-4">
        <h3 className="text-foreground text-sm font-bold sm:text-base">
          {title}
        </h3>
        {subtitle && (
          <p className="text-muted-foreground mt-0.5 text-[11px]">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  trend,
  trendPositive = true,
}: {
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
}) {
  return (
    <div className="bg-card border-border/70 rounded-[7px] border p-4 shadow-2xs">
      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {label}
      </p>
      <p className="text-foreground mt-1 text-2xl font-extrabold">{value}</p>
      {trend && (
        <p
          className={`mt-1 text-xs font-bold ${
            trendPositive ? "text-emerald-500" : "text-red-400"
          }`}
        >
          {trend}
        </p>
      )}
    </div>
  );
}
