"use client";

import { useState } from "react";
import { useBorrowStore, BorrowOrder } from "@/lib/store/use-borrow-store";
import {
  BookDown,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  Check,
  Truck,
  RotateCcw,
  Filter,
  CreditCard,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Format the status string for display
const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending_owner_review":
      return "Pending Owner Review";
    case "counter_offered":
      return "Action Required: Counter Offer";
    case "accepted":
      return "Accepted (Payment Required)";
    case "rejected":
      return "Rejected by Owner";
    case "paid":
      return "Paid (Waiting for Handover)";
    case "handed_over_by_owner":
      return "Handed Over (Confirm Receipt)";
    case "borrow_active":
      return "Currently Borrowing";
    case "return_initiated":
      return "Return Initiated";
    case "completed":
      return "Completed";
    case "disputed":
      return "Disputed";
    default:
      return status.replace(/_/g, " ");
  }
};

// Colors for badges based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "pending_owner_review":
      return "text-muted-foreground bg-muted";
    case "counter_offered":
    case "accepted":
    case "handed_over_by_owner":
      return "text-warning bg-warning/15";
    case "paid":
    case "borrow_active":
      return "text-brand-blue bg-brand-blue/15";
    case "return_initiated":
      return "text-purple-600 bg-purple-500/15";
    case "completed":
      return "text-success bg-success/15";
    case "rejected":
    case "disputed":
      return "text-danger bg-danger/15";
    default:
      return "text-muted-foreground bg-muted";
  }
};

export default function BorrowedPage() {
  const {
    orders,
    updateOrderStatus,
    acceptCounterOffer,
    rejectCounterOffer,
    processPayment,
    submitReview,
  } = useBorrowStore();

  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<BorrowOrder | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const activeOrders = orders.filter((o) => o.borrowerId === "current-user");

  const filteredOrders = activeOrders.filter((o) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return o.status === "pending_owner_review";
    if (activeTab === "action_required")
      return (
        o.status === "counter_offered" ||
        o.status === "accepted" ||
        o.status === "handed_over_by_owner"
      );
    if (activeTab === "active")
      return o.status === "paid" || o.status === "borrow_active";
    if (activeTab === "returning") return o.status === "return_initiated";
    if (activeTab === "completed") return o.status === "completed";
    return true;
  });

  const totalRequests = activeOrders.length;
  const actionRequiredCount = activeOrders.filter(
    (o) =>
      o.status === "counter_offered" ||
      o.status === "accepted" ||
      o.status === "handed_over_by_owner" ||
      (o.status === "completed" && !o.review),
  ).length;
  const currentlyBorrowing = activeOrders.filter(
    (o) => o.status === "paid" || o.status === "borrow_active",
  ).length;
  const totalSpent = activeOrders
    .filter(
      (o) =>
        o.status === "paid" ||
        o.status === "borrow_active" ||
        o.status === "return_initiated" ||
        o.status === "completed",
    )
    .reduce((sum, o) => sum + o.borrowFee, 0);

  const handlePayClick = (order: BorrowOrder, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrder(order);
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (selectedOrder) {
      processPayment(selectedOrder.id);
      setIsPaymentModalOpen(false);
    }
  };

  const handleReviewClick = (order: BorrowOrder, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrder(order);
    setRating(5);
    setReviewComment("");
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (selectedOrder) {
      submitReview(selectedOrder.id, { rating, comment: reviewComment });
      setIsReviewModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 sm:space-y-8">
      {/* Header */}
      <div className="border-border/50 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <BookDown className="text-brand-blue h-7 w-7" /> Borrowed Books
          </h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Track books you have requested or are currently borrowing from
            others.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Total Requests</span>
            <BookDown className="text-muted-foreground h-4 w-4" />
          </div>
          <p className="text-foreground text-2xl font-extrabold sm:text-3xl">
            {totalRequests}
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Action Required</span>
            <AlertCircle className="text-warning h-4 w-4" />
          </div>
          <p className="text-warning text-2xl font-extrabold sm:text-3xl">
            {actionRequiredCount}
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Currently Borrowing</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
            {currentlyBorrowing}
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Total Borrow Fee</span>
            <span className="text-primary h-4 w-4 text-center font-extrabold">
              ৳
            </span>
          </div>
          <p className="text-primary text-2xl font-extrabold sm:text-3xl">
            ৳ {totalSpent}
          </p>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="border-border/60 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-semibold">Filter Orders:</span>
        </div>
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="bg-background w-[180px]">
            <SelectValue placeholder="Select status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({totalRequests})</SelectItem>
            <SelectItem value="action_required">
              Action Needed ({actionRequiredCount})
            </SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="returning">Returning</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-card border-border space-y-3 rounded-2xl border border-dashed p-8 text-center">
            <BookDown className="text-muted-foreground mx-auto h-10 w-10 opacity-50" />
            <p className="text-foreground text-base font-bold">
              No borrow requests found
            </p>
            <p className="text-muted-foreground mx-auto max-w-sm text-xs">
              When you request to borrow books from others, they will appear
              here.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id}>
              {/* --- MOBILE COMPACT VIEW --- */}
              <div
                onClick={() => setSelectedOrder(order)}
                className="bg-card border-border/70 hover:border-primary/30 flex cursor-pointer flex-col gap-3 rounded-2xl border p-3 shadow-2xs transition-all md:hidden"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={order.bookImage}
                      alt={order.bookTitle}
                      className="h-14 w-10 shrink-0 rounded border object-cover shadow-xs"
                    />
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-foreground line-clamp-1 text-sm font-bold">
                        {order.bookTitle}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[10px] font-extrabold">
                          {order.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase ${
                            getStatusColor(order.status).split(" ")[0]
                          }`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {order.status === "counter_offered" &&
                  order.counterOfferDetails && (
                    <div className="border-warning/30 bg-warning/10 mt-1 rounded-xl border p-2 text-xs">
                      <p className="font-bold text-amber-800">
                        Owner proposed new details:
                      </p>
                      <p className="text-amber-700">
                        {order.counterOfferDetails.proposedDate} at{" "}
                        {order.counterOfferDetails.proposedLocation}
                      </p>
                    </div>
                  )}

                <div className="border-border/40 flex flex-wrap items-center gap-2 border-t pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order);
                    }}
                    className="bg-primary/10 text-primary hover:bg-primary/20 flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-bold transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors"
                    title="Message Owner"
                  >
                    <MessageSquare className="text-primary h-3.5 w-3.5" /> Chat
                  </button>
                </div>

                {order.status !== "all" &&
                  (order.status === "counter_offered" ||
                    order.status === "accepted" ||
                    order.status === "handed_over_by_owner" ||
                    order.status === "borrow_active" ||
                    (order.status === "completed" && !order.review)) && (
                    <div className="border-border/40 flex flex-wrap items-center gap-2 border-t pt-2">
                      {order.status === "counter_offered" && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              rejectCounterOffer(order.id);
                            }}
                            className="bg-danger/10 text-danger hover:bg-danger/20 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2.5 text-[12px] font-bold transition-all"
                          >
                            Decline
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              acceptCounterOffer(order.id);
                            }}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2.5 text-[12px] font-bold transition-all"
                          >
                            <Check className="h-4 w-4" /> Accept Changes
                          </button>
                        </>
                      )}
                      {order.status === "accepted" && (
                        <button
                          onClick={(e) => handlePayClick(order, e)}
                          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-2 py-2.5 text-[12px] font-bold text-white shadow-2xs transition-all hover:bg-emerald-700"
                        >
                          <CreditCard className="h-4 w-4" /> Pay Fee (৳
                          {order.borrowFee})
                        </button>
                      )}
                      {order.status === "handed_over_by_owner" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, "borrow_active");
                          }}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[12px] font-bold transition-all"
                        >
                          <CheckCircle2 className="h-4 w-4" /> Confirm Received
                        </button>
                      )}
                      {order.status === "borrow_active" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, "return_initiated");
                          }}
                          className="bg-brand-blue hover:bg-brand-blue/90 flex w-full items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[12px] font-bold text-white shadow-2xs transition-all"
                        >
                          <RotateCcw className="h-4 w-4" /> Initiate Return
                        </button>
                      )}
                      {order.status === "completed" && !order.review && (
                        <button
                          onClick={(e) => handleReviewClick(order, e)}
                          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-100 px-2 py-2.5 text-[12px] font-bold text-amber-700 transition-all hover:bg-amber-200"
                        >
                          <Star className="h-4 w-4" /> Leave Review
                        </button>
                      )}
                    </div>
                  )}
              </div>

              {/* --- DESKTOP FULL VIEW --- */}
              <div
                onClick={() => setSelectedOrder(order)}
                className="bg-card border-border/70 hover:border-primary/30 hidden cursor-pointer space-y-4 rounded-2xl border p-4 shadow-2xs transition-all sm:p-5 md:block"
              >
                {/* Header */}
                <div className="border-border/40 flex flex-col justify-between gap-2 border-b pb-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground bg-muted rounded-lg px-2.5 py-1 font-mono text-sm font-extrabold">
                      {order.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-extrabold tracking-wider uppercase ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={order.bookImage}
                    alt={order.bookTitle}
                    className="border-border h-20 w-14 shrink-0 rounded-lg border object-cover shadow-xs"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-foreground line-clamp-1 text-lg font-bold">
                      {order.bookTitle}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Owner ID: {order.ownerId}
                    </p>
                    <p className="text-primary text-sm font-extrabold">
                      Borrow Fee: ৳ {order.borrowFee}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" /> Details
                    </button>
                    {order.status === "counter_offered" && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            acceptCounterOffer(order.id);
                          }}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-2xs transition-all active:scale-95"
                        >
                          <Check className="h-4 w-4" /> Accept Changes
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            rejectCounterOffer(order.id);
                          }}
                          className="bg-danger/10 text-danger hover:bg-danger/20 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {order.status === "accepted" && (
                      <button
                        onClick={(e) => handlePayClick(order, e)}
                        className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-emerald-700 active:scale-95"
                      >
                        <CreditCard className="h-4 w-4" /> Pay Fee (৳
                        {order.borrowFee})
                      </button>
                    )}
                    {order.status === "handed_over_by_owner" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, "borrow_active");
                        }}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-2xs transition-all active:scale-95"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Confirm Received
                      </button>
                    )}
                    {order.status === "borrow_active" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, "return_initiated");
                        }}
                        className="bg-brand-blue hover:bg-brand-blue/90 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-2xs transition-all active:scale-95"
                      >
                        <RotateCcw className="h-4 w-4" /> Initiate Return
                      </button>
                    )}
                    {order.status === "completed" && !order.review && (
                      <button
                        onClick={(e) => handleReviewClick(order, e)}
                        className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-amber-100 px-4 py-2 text-xs font-bold text-amber-700 shadow-2xs transition-all hover:bg-amber-200 active:scale-95"
                      >
                        <Star className="h-4 w-4" /> Leave Review
                      </button>
                    )}
                  </div>
                </div>

                {order.status === "counter_offered" &&
                  order.counterOfferDetails && (
                    <div className="border-warning/30 bg-warning/10 mt-3 rounded-xl border p-3 text-sm">
                      <p className="font-bold text-amber-800">
                        Owner proposed new details:
                      </p>
                      <p className="mt-1 text-amber-700">
                        Date: {order.counterOfferDetails.proposedDate} <br />
                        Location: {order.counterOfferDetails.proposedLocation}
                      </p>
                      {order.counterOfferDetails.message && (
                        <p className="mt-2 text-amber-700 italic">
                          &quot;{order.counterOfferDetails.message}&quot;
                        </p>
                      )}
                    </div>
                  )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedOrder && !isPaymentModalOpen && !isReviewModalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedOrder(null);
        }}
      >
        {selectedOrder && (
          <DialogContent className="max-w-md rounded-2xl p-6 sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <DialogTitle className="flex items-center gap-2 text-lg font-extrabold">
                    Borrow Request Details{" "}
                    <span className="text-muted-foreground font-mono text-xs font-normal">
                      ({selectedOrder.id})
                    </span>
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 text-xs">
              <div className="bg-muted/40 border-border/50 space-y-2 rounded-xl border p-3.5">
                <p className="text-foreground text-[10px] font-bold tracking-wider uppercase">
                  Book Info
                </p>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedOrder.bookImage}
                    alt={selectedOrder.bookTitle}
                    className="h-16 w-12 rounded border object-cover"
                  />
                  <div>
                    <p className="text-foreground text-sm font-bold">
                      {selectedOrder.bookTitle}
                    </p>
                    <p className="text-primary text-xs font-bold">
                      Borrow Fee: ৳ {selectedOrder.borrowFee}
                    </p>
                    <p className="text-muted-foreground text-xs font-medium">
                      Deposit Locked: ৳ {selectedOrder.depositLocked}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/40 border-border/50 space-y-2 rounded-xl border p-3.5">
                <p className="text-foreground text-[10px] font-bold tracking-wider uppercase">
                  Owner Details
                </p>
                <p className="text-foreground text-sm font-bold">
                  ID: {selectedOrder.ownerId}
                </p>
              </div>

              <div className="bg-muted/40 border-border/50 space-y-2 rounded-xl border p-3.5">
                <p className="text-foreground text-[10px] font-bold tracking-wider uppercase">
                  Status & Delivery
                </p>
                <p className="text-sm font-medium">
                  Method:{" "}
                  <span className="font-bold capitalize">
                    {selectedOrder.handoverMethod}
                  </span>
                </p>
                <p className="text-sm font-medium">
                  Current Status:{" "}
                  <span className="font-bold">
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-sm rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-emerald-500" /> Pay Borrow Fee
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4 text-xs">
              To proceed, pay the borrow fee. The deposit (৳
              {selectedOrder?.depositLocked}) is already locked from your
              available limit.
            </p>
            <div className="bg-muted/40 border-border/50 rounded-xl border p-4">
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Borrow Fee</span>
                <span className="text-lg text-emerald-600">
                  ৳{selectedOrder?.borrowFee}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-between">
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPayment}
              className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-2xs transition-all hover:bg-emerald-700 active:scale-95"
            >
              Confirm Payment
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-sm rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2 text-center">
              <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Rating
              </Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-transform hover:scale-110 ${
                      rating >= star ? "text-amber-400" : "text-gray-200"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Comment
              </Label>
              <Textarea
                placeholder="How was your experience?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="resize-none rounded-xl"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-between">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReview}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-xl px-4 py-2.5 text-sm font-bold shadow-2xs transition-all active:scale-95"
            >
              Submit Review
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
