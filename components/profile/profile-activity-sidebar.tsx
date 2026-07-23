"use client";

import { useState } from "react";
import {
  BookOpenIcon,
  HeartIcon,
  LayoutListIcon,
  Repeat2Icon,
  ShoppingBagIcon,
  StarIcon,
  TagIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FilterOption = {
  id: string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
};

const filterOptions: FilterOption[] = [
  {
    id: "all",
    label: "All Activities",
    icon: LayoutListIcon,
    iconColor: "text-blue-500",
  },
  {
    id: "books",
    label: "Books",
    icon: BookOpenIcon,
    iconColor: "text-green-500",
  },
  {
    id: "exchanges",
    label: "Exchanges",
    icon: Repeat2Icon,
    iconColor: "text-blue-500",
  },
  {
    id: "borrows",
    label: "Borrows",
    icon: ShoppingBagIcon,
    iconColor: "text-orange-500",
  },
  { id: "sales", label: "Sales", icon: TagIcon, iconColor: "text-teal-500" },
  {
    id: "reviews",
    label: "Reviews",
    icon: StarIcon,
    iconColor: "text-purple-500",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: HeartIcon,
    iconColor: "text-pink-500",
  },
];

export function ProfileActivitySidebar() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <aside className="bg-card border-border/50 hidden w-56 shrink-0 flex-col gap-4 rounded-[5px] border p-4 shadow-sm lg:flex">
      <h3 className="text-foreground px-2 text-[13px] font-bold">
        Activity Filters
      </h3>
      <nav className="flex flex-col gap-1">
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.id;
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={cn(
                "flex items-center gap-3 rounded-[5px] px-3 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon
                className={cn("size-[18px]", option.iconColor)}
                strokeWidth={2.5}
              />
              {option.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
