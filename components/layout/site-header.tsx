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
import { useMessageStore } from "@/lib/store/use-message-store";
import { useExchangeStore } from "@/lib/store/use-exchange-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  LayoutDashboard,
  Settings,
  MessageSquare,
  Library,
  User as UserIconOutline,
  Repeat2,
  Wallet,
  ChevronRight,
  BookDown,
  BookUp,
  ShoppingCart,
  Package,
} from "lucide-react";

function UserMenuButton() {
  const { isAuthenticated, user, clearSession } = useAuthStore();
  const unreadMessages = useMessageStore((s) => s.unreadCount);
  const pendingExchanges = useExchangeStore(
    (s) => s.exchanges.filter((e) => e.status === "pending_proposal").length,
  );
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="bg-muted h-9 w-9 animate-pulse rounded-full" />;

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
            <AvatarImage
              src={user?.avatarUrl || ""}
              alt={user?.name || "User"}
            />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          {(unreadMessages > 0 || pendingExchanges > 0) && (
            <>
              <span className="bg-destructive absolute top-0 right-0 h-3 w-3 animate-ping rounded-full opacity-75" />
              <span className="bg-destructive border-background absolute top-0 right-0 h-3 w-3 rounded-full border-2" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user?.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40 my-1" />
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/overview"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <LayoutDashboard className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">Dashboard</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href={`/u/${user?.username}`}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <UserIconOutline className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">My Profile</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/40 my-1" />

        {/* Group 2: Library & Exchange */}
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/library"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <Library className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">My Books</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/borrowed"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <BookDown className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">Borrowed Books</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/lent"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <BookUp className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">Lent Books</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/exchanges"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <Repeat2 className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">Exchanges</span>
            </div>
            {pendingExchanges > 0 ? (
              <span className="flex h-5 items-center justify-center rounded-full bg-orange-100 px-2 text-[10px] font-bold text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                {pendingExchanges} New
              </span>
            ) : (
              <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
            )}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border/40 my-1" />

        {/* Group 3: Commerce */}
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/sales"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <ShoppingCart className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">My Sales</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/orders"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <Package className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">My Orders</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/wallet"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <Wallet className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">Wallet</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border/40 my-1" />

        {/* Group 4: Comm & Settings */}
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/messages"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <MessageSquare className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">Messages</span>
            </div>
            {unreadMessages > 0 ? (
              <span className="bg-primary text-primary-foreground flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold shadow-sm">
                {unreadMessages}
              </span>
            ) : (
              <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
            )}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="group focus:bg-primary/5 focus:text-primary cursor-pointer rounded-md transition-colors"
        >
          <Link
            href="/dashboard/settings"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <Settings className="text-muted-foreground group-hover:text-primary mr-2.5 size-4 transition-colors" />
              <span className="font-medium">Settings</span>
            </div>
            <ChevronRight className="text-muted-foreground/50 size-3.5 opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border/40 my-1" />
        <DropdownMenuItem
          className="group cursor-pointer rounded-md text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-500/10 dark:focus:text-red-300"
          onClick={() => {
            clearSession();
            window.location.reload();
          }}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <LogOut className="mr-2.5 size-4 opacity-70 group-hover:opacity-100" />
              <span className="font-medium">Log out</span>
            </div>
          </div>
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
