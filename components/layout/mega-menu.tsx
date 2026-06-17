"use client";

import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { megaMenuItems } from "@/lib/navigation";

export function MegaMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          Explore
          <ChevronDownIcon className="size-4" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[520px] p-2">
        <div className="grid grid-cols-2 gap-1">
          {megaMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="hover:bg-muted focus-visible:ring-ring/50 rounded-lg p-3 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
              >
                <span className="text-foreground flex items-center gap-2 font-medium">
                  {Icon && (
                    <Icon className="text-primary size-4" aria-hidden="true" />
                  )}
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-muted-foreground mt-1 block text-sm leading-5">
                    {item.description}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
