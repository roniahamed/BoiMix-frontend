import Link from "next/link";
import { BellIcon, HeartIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

import { BrandLink } from "@/components/layout/brand-link";
import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { QuickNavBar } from "@/components/layout/quick-nav-bar";
import { SearchBar } from "@/components/layout/search-bar";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="bg-card/95 supports-[backdrop-filter]:bg-card/85 sticky top-0 z-40 border-b shadow-xs backdrop-blur">
      <div className="boimix-container-wide flex h-16 items-center gap-3">
        <MobileNavbar />
        <BrandLink className="shrink-0" />
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
              <UserIcon className="mr-0 size-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign in</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="boimix-container-wide pb-3 md:hidden">
        <SearchBar />
      </div>
      <QuickNavBar />
    </header>
  );
}
