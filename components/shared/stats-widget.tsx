import { cn } from "@/lib/utils";

type StatItem = {
  label: string;
  value: string | number;
};

type StatsWidgetProps = {
  stats: StatItem[];
  className?: string;
};

export function StatsWidget({ stats, className }: StatsWidgetProps) {
  return (
    <dl className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-2xl border p-4 shadow-[0_12px_30px_rgba(51,51,51,0.08)]"
        >
          <dt className="type-caption text-muted-foreground tracking-[0.14em] uppercase">
            {stat.label}
          </dt>
          <dd className="text-foreground mt-2 text-2xl font-bold tracking-tight">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
