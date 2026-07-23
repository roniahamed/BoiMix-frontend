"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookIcon,
  BookOpenIcon,
  FlameIcon,
  LibraryIcon,
  MapPinIcon,
  Repeat2Icon,
  ShoppingBagIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
  UsersRoundIcon,
} from "lucide-react";

const quickLinks = [
  { label: "Trending", href: "/books/trending", icon: FlameIcon },
  { label: "New Books", href: "/books/new", icon: SparklesIcon },
  { label: "Near Me", href: "/books/near-me", icon: MapPinIcon },
  { label: "Marketplace", href: "/books", icon: ShoppingBagIcon },
  { label: "Exchange Books", href: "/explore/exchanges", icon: Repeat2Icon },
  {
    label: "Central Library",
    href: "/explore/central-library",
    icon: LibraryIcon,
  },
  { label: "Borrow", href: "/books/borrow", icon: BookOpenIcon },
  {
    label: "Community",
    href: "/community",
    icon: UsersRoundIcon,
  },
  { label: "Top Rated", href: "/books/top-rated", icon: StarIcon },
  { label: "By Genre", href: "/books/category/fiction", icon: BookIcon },
  { label: "Offers", href: "/explore/festival", icon: TagIcon },
];

export function QuickNavBar() {
  const pathname = usePathname();

  return (
    <div className="h-[36px] overflow-hidden">
      <div className="boimix-container-wide h-full">
        <nav
          aria-label="Quick navigation"
          className="flex h-full scrollbar-none items-center justify-start gap-1 overflow-x-auto overscroll-x-contain md:justify-center"
        >
          {quickLinks.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex h-full shrink-0 items-center gap-1.5 px-3 text-xs font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-primary/8 hover:text-primary my-1 rounded-md",
                )}
              >
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                {label}
                {isActive && (
                  <span className="bg-primary absolute right-0 bottom-0 left-0 h-[2px] rounded-t-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
