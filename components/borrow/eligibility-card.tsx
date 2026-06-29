import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EligibilityCardProps {
  depositRequired: number;
  availableLimit: number;
  activeOrders: number;
  maxActiveOrders?: number;
  hasOverdueHistory?: boolean;
}

export function EligibilityCard({
  depositRequired,
  availableLimit,
  activeOrders,
  maxActiveOrders = 2,
  hasOverdueHistory = false,
}: EligibilityCardProps) {
  const hasEnoughDeposit = availableLimit >= depositRequired;
  const isEligible =
    hasEnoughDeposit && activeOrders < maxActiveOrders && !hasOverdueHistory;

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="mb-6 flex flex-col items-center">
          <div
            className={cn(
              "mb-3 flex h-12 w-12 items-center justify-center rounded-full",
              isEligible
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600",
            )}
          >
            {isEligible ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <AlertCircle className="h-6 w-6" />
            )}
          </div>
          <h2 className="text-xl font-bold">
            {isEligible ? "You're Eligible!" : "Not Eligible"}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/20 rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2
                className={cn(
                  "h-4 w-4",
                  hasEnoughDeposit ? "text-green-500" : "text-red-500",
                )}
              />
              <h3 className="text-sm font-semibold">Deposit Requirement</h3>
            </div>
            <div className="ml-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Minimum Required:</span>
                <span className="font-medium">৳{depositRequired}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Your Available:</span>
                <span
                  className={cn(
                    "font-medium",
                    hasEnoughDeposit ? "text-green-600" : "text-red-600",
                  )}
                >
                  ৳{availableLimit}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-muted/20 rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2
                className={cn(
                  "h-4 w-4",
                  activeOrders < maxActiveOrders && !hasOverdueHistory
                    ? "text-green-500"
                    : "text-red-500",
                )}
              />
              <h3 className="text-sm font-semibold">Borrow Policy</h3>
            </div>
            <div className="ml-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Active Borrow Orders:
                </span>
                <span
                  className={cn(
                    "font-medium",
                    activeOrders >= maxActiveOrders && "text-red-600",
                  )}
                >
                  {activeOrders}/{maxActiveOrders}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  No Overdue History
                </span>
                <span
                  className={cn(
                    "font-medium",
                    hasOverdueHistory ? "text-red-600" : "text-green-600",
                  )}
                >
                  {hasOverdueHistory ? "Failed" : "Pass"}
                </span>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "mt-4 rounded-lg p-3 text-center text-sm font-medium",
              isEligible
                ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
            )}
          >
            {isEligible
              ? "You are eligible to borrow these books."
              : "You do not meet the borrow requirements."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
