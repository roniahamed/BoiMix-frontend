import Image from "next/image";
import { CustomerOrder } from "@/lib/data/sales";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ShoppingBag,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  Truck,
  CheckCircle2,
  Printer,
  XCircle,
  MessageSquare,
} from "lucide-react";

type SalesDetailsDialogProps = {
  selectedOrder: CustomerOrder | null;
  onClose: () => void;
  onConfirmOrder: (orderId: string) => void;
  onMarkAsShipped: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
};

export function SalesDetailsDialog({
  selectedOrder,
  onClose,
  onConfirmOrder,
  onMarkAsShipped,
  onCancelOrder,
}: SalesDetailsDialogProps) {
  if (!selectedOrder) return null;

  return (
    <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl space-y-4 rounded-2xl p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg font-extrabold">
              <ShoppingBag className="h-5 w-5 text-emerald-500" /> Order Details{" "}
              {selectedOrder.id}
            </DialogTitle>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-black uppercase ${
                selectedOrder.status === "pending"
                  ? "bg-warning/15 text-warning"
                  : selectedOrder.status === "confirmed"
                    ? "bg-primary/15 text-primary"
                    : selectedOrder.status === "cancelled"
                      ? "bg-danger/15 text-danger"
                      : selectedOrder.status === "shipped"
                        ? "bg-brand-blue/15 text-brand-blue"
                        : "bg-success/15 text-success"
              }`}
            >
              {selectedOrder.status}
            </span>
          </div>
          <DialogDescription className="text-muted-foreground text-xs">
            Placed on {selectedOrder.orderDate}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-xs">
          {/* Item details */}
          <div className="bg-card border-border/60 flex items-center gap-3 rounded-xl border p-3">
            <div className="border-border relative h-16 w-12 shrink-0 overflow-hidden rounded border">
              <Image
                src={selectedOrder.bookCover}
                alt={selectedOrder.bookTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-foreground leading-tight font-bold">
                {selectedOrder.bookTitle}
              </h4>
              <p className="text-muted-foreground text-[11px]">
                {selectedOrder.bookAuthor}
              </p>
              <p className="text-primary font-black">
                ৳ {selectedOrder.price} + ৳{selectedOrder.shippingFee} Shipping
              </p>
            </div>
          </div>

          {/* Customer & Shipping info */}
          <div className="bg-muted/30 border-border/50 space-y-2 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={selectedOrder.buyerAvatar} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-foreground font-bold">
                    {selectedOrder.buyerName} (@{selectedOrder.buyerUsername})
                  </p>
                </div>
              </div>
              <p className="font-semibold text-emerald-600">
                <Phone className="mr-1 inline h-3 w-3" />
                {selectedOrder.buyerPhone}
              </p>
            </div>

            <div className="border-border/30 space-y-1 border-t pt-2">
              <p className="text-muted-foreground font-semibold">
                Delivery Address:
              </p>
              <p className="text-foreground flex items-start gap-1 font-bold">
                <MapPin className="text-danger mt-0.5 h-3.5 w-3.5 shrink-0" />
                {selectedOrder.buyerAddress}
              </p>
            </div>

            <div className="border-border/30 flex justify-between border-t pt-2">
              <span className="text-muted-foreground">Delivery Method:</span>
              <span className="text-foreground font-bold">
                {selectedOrder.deliveryMethod}
              </span>
            </div>

            {selectedOrder.trackingNumber && (
              <div className="border-border/30 flex justify-between border-t pt-2">
                <span className="text-muted-foreground">Tracking Number:</span>
                <span className="font-mono font-bold text-emerald-600">
                  {selectedOrder.trackingNumber}
                </span>
              </div>
            )}
          </div>

          {/* Payment & Payout details */}
          <div className="bg-card border-border/60 space-y-1.5 rounded-xl border p-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Status:</span>
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" />{" "}
                {selectedOrder.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Escrow Payout Condition:
              </span>
              <span className="text-foreground font-bold">
                Released upon buyer receipt
              </span>
            </div>
            <div className="border-border/40 text-foreground flex justify-between border-t pt-1.5 text-sm font-black">
              <span>Total Payout Amount:</span>
              <span className="text-emerald-600">
                ৳ {selectedOrder.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => {
              window.location.href = `/dashboard/messages/${selectedOrder.buyerUsername}?prefill=${encodeURIComponent(`Hi ${selectedOrder.buyerName}, regarding your order ${selectedOrder.id} for "${selectedOrder.bookTitle}":\n`)}`;
            }}
            className="bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors"
          >
            <MessageSquare className="text-primary h-4 w-4" /> Message Buyer
          </button>

          {(selectedOrder.status === "pending" ||
            selectedOrder.status === "confirmed") && (
            <button
              onClick={() => onCancelOrder(selectedOrder.id)}
              className="bg-danger/10 text-danger hover:bg-danger/20 flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all"
            >
              <XCircle className="h-4 w-4" /> Cancel Order
            </button>
          )}

          {selectedOrder.status === "pending" && (
            <button
              onClick={() => onConfirmOrder(selectedOrder.id)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <CheckCircle2 className="h-4 w-4" /> Confirm Order
            </button>
          )}

          {selectedOrder.status === "confirmed" && (
            <button
              onClick={() => onMarkAsShipped(selectedOrder.id)}
              className="bg-brand-blue hover:bg-brand-blue/90 flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95"
            >
              <Truck className="h-4 w-4" /> Mark as Shipped
            </button>
          )}

          <button
            onClick={() => window.print()}
            className="border-border bg-background hover:bg-muted text-foreground flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors"
            title="Print Packing Slip"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
