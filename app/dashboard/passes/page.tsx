"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Plus,
  Building,
  ArrowUpRight,
  Info,
  Lock,
  Ticket,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MOCK_ACTIVE_PASSES, ActivePassWalletItem } from "@/lib/data/passes";
import { PassesMembershipCard } from "@/components/dashboard/passes/passes-membership-card";
import { PassesWalletBreakdown } from "@/components/dashboard/passes/passes-wallet-breakdown";
import { PassesStorePlans } from "@/components/dashboard/passes/passes-store-plans";
import { PassesActiveWallet } from "@/components/dashboard/passes/passes-active-wallet";

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
      <PassesMembershipCard />

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

      {/* 2 & 3. WALLET SUMMARY & BORROW CAPACITY */}
      <PassesWalletBreakdown />

      {/* 4 & 5. QUICK BUY PASS STORE & MEMBERSHIP PLANS */}
      <PassesStorePlans onOpenCheckout={handleOpenCheckout} />

      {/* 6 & 7. ACTIVE PASS WALLET & USAGE HISTORY LOG */}
      <PassesActiveWallet passes={passes} />

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
