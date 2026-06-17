import Link from "next/link";
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
  { label: "Marketplace", href: "/explore/store", icon: ShoppingBagIcon },
  { label: "Swap Books", href: "/explore/swaps", icon: Repeat2Icon },
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
  return (
    <div className="bg-card border-b">
      <div className="boimix-container-wide">
        <nav
          aria-label="Quick navigation"
          className="flex scrollbar-none items-center justify-start gap-0.5 overflow-x-auto py-1.5 md:justify-center"
        >
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground hover:text-primary hover:bg-primary/8 flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
