import Link from "next/link";
import Image from "next/image";

import categoriesData from "@/lib/data/categories.json";

export default async function CategoryIndexPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories: any[] = categoriesData;
  return (
    <div className="boimix-container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-foreground text-3xl font-bold md:text-4xl">
          All Categories
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Browse our extensive collection by your favorite genres.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="bg-card hover:border-primary border-border group flex flex-col items-center gap-3 rounded-xl border p-6 text-center transition-all duration-300 hover:shadow-md"
          >
            <div className="relative h-[70px] w-[70px] overflow-hidden rounded-[10px]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="70px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-foreground group-hover:text-primary font-semibold transition-colors">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
