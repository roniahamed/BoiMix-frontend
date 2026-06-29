"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useBorrowStore } from "@/lib/store/use-borrow-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressStepper } from "@/components/borrow/progress-stepper";
import { TimelineProgress } from "@/components/borrow/timeline-progress";
import { ReturnValidationModal } from "@/components/borrow/modals/ReturnValidationModal";
import { DisputeModal } from "@/components/borrow/modals/DisputeModal";
import { ExtensionRequestModal } from "@/components/borrow/modals/ExtensionRequestModal";
import { PeerReviewModal } from "@/components/borrow/modals/PeerReviewModal";
import { ArrowLeft, ArrowRightLeft, Bell } from "lucide-react";

import { toast } from "sonner";
import { use } from "react";

export default function BorrowTimelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { orders, updateOrderStatus } = useBorrowStore();
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [dueDate] = useState(
    () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  const order = orders.find((o) => o.id === id);

  useEffect(() => {
    if (!order) {
      toast.error("Borrow order not found.");
      router.push("/dashboard/borrowed");
    }
  }, [order, router]);

  if (!order) return null;

  // Simulator actions for testing the flow easily
  const handleAcceptRequest = () => updateOrderStatus(order.id, "accepted");
  const handlePayment = () => updateOrderStatus(order.id, "paid");
  const handleOwnerHandover = () =>
    updateOrderStatus(order.id, "handed_over_by_owner");
  const handleBorrowerReceive = () =>
    updateOrderStatus(order.id, "borrow_active");
  const handleOwnerConfirmReturn = () => {
    updateOrderStatus(order.id, "completed");
    toast.success("Return confirmed! Deposit has been released.");
  };

  // Determine current step (1-6) based on status
  let currentStep = 4;
  if (["pending_owner_review"].includes(order.status)) currentStep = 2;
  if (["accepted"].includes(order.status)) currentStep = 3;
  if (["paid", "handed_over_by_owner", "borrow_active"].includes(order.status))
    currentStep = 4;
  if (["return_initiated"].includes(order.status)) currentStep = 5;
  if (["completed", "disputed"].includes(order.status)) currentStep = 6;

  return (
    <div className="container mx-auto max-w-md px-4 py-8 md:max-w-2xl">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/borrowed")}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="ml-2 text-lg font-semibold">Order Timeline</h1>
      </div>

      <ProgressStepper
        currentStep={currentStep}
        totalSteps={6}
        className="mb-6 hidden sm:block"
        labels={[
          "Request",
          "Review",
          "Payment",
          "Active",
          "Returning",
          "Completed",
        ]}
      />

      <Card className="mb-6 overflow-hidden rounded-xl border shadow-sm">
        <CardContent className="p-0">
          <div className="bg-background flex items-start justify-between border-b p-5">
            <div>
              <p className="text-muted-foreground mb-1 text-xs">Order ID</p>
              <h2 className="text-xl font-bold">{order.id}</h2>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-green-600 uppercase">
                {order.status.replace(/_/g, " ")}
              </span>
              <p className="text-muted-foreground mt-1 text-[10px]">
                Started on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-muted/20 flex items-center justify-center gap-6 border-b p-5">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 text-primary mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full font-bold">
                U
              </div>
              <p className="text-sm font-semibold">You</p>
              <p className="text-muted-foreground text-[10px]">Borrower</p>
            </div>
            <ArrowRightLeft className="text-blue-500" />
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 text-primary mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full font-bold">
                {order.ownerId.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm font-semibold">{order.ownerId}</p>
              <p className="text-muted-foreground text-[10px]">Owner</p>
            </div>
          </div>

          <div className="p-6">
            <TimelineProgress
              currentStatus={order.status}
              orientation="vertical"
            />
          </div>

          {order.status === "borrow_active" && (
            <div className="text-muted-foreground px-6 pb-6 text-sm">
              <p className="mb-1 font-semibold text-blue-600">Borrow Period</p>
              <p>7 Days</p>
              <p>Due Date: {dueDate.toLocaleString()}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {order.status === "borrow_active" && (
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="text-amber-500" />
              <div>
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-500">
                  Reminder
                </p>
                <p className="text-xs text-amber-600/80">
                  Please return the book before due date.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => setIsExtensionModalOpen(true)}
            >
              Request Extension
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Simulator Actions */}
      <Card className="border-primary/20 bg-primary/5 mt-8">
        <CardContent className="flex flex-col gap-3 p-4">
          <h3 className="text-primary mb-2 text-sm font-bold">
            Simulate Progress (Testing)
          </h3>
          {order.status === "pending_owner_review" && (
            <Button onClick={handleAcceptRequest} className="w-full">
              [Owner] Accept Request
            </Button>
          )}
          {order.status === "accepted" && (
            <Button onClick={handlePayment} className="w-full">
              [Borrower] Pay Borrow Fee
            </Button>
          )}
          {order.status === "paid" && (
            <Button onClick={handleOwnerHandover} className="w-full">
              [Owner] Confirm Handover
            </Button>
          )}
          {order.status === "handed_over_by_owner" && (
            <Button onClick={handleBorrowerReceive} className="w-full">
              [Borrower] Confirm Received
            </Button>
          )}
          {order.status === "borrow_active" && (
            <Button
              onClick={() => setIsReturnModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              [Borrower] Initiate Return
            </Button>
          )}
          {order.status === "return_initiated" && (
            <Button
              onClick={handleOwnerConfirmReturn}
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              [Owner] Confirm Return Received
            </Button>
          )}
          {order.status === "completed" && (
            <Button
              onClick={() => setIsReviewModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Leave a Review
            </Button>
          )}
        </CardContent>
      </Card>

      <ReturnValidationModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        orderId={order.id}
        handoverMethod={order.handoverMethod}
      />
      <DisputeModal
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
        orderId={order.id}
      />
      <ExtensionRequestModal
        isOpen={isExtensionModalOpen}
        onClose={() => setIsExtensionModalOpen(false)}
        orderId={order.id}
      />
      <PeerReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        orderId={order.id}
      />
    </div>
  );
}
