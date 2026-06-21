import Link from "next/link";

import { cn } from "@/lib/utils";

const profileNavItems = [
  { label: "Profile", segment: "", href: "" },
  { label: "Reviews", segment: "reviews", href: "/reviews" },
  { label: "Library", segment: "library", href: "/library" },
  { label: "Activity", segment: "activity", href: "/activity" },
  { label: "Badges", segment: "badges", href: "/badges" },
  { label: "Followers", segment: "followers", href: "/followers" },
  { label: "Following", segment: "following", href: "/following" },
  { label: "Location", segment: "location", href: "/location" },
] as const;

type ProfileNavProps = {
  username: string;
  active: (typeof profileNavItems)[number]["segment"];
};

export function ProfileNav({ username, active }: ProfileNavProps) {
  return (
    <nav
      className="bg-card sticky top-0 z-20 overflow-x-auto border-b md:static md:rounded-lg md:border"
      aria-label="Profile sections"
    >
      <div className="flex min-w-max items-center gap-1 px-2">
        {profileNavItems.map((item) => {
          const isActive = item.segment === active;

          return (
            <Link
              key={item.label}
              href={`/u/${username}${item.href}`}
              className={cn(
                "text-muted-foreground hover:text-primary relative px-3 py-3 text-sm font-semibold transition-colors",
                isActive && "text-primary",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
              {isActive && (
                <span className="bg-primary absolute right-3 bottom-0 left-3 h-0.5 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
