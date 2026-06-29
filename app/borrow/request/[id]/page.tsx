"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useBorrowStore } from "@/lib/store/use-borrow-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DepositWalletCard } from "@/components/borrow/DepositWalletCard";
import { MapPin, Truck, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { use } from "react";

export default function BorrowRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { addOrder, wallet } = useBorrowStore();

  const [method, setMethod] = useState<"meetup" | "courier">("meetup");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock book data for the request
  const depositRequired = 300;
  const borrowFee = 50;
  const hasEnoughLimit = wallet.availableLimit >= depositRequired;

  const handleSubmit = () => {
    if (!hasEnoughLimit) {
      toast.error("Insufficient deposit limit. Please top up your wallet.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const orderId = addOrder({
        bookId: id,
        bookTitle: "Sample Borrow Book", // Mock name
        bookImage: "/images/books/placeholder.jpg",
        borrowerId: "current-user",
        ownerId: "owner123",
        handoverMethod: method,
        depositLocked: depositRequired,
        borrowFee: borrowFee,
      });

      toast.success("Borrow Request Sent!");
      router.push(`/borrow/active/${orderId}`);
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        href={`/books/${id}`}
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm"
      >
        <ArrowLeft className="mr-2 size-4" /> Back to Book
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Request to Borrow</h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Form */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Handover Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={method}
                onValueChange={(val) => setMethod(val as "meetup" | "courier")}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div>
                  <RadioGroupItem
                    value="meetup"
                    id="meetup"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="meetup"
                    className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4"
                  >
                    <MapPin className="mb-3 size-6" />
                    In-Person Meetup
                    <span className="text-muted-foreground mt-2 text-center text-xs">
                      Meet the owner to collect and return the book.
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="courier"
                    id="courier"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="courier"
                    className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4"
                  >
                    <Truck className="mb-3 size-6" />
                    Courier Service
                    <span className="text-muted-foreground mt-2 text-center text-xs">
                      Use a parcel service. You bear the shipping cost.
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <DepositWalletCard />
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src="/images/books/placeholder.jpg"
                    fill
                    alt="Book Cover"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="line-clamp-2 font-semibold">
                    Sample Borrow Book
                  </span>
                  <span className="text-muted-foreground text-sm">
                    by Author
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Borrow Fee (14 Days)
                  </span>
                  <span className="font-medium">৳{borrowFee}</span>
                </div>
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-500">
                  <span className="flex items-center gap-1">
                    <AlertCircle className="size-4" /> Deposit Lock
                  </span>
                  <span className="font-semibold">৳{depositRequired}</span>
                </div>
                {method === "courier" && (
                  <div className="text-muted-foreground flex justify-between">
                    <span>Shipping Cost</span>
                    <span>Paid to Courier</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={isSubmitting || !hasEnoughLimit}
              >
                {isSubmitting ? "Processing..." : "Submit Request"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
