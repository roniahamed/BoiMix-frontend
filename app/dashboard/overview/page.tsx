import { fetchLocal } from "@/lib/fetchLocal";
import { BookCard } from "@/components/shared/book-card";
import type { BookCardBook } from "@/types/book";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { OverviewHeroBanner } from "@/components/dashboard/overview/overview-hero-banner";
import { OverviewStatCards } from "@/components/dashboard/overview/overview-stat-cards";
import { OverviewActionCenter } from "@/components/dashboard/overview/overview-action-center";
import { OverviewActivityTimeline } from "@/components/dashboard/overview/overview-activity-timeline";
import { OverviewContinueReading } from "@/components/dashboard/overview/overview-continue-reading";

export default async function OverviewPage() {
  const { profileLibraryBooks } = await fetchLocal("/api/profile");
  const recommendedBooks = profileLibraryBooks.slice(0, 4);

  return (
    <div className="space-y-5 pb-24 sm:space-y-6 lg:pb-8">
      {/* ── HERO WELCOME BANNER ── */}
      <OverviewHeroBanner />

      {/* ── STAT CARDS ── */}
      <OverviewStatCards />

      {/* ── ACTION CENTER + ACTIVITY TIMELINE ── */}
      <div className="grid gap-5 lg:grid-cols-5">
        <OverviewActionCenter />
        <OverviewActivityTimeline />
      </div>

      {/* ── CONTINUE READING ── */}
      <OverviewContinueReading />

      {/* ── RECOMMENDED BOOKS ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-base font-bold sm:text-lg">
              Recommended For You
            </h2>
            <p className="text-muted-foreground text-xs">
              Based on your recent reading in Self Help &amp; Technology
            </p>
          </div>
          <Link
            href="/books"
            className="text-primary flex items-center gap-0.5 text-xs font-bold hover:underline"
          >
            View All <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {recommendedBooks.map((book: Record<string, unknown>) => (
            <BookCard
              key={book.id as string}
              book={book as unknown as BookCardBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
