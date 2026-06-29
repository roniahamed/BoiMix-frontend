"use client";

import { useBorrowStore } from "@/lib/store/use-borrow-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert, ShieldCheck, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DepositWalletCard() {
  const { wallet } = useBorrowStore();

  const lockedPercentage = (wallet.locked / wallet.totalDeposit) * 100;

  return (
    <Card className="from-card to-card/50 bg-gradient-to-br shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wallet className="text-primary size-5" />
          Deposit Wallet
        </CardTitle>
        <CardDescription>
          Your security deposit balance limits how many books you can borrow.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 grid grid-cols-2 gap-4 rounded-lg p-4">
          <div className="flex flex-col">
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <ShieldCheck className="size-4 text-green-500" /> Available Limit
            </span>
            <span className="text-foreground text-2xl font-bold">
              ৳{wallet.availableLimit}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <ShieldAlert className="size-4 text-amber-500" /> Locked Deposit
            </span>
            <span className="text-foreground text-2xl font-bold">
              ৳{wallet.locked}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Limit Usage</span>
            <span className="font-medium">{lockedPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={lockedPercentage} className="h-2" />
          <div className="text-muted-foreground text-right text-xs">
            Total Deposit: ৳{wallet.totalDeposit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
