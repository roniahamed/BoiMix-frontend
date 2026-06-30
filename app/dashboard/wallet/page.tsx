"use client";

import { useBorrowStore } from "@/lib/store/use-borrow-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  PlusCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/lib/api-client";

export default function WalletPage() {
  const { wallet } = useBorrowStore();

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(),
  });

  const totalDeposit = wallet.availableLimit + wallet.locked;

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <div className="mb-8 flex items-center">
        <Link href="/dashboard" className="mr-3">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="mr-8 flex-1 text-center text-xl font-bold">Wallet</h1>
      </div>

      {/* Wallet Debit Card Style */}
      <Card className="relative mb-8 overflow-hidden rounded-2xl border-none bg-blue-600 text-white shadow-lg">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="90" cy="30" r="80" stroke="white" strokeWidth="20" />
            <circle cx="30" cy="90" r="40" stroke="white" strokeWidth="20" />
          </svg>
        </div>
        <CardContent className="relative z-10 p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm text-blue-100">Total Deposit</p>
              <h2 className="text-3xl font-bold">
                ৳{totalDeposit.toLocaleString()}
              </h2>
            </div>
            <div className="rounded-full bg-white/20 p-2">
              <CheckCircle2 className="size-5 text-white" />
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>{" "}
                Locked
              </span>
              <span className="font-medium">
                ৳{wallet.locked.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>{" "}
                Available Limit
              </span>
              <span className="font-medium">
                ৳{wallet.availableLimit.toLocaleString()}
              </span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-green-400"
                style={{
                  width: `${(wallet.availableLimit / totalDeposit) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-blue-100">
            Use this limit to borrow more books.
          </p>
        </CardContent>
      </Card>

      <div className="mb-10 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full shadow-sm"
          >
            <PlusCircle className="size-5 text-blue-600" />
          </Button>
          <span className="text-center text-xs font-medium">Add Deposit</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full shadow-sm"
          >
            <ArrowDownToLine className="size-5 text-blue-600" />
          </Button>
          <span className="text-center text-xs font-medium">
            Transaction
            <br />
            History
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full shadow-sm"
          >
            <ArrowUpFromLine className="size-5 text-blue-600" />
          </Button>
          <span className="text-center text-xs font-medium">Withdraw</span>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between">
          <h3 className="font-bold">Recent Transactions</h3>
          <Link href="#" className="text-xs font-semibold text-blue-600">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {transactions.map((tx: any) => (
            <div
              key={tx.id}
              className="bg-card flex items-center justify-between rounded-xl border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-muted rounded-lg p-2">
                  <ArrowDownToLine className="text-muted-foreground size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{tx.type}</p>
                  <p className="text-muted-foreground text-xs">{tx.orderId}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "text-sm font-bold",
                    tx.amount > 0 ? "text-green-600" : "text-red-500",
                  )}
                >
                  {tx.amount > 0 ? "+" : ""}৳{Math.abs(tx.amount)}
                </p>
                <p className="text-muted-foreground text-xs">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
