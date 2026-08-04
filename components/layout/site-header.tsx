"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { UserIcon, MenuIcon } from "lucide-react";
import { NotificationPopover } from "@/components/notifications/notification-popover";

import { BrandLink } from "@/components/layout/brand-link";
import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { QuickNavBar } from "@/components/layout/quick-nav-bar";
import { SearchBar } from "@/components/layout/search-bar";
import { CartButton } from "@/components/shared/cart-button";
import { MessageIconButton } from "@/components/shared/message-icon-button";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, LayoutDashboard } from "lucide-react";

function UserMenuButton() {
  const { isAuthenticated, user, clearSession } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />;

  if (!isAuthenticated) {
    return (
      <Button variant="outline" size="sm" className="inline-flex" asChild>
        <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
          <UserIcon className="mr-2 size-4" />
          <span className="hidden md:inline">Sign in</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/overview">
            <LayoutDashboard className="mr-2 size-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={() => {
            clearSession();
            window.location.href = "/";
          }}
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);

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
          <WishlistButton className="hidden md:inline-flex" />
          <CartButton className="hidden md:inline-flex" />
          <MessageIconButton className="hidden sm:inline-flex" />
          <div className="hidden sm:inline-flex">
            <NotificationPopover />
          </div>
          
          <UserMenuButton />
        </div>
      </div>
      <div
        className={cn(
          "boimix-container-wide py-2.5 md:hidden",
          isDetailsPage && "hidden",
        )}
      >
        <div className="flex items-center gap-1.5">
          <MobileNavbar>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground h-11 w-11 shrink-0 lg:hidden [&_svg]:!size-7"
              aria-label="Open navigation"
            >
              <MenuIcon />
            </Button>
          </MobileNavbar>
          <Suspense
            fallback={
              <div className="bg-background border-primary/20 mx-1 h-[38px] w-full rounded-full border sm:h-10" />
            }
          >
            <SearchBar
              autoFocus={pathname === "/books/search"}
              className="mx-1 flex-1"
            />
          </Suspense>
          <CartButton className="text-foreground mr-[2px] h-11 w-11 shrink-0 lg:hidden [&_svg]:!size-7" />
        </div>
      </div>
      <div
        className={cn(
          "w-full overflow-hidden",
          (isDetailsPage || isProfilePage) && "max-md:hidden",
        )}
      >
        <QuickNavBar />
      </div>
    </header>
  );
}
