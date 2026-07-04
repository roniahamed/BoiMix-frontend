import {
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  BookPlusIcon,
  ClipboardListIcon,
  HeartIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  MessageSquareIcon,
  PackageIcon,
  Repeat2Icon,
  SettingsIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SlidersHorizontalIcon,
  TriangleAlertIcon,
  UserIcon,
  UsersRoundIcon,
  StarIcon,
  ActivityIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: NavIcon;
};

export const primaryNavItems: NavItem[] = [
  { title: "Home", href: "/", icon: HomeIcon },
  { title: "Books", href: "/books", icon: BookOpenIcon },
  {
    title: "Central Library",
    href: "/books?type=borrow",
    icon: LibraryIcon,
  },
  { title: "Marketplace", href: "/books?type=sell", icon: ShoppingCartIcon },
  { title: "Swaps", href: "/books?type=swap", icon: Repeat2Icon },
  { title: "Community", href: "/community", icon: UsersRoundIcon },
];

export const megaMenuItems: NavItem[] = [
  {
    title: "Borrow Books",
    href: "/books?type=borrow",
    description: "Browse official BoiMix library inventory.",
    icon: LibraryIcon,
  },
  {
    title: "Buy Books",
    href: "/books?type=sell",
    description: "Explore marketplace books from BoiMix and readers.",
    icon: ShoppingCartIcon,
  },
  {
    title: "Swap Books",
    href: "/books?type=swap",
    description: "Find peer-to-peer exchange opportunities.",
    icon: Repeat2Icon,
  },
  {
    title: "Reader Community",
    href: "/community",
    description: "Follow reader activity, reviews, and discussions.",
    icon: UsersRoundIcon,
  },
];

export const mobileBottomNavItems: NavItem[] = [
  { title: "Home", href: "/", icon: HomeIcon },
  { title: "Wishlist", href: "/wishlist", icon: HeartIcon },
  { title: "Add Book", href: "#add", icon: BookPlusIcon },
  { title: "Alerts", href: "/notifications/all", icon: BellIcon },
  { title: "Profile", href: "/dashboard/overview", icon: UserIcon },
];

export const dashboardNavItems: NavItem[] = [
  { title: "Overview", href: "/dashboard/overview", icon: LayoutDashboardIcon },
  { title: "My Library", href: "/dashboard/library", icon: LibraryIcon },
  { title: "Requests", href: "/dashboard/requests", icon: ClipboardListIcon },
  { title: "Wishlist", href: "/wishlist", icon: HeartIcon },
  { title: "Cart", href: "/dashboard/cart", icon: ShoppingCartIcon },
  { title: "Borrowed", href: "/dashboard/borrowed", icon: BookOpenIcon },
  { title: "Swaps", href: "/dashboard/swaps", icon: Repeat2Icon },
  { title: "Purchases", href: "/dashboard/purchases", icon: PackageIcon },
  { title: "Sales", href: "/dashboard/sales", icon: BarChart3Icon },
  { title: "Reviews", href: "/dashboard/reviews", icon: StarIcon },
  { title: "Messages", href: "/dashboard/messages", icon: MessageSquareIcon },
  { title: "Notifications", href: "/dashboard/notifications", icon: BellIcon },
  { title: "Analytics", href: "/dashboard/analytics", icon: ActivityIcon },
  { title: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
  { title: "Security", href: "/dashboard/security", icon: ShieldCheckIcon },
  { title: "Followers", href: "/dashboard/followers", icon: UsersRoundIcon },
  { title: "Following", href: "/dashboard/following", icon: UserIcon },
];

export const adminNavItems: NavItem[] = [
  { title: "Overview", href: "/admin/overview", icon: LayoutDashboardIcon },
  { title: "Users", href: "/admin/users", icon: UsersRoundIcon },
  {
    title: "Books",
    href: "/admin/books/official-inventory",
    icon: LibraryIcon,
  },
  { title: "Borrow", href: "/admin/borrow", icon: BookOpenIcon },
  { title: "Sales", href: "/admin/sales", icon: ShoppingCartIcon },
  { title: "Reports", href: "/admin/reports", icon: TriangleAlertIcon },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3Icon },
  { title: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

export const moderatorNavItems: NavItem[] = [
  { title: "Reports", href: "/mod/reports", icon: TriangleAlertIcon },
  { title: "Disputes", href: "/mod/disputes", icon: ClipboardListIcon },
  { title: "Flagged Users", href: "/mod/flagged-users", icon: UsersRoundIcon },
  { title: "Flagged Books", href: "/mod/flagged-books", icon: BookOpenIcon },
  {
    title: "Verification",
    href: "/mod/verification-queue",
    icon: ShieldCheckIcon,
  },
  { title: "Slider", href: "/mod/slider", icon: SlidersHorizontalIcon },
];

export const footerSections = [
  {
    title: "Explore",
    links: [
      { title: "Central Library", href: "/books?type=borrow" },
      { title: "Book Store", href: "/books?type=sell" },
      { title: "Book Swaps", href: "/books?type=swap" },
      { title: "Top Readers", href: "/top-readers" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "How It Works", href: "/how-it-works" },
      { title: "Trust & Safety", href: "/trust-safety" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "FAQ", href: "/faq" },
      { title: "Guidelines", href: "/community-guidelines" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
] as const;
