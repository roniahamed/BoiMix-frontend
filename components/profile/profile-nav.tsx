import Link from "next/link";
import {
  ActivityIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  StarIcon,
  UserCheckIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const profileNavItems = [
  {
    label: "Overview",
    segment: "overview",
    href: "",
    icon: UserCheckIcon,
  },
  {
    label: "Library",
    segment: "library",
    href: "/library",
    icon: BookOpenIcon,
  },
  { label: "Reviews", segment: "reviews", href: "/reviews", icon: StarIcon },
  {
    label: "Activity",
    segment: "activity",
    href: "/activity",
    icon: ActivityIcon,
  },
  {
    label: "Badges",
    segment: "badges",
    href: "/badges",
    icon: ShieldCheckIcon,
  },
] as const;

type ProfileNavProps = {
  username: string;
  active: (typeof profileNavItems)[number]["segment"] | "";
};

export function ProfileNav({ username, active }: ProfileNavProps) {
  // If active is empty, default to library or handle accordingly. Assuming library is default if not specified.
  const currentActive = active === "" ? "library" : active;

  return (
    <nav
      className="sticky top-0 z-20 overflow-x-auto border-b md:static"
      aria-label="Profile sections"
    >
      <div className="flex min-w-max items-center gap-8">
        {profileNavItems.map((item) => {
          const isActive = item.segment === currentActive;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={`/u/${username}${item.href}`}
              scroll={false}
              className={cn(
                "group relative flex items-center gap-2 pt-2 pb-4 text-[15px] font-semibold transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "size-4",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {item.label}
              {isActive && (
                <div className="bg-primary absolute right-0 bottom-0 left-0 h-[2px] rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
