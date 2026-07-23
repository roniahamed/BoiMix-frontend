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
  Repeat2Icon,
  SettingsIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SlidersHorizontalIcon,
  TriangleAlertIcon,
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
  badge?: string | number;
  badgeVariant?: "default" | "brand" | "warning" | "success" | "danger";
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const primaryNavItems: NavItem[] = [
  { title: "Home", href: "/", icon: HomeIcon },
  { title: "Books", href: "/books", icon: BookOpenIcon },
  {
    title: "Central Library",
    href: "/explore/central-library",
    icon: LibraryIcon,
  },
  { title: "Marketplace", href: "/books?type=sell", icon: ShoppingCartIcon },
  { title: "Swaps", href: "/explore/swaps", icon: Repeat2Icon },
  { title: "Community", href: "/community", icon: UsersRoundIcon },
];

export const megaMenuItems: NavItem[] = [
  {
    title: "Central Library",
    href: "/explore/central-library",
    description: "Browse official BoiMix library inventory.",
    icon: LibraryIcon,
  },
  {
    title: "Borrow Books",
    href: "/books?type=borrow",
    description: "Borrow books from other readers.",
    icon: BookOpenIcon,
  },
  {
    title: "Buy Books",
    href: "/books?type=sell",
    description: "Explore marketplace books from BoiMix and readers.",
    icon: ShoppingCartIcon,
  },
  {
    title: "Swap Books",
    href: "/explore/swaps",
    description: "Find peer-to-peer exchange opportunities.",
    icon: Repeat2Icon,
  },
];

export const mobileBottomNavItems: NavItem[] = [
  { title: "Home", href: "/", icon: HomeIcon },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquareIcon,
    badge: 5,
    badgeVariant: "brand",
  },
  { title: "Add Book", href: "/books/upload", icon: BookPlusIcon },
  {
    title: "Alerts",
    href: "/dashboard/notifications",
    icon: BellIcon,
    badge: 3,
    badgeVariant: "warning",
  },
  { title: "Menu", href: "/dashboard", icon: LayoutDashboardIcon },
];

export const dashboardNavGroups: NavGroup[] = [
  {
    title: "Overview & Insights",
    items: [
      {
        title: "Overview",
        href: "/dashboard/overview",
        icon: LayoutDashboardIcon,
      },
      { title: "Analytics", href: "/dashboard/analytics", icon: ActivityIcon },
    ],
  },
  {
    title: "My Library",
    items: [
      { title: "My Library", href: "/dashboard/library", icon: LibraryIcon },
      { title: "Add New Book", href: "/books/upload", icon: BookPlusIcon },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Borrowed Books",
        href: "/dashboard/borrowed",
        icon: BookOpenIcon,
        badge: 2,
        badgeVariant: "brand",
      },
      { title: "Lent Books", href: "/dashboard/lent", icon: BookOpenIcon },
      { title: "Active Swaps", href: "/dashboard/swaps", icon: Repeat2Icon },
      {
        title: "Swap Offers",
        href: "/dashboard/swaps/offers",
        icon: ClipboardListIcon,
        badge: 1,
        badgeVariant: "success",
      },
      {
        title: "Customer Orders (Sales)",
        href: "/dashboard/sales",
        icon: ShoppingCartIcon,
        badge: 2,
        badgeVariant: "success",
      },
      {
        title: "My Purchases",
        href: "/dashboard/purchases",
        icon: ShoppingCartIcon,
      },
    ],
  },
  {
    title: "Engagement",
    items: [
      { title: "Wishlist", href: "/dashboard/wishlist", icon: HeartIcon },
      { title: "Reviews", href: "/dashboard/reviews", icon: StarIcon },
      {
        title: "Messages",
        href: "/dashboard/messages",
        icon: MessageSquareIcon,
        badge: 5,
        badgeVariant: "brand",
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: BellIcon,
        badge: 3,
        badgeVariant: "warning",
      },
    ],
  },
  {
    title: "Account & Security",
    items: [
      { title: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
      { title: "Security", href: "/dashboard/security", icon: ShieldCheckIcon },
      {
        title: "Verification",
        href: "/dashboard/verification",
        icon: ShieldCheckIcon,
      },
      { title: "Reports", href: "/dashboard/reports", icon: TriangleAlertIcon },
    ],
  },
];

export const dashboardNavItems: NavItem[] = dashboardNavGroups.flatMap(
  (group) => group.items,
);

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
