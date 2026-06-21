"use client";

import { useState } from "react";
import { Heart, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const REPORT_REASONS = [
  "Inappropriate Content",
  "Spam or Misleading",
  "Copyright Violation",
  "Fake or Counterfeit Book",
  "Incorrect Book Information",
  "Scammer or Fraudulent Seller",
  "Offensive Language",
  "Unrealistic Price",
  "Poor Book Condition Not Disclosed",
  "Other",
];

export function BookHeaderActions() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportReason, setReportReason] = useState("");

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "BoiMix - Book Details",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleReportSubmit = () => {
    if (!reportTitle) {
      toast.error("Please select a reason for reporting.");
      return;
    }

    toast.success("Report submitted successfully.");
    setIsReportOpen(false);
    setReportTitle("");
    setReportReason("");
  };

  return (
    <div className="flex gap-2">
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground rounded-full transition-colors hover:bg-red-50 hover:text-red-600"
            title="Report Book"
          >
            <Flag className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-lg p-6 sm:max-w-[500px] sm:p-8 md:max-w-[600px] lg:max-w-[700px]">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-xl sm:text-2xl">
              Report Book
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Please let us know why you are reporting this book. We will review
              it shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4 sm:py-6">
            <div className="grid gap-3">
              <Label
                htmlFor="report-title"
                className="text-sm font-semibold sm:text-base"
              >
                Reason for reporting
              </Label>
              <Select value={reportTitle} onValueChange={setReportTitle}>
                <SelectTrigger
                  id="report-title"
                  className="h-11 w-full sm:h-12 sm:text-base"
                >
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_REASONS.map((reason) => (
                    <SelectItem
                      key={reason}
                      value={reason}
                      className="sm:text-base"
                    >
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="report-details"
                className="text-sm font-semibold sm:text-base"
              >
                Additional Details (Optional)
              </Label>
              <Textarea
                id="report-details"
                placeholder="Enter more details here to help us understand the issue better..."
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="min-h-[120px] resize-y sm:min-h-[160px] sm:text-base"
              />
            </div>
          </div>
          <DialogFooter className="mt-2 gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsReportOpen(false)}
              className="h-11 w-full sm:w-auto sm:px-8 sm:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReportSubmit}
              variant="destructive"
              className="h-11 w-full sm:w-auto sm:px-8 sm:text-base"
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleWishlist}
        className={cn(
          "rounded-full transition-colors",
          isWishlisted
            ? "text-red-500 hover:bg-red-50 hover:text-red-600"
            : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
        )}
      >
        <Heart className={cn("size-5", isWishlisted && "fill-current")} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        className="text-muted-foreground hover:bg-primary/5 hover:text-primary rounded-full transition-colors"
      >
        <Share2 className="size-5" />
      </Button>
    </div>
  );
}
