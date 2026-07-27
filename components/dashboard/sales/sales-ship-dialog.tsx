import { useState } from "react";
import { Truck } from "lucide-react";
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
import { CustomerOrder } from "@/lib/data/sales";

type SalesShipDialogProps = {
  shipOrderId: string | null;
  orders: CustomerOrder[];
  onClose: () => void;
  onConfirmShip: (courierName: string, trackingNumber: string) => void;
};

export function SalesShipDialog({
  shipOrderId,
  orders,
  onClose,
  onConfirmShip,
}: SalesShipDialogProps) {
  const [courierName, setCourierName] = useState("");
  const [customCourier, setCustomCourier] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const shipOrder = orders.find((o) => o.id === shipOrderId);

  if (!shipOrderId || !shipOrder) return null;

  return (
    <Dialog open={!!shipOrderId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md space-y-4 rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-extrabold">
            <Truck className="text-brand-blue h-5 w-5" /> Mark Order as Shipped
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Enter shipping details for {shipOrder.id} ({shipOrder.buyerName})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold">
              Delivery / Courier Partner
            </Label>
            <Select
              value={customCourier ? "other" : courierName}
              onValueChange={(val) => {
                if (val === "other") {
                  setCustomCourier(true);
                  setCourierName("");
                } else {
                  setCustomCourier(false);
                  setCourierName(val);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Courier..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Steadfast Courier">
                  Steadfast Courier
                </SelectItem>
                <SelectItem value="Pathao Courier">Pathao Courier</SelectItem>
                <SelectItem value="Sundarban Courier">
                  Sundarban Courier
                </SelectItem>
                <SelectItem value="RedX Logistics">RedX Logistics</SelectItem>
                <SelectItem value="Paperfly">Paperfly</SelectItem>
                <SelectItem value="Self Handover / Meetup">
                  Self Handover / Meetup
                </SelectItem>
                <SelectItem value="other">Other / Custom Name</SelectItem>
              </SelectContent>
            </Select>

            {customCourier && (
              <Input
                placeholder="Enter courier service name"
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
                className="mt-2 text-xs"
              />
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold">
              Tracking Consignment Number / Note
            </Label>
            <Input
              placeholder="e.g. STDF-992014 or Handover at Metro"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              disabled={!courierName.trim()}
              onClick={() => onConfirmShip(courierName, trackingNumber)}
              className="bg-brand-blue hover:bg-brand-blue/90 w-full rounded-xl py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              Confirm Shipment & Notify Buyer
            </button>
            <button
              onClick={onClose}
              className="bg-muted text-foreground w-full rounded-xl py-2 text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
