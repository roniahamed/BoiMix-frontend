"use client";

import { useState } from "react";
import {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Plus,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Eye,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Printer,
  User,
  ChevronRight,
  XCircle,
  Filter,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddBookDialog } from "@/components/shared/add-book-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CustomerOrder {
  id: string;
  orderDate: string;
  status: "pending" | "confirmed" | "shipped" | "completed" | "cancelled";
  paymentStatus: string;
  buyerName: string;
  buyerUsername: string;
  buyerAvatar: string;
  buyerPhone: string;
  buyerAddress: string;
  deliveryMethod: string;
  trackingNumber?: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  price: number;
  shippingFee: number;
  totalAmount: number;
}

const MOCK_CUSTOMER_ORDERS: CustomerOrder[] = [
  {
    id: "#ORD-9824",
    orderDate: "23 Jul 2026, 02:15 PM",
    status: "pending",
    paymentStatus: "Escrow Verified (bKash)",
    buyerName: "Jannatul Ferdaus",
    buyerUsername: "jannatul",
    buyerAvatar: "https://i.pravatar.cc/150?u=jannatul",
    buyerPhone: "01712-345678",
    buyerAddress: "House 42, Road 9/A, Dhanmondi, Dhaka - 1209",
    deliveryMethod: "Steadfast Courier (Home Delivery)",
    bookTitle: "Deep Work: Rules for Focused Success",
    bookAuthor: "Cal Newport",
    bookCover:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&fit=crop",
    price: 450,
    shippingFee: 60,
    totalAmount: 510,
  },
  {
    id: "#ORD-9812",
    orderDate: "22 Jul 2026, 06:40 PM",
    status: "pending",
    paymentStatus: "Escrow Verified (Nagad)",
    buyerName: "Tanvir Hossain",
    buyerUsername: "tanvir",
    buyerAvatar: "https://i.pravatar.cc/150?u=tanvir",
    buyerPhone: "01823-987654",
    buyerAddress: "Plot 15, Sector 4, Uttara, Dhaka - 1230",
    deliveryMethod: "Metro Station Handover (Uttara Center)",
    bookTitle: "The Alchemist",
    bookAuthor: "Paulo Coelho",
    bookCover:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=300&fit=crop",
    price: 350,
    shippingFee: 0,
    totalAmount: 350,
  },
  {
    id: "#ORD-9780",
    orderDate: "20 Jul 2026, 11:10 AM",
    status: "shipped",
    paymentStatus: "Escrow Verified (Card)",
    buyerName: "Fahim Ahmed",
    buyerUsername: "fahim",
    buyerAvatar: "https://i.pravatar.cc/150?u=fahim",
    buyerPhone: "01911-554433",
    buyerAddress: "Block C, Road 11, Banani, Dhaka - 1213",
    deliveryMethod: "Pathao Courier",
    bookTitle: "The Psychology of Money",
    bookAuthor: "Morgan Housel",
    bookCover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&fit=crop",
    price: 480,
    shippingFee: 60,
    totalAmount: 540,
  },
  {
    id: "#ORD-9650",
    orderDate: "15 Jul 2026, 04:30 PM",
    status: "completed",
    paymentStatus: "Paid Out to bKash",
    buyerName: "Nusrat Jahan",
    buyerUsername: "nusrat",
    buyerAvatar: "https://i.pravatar.cc/150?u=nusrat",
    buyerPhone: "01677-889900",
    buyerAddress: "Section 10, Block A, Mirpur, Dhaka - 1216",
    deliveryMethod: "Redx Courier",
    bookTitle: "Rich Dad Poor Dad",
    bookAuthor: "Robert Kiyosaki",
    bookCover:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300&fit=crop",
    price: 320,
    shippingFee: 60,
    totalAmount: 380,
  },
];

export default function SalesPage() {
  const [orders, setOrders] = useState<CustomerOrder[]>(MOCK_CUSTOMER_ORDERS);
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "shipped" | "completed"
  >("all");
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(
    null,
  );
  const [shipOrderId, setShipOrderId] = useState<string | null>(null);
  const [courierName, setCourierName] = useState("");
  const [customCourier, setCustomCourier] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "all") return true;
    return o.status === activeTab;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const confirmedCount = orders.filter((o) => o.status === "confirmed").length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;
  const cancelledCount = orders.filter((o) => o.status === "cancelled").length;

  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);

  const handleConfirmOrder = (orderId: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: "confirmed" } : o)),
    );
  };

  const handleMarkAsShipped = (orderId: string) => {
    setShipOrderId(orderId);
  };

  const submitShipping = () => {
    if (!shipOrderId) return;
    setOrders(
      orders.map((o) =>
        o.id === shipOrderId
          ? {
              ...o,
              status: "shipped",
              deliveryMethod: courierName,
              trackingNumber: trackingNumber,
            }
          : o,
      ),
    );
    // If modal is open for this order, update its view too
    if (selectedOrder?.id === shipOrderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: "shipped",
        deliveryMethod: courierName,
        trackingNumber: trackingNumber,
      });
    }
    setShipOrderId(null);
    setCourierName("");
    setCustomCourier(false);
    setTrackingNumber("");
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
    );
  };

  return (
    <div className="space-y-6 pb-16 sm:space-y-8">
      {/* Header & Quick Add */}
      <div className="border-border/50 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <ShoppingBag className="h-7 w-7 text-emerald-500" /> Customer Orders
            & Sales
          </h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Manage incoming orders from readers who bought your books, track
            delivery, and view payouts.
          </p>
        </div>

        <AddBookDialog>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[40px] items-center justify-center gap-2 self-start rounded-xl px-4 py-2.5 text-xs font-bold shadow-xs transition-all active:scale-95 sm:self-auto sm:text-sm">
            <Plus className="h-4 w-4 stroke-[3]" /> Add Book to Marketplace
          </button>
        </AddBookDialog>
      </div>

      {/* Revenue Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Total Sales Revenue</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-foreground text-2xl font-extrabold sm:text-3xl">
            ৳ {totalRevenue}
          </p>
          <p className="text-success flex items-center gap-0.5 pt-0.5 text-[11px] font-bold">
            <TrendingUp className="h-3 w-3" /> +৳ 800 this month
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Customer Orders</span>
            <ShoppingBag className="text-brand-blue h-4 w-4" />
          </div>
          <p className="text-foreground text-2xl font-extrabold sm:text-3xl">
            {orders.length} Orders
          </p>
          <p className="text-muted-foreground pt-0.5 text-[11px] font-medium">
            4 active buyers
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Pending Delivery</span>
            <Clock className="text-warning h-4 w-4" />
          </div>
          <p className="text-warning text-2xl font-extrabold sm:text-3xl">
            {pendingCount}
          </p>
          <p className="text-muted-foreground pt-0.5 text-[11px] font-medium">
            Action required
          </p>
        </div>

        <div className="bg-card border-border/70 space-y-1 rounded-2xl border p-4 shadow-2xs">
          <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
            <span>Available Balance</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
            ৳ 1,800
          </p>
          <p className="text-muted-foreground pt-0.5 text-[11px] font-medium">
            Ready for bKash payout
          </p>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="border-border/60 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-semibold">Filter Orders:</span>
        </div>
        <Select
          value={activeTab}
          onValueChange={(
            val:
              | "all"
              | "pending"
              | "confirmed"
              | "shipped"
              | "completed"
              | "cancelled",
          ) => setActiveTab(val)}
        >
          <SelectTrigger className="bg-background w-[200px]">
            <SelectValue placeholder="Select status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders ({orders.length})</SelectItem>
            <SelectItem value="pending">New Orders ({pendingCount})</SelectItem>
            <SelectItem value="confirmed">
              Confirmed ({confirmedCount})
            </SelectItem>
            <SelectItem value="shipped">Shipped ({shippedCount})</SelectItem>
            <SelectItem value="completed">
              Completed ({completedCount})
            </SelectItem>
            <SelectItem value="cancelled">
              Cancelled ({cancelledCount})
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customer Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-card border-border space-y-3 rounded-2xl border border-dashed p-8 text-center">
            <ShoppingBag className="text-muted-foreground mx-auto h-10 w-10 opacity-50" />
            <p className="text-foreground text-base font-bold">
              No orders in this section
            </p>
            <p className="text-muted-foreground mx-auto max-w-sm text-xs">
              When readers purchase your listed books, their orders and shipping
              details will appear here.
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
                      src={order.bookCover}
                      alt={order.bookTitle}
                      className="h-14 w-10 shrink-0 rounded border object-cover shadow-xs"
                    />
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

                {(order.status === "pending" ||
                  order.status === "confirmed") && (
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
                        handleCancelOrder(order.id);
                      }}
                      className="bg-danger/10 text-danger hover:bg-danger/20 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold transition-colors"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Cancel
                    </button>
                    {order.status === "pending" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmOrder(order.id);
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
                          handleMarkAsShipped(order.id);
                        }}
                        className="bg-brand-blue hover:bg-brand-blue/90 flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-bold text-white transition-all"
                      >
                        <Truck className="h-3.5 w-3.5" /> Ship
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
                      <ShieldCheck className="h-3.5 w-3.5" />{" "}
                      {order.paymentStatus}
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={order.bookCover}
                      alt={order.bookTitle}
                      className="border-border h-16 w-12 shrink-0 rounded-lg border object-cover shadow-xs"
                    />
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

                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:flex-none"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/dashboard/messages/${order.buyerUsername}?prefill=${encodeURIComponent(`Hi ${order.buyerName}, regarding your order ${order.id} for "${order.bookTitle}":\n`)}`;
                      }}
                      className="bg-muted hover:bg-muted/80 text-foreground inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:flex-none"
                    >
                      <MessageSquare className="text-primary h-3.5 w-3.5" />{" "}
                      Chat
                    </button>

                    {(order.status === "pending" ||
                      order.status === "confirmed") && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelOrder(order.id);
                          }}
                          className="bg-danger/10 text-danger hover:bg-danger/20 inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all sm:flex-none"
                        >
                          <XCircle className="h-3.5 w-3.5" /> Cancel
                        </button>
                        {order.status === "pending" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConfirmOrder(order.id);
                            }}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold shadow-2xs transition-all active:scale-95 sm:flex-none"
                          >
                            Confirm
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsShipped(order.id);
                            }}
                            className="bg-brand-blue hover:bg-brand-blue/90 inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-all active:scale-95 sm:flex-none"
                          >
                            <Truck className="h-3.5 w-3.5" /> Mark Shipped
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Full Order & Receipt Modal Dialog */}
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
                    Customer Order Details{" "}
                    <span className="text-muted-foreground font-mono text-xs font-normal">
                      ({selectedOrder.id})
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-0.5 text-xs">
                    Order received on {selectedOrder.orderDate}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 text-xs">
              {/* Escrow Guarantee Banner */}
              <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400">
                    Escrow Payment Guaranteed
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-[11px]">
                    Payment of ৳{selectedOrder.totalAmount} is held safely in
                    BoiMix Escrow and will be released to your wallet upon
                    delivery completion.
                  </p>
                </div>
              </div>

              {/* Buyer Contact & Address */}
              <div className="bg-muted/40 border-border/50 space-y-2 rounded-xl border p-3.5">
                <p className="text-foreground text-[10px] font-bold tracking-wider uppercase">
                  Buyer Delivery Address
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={selectedOrder.buyerAvatar} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground text-sm font-bold">
                      {selectedOrder.buyerName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      @{selectedOrder.buyerUsername} •{" "}
                      {selectedOrder.buyerPhone}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground border-border/30 border-t pt-1 font-medium">
                  📍 {selectedOrder.buyerAddress}
                </p>
                <p className="text-primary text-[11px] font-semibold">
                  🚚 Delivery Partner: {selectedOrder.deliveryMethod}
                </p>
              </div>

              {/* Book Item Breakdown */}
              <div className="space-y-2">
                <p className="text-foreground text-[10px] font-bold tracking-wider uppercase">
                  Purchased Items
                </p>
                <div className="bg-card border-border/60 flex items-center justify-between rounded-xl border p-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedOrder.bookCover}
                      alt={selectedOrder.bookTitle}
                      className="h-12 w-9 rounded border object-cover"
                    />
                    <div>
                      <p className="text-foreground line-clamp-1 font-bold">
                        {selectedOrder.bookTitle}
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        {selectedOrder.bookAuthor}
                      </p>
                    </div>
                  </div>
                  <span className="text-foreground text-sm font-extrabold">
                    ৳ {selectedOrder.price}
                  </span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 border-t pt-3 text-xs">
                <div className="text-muted-foreground flex justify-between">
                  <span>Book Subtotal:</span>
                  <span className="text-foreground font-semibold">
                    ৳ {selectedOrder.price}
                  </span>
                </div>
                <div className="text-muted-foreground flex justify-between">
                  <span>Delivery Charge:</span>
                  <span className="text-foreground font-semibold">
                    ৳ {selectedOrder.shippingFee}
                  </span>
                </div>
                <div className="text-foreground flex justify-between border-t pt-2 text-sm font-extrabold">
                  <span>Total Amount Paid by Buyer:</span>
                  <span className="text-emerald-600">
                    ৳ {selectedOrder.totalAmount}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="pt-2">
                <p className="text-foreground mb-2 text-[10px] font-bold tracking-wider uppercase">
                  Fulfillment Timeline
                </p>
                <div className="border-primary/30 space-y-2 border-l-2 pl-2">
                  <div className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2 className="text-success h-3.5 w-3.5 shrink-0" />
                    <span className="text-foreground font-bold">
                      Order Placed & Escrow Held
                    </span>
                    <span className="text-muted-foreground ml-auto">
                      {selectedOrder.orderDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${selectedOrder.status !== "pending" ? "text-success" : "text-muted-foreground"} shrink-0`}
                    />
                    <span
                      className={
                        selectedOrder.status !== "pending"
                          ? "text-foreground font-bold"
                          : "text-muted-foreground"
                      }
                    >
                      Handed to Courier Partner
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${selectedOrder.status === "completed" ? "text-success" : "text-muted-foreground"} shrink-0`}
                    />
                    <span
                      className={
                        selectedOrder.status === "completed"
                          ? "text-foreground font-bold"
                          : "text-muted-foreground"
                      }
                    >
                      Delivered & Escrow Released
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
              <button
                onClick={() => window.print()}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-bold"
              >
                <Printer className="h-4 w-4" /> Print Order Slip
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.location.href = `/dashboard/messages/${selectedOrder.buyerUsername}?prefill=${encodeURIComponent(`Hi ${selectedOrder.buyerName}, regarding your order ${selectedOrder.id} for "${selectedOrder.bookTitle}":\n`)}`;
                  }}
                  className="bg-muted hover:bg-muted/80 text-foreground rounded-xl px-3 py-2 transition-colors"
                  title="Message Buyer"
                >
                  <MessageSquare className="text-primary h-4 w-4" />
                </button>
                {(selectedOrder.status === "pending" ||
                  selectedOrder.status === "confirmed") && (
                  <>
                    <button
                      onClick={() => {
                        handleCancelOrder(selectedOrder.id);
                        setSelectedOrder({
                          ...selectedOrder,
                          status: "cancelled",
                        });
                      }}
                      className="bg-danger/10 text-danger hover:bg-danger/20 rounded-xl px-4 py-2 text-xs font-bold transition-colors"
                    >
                      Cancel
                    </button>
                    {selectedOrder.status === "pending" ? (
                      <button
                        onClick={() => {
                          handleConfirmOrder(selectedOrder.id);
                          setSelectedOrder({
                            ...selectedOrder,
                            status: "confirmed",
                          });
                        }}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4 py-2 text-xs font-bold transition-all"
                      >
                        Confirm Order
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleMarkAsShipped(selectedOrder.id);
                        }}
                        className="bg-brand-blue hover:bg-brand-blue/90 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all"
                      >
                        Mark Shipped
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-muted text-foreground hover:bg-muted/80 rounded-xl px-4 py-2 text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Shipping Details Dialog */}
      <Dialog
        open={!!shipOrderId}
        onOpenChange={(open) => !open && setShipOrderId(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Shipping Details</DialogTitle>
            <DialogDescription>
              Please provide the courier name and tracking ID for this shipment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Courier / Delivery Method</Label>
              <Select
                value={customCourier ? "custom" : courierName || undefined}
                onValueChange={(val: string) => {
                  if (val === "custom") {
                    setCustomCourier(true);
                    setCourierName("");
                  } else {
                    setCustomCourier(false);
                    setCourierName(val);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Courier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Steadfast Courier">
                    Steadfast Courier
                  </SelectItem>
                  <SelectItem value="Pathao Courier">Pathao Courier</SelectItem>
                  <SelectItem value="RedX">RedX</SelectItem>
                  <SelectItem value="eCourier">eCourier</SelectItem>
                  <SelectItem value="In-person">
                    In-person (Hand to Hand)
                  </SelectItem>
                  <SelectItem value="custom">
                    Other (Custom Input)...
                  </SelectItem>
                </SelectContent>
              </Select>
              {customCourier && (
                <div className="animate-in fade-in slide-in-from-top-2 mt-3 duration-300">
                  <Input
                    placeholder="e.g. Sundarban Courier"
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Tracking ID (Optional)</Label>
              <Input
                placeholder="e.g. STEAD12345"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShipOrderId(null)}
              className="bg-muted hover:bg-muted/80 text-foreground rounded-xl px-4 py-2 text-sm font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={submitShipping}
              disabled={!courierName}
              className="bg-brand-blue hover:bg-brand-blue/90 rounded-xl px-4 py-2 text-sm font-bold text-white transition-colors disabled:opacity-50"
            >
              Confirm Shipment
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
