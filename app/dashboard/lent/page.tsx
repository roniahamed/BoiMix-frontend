"use client";

import { useState } from "react";
import { useBorrowStore, BorrowOrder } from "@/lib/store/use-borrow-store";
import {
  BookUp,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  Check,
  Truck,
  RotateCcw,
  Filter,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Format the status string for display
const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending_owner_review":
      return "Review Pending";
    case "counter_offered":
      return "Counter Offered";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
    case "paid":
      return "Paid by Borrower";
    case "handed_over_by_owner":
      return "Handed Over";
    case "borrow_active":
      return "Currently Lent Out";
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
    case "counter_offered":
      return "text-warning bg-warning/15";
    case "accepted":
    case "paid":
    case "handed_over_by_owner":
      return "text-brand-blue bg-brand-blue/15";
    case "borrow_active":
      return "text-emerald-600 bg-emerald-500/15";
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

export default function LentPage() {
  const { orders, updateOrderStatus, counterOffer } = useBorrowStore();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<BorrowOrder | null>(null);

  // Show all mock orders where the user is the owner
  const activeOrders = orders.filter((o) => o.ownerId === "current-user");

  const filteredOrders = activeOrders.filter((o) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending")
      return (
        o.status === "pending_owner_review" || o.status === "counter_offered"
      );
    if (activeTab === "active")
      return (
        o.status === "borrow_active" ||
        o.status === "handed_over_by_owner" ||
        o.status === "paid" ||
        o.status === "accepted"
      );
    if (activeTab === "returning") return o.status === "return_initiated";
    if (activeTab === "completed") return o.status === "completed";
    return true;
  });

  const totalRequests = activeOrders.length;
  const pendingCount = activeOrders.filter(
    (o) =>
      o.status === "pending_owner_review" || o.status === "counter_offered",
  ).length;
  const activeLentCount = activeOrders.filter(
    (o) => o.status === "borrow_active" || o.status === "handed_over_by_owner",
  ).length;
  const totalEarnings = activeOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.borrowFee, 0);

  return (
    <div className="space-y-6 pb-16 sm:space-y-8">
      {/* Header */}
      <div className="border-border/50 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <BookUp className="h-7 w-7 text-emerald-500" /> Lent Books
          </h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Manage borrow requests from others and track books you have lent
            out.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Total Requests</span>
            <BookUp className="text-brand-blue h-4 w-4" />
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
            {pendingCount}
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Currently Lent Out</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
            {activeLentCount}
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Total Earnings</span>
            <span className="text-primary h-4 w-4 text-center font-extrabold">
              ৳
            </span>
          </div>
          <p className="text-primary text-2xl font-extrabold sm:text-3xl">
            ৳ {totalEarnings}
          </p>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="border-border/60 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-semibold">Filter Requests:</span>
        </div>
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="bg-background w-[180px]">
            <SelectValue placeholder="Select status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({totalRequests})</SelectItem>
            <SelectItem value="pending">Pending ({pendingCount})</SelectItem>
            <SelectItem value="active">Active ({activeLentCount})</SelectItem>
            <SelectItem value="returning">Returning</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-card border-border space-y-3 rounded-2xl border border-dashed p-8 text-center">
            <BookUp className="text-muted-foreground mx-auto h-10 w-10 opacity-50" />
            <p className="text-foreground text-base font-bold">
              No borrow requests found
            </p>
            <p className="text-muted-foreground mx-auto max-w-sm text-xs">
              When someone requests to borrow your books, their requests will
              appear here.
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
                    title="Message Borrower"
                  >
                    <MessageSquare className="text-primary h-3.5 w-3.5" /> Chat
                  </button>
                </div>

                {order.status !== "all" &&
                  (order.status === "pending_owner_review" ||
                    order.status === "paid" ||
                    order.status === "return_initiated") && (
                    <div className="border-border/40 flex flex-wrap items-center gap-2 border-t pt-2">
                      {order.status === "pending_owner_review" && (
                        <>
                          <div className="flex w-full gap-2">
                            <CounterOfferModal
                              order={order}
                              onCounterOffer={counterOffer}
                              onClick={(e) => e.stopPropagation()}
                              isMobile={true}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateOrderStatus(order.id, "rejected");
                              }}
                              className="bg-danger/10 text-danger hover:bg-danger/20 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold transition-all"
                            >
                              Decline
                            </button>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateOrderStatus(order.id, "accepted");
                            }}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-1 rounded-lg px-2 py-2.5 text-[12px] font-bold transition-all"
                          >
                            <Check className="h-4 w-4" /> Accept Request
                          </button>
                        </>
                      )}
                      {order.status === "paid" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, "handed_over_by_owner");
                          }}
                          className="bg-brand-blue hover:bg-brand-blue/90 flex w-full items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[12px] font-bold text-white transition-all"
                        >
                          <Truck className="h-4 w-4" /> Confirm Handover
                        </button>
                      )}
                      {order.status === "return_initiated" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, "completed");
                          }}
                          className="bg-success text-success-foreground hover:bg-success/90 flex w-full items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[12px] font-bold transition-all"
                        >
                          <RotateCcw className="h-4 w-4" /> Return Received
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
                      Borrower ID: {order.borrowerId}
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
                    {order.status === "pending_owner_review" && (
                      <>
                        <CounterOfferModal
                          order={order}
                          onCounterOffer={counterOffer}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, "accepted");
                          }}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-2xs transition-all active:scale-95"
                        >
                          <Check className="h-4 w-4" /> Accept
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, "rejected");
                          }}
                          className="bg-danger/10 text-danger hover:bg-danger/20 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {order.status === "paid" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, "handed_over_by_owner");
                        }}
                        className="bg-brand-blue hover:bg-brand-blue/90 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-2xs transition-all active:scale-95"
                      >
                        <Truck className="h-4 w-4" /> Confirm Handover
                      </button>
                    )}
                    {order.status === "return_initiated" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, "completed");
                        }}
                        className="bg-success text-success-foreground hover:bg-success/90 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-2xs transition-all active:scale-95"
                      >
                        <RotateCcw className="h-4 w-4" /> Confirm Return
                        Received
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
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
                  </div>
                </div>
              </div>

              <div className="bg-muted/40 border-border/50 space-y-2 rounded-xl border p-3.5">
                <p className="text-foreground text-[10px] font-bold tracking-wider uppercase">
                  Borrower Details
                </p>
                <p className="text-foreground text-sm font-bold">
                  ID: {selectedOrder.borrowerId}
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
    </div>
  );
}

function CounterOfferModal({
  order,
  onCounterOffer,
  onClick,
  isMobile = false,
}: {
  order: BorrowOrder;
  onCounterOffer: (
    id: string,
    details: NonNullable<BorrowOrder["counterOfferDetails"]>,
  ) => void;
  onClick?: (e: React.MouseEvent) => void;
  isMobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(
    order.counterOfferDetails?.proposedLocation || "",
  );
  const [date, setDate] = useState(
    order.counterOfferDetails?.proposedDate || "",
  );
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCounterOffer(order.id, {
      proposedLocation: location,
      proposedDate: date,
      message,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={onClick}
          className={
            isMobile
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold transition-all"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-2xs transition-all"
          }
        >
          Propose Changes
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Propose Counter-Offer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-sm">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g. Dhanmondi Lake 3:00 PM"
              />
            </div>
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                placeholder="e.g. Oct 24, 2024"
              />
            </div>
            <div className="space-y-2">
              <Label>Message to Borrower</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let them know why you are changing the meetup details..."
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[40px] items-center justify-center rounded-xl px-4 py-2 text-sm font-bold shadow-2xs transition-all"
            >
              Send Counter-Offer
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
