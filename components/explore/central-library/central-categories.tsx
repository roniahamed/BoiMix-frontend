import Link from "next/link";
import { CENTRAL_CATEGORIES } from "@/lib/data/central-library";
import { ScrollContainer } from "@/components/shared/scroll-container";

export function CentralCategories() {
  return (
    <section className="boimix-container-wide mb-6 md:mb-8">
      <div>
        <h2 className="mb-0 text-xl font-bold text-slate-900 dark:text-white">
          Categories
        </h2>
        <ScrollContainer autoScroll={false} className="mt-[15px] pb-4">
          {CENTRAL_CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              href={`/explore/central-library/search?category=${encodeURIComponent(cat.name)}`}
              className="group flex w-[160px] shrink-0 items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${cat.bg} dark:bg-slate-800`}
              >
                <cat.icon
                  className={`size-5 ${cat.color} dark:text-slate-300`}
                  strokeWidth={2}
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {cat.name}
                </h4>
                <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                  {cat.count}
                </p>
              </div>
            </Link>
          ))}
        </ScrollContainer>
      </div>
    </section>
  );
}
