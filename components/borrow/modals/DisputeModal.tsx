"use client";

import { useState } from "react";
import { useBorrowStore } from "@/lib/store/use-borrow-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UploadCloud, AlertTriangle } from "lucide-react";

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export function DisputeModal({ isOpen, onClose, orderId }: DisputeModalProps) {
  const { openDispute } = useBorrowStore();
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (reason.length < 20) {
      toast.error("Please provide a detailed description (min 20 characters).");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      openDispute(orderId, reason);
      setIsLoading(false);
      toast.success("Dispute opened. An admin will review this shortly.");
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="size-5" />
            Report Damage / Open Dispute
          </DialogTitle>
          <DialogDescription>
            If the book was returned damaged or in an unacceptable condition,
            please provide details. The borrower&apos;s deposit will remain
            locked.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Upload Evidence (Photos)</Label>
            <div className="border-muted-foreground/25 bg-muted/20 hover:bg-muted/50 flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors">
              <UploadCloud className="text-muted-foreground mb-2 size-6" />
              <span className="text-muted-foreground text-xs">
                Click to upload photos
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="reason">Detailed Description</Label>
            <Textarea
              id="reason"
              placeholder="Describe what damage occurred (e.g., torn pages, water damage, missing cover)..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Dispute"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
