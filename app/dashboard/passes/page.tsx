"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Ticket,
  Crown,
  Zap,
  CheckCircle2,
  Plus,
  ArrowRight,
  History,
  Building,
  ArrowUpRight,
  Coins,
  Wallet,
  Lock,
  Clock,
  Sparkles,
  Info,
  BadgeCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ActivePassWalletItem {
  id: string;
  name: string;
  type: "standard" | "vip";
  durationDays: number;
  borrowLimit: string;
  expires: string;
  status: "Ready";
}

const MOCK_ACTIVE_PASSES: ActivePassWalletItem[] = [
  {
    id: "#PASS-8841",
    name: "Standard Borrow Pass",
    type: "standard",
    durationDays: 14,
    borrowLimit: "৳ 1,000",
    expires: "15 Aug 2026",
    status: "Ready",
  },
  {
    id: "#PASS-9902",
    name: "VIP Express Borrow Pass",
    type: "vip",
    durationDays: 21,
    borrowLimit: "৳ 2,000",
    expires: "30 Aug 2026",
    status: "Ready",
  },
];

const MOCK_SATISFYING_HISTORY = [
  {
    id: "#PASS-7712",
    bookTitle: "Atomic Habits",
    borrowedDate: "10 Jul 2026",
    returnedDate: "24 Jul 2026",
    status: "On Time",
    xpEarned: "+50 XP",
  },
  {
    id: "#PASS-6620",
    bookTitle: "The Psychology of Money",
    borrowedDate: "25 Jun 2026",
    returnedDate: "09 Jul 2026",
    status: "On Time",
    xpEarned: "+50 XP",
  },
  {
    id: "#PASS-5541",
    bookTitle: "Deep Work",
    borrowedDate: "12 May 2026",
    returnedDate: "26 May 2026",
    status: "On Time",
    xpEarned: "+50 XP",
  },
];

export default function MembershipWalletDashboardPage() {
  const [passes] = useState<ActivePassWalletItem[]>(MOCK_ACTIVE_PASSES);

  // Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    price: string;
    type: "pass" | "membership";
    details?: string;
  } | null>(null);

  const handleOpenCheckout = (
    title: string,
    price: string,
    type: "pass" | "membership",
    details?: string,
  ) => {
    setSelectedItem({ title, price, type, details });
    setCheckoutModalOpen(true);
  };

  // Borrow capacity math (Deposit 1000, Locked 380, Available 620)
  const depositLimit = 1000;
  const lockedLimit = 380;
  const availableLimit = depositLimit - lockedLimit;
  const capacityPercent = Math.round((availableLimit / depositLimit) * 100);

  return (
    <div className="space-y-6 pb-16 sm:space-y-8">
      {/* Top Bar Navigation */}
      <div className="border-border/50 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <Wallet className="text-primary h-7 w-7" /> Membership & Wallet Hub
          </h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Manage long-term memberships, borrow passes, borrowing capacity, and
            wallet balance.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/explore/central-library/memberships"
            className="border-border bg-card text-foreground hover:bg-muted inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors"
          >
            <Building className="text-primary h-4 w-4" /> How Borrowing Works{" "}
            <ArrowUpRight className="text-muted-foreground h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() =>
              handleOpenCheckout(
                "Standard Pass",
                "৳ 70",
                "pass",
                "4 Books • 1 Month Validity",
              )
            }
            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 shadow-md transition-all hover:bg-amber-300 active:scale-95 sm:text-sm"
          >
            <Plus className="h-4 w-4 stroke-[3]" /> Top Up Pass
          </button>
        </div>
      </div>

      {/* 1. HERO CARD VISUAL HIERARCHY */}
      <div className="via-primary relative space-y-5 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 to-purple-950 p-6 text-white shadow-xl sm:p-7">
        <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        {/* Top Tier Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Avatar className="h-14 w-14 shrink-0 border-2 border-amber-400 shadow-md">
              <AvatarImage
                src="https://i.pravatar.cc/150?u=roni"
                alt="Roni Ahamed"
              />
              <AvatarFallback className="text-foreground font-bold">
                RA
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-black text-white sm:text-2xl">
                Roni Ahamed
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-black text-slate-950 shadow-xs">
                <Crown className="h-3.5 w-3.5 fill-slate-950" /> ⭐ Premium
                Member
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 px-3.5 py-1.5 text-right backdrop-blur-md">
            <p className="text-[10px] font-semibold tracking-wider text-white/70 uppercase">
              Active Passes
            </p>
            <p className="flex items-center justify-end gap-1 text-lg font-black text-amber-300">
              <Ticket className="h-4 w-4" /> 2 Passes
            </p>
          </div>
        </div>

        {/* Separator Divider 1 */}
        <div className="border-t border-white/15" />

        {/* Row 1 Details */}
        <div className="relative z-10 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          <div>
            <p className="text-[11px] font-medium text-white/70">
              Verification
            </p>
            <p className="flex items-center gap-1 font-extrabold text-emerald-300">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified Member
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-white/70">Member ID</p>
            <p className="font-mono font-extrabold text-amber-200">
              BD-LIB-88421
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-white/70">
              Membership Level
            </p>
            <p className="font-extrabold text-white">৳ 1,000 (Standard)</p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-white/70">
              Borrow Limit
            </p>
            <p className="font-extrabold text-white">Up to ৳ 1,000 / book</p>
          </div>
        </div>

        {/* Separator Divider 2 */}
        <div className="border-t border-white/15" />

        {/* Row 2 Footer Info */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs text-white/80">
          <span>
            📅 Valid Until: <strong className="text-white">15 Aug 2026</strong>{" "}
            (4-Year Plan)
          </span>
          <span className="font-bold text-amber-300">
            ⚡ 0% Platform Commission Included
          </span>
        </div>
      </div>

      {/* CONCEPTUAL DISTINCTION EXPLANATION BANNER */}
      <div className="bg-muted/50 border-border/70 space-y-2 rounded-2xl border p-4 text-xs">
        <div className="text-foreground flex items-center gap-2 font-extrabold">
          <Info className="text-primary h-4 w-4" /> How BoiMix Membership &
          Passes Work Together
        </div>

        <div className="grid gap-3 pt-1 sm:grid-cols-2">
          <div className="bg-card border-border/60 space-y-1 rounded-xl border p-3">
            <p className="text-foreground flex items-center gap-1.5 font-bold">
              <Lock className="text-primary h-3.5 w-3.5" /> 🔒 Membership
              (Long-Term)
            </p>
            <ul className="text-muted-foreground list-inside list-disc space-y-0.5 text-[11px] font-medium">
              <li>One-time fee valid for 4 years</li>
              <li>Determines your max book price borrow limit</li>
              <li>Includes welcome gifts & free monthly donated book</li>
            </ul>
          </div>

          <div className="bg-card border-border/60 space-y-1 rounded-xl border p-3">
            <p className="text-foreground flex items-center gap-1.5 font-bold">
              <Ticket className="h-3.5 w-3.5 text-amber-500" /> 🎫 Borrow Passes
              (Consumable)
            </p>
            <ul className="text-muted-foreground list-inside list-disc space-y-0.5 text-[11px] font-medium">
              <li>Required to order & borrow books online</li>
              <li>Available in 2, 4, or 7 book top-up packages</li>
              <li>Valid for 1 to 2 months per package</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. WALLET SUMMARY FINANCIAL BREAKDOWN */}
      <div className="space-y-3">
        <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
          <Wallet className="text-primary h-5 w-5" /> Financial Wallet Breakdown
        </h2>

        <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
            <p className="text-muted-foreground text-[11px] font-semibold">
              Refundable Deposit
            </p>
            <p className="text-foreground text-xl font-black">৳ 1,000</p>
            <p className="text-muted-foreground text-[10px]">
              Settled after 4 years
            </p>
          </div>

          <div className="bg-card border-primary/50 space-y-1 rounded-2xl border-2 p-4 shadow-2xs">
            <p className="text-muted-foreground text-[11px] font-semibold">
              Available Credit
            </p>
            <p className="text-primary text-xl font-black">
              ৳ {availableLimit}
            </p>
            <p className="text-[10px] font-bold text-emerald-600">
              Ready to borrow
            </p>
          </div>

          <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
            <p className="text-muted-foreground text-[11px] font-semibold">
              Pending Refund
            </p>
            <p className="text-xl font-black text-amber-600">৳ 300</p>
            <p className="text-muted-foreground text-[10px]">
              In Escrow processing
            </p>
          </div>

          <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
            <p className="text-muted-foreground text-[11px] font-semibold">
              Rewards & Coins
            </p>
            <p className="flex items-center gap-1 text-xl font-black text-purple-600">
              <Coins className="h-4 w-4" /> 150 Pts
            </p>
            <p className="text-[10px] font-bold text-purple-600">
              +120 Level XP
            </p>
          </div>
        </div>
      </div>

      {/* 3. BORROW CAPACITY PROGRESS CARD */}
      <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-5 shadow-2xs">
        <div className="border-border/40 flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
              <Lock className="h-5 w-5 text-emerald-500" /> Live Borrow Capacity
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Track how much of your ৳ 1,000 limit is currently available or
              locked in active loans.
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-bold text-emerald-600">
            {capacityPercent}% Available
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
            <div
              className="to-primary h-full rounded-full bg-gradient-to-r from-emerald-500 transition-all duration-500"
              style={{ width: `${capacityPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 pt-1 text-xs">
            <div>
              <p className="text-muted-foreground text-[11px]">
                Available Limit
              </p>
              <p className="text-sm font-extrabold text-emerald-600">
                ৳ {availableLimit}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-[11px]">Maximum Limit</p>
              <p className="text-foreground text-sm font-extrabold">
                ৳ {depositLimit}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-[11px]">
                Currently Locked
              </p>
              <p className="text-sm font-extrabold text-amber-600">
                ৳ {lockedLimit}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/40 text-muted-foreground flex items-center justify-between rounded-xl p-3 text-xs font-medium">
          <span>
            🔒 Locked by active loan: <strong>Atomic Habits</strong> (৳ 380
            value)
          </span>
          <span className="text-foreground text-[11px] font-bold">
            Unlocks upon return
          </span>
        </div>
      </div>

      {/* 4. QUICK BUY PASS STORE */}
      <div className="space-y-4 pt-2">
        <div className="border-border/50 flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
              <Zap className="h-5 w-5 text-amber-500" /> Quick Buy Pass Store
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              1-tap pass top-ups to order books whenever you need them.
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600">
            Instant Top-Up
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Mini Pass */}
          <div className="bg-card border-border/70 hover:border-primary/40 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs transition-all">
            <div className="space-y-2">
              <div className="bg-primary/10 text-primary inline-block rounded-full px-2.5 py-0.5 text-[11px] font-extrabold">
                Mini Pack
              </div>
              <h3 className="text-foreground text-base font-extrabold">
                Mini Pass
              </h3>
              <p className="text-foreground text-2xl font-black">
                ৳ 40{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  / 2 books
                </span>
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                🕒 Valid for 1 Month
              </p>
            </div>
            <button
              onClick={() =>
                handleOpenCheckout(
                  "Mini Pass",
                  "৳ 40",
                  "pass",
                  "2 Books Capacity • 1 Month Validity",
                )
              }
              className="bg-primary/10 text-primary hover:bg-primary/20 w-full rounded-xl py-2 text-xs font-bold transition-transform active:scale-95"
            >
              Buy Mini (৳ 40)
            </button>
          </div>

          {/* Standard Pass (Most Popular) */}
          <div className="bg-card relative flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border-2 border-amber-500 p-5 shadow-md">
            <span className="absolute top-0 right-0 rounded-bl-xl bg-amber-500 px-3 py-0.5 text-[10px] font-black tracking-wider text-slate-950 uppercase">
              Popular
            </span>
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-700 dark:text-amber-300">
                Best Seller
              </div>
              <h3 className="text-foreground text-base font-extrabold">
                Standard Pass
              </h3>
              <p className="text-foreground text-2xl font-black">
                ৳ 70{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  / 4 books
                </span>
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                🕒 Valid for 1 Month
              </p>
            </div>
            <button
              onClick={() =>
                handleOpenCheckout(
                  "Standard Pass",
                  "৳ 70",
                  "pass",
                  "4 Books Capacity • 1 Month Validity",
                )
              }
              className="w-full rounded-xl bg-amber-500 py-2 text-xs font-black text-slate-950 shadow-xs transition-transform hover:bg-amber-400 active:scale-95"
            >
              Buy Standard (৳ 70)
            </button>
          </div>

          {/* Pro Pass (Best Value) */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs transition-all hover:border-emerald-500/40">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-600">
                Best Value
              </div>
              <h3 className="text-foreground text-base font-extrabold">
                Pro Pass
              </h3>
              <p className="text-foreground text-2xl font-black">
                ৳ 100{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  / 7 books
                </span>
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                🕒 Valid for 2 Months
              </p>
            </div>
            <button
              onClick={() =>
                handleOpenCheckout(
                  "Pro Pass",
                  "৳ 100",
                  "pass",
                  "7 Books Capacity • 2 Months Validity",
                )
              }
              className="w-full rounded-xl bg-emerald-500 py-2 text-xs font-extrabold text-white shadow-xs transition-transform hover:bg-emerald-600 active:scale-95"
            >
              Buy Pro (৳ 100)
            </button>
          </div>
        </div>
      </div>

      {/* 5. REDESIGNED BENEFIT-FIRST MEMBERSHIP CARDS */}
      <div className="space-y-4 pt-2">
        <div className="border-border/50 flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
              <Building className="text-primary h-5 w-5" /> One-Time Library
              Membership Plans
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Lead with borrow limits and reading benefits. Valid for 4 years.
            </p>
          </div>
          <span className="text-primary bg-primary/10 rounded-full px-2.5 py-1 text-xs font-bold">
            4-Year Membership
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Basic Member Card */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-[10px] font-extrabold">
                  Casual Reader
                </span>
                <span className="text-muted-foreground text-[10px] font-bold">
                  🕒 4 Years
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-base font-extrabold">
                  Basic Member
                </h3>
                <p className="text-foreground pt-1 text-2xl font-black">
                  ৳ 500{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    / one-time
                  </span>
                </p>
              </div>

              <div className="border-border/40 space-y-2 border-t pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borrow Limit:</span>
                  <strong className="text-foreground">৳ 500 / book</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Borrow Duration:
                  </span>
                  <strong className="text-foreground">14 Days</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Welcome Gift:</span>
                  <strong className="text-emerald-600">5 Free Books</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                handleOpenCheckout(
                  "Basic Membership",
                  "৳ 500",
                  "membership",
                  "Borrow limit up to ৳500 • 4 Years Valid",
                )
              }
              className="bg-muted hover:bg-muted/80 text-foreground w-full rounded-xl py-2 text-xs font-bold"
            >
              Choose Basic
            </button>
          </div>

          {/* Standard Member Card (Recommended) */}
          <div className="bg-card border-primary relative flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border-2 p-5 shadow-md">
            <span className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-xl px-3 py-0.5 text-[10px] font-black uppercase">
              Recommended
            </span>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="bg-primary/15 text-primary rounded-full px-2.5 py-0.5 text-[10px] font-extrabold">
                  Active Tier
                </span>
                <span className="text-primary text-[10px] font-bold">
                  🕒 4 Years
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-base font-extrabold">
                  Standard Member
                </h3>
                <p className="text-foreground pt-1 text-2xl font-black">
                  ৳ 1,000{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    / one-time
                  </span>
                </p>
              </div>

              <div className="border-border/40 space-y-2 border-t pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borrow Limit:</span>
                  <strong className="text-foreground">৳ 1,000 / book</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority Queue:</span>
                  <strong className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Included
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Welcome Gift:</span>
                  <strong className="text-emerald-600">5 Free Books</strong>
                </div>
              </div>
            </div>

            <button
              disabled
              className="bg-primary/20 text-primary w-full cursor-default rounded-xl py-2 text-xs font-black"
            >
              Current Active Tier
            </button>
          </div>

          {/* Premium Member Card */}
          <div className="bg-card border-border/70 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs transition-all hover:border-purple-500/40">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-purple-600">
                  VIP Reader
                </span>
                <span className="text-[10px] font-bold text-purple-600">
                  🕒 4 Years
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-base font-extrabold">
                  Premium Member
                </h3>
                <p className="text-foreground pt-1 text-2xl font-black">
                  ৳ 2,000{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    / one-time
                  </span>
                </p>
              </div>

              <div className="border-border/40 space-y-2 border-t pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borrow Limit:</span>
                  <strong className="text-purple-600">৳ 2,000+ / book</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority Queue:</span>
                  <strong className="font-bold text-purple-600">
                    Express VIP
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VIP Badge:</span>
                  <strong className="flex items-center gap-1 text-amber-500">
                    <Sparkles className="h-3.5 w-3.5" /> Included
                  </strong>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                handleOpenCheckout(
                  "Premium Membership Upgrade",
                  "৳ 1,000 (Top-Up)",
                  "membership",
                  "Upgrades limit from ৳1,000 to ৳2,000+ • 4 Years Valid",
                )
              }
              className="w-full rounded-xl bg-purple-600 py-2 text-xs font-extrabold text-white shadow-xs transition-transform active:scale-95"
            >
              Upgrade Tier (৳ 1,000)
            </button>
          </div>
        </div>
      </div>

      {/* 6. SELF-EXPLAINING ACTIVE PASS WALLET */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground flex items-center gap-2 text-base font-bold sm:text-lg">
            <Ticket className="h-5 w-5 text-emerald-500" /> Active Pass Wallet (
            {passes.length})
          </h2>
          <span className="text-muted-foreground text-xs font-semibold">
            Cards explain full borrowing terms
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className="bg-card border-border/70 hover:border-primary/40 relative space-y-3 overflow-hidden rounded-2xl border p-5 shadow-2xs transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`rounded-xl p-2.5 ${pass.type === "vip" ? "bg-amber-400/20 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`}
                  >
                    {pass.type === "vip" ? (
                      <Crown className="h-5 w-5" />
                    ) : (
                      <Ticket className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-foreground text-sm font-bold">
                      {pass.name}
                    </h3>
                    <p className="text-muted-foreground font-mono text-[11px]">
                      {pass.id}
                    </p>
                  </div>
                </div>

                <span className="bg-success/15 text-success flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-extrabold">
                  <CheckCircle2 className="h-3 w-3" /> Ready
                </span>
              </div>

              {/* Self-explaining details grid */}
              <div className="border-border/40 grid grid-cols-3 gap-2 border-t pt-2 text-xs">
                <div>
                  <p className="text-muted-foreground text-[10px]">
                    Loan Duration
                  </p>
                  <p className="text-foreground flex items-center gap-1 font-extrabold">
                    <Clock className="text-primary h-3 w-3" />{" "}
                    {pass.durationDays} Days
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px]">
                    Borrow Limit
                  </p>
                  <p className="text-foreground font-extrabold">
                    {pass.borrowLimit}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px]">
                    Expires On
                  </p>
                  <p className="text-foreground font-extrabold">
                    {pass.expires}
                  </p>
                </div>
              </div>

              <div className="border-border/40 flex items-center justify-between border-t pt-2 text-xs">
                <span className="text-muted-foreground text-[11px]">
                  0% Platform Fee • Escrow Protected
                </span>
                <Link
                  href="/books?type=borrow"
                  className="text-primary flex items-center gap-1 font-bold hover:underline"
                >
                  Use Pass <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. SATISFYING USAGE HISTORY LOG */}
      <div className="bg-card border-border/70 space-y-4 rounded-2xl border p-5 shadow-2xs">
        <div className="border-border/40 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <History className="text-primary h-5 w-5" />
            <h2 className="text-foreground text-base font-bold sm:text-lg">
              Satisfying Usage History Log
            </h2>
          </div>
          <span className="text-muted-foreground text-xs font-semibold">
            3 Completed Loans
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-border/40 text-muted-foreground border-b text-[11px] uppercase">
                <th className="pb-2 font-bold">Book Title & ID</th>
                <th className="pb-2 font-bold">Borrowed</th>
                <th className="pb-2 font-bold">Returned</th>
                <th className="pb-2 font-bold">Status</th>
                <th className="pb-2 text-right font-bold">XP Earned</th>
              </tr>
            </thead>
            <tbody className="divide-border/30 divide-y">
              {MOCK_SATISFYING_HISTORY.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="text-foreground flex items-center gap-2 py-3 font-bold">
                    <span className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                      {item.id}
                    </span>
                    {item.bookTitle}
                  </td>
                  <td className="text-muted-foreground py-3 font-medium">
                    {item.borrowedDate}
                  </td>
                  <td className="text-muted-foreground py-3 font-medium">
                    {item.returnedDate}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" /> {item.status} On Time
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-emerald-600">
                    {item.xpEarned}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Modal Dialog */}
      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
        {selectedItem && (
          <DialogContent className="max-w-md space-y-4 rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-extrabold">
                <Ticket className="h-5 w-5 text-amber-500" /> Confirm Order
                Checkout
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs">
                You are purchasing {selectedItem.title} ({selectedItem.price})
              </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/40 border-border/50 space-y-2 rounded-xl border p-4 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">Item Name:</span>
                <span className="text-foreground font-bold">
                  {selectedItem.title}
                </span>
              </div>
              {selectedItem.details && (
                <div className="flex justify-between font-semibold">
                  <span className="text-muted-foreground">Perks / Terms:</span>
                  <span className="text-foreground font-bold">
                    {selectedItem.details}
                  </span>
                </div>
              )}
              <div className="border-border/30 flex justify-between border-t pt-2 font-semibold">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-bold text-emerald-600">
                  bKash Escrow / Nagad
                </span>
              </div>
              <div className="border-border/30 text-foreground flex justify-between border-t pt-2 text-sm font-extrabold">
                <span>Total Amount:</span>
                <span className="text-primary">{selectedItem.price}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  alert(
                    `Successfully processed ${selectedItem.title}! Updated in your active BoiMix Membership & Wallet.`,
                  );
                  setCheckoutModalOpen(false);
                }}
                className="bg-primary text-primary-foreground w-full rounded-xl py-2.5 text-xs font-bold shadow-md transition-transform active:scale-95"
              >
                Pay & Confirm
              </button>

              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="bg-muted text-foreground w-full rounded-xl py-2 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
