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
  // If active is empty, default to library or handle accordingly.
  const currentActive = active === "" ? "library" : active;

  return (
    <nav
      className="bg-card sticky top-0 z-20 overflow-x-auto border-b px-4 py-2 sm:px-0 sm:py-0 md:static md:overflow-visible md:border-b-0"
      aria-label="Profile sections"
    >
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-4 md:min-w-max md:flex-nowrap md:gap-8">
        {profileNavItems.map((item) => {
          const isActive = item.segment === currentActive;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={`/u/${username}${item.href}`}
              scroll={false}
              className={cn(
                "group relative flex items-center justify-center transition-colors",
                // Mobile classes: Facebook style pill
                "rounded-full px-3 py-1.5 text-[13px] font-medium",
                isActive
                  ? "bg-[#e7f3ff] text-[#0866ff] md:bg-transparent"
                  : "text-muted-foreground hover:bg-muted/50 bg-transparent",
                // Desktop classes: Original style
                "md:gap-2 md:rounded-none md:px-0 md:pt-2 md:pb-4 md:text-[15px] md:font-semibold",
                isActive
                  ? "md:text-primary"
                  : "md:text-muted-foreground md:hover:text-foreground md:hover:bg-transparent",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "hidden size-4 md:block",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {item.label}
              {/* Desktop active underline indicator */}
              {isActive && (
                <div className="bg-primary absolute right-0 bottom-0 left-0 hidden h-[2px] rounded-t-full md:block" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
