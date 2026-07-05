"use client";

import { useState } from "react";
import { useBorrowStore } from "@/lib/store/use-borrow-store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface ReturnValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  handoverMethod: "meetup" | "courier";
}

export function ReturnValidationModal({
  isOpen,
  onClose,
  orderId,
  handoverMethod,
}: ReturnValidationModalProps) {
  const { submitTrackingId } = useBorrowStore();
  const trackingId = "";
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (handoverMethod === "courier" && !trackingId.trim()) {
      toast.error("Tracking ID is required for courier returns.");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      submitTrackingId(orderId, trackingId);
      setIsLoading(false);
      toast.success("Return initiated successfully!");
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden border-0 p-0 sm:max-w-md">
        <div className="bg-white">
          <div className="flex items-center border-b p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="mr-2"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div className="flex-1 text-center">
              <h2 className="font-bold">Return Validation</h2>
              <p className="text-muted-foreground text-xs">Step 6 of 6</p>
            </div>
            <div className="w-9" /> {/* Spacer */}
          </div>

          <div className="p-6">
            <div className="mb-6 text-center">
              <h3 className="text-lg font-bold">Meetup Return</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Please confirm to complete return
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <div className="relative h-40 w-48">
                {/* Placeholder for the illustration */}
                <div className="absolute inset-0 flex items-center justify-center rounded-xl border bg-blue-50">
                  <span className="text-muted-foreground text-sm">
                    Illustration placeholder
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-muted flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                    <span className="text-muted-foreground font-bold">O</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Owner Confirmation</p>
                    <p className="text-muted-foreground text-xs">
                      Waiting for confirmation
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                    <span className="font-bold">Y</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Your Confirmation</p>
                    <p className="text-xs text-amber-600">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="mt-6 h-12 w-full bg-blue-600 text-lg hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Complete Return"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
