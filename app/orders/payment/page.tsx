"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Lock, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store/use-cart-store";
import { toast } from "sonner";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);

  const method = searchParams.get("method") || "bkash";
  const amount = searchParams.get("amount") || "0";

  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const isBkash = method === "bkash";
  const themeColor = isBkash ? "#E2136E" : "#F7941D";

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber || !pin) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);

    // Simulate API delay
    setTimeout(() => {
      clearCart();
      toast.success("Payment Successful!", {
        description: "Your money is securely held in escrow.",
      });
      router.push("/orders/success");
    }, 2000);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="bg-card w-full max-w-md overflow-hidden rounded-2xl border shadow-lg">
        {/* Header */}
        <div
          className="flex flex-col items-center justify-center p-6 text-white"
          style={{ backgroundColor: themeColor }}
        >
          <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-white/20 text-3xl font-bold backdrop-blur-sm">
            {isBkash ? "b" : "N"}
          </div>
          <h1 className="text-xl font-bold">
            {isBkash ? "bKash" : "Nagad"} Payment Gateway
          </h1>
          <p className="mt-1 text-sm opacity-90">Secure Escrow Transaction</p>
        </div>

        {/* Amount */}
        <div className="bg-muted/20 border-b p-6 text-center">
          <p className="text-muted-foreground text-sm tracking-wider uppercase">
            Amount to Pay
          </p>
          <p className="text-foreground mt-1 text-4xl font-bold">৳{amount}</p>
        </div>

        {/* Form */}
        <form onSubmit={handlePayment} className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="account"
                className="text-muted-foreground text-sm font-medium"
              >
                {isBkash ? "bKash" : "Nagad"} Account Number
              </label>
              <Input
                id="account"
                type="tel"
                placeholder="e.g 01XXXXXXXXX"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                disabled={isProcessing}
                className="h-12 text-center text-lg tracking-widest"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pin"
                className="text-muted-foreground text-sm font-medium"
              >
                PIN Number
              </label>
              <div className="relative">
                <Input
                  id="pin"
                  type="password"
                  placeholder="••••"
                  maxLength={5}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  disabled={isProcessing}
                  className="h-12 text-center text-2xl tracking-[0.5em]"
                />
                <Lock className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2 opacity-50" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isProcessing}
            className="mt-8 h-12 w-full text-lg font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: themeColor }}
          >
            {isProcessing ? "Processing..." : "Confirm Payment"}
          </Button>

          <div className="text-muted-foreground mt-6 flex flex-col items-center justify-center gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="text-success size-4" />
              <span>Secured by BoiMix Escrow System</span>
            </div>
            <p className="text-center">
              Your money will not be released to the seller until you confirm
              receiving the book.
            </p>
          </div>
        </form>
      </div>

      <Button
        variant="ghost"
        className="mt-6"
        onClick={() => router.back()}
        disabled={isProcessing}
      >
        Cancel Transaction
      </Button>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="boimix-container-wide">
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            Loading payment gateway...
          </div>
        }
      >
        <PaymentContent />
      </Suspense>
    </div>
  );
}
