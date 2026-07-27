import Link from "next/link";
import Image from "next/image";
import { POPULAR_COLLECTIONS } from "@/lib/data/central-library";
import { ScrollContainer } from "@/components/shared/scroll-container";
import { Badge } from "@/components/ui/badge";

export function CentralCollections() {
  return (
    <section className="boimix-container-wide mb-6 md:mb-8">
      <div>
        <h2 className="mb-0 text-xl font-bold text-slate-900 dark:text-white">
          Popular Collections
        </h2>
        <ScrollContainer autoScroll={false} className="mt-[15px] pb-4">
          {POPULAR_COLLECTIONS.map((col, i) => (
            <Link
              key={i}
              href={`/explore/central-library/search?collection=${encodeURIComponent(col.name)}`}
              className="group relative flex h-[160px] w-[240px] shrink-0 flex-col justify-end overflow-hidden rounded-lg p-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              <div className="relative z-10">
                <Badge className="mb-1 bg-white/20 text-[10px] text-white backdrop-blur-xs hover:bg-white/30">
                  {col.count}
                </Badge>
                <h4 className="text-base leading-snug font-bold text-white">
                  {col.name}
                </h4>
                <p className="line-clamp-1 text-xs text-slate-300">
                  {col.desc}
                </p>
              </div>
            </Link>
          ))}
        </ScrollContainer>
      </div>
    </section>
  );
}
