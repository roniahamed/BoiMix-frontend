"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BellIcon, HeartIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

import { BrandLink } from "@/components/layout/brand-link";
import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { QuickNavBar } from "@/components/layout/quick-nav-bar";
import { SearchBar } from "@/components/layout/search-bar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update at-top state
      setIsAtTop(currentScrollY < 20);

      // Determine visibility based on scroll direction
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "bg-card/95 supports-[backdrop-filter]:bg-card/85 sticky top-0 z-40 border-b shadow-xs backdrop-blur transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div
        className={cn(
          "boimix-container-wide flex items-center gap-3 overflow-hidden transition-all duration-300 ease-in-out md:h-16 md:opacity-100",
          // On mobile, hide the top row if not at the top
          isAtTop ? "h-16 opacity-100" : "h-0 opacity-0 md:h-16 md:opacity-100",
        )}
      >
        <div className="flex items-center gap-3 md:hidden">
          <MobileNavbar />
          <BrandLink className="shrink-0" />
        </div>
        <div className="hidden md:flex">
          <BrandLink className="shrink-0" />
        </div>
        <DesktopNavbar />
        <SearchBar className="mx-auto hidden max-w-xl md:flex" />
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            asChild
          >
            <Link href="/dashboard/wishlist" aria-label="Wishlist">
              <HeartIcon />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            asChild
          >
            <Link href="/dashboard/cart" aria-label="Cart">
              <ShoppingCartIcon />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href="/notifications/all" aria-label="Notifications">
              <BellIcon />
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="inline-flex" asChild>
            <Link href="/auth/login">
              <UserIcon className="mr-2 size-4" />
              <span className="hidden md:inline">Sign in</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="boimix-container-wide pb-2 md:hidden">
        <SearchBar />
      </div>
      <QuickNavBar />
    </header>
  );
}
