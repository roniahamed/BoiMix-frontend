"use client";

import Link from "next/link";
import { MenuIcon, SearchIcon } from "lucide-react";

import { BrandLink } from "@/components/layout/brand-link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { primaryNavItems } from "@/lib/navigation";

export function MobileNavbar({ children }: { children?: React.ReactNode }) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
          >
            <MenuIcon />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <DrawerHeader className="border-b text-left">
          <BrandLink />
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <DrawerDescription className="sr-only">
            BoiMix primary navigation links
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 p-4">
          <DrawerClose asChild>
            <Link
              href="/books/search"
              className="text-muted-foreground border-border bg-background hover:bg-muted flex h-10 w-full items-center gap-2 rounded-lg border px-3 text-sm transition-colors"
            >
              <SearchIcon className="size-4 shrink-0" />
              <span>Search books, authors, ISBN...</span>
            </Link>
          </DrawerClose>
          <nav className="grid gap-1" aria-label="Mobile">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <DrawerClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="text-foreground hover:bg-muted focus-visible:ring-ring/50 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
                  >
                    {Icon && (
                      <Icon
                        className="text-muted-foreground size-4"
                        aria-hidden="true"
                      />
                    )}
                    {item.title}
                  </Link>
                </DrawerClose>
              );
            })}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
