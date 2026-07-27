import Image from "next/image";
import { CustomerOrder } from "@/lib/data/sales";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  XCircle,
  Truck,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  Eye,
  ChevronRight,
} from "lucide-react";

type SalesOrderCardProps = {
  order: CustomerOrder;
  onSelect: (order: CustomerOrder) => void;
  onConfirm: (orderId: string) => void;
  onShip: (orderId: string) => void;
  onCancel: (orderId: string) => void;
};

export function SalesOrderCard({
  order,
  onSelect,
  onConfirm,
  onShip,
  onCancel,
}: SalesOrderCardProps) {
  return (
    <div>
      {/* MOBILE COMPACT VIEW */}
      <div
        onClick={() => onSelect(order)}
        className="bg-card border-border/70 hover:border-primary/30 flex cursor-pointer flex-col gap-3 rounded-2xl border p-3 shadow-2xs transition-all md:hidden"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded border shadow-xs">
              <Image
                src={order.bookCover}
                alt={order.bookTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 space-y-1">
              <h3 className="text-foreground line-clamp-1 text-sm font-bold">
                {order.bookTitle}
              </h3>
              <div className="flex items-center gap-2">
                <span className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[10px] font-extrabold">
                  {order.id}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase ${
                    order.status === "pending"
                      ? "text-warning"
                      : order.status === "confirmed"
                        ? "text-primary"
                        : order.status === "cancelled"
                          ? "text-danger"
                          : order.status === "shipped"
                            ? "text-brand-blue"
                            : "text-success"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="text-sm font-extrabold text-emerald-600">
              ৳ {order.totalAmount}
            </span>
            <div className="text-muted-foreground flex items-center gap-1 text-[10px] font-bold">
              Tap for details <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {(order.status === "pending" || order.status === "confirmed") && (
          <div className="border-border/40 flex flex-wrap items-center gap-2 border-t pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/dashboard/messages/${order.buyerUsername}?prefill=${encodeURIComponent(`Hi ${order.buyerName}, regarding your order ${order.id} for "${order.bookTitle}":\n`)}`;
              }}
              className="bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold transition-colors"
              title="Message Buyer"
            >
              <MessageSquare className="text-primary h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel(order.id);
              }}
              className="bg-danger/10 text-danger hover:bg-danger/20 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold transition-colors"
            >
              <XCircle className="h-3.5 w-3.5" /> Cancel
            </button>
            {order.status === "pending" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm(order.id);
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold transition-all"
              >
                Confirm
              </button>
            )}
            {order.status === "confirmed" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShip(order.id);
                }}
                className="bg-brand-blue hover:bg-brand-blue/90 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold text-white transition-all"
              >
                <Truck className="h-3.5 w-3.5" /> Ship
              </button>
            )}
          </div>
        )}
      </div>

      {/* DESKTOP FULL VIEW */}
      <div
        onClick={() => onSelect(order)}
        className="bg-card border-border/70 hover:border-primary/30 hidden cursor-pointer space-y-4 rounded-2xl border p-4 shadow-2xs transition-all sm:p-5 md:block"
      >
        {/* Order Header */}
        <div className="border-border/40 flex flex-col justify-between gap-2 border-b pb-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="text-foreground bg-muted rounded-lg px-2.5 py-1 font-mono text-sm font-extrabold">
              {order.id}
            </span>
            <span className="text-muted-foreground text-xs font-medium">
              {order.orderDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600">
              <ShieldCheck className="h-3.5 w-3.5" /> {order.paymentStatus}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-extrabold tracking-wider uppercase ${
                order.status === "pending"
                  ? "bg-warning/15 text-warning"
                  : order.status === "confirmed"
                    ? "bg-primary/15 text-primary"
                    : order.status === "cancelled"
                      ? "bg-danger/15 text-danger"
                      : order.status === "shipped"
                        ? "bg-brand-blue/15 text-brand-blue"
                        : "bg-success/15 text-success"
              }`}
            >
              {order.status === "pending"
                ? "Pending Processing"
                : order.status === "confirmed"
                  ? "Order Confirmed"
                  : order.status === "cancelled"
                    ? "Cancelled"
                    : order.status === "shipped"
                      ? "In Transit"
                      : "Completed"}
            </span>
          </div>
        </div>

        {/* Body: Buyer & Book Details */}
        <div className="grid items-center gap-4 md:grid-cols-3">
          {/* Book Details */}
          <div className="flex items-center gap-3 md:col-span-1">
            <div className="border-border relative h-16 w-12 shrink-0 overflow-hidden rounded-lg border shadow-xs">
              <Image
                src={order.bookCover}
                alt={order.bookTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="text-foreground line-clamp-1 text-sm font-bold">
                {order.bookTitle}
              </h3>
              <p className="text-muted-foreground text-xs">
                Author: {order.bookAuthor}
              </p>
              <p className="text-primary text-xs font-extrabold">
                ৳ {order.price}{" "}
                <span className="text-muted-foreground text-[11px] font-medium">
                  (+৳{order.shippingFee} shipping)
                </span>
              </p>
            </div>
          </div>

          {/* Buyer Info */}
          <div className="bg-muted/30 border-border/40 space-y-1.5 rounded-xl border p-3 md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="border-border h-7 w-7 border">
                  <AvatarImage src={order.buyerAvatar} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-foreground text-xs leading-tight font-bold">
                    Buyer: {order.buyerName}
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    @{order.buyerUsername}
                  </p>
                </div>
              </div>

              <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                <Phone className="text-primary h-3.5 w-3.5" />
                <span>{order.buyerPhone}</span>
              </div>
            </div>

            <div className="text-muted-foreground border-border/30 flex items-start gap-1.5 border-t pt-1 text-xs">
              <MapPin className="text-danger mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1 font-medium">
                {order.buyerAddress} • ({order.deliveryMethod})
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-border/40 flex flex-wrap items-center justify-between gap-2 border-t pt-2">
          <div className="text-foreground text-xs font-extrabold">
            Total Order Value:{" "}
            <span className="text-sm text-emerald-600">
              ৳ {order.totalAmount}
            </span>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(order);
              }}
              className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-5 py-2 text-sm font-bold transition-colors sm:flex-none"
            >
              <Eye className="h-4 w-4" /> View Details
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/dashboard/messages/${order.buyerUsername}?prefill=${encodeURIComponent(`Hi ${order.buyerName}, regarding your order ${order.id} for "${order.bookTitle}":\n`)}`;
              }}
              className="bg-muted hover:bg-muted/80 text-foreground inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-5 py-2 text-sm font-bold transition-colors sm:flex-none"
            >
              <MessageSquare className="text-primary h-4 w-4" /> Chat
            </button>

            {(order.status === "pending" || order.status === "confirmed") && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel(order.id);
                  }}
                  className="bg-danger/10 text-danger hover:bg-danger/20 inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-6 py-2 text-sm font-bold transition-all sm:flex-none"
                >
                  <XCircle className="h-4 w-4" /> Cancel
                </button>

                {order.status === "pending" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onConfirm(order.id);
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-6 py-2 text-sm font-bold shadow-xs transition-all active:scale-95 sm:flex-none"
                  >
                    Confirm Order
                  </button>
                )}

                {order.status === "confirmed" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShip(order.id);
                    }}
                    className="bg-brand-blue hover:bg-brand-blue/90 inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-6 py-2 text-sm font-bold text-white shadow-xs transition-all active:scale-95 sm:flex-none"
                  >
                    <Truck className="h-4 w-4" /> Ship Order
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
