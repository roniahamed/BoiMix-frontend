"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  Landmark,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data
const WALLET_DATA = {
  available: 2450.0,
  inEscrow: 1200.0,
  totalEarnings: 8500.0,
};

const TRANSACTIONS = [
  {
    id: "TRX-9823",
    type: "sale",
    amount: 450,
    status: "completed",
    date: "Oct 26, 2024",
    title: "Sale: Atomic Habits",
  },
  {
    id: "TRX-9824",
    type: "escrow",
    amount: 350,
    status: "pending",
    date: "Oct 25, 2024",
    title: "Escrow: Deep Work",
  },
  {
    id: "TRX-9825",
    type: "withdrawal",
    amount: -1500,
    status: "completed",
    date: "Oct 20, 2024",
    title: "Withdrawal to bKash",
  },
  {
    id: "TRX-9826",
    type: "sale",
    amount: 320,
    status: "completed",
    date: "Oct 18, 2024",
    title: "Sale: Think and Grow Rich",
  },
];

export default function EarningsWalletPage() {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState<
    "bkash" | "nagad" | "bank"
  >("bkash");

  return (
    <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Earnings & Wallet
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your sales earnings and request payouts to your account.
          </p>
        </div>
        <Button
          onClick={() => setIsWithdrawOpen(true)}
          className="bg-brand-blue hover:bg-brand-blue/90 shadow-brand-blue/20 h-11 rounded-xl px-6 font-bold shadow-lg transition-all active:scale-95"
        >
          <Landmark className="mr-2 h-4 w-4" /> Withdraw Funds
        </Button>
      </div>

      {/* Main Balance Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="from-brand-blue relative overflow-hidden border-0 bg-gradient-to-br to-blue-700 text-white shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet className="h-24 w-24 translate-x-4 -translate-y-4 -rotate-12" />
          </div>
          <CardContent className="relative z-10 p-6">
            <p className="mb-1 text-sm font-medium text-blue-100">
              Available for Withdrawal
            </p>
            <h2 className="mb-4 text-4xl font-black">
              ৳ {WALLET_DATA.available.toLocaleString()}
            </h2>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
              <CheckCircle2 className="h-3.5 w-3.5" /> Ready to cash out
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardContent className="p-6">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-medium">
                Held in Escrow
              </p>
              <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <h2 className="mb-2 text-3xl font-bold">
              ৳ {WALLET_DATA.inEscrow.toLocaleString()}
            </h2>
            <p className="text-muted-foreground max-w-[200px] text-xs leading-relaxed">
              Funds from active orders. Released once the buyer confirms
              delivery.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardContent className="p-6">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-medium">
                Total Lifetime Earnings
              </p>
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <h2 className="mb-2 text-3xl font-bold">
              ৳ {WALLET_DATA.totalEarnings.toLocaleString()}
            </h2>
            <p className="text-muted-foreground max-w-[200px] text-xs leading-relaxed">
              Total money you have earned by selling books on BoiMix.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="mb-4 text-lg font-bold">Recent Transactions</h3>
        <Card className="overflow-hidden shadow-sm">
          <div className="divide-y">
            {TRANSACTIONS.map((tx) => (
              <div
                key={tx.id}
                className="hover:bg-muted/30 flex items-center justify-between p-4 transition-colors sm:p-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      tx.type === "withdrawal"
                        ? "bg-brand-blue/10 text-brand-blue"
                        : tx.type === "escrow"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-emerald-100 text-emerald-600",
                    )}
                  >
                    {tx.type === "withdrawal" ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : tx.type === "escrow" ? (
                      <Clock className="h-5 w-5" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold sm:text-base">
                      {tx.title}
                    </p>
                    <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-xs">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span>{tx.id}</span>
                      {tx.status === "pending" && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-amber-600">
                            Pending Release
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "text-base font-bold sm:text-lg",
                      tx.amount > 0
                        ? tx.type === "escrow"
                          ? "text-foreground"
                          : "text-emerald-600"
                        : "text-foreground",
                    )}
                  >
                    {tx.amount > 0 ? "+" : ""}৳
                    {Math.abs(tx.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-muted/20 border-t p-4 text-center">
            <Button
              variant="ghost"
              className="text-brand-blue hover:text-brand-blue/80 hover:bg-brand-blue/10 font-bold"
            >
              View All Transactions <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Transfer your available balance to your mobile wallet or bank
              account.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="bg-muted/50 flex items-center justify-between rounded-xl border p-4">
              <span className="text-muted-foreground text-sm font-medium">
                Available Balance
              </span>
              <span className="text-xl font-bold">
                ৳ {WALLET_DATA.available.toLocaleString()}
              </span>
            </div>

            <div className="space-y-3">
              <Label>Select Payout Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setWithdrawMethod("bkash")}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all",
                    withdrawMethod === "bkash"
                      ? "border-pink-500 bg-pink-500/5 text-pink-700"
                      : "border-border hover:border-pink-500/50",
                  )}
                >
                  <Smartphone className="h-6 w-6" />
                  <span className="text-sm font-semibold">bKash</span>
                </button>
                <button
                  onClick={() => setWithdrawMethod("nagad")}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all",
                    withdrawMethod === "nagad"
                      ? "border-orange-500 bg-orange-500/5 text-orange-700"
                      : "border-border hover:border-orange-500/50",
                  )}
                >
                  <Smartphone className="h-6 w-6" />
                  <span className="text-sm font-semibold">Nagad</span>
                </button>
              </div>
              <button
                onClick={() => setWithdrawMethod("bank")}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all",
                  withdrawMethod === "bank"
                    ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                    : "border-border hover:border-brand-blue/50",
                )}
              >
                <Building2 className="h-5 w-5" />
                <span className="flex-1 text-left text-sm font-semibold">
                  Bank Transfer
                </span>
                <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px]">
                  Takes 2-3 days
                </span>
              </button>
            </div>

            <div className="space-y-3">
              <Label>Amount to Withdraw</Label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 font-bold">
                  ৳
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-8 text-lg font-bold"
                />
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Minimum withdrawal amount is ৳ 500</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button variant="ghost" onClick={() => setIsWithdrawOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-brand-blue hover:bg-brand-blue/90 font-bold text-white shadow-md">
              Confirm Withdrawal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
