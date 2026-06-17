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
          className="bg-card shadow-soft rounded-lg border p-4"
        >
          <dt className="type-caption text-muted-foreground">{stat.label}</dt>
          <dd className="text-foreground mt-2 text-2xl font-bold">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
