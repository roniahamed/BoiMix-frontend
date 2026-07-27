import Link from "next/link";
import Image from "next/image";
import { BookOpen, ChevronRight, Clock, Zap } from "lucide-react";

export function OverviewContinueReading() {
  return (
    <div className="bg-card border-border/60 overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-border/40 flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
            <BookOpen className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-foreground text-sm font-bold">
              Continue Reading
            </h2>
            <p className="text-muted-foreground text-[11px]">
              Pick up where you left off
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/reading"
          className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
        >
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="p-4 sm:p-5">
        <div className="border-border/40 flex flex-col items-center gap-5 rounded-2xl border bg-gradient-to-r from-[#0397d3]/5 via-transparent to-purple-500/5 p-5 sm:flex-row">
          <div className="relative shrink-0">
            <div className="border-border relative h-32 w-[88px] shrink-0 overflow-hidden rounded-xl border-2 shadow-lg sm:h-36 sm:w-24">
              <Image
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&fit=crop"
                alt="Atomic Habits"
                fill
                sizes="(max-width: 640px) 88px, 96px"
                priority
                className="object-cover"
              />
            </div>
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-slate-950 shadow">
              68%
            </span>
          </div>

          <div className="w-full flex-1 space-y-3 text-center sm:text-left">
            <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-foreground text-lg leading-tight font-extrabold">
                  Atomic Habits
                </h3>
                <p className="text-muted-foreground text-xs font-medium">
                  James Clear · Self Development
                </p>
              </div>
              <span className="self-center rounded-full bg-amber-400/15 px-3 py-1 text-xs font-extrabold text-amber-600 sm:self-auto">
                <Clock className="mr-1 inline h-3 w-3" />
                Due in 2 days
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
                <span>Reading Progress</span>
                <span className="text-foreground font-bold">
                  Page 210 of 320
                </span>
              </div>
              <div className="bg-muted h-2.5 w-full overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "68%",
                    background:
                      "linear-gradient(90deg, #0397d3 0%, #7c3aed 100%)",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold transition-all active:scale-95">
                <Zap className="h-3.5 w-3.5" /> Continue
              </button>
              <Link
                href="/dashboard/borrowed"
                className="bg-muted hover:bg-muted/80 text-foreground flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors"
              >
                Return / Extend
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
