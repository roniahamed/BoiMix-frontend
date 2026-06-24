"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { BellIcon, HeartIcon, UserIcon, MenuIcon } from "lucide-react";

import { BrandLink } from "@/components/layout/brand-link";
import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { QuickNavBar } from "@/components/layout/quick-nav-bar";
import { SearchBar } from "@/components/layout/search-bar";
import { CartButton } from "@/components/shared/cart-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);

  // Check if we are on a specific book details page (e.g. /books/pather-panchali)
  const nonDetailsRoutes = [
    "upload",
    "search",
    "category",
    "borrow",
    "near-me",
    "new",
    "top-rated",
    "trending",
  ];
  const isDetailsPage =
    pathname.startsWith("/books/") &&
    pathname.split("/").length === 3 &&
    !nonDetailsRoutes.includes(pathname.split("/")[2]);

  const isProfilePage = pathname.startsWith("/u/");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop((prev) => {
        if (prev && currentScrollY > 80) return false;
        if (!prev && currentScrollY < 10) return true;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "bg-card sticky top-0 z-40 border-b shadow-xs",
        isDetailsPage && "max-md:hidden",
      )}
    >
      <div
        className={cn(
          "boimix-container-wide flex items-center gap-3 overflow-hidden transition-all duration-300 ease-in-out md:h-16 md:overflow-visible md:opacity-100",
          isAtTop
            ? "h-12 opacity-100 md:h-16"
            : "h-0 opacity-0 md:h-16 md:opacity-100",
          isDetailsPage && "max-md:hidden", // Hide top row entirely on mobile for details page
        )}
      >
        <div className="flex flex-1 items-center justify-center md:hidden">
          <BrandLink className="shrink-0" />
        </div>
        <div className="hidden md:flex">
          <BrandLink className="shrink-0" />
        </div>
        <DesktopNavbar />
        <Suspense
          fallback={
            <div className="bg-muted mx-auto hidden h-10 w-full max-w-xl rounded-lg md:flex" />
          }
        >
          <SearchBar className="mx-auto hidden max-w-xl md:flex" />
        </Suspense>

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
          <CartButton className="hidden md:inline-flex" />
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
      <div
        className={cn(
          "boimix-container-wide pt-[10px] pb-0 md:hidden",
          isDetailsPage && "hidden",
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 items-center sm:h-10">
            <MobileNavbar>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 sm:h-10 sm:w-10 lg:hidden [&_svg]:!size-5"
                aria-label="Open navigation"
              >
                <MenuIcon />
              </Button>
            </MobileNavbar>
          </div>
          <Suspense
            fallback={
              <div className="bg-muted h-8 w-full rounded-lg sm:h-10" />
            }
          >
            <SearchBar
              autoFocus={pathname === "/books/search"}
              className="flex-1"
            />
          </Suspense>
          <CartButton className="h-8 w-8 shrink-0 sm:h-10 sm:w-10 lg:hidden [&_svg]:!size-5" />
        </div>
      </div>
      <div
        className={cn(
          "w-full",
          (isDetailsPage || isProfilePage) && "max-md:hidden",
        )}
      >
        <QuickNavBar />
      </div>
    </header>
  );
}
