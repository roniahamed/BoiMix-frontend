"use client";

import { useState } from "react";
import { ShoppingBag, Plus, Filter } from "lucide-react";
import { AddBookDialog } from "@/components/shared/add-book-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_CUSTOMER_ORDERS, CustomerOrder } from "@/lib/data/sales";
import { SalesStats } from "@/components/dashboard/sales/sales-stats";
import { SalesOrderCard } from "@/components/dashboard/sales/sales-order-card";
import { SalesShipDialog } from "@/components/dashboard/sales/sales-ship-dialog";
import { SalesDetailsDialog } from "@/components/dashboard/sales/sales-details-dialog";

export default function CustomerOrdersDashboardPage() {
  const [orders, setOrders] = useState<CustomerOrder[]>(MOCK_CUSTOMER_ORDERS);
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "confirmed" | "shipped" | "completed" | "cancelled"
  >("all");
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(
    null,
  );
  const [shipOrderId, setShipOrderId] = useState<string | null>(null);

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const confirmedCount = orders.filter((o) => o.status === "confirmed").length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;
  const cancelledCount = orders.filter((o) => o.status === "cancelled").length;

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const handleConfirmOrder = (orderId: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: "confirmed" } : o)),
    );
  };

  const handleMarkAsShipped = (orderId: string) => {
    setShipOrderId(orderId);
  };

  const handleConfirmShip = (courierName: string, trackingNumber: string) => {
    if (shipOrderId) {
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
      if (selectedOrder?.id === shipOrderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: "shipped",
          deliveryMethod: courierName,
          trackingNumber: trackingNumber,
        });
      }
    }
    setShipOrderId(null);
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
      <SalesStats orders={orders} />

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
            <SalesOrderCard
              key={order.id}
              order={order}
              onSelect={setSelectedOrder}
              onConfirm={handleConfirmOrder}
              onShip={handleMarkAsShipped}
              onCancel={handleCancelOrder}
            />
          ))
        )}
      </div>

      {/* Ship Order Dialog */}
      <SalesShipDialog
        shipOrderId={shipOrderId}
        orders={orders}
        onClose={() => setShipOrderId(null)}
        onConfirmShip={handleConfirmShip}
      />

      {/* Details Dialog */}
      <SalesDetailsDialog
        selectedOrder={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onConfirmOrder={handleConfirmOrder}
        onMarkAsShipped={handleMarkAsShipped}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  );
}
