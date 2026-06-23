"use client";

import Link from "next/link";
import {
  ActivityIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  StarIcon,
  UserCheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProfileNavProps = {
  username: string;
  active: "overview" | "library" | "reviews" | "activity" | "badges";
};

export function ProfileNav({ username, active }: ProfileNavProps) {
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      href: `/u/${username}`,
      icon: UserCheckIcon,
    },
    {
      id: "library",
      label: "Library",
      href: `/u/${username}/library`,
      icon: BookOpenIcon,
    },
    {
      id: "reviews",
      label: "Reviews",
      href: `/u/${username}/reviews`,
      icon: StarIcon,
    },
    {
      id: "activity",
      label: "Activity",
      href: `/u/${username}/activity`,
      icon: ActivityIcon,
    },
    {
      id: "badges",
      label: "Badges",
      href: `/u/${username}/badges`,
      icon: ShieldCheckIcon,
    },
  ];

  const handleTabClick = () => {
    // Use a short timeout to let Next.js start the navigation
    setTimeout(() => {
      const anchor = document.getElementById("profile-nav-anchor");
      if (anchor) {
        const isDesktop = window.innerWidth >= 768;
        const offset = isDesktop ? 101 : 53;
        const top =
          anchor.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 10);
  };

  return (
    <nav
      id="profile-nav"
      className="bg-card scrollbar-hide sticky top-[53px] z-30 overflow-x-auto border-b px-4 py-0 sm:px-0 md:top-[101px] md:overflow-visible md:py-0"
      aria-label="Profile sections"
    >
      <div className="flex min-w-max flex-nowrap items-center gap-4 md:gap-8">
        {navItems.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              scroll={false}
              onClick={handleTabClick}
              className={cn(
                "group relative flex items-center justify-center transition-colors",
                // Mobile classes: text with underline (no pill), smaller vertical padding
                "py-3 text-[14px] font-semibold",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
                // Desktop classes: Original style
                "md:gap-2 md:rounded-none md:px-0 md:pt-2 md:pb-4 md:text-[15px] md:font-semibold",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Desktop icon */}
              <Icon
                className={cn(
                  "hidden size-4 md:block",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {item.label}
              {/* Active underline indicator for both Mobile and Desktop */}
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
