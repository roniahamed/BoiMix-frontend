import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";

function ActionItem({
  emoji,
  emojiColor,
  borderColor,
  bgColor,
  title,
  subtitle,
  tag,
  tagColor,
  linkHref,
  linkLabel,
  linkColor,
}: {
  emoji: string;
  emojiColor: string;
  borderColor: string;
  bgColor: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  linkHref: string;
  linkLabel: string;
  linkColor: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border ${borderColor} ${bgColor} p-3`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${emojiColor}`}
        >
          {emoji}
        </span>
        <div className="space-y-0.5">
          <p className="text-foreground text-xs leading-tight font-bold">
            {title}
          </p>
          <p className="text-muted-foreground text-[11px]">{subtitle}</p>
          <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold ${tagColor}`}
          >
            {tag}
          </span>
        </div>
      </div>
      <Link
        href={linkHref}
        className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-extrabold shadow-sm transition-all hover:opacity-90 active:scale-95 ${linkColor}`}
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export function OverviewActionCenter() {
  return (
    <div className="bg-card border-border/60 flex flex-col rounded-2xl border shadow-sm lg:col-span-3">
      <div className="border-border/40 flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </span>
          <div>
            <h2 className="text-foreground text-sm font-bold">Action Center</h2>
            <p className="text-muted-foreground text-[11px]">
              High-priority tasks
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/notifications"
          className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
        >
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex flex-col gap-2.5 p-4">
        <ActionItem
          emoji="⏰"
          emojiColor="bg-amber-400/15 text-amber-600"
          borderColor="border-amber-400/30"
          bgColor="bg-amber-400/5"
          title="Return Book Due Tomorrow"
          subtitle="Atomic Habits · Owner: Ahmed Rahman"
          tag="⏱ 1 day left"
          tagColor="bg-amber-400/15 text-amber-600"
          linkHref="/dashboard/borrowed"
          linkLabel="Return / Extend"
          linkColor="bg-amber-400 text-slate-950"
        />
        <ActionItem
          emoji="🔄"
          emojiColor="bg-[#0397d3]/15 text-[#0397d3]"
          borderColor="border-[#0397d3]/30"
          bgColor="bg-[#0397d3]/5"
          title="Exchange Offer Received"
          subtitle="Nusrat wants Rich Dad Poor Dad"
          tag="⏱ 2 hrs ago"
          tagColor="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
          linkHref="/dashboard/exchanges/offers"
          linkLabel="Accept / View"
          linkColor="bg-[#0397d3] text-white"
        />
        <ActionItem
          emoji="💬"
          emojiColor="bg-emerald-500/15 text-emerald-600"
          borderColor="border-emerald-500/30"
          bgColor="bg-emerald-500/5"
          title="5 Unread Messages"
          subtitle='Ahmed: "Is the book ready for pickup?"'
          tag="⏱ 14 min ago"
          tagColor="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          linkHref="/dashboard/messages"
          linkLabel="Reply Now"
          linkColor="bg-emerald-500 text-white"
        />
        <ActionItem
          emoji="🎫"
          emojiColor="bg-purple-500/15 text-purple-600"
          borderColor="border-purple-500/30"
          bgColor="bg-purple-500/5"
          title="Borrow Pass Expiring"
          subtitle="1 Borrow Pass expires in 3 days"
          tag="⏱ 3 days left"
          tagColor="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300"
          linkHref="/dashboard/passes"
          linkLabel="Renew Pass"
          linkColor="bg-purple-600 text-white"
        />
      </div>
    </div>
  );
}
