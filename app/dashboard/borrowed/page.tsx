"use client";

import Link from "next/link";
import Image from "next/image";
import { useBorrowStore } from "@/lib/store/use-borrow-store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BorrowedPage() {
  const orders = useBorrowStore((state) => state.orders);

  // Show all mock orders for now (since borrowerId is "current-user")
  const activeOrders = orders.filter((o) => o.borrowerId === "current-user");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Borrowed Books</h1>
        <p className="text-muted-foreground mt-2">
          Track books you have requested or are currently borrowing.
        </p>
      </div>

      {activeOrders.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          You don&apos;t have any active borrow requests.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeOrders.map((order) => (
            <Link key={order.id} href={`/borrow/active/${order.id}`}>
              <Card className="hover:border-primary h-full cursor-pointer transition-colors">
                <CardContent className="flex gap-4 p-4">
                  <div className="bg-muted relative h-24 w-16 shrink-0 overflow-hidden rounded-sm border">
                    <Image
                      src={order.bookImage}
                      fill
                      alt={order.bookTitle}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="line-clamp-2 text-sm font-semibold">
                      {order.bookTitle}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Owner: {order.ownerId}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="text-muted-foreground font-mono text-xs">
                        ID: {order.id}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] uppercase"
                      >
                        {order.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
