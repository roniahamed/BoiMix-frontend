import Link from "next/link";
import { TrendingUp, ChevronRight } from "lucide-react";

function TimelineItem({
  dotColor,
  title,
  time,
  desc,
}: {
  dotColor: string;
  title: React.ReactNode;
  time: string;
  desc: string;
}) {
  return (
    <div className="relative flex items-start gap-3">
      <span
        className={`ring-card absolute top-1 -left-[21px] flex h-3 w-3 rounded-full ring-4 ${dotColor}`}
      />
      <div className="space-y-0.5">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="text-foreground text-xs leading-tight font-bold">
            {title}
          </p>
          <span className="text-muted-foreground text-[10px] font-semibold">
            {time}
          </span>
        </div>
        <p className="text-muted-foreground text-[11px] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function OverviewActivityTimeline() {
  return (
    <div className="bg-card border-border/60 flex flex-col rounded-2xl border shadow-sm lg:col-span-2">
      <div className="border-border/40 flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-foreground text-sm font-bold">Activity</h2>
            <p className="text-muted-foreground text-[11px]">
              Your recent actions
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/exchanges"
          className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
        >
          All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex-1 p-5">
        <div className="border-primary/20 space-y-4 border-l-2 pl-4">
          <TimelineItem
            dotColor="bg-primary"
            title={
              <>
                Ahmed requested{" "}
                <span className="text-primary">The Psychology of Money</span>
              </>
            }
            time="10 min ago"
            desc="Borrow request · 14 days · Central Library"
          />
          <TimelineItem
            dotColor="bg-emerald-500"
            title="Exchange Accepted with Nusrat"
            time="1 hour ago"
            desc="Traded Rich Dad Poor Dad for Deep Work"
          />
          <TimelineItem
            dotColor="bg-[#0397d3]"
            title="Returned Atomic Habits to Central Library"
            time="Yesterday"
            desc="Loan completed on time · +20 XP Earned"
          />
          <TimelineItem
            dotColor="bg-amber-400"
            title="Received 5⭐ from Hasan Mahmud"
            time="2 days ago"
            desc='"Great condition book and super fast handover!"'
          />
        </div>
      </div>
    </div>
  );
}
