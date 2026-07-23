"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard, Edit, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DashboardLibraryCardProps = {
  book: {
    id: string;
    title: string;
    author: string;
    price?: number;
    originalPrice?: number;
    condition: string;
    coverUrl: string;
    sellerName?: string;
    tags: string[];
    isSold?: boolean;
    isExchanged?: boolean;
  };
};

export function DashboardLibraryCard({ book }: DashboardLibraryCardProps) {
  const handleDelete = () => {
    toast.success("Listing Deleted", {
      description: `${book.title} has been removed from your library.`,
    });
  };

  const handleMarkAsSold = () => {
    toast.success("Marked as Sold", {
      description: `${book.title} is now marked as sold.`,
    });
  };

  return (
    <div className="bg-card group relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
      {/* Action Menu (Top Right) */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/80 hover:bg-background size-8 rounded-full shadow-sm backdrop-blur"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Manage Listing</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/books/upload?edit=${book.id}`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 size-4" /> Edit Details
              </Link>
            </DropdownMenuItem>
            {book.tags.includes("sell") && !book.isSold && (
              <DropdownMenuItem
                onClick={handleMarkAsSold}
                className="cursor-pointer"
              >
                <CreditCard className="mr-2 size-4" /> Mark as Sold
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            >
              <Trash2 className="mr-2 size-4" /> Delete Listing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Book Cover */}
      <div className="bg-muted/30 relative aspect-[3/4] w-full shrink-0 overflow-hidden">
        <Image
          src={book.coverUrl || "/images/books/placeholder.jpg"}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Status Overlay */}
        {(book.isSold || book.isExchanged) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-semibold tracking-wider uppercase"
            >
              {book.isSold ? "Sold Out" : "Exchanged"}
            </Badge>
          </div>
        )}

        {/* Tags Overlay (Bottom) */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex flex-wrap gap-1.5">
            {book.tags.includes("sell") && (
              <Badge
                variant="secondary"
                className="border-none bg-white/20 text-white backdrop-blur-md"
              >
                Sell
              </Badge>
            )}
            {book.tags.includes("exchange") && (
              <Badge
                variant="secondary"
                className="border-none bg-white/20 text-white backdrop-blur-md"
              >
                Exchange
              </Badge>
            )}
            {book.tags.includes("borrow") && (
              <Badge
                variant="secondary"
                className="border-none bg-white/20 text-white backdrop-blur-md"
              >
                Borrow
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3.5">
        <Link href={`/books/${book.id}`} className="block">
          <h3 className="text-foreground group-hover:text-primary line-clamp-1 leading-tight font-semibold transition-colors">
            {book.title}
          </h3>
          <p className="text-muted-foreground mt-1 line-clamp-1 text-xs">
            {book.author}
          </p>
        </Link>

        <div className="mt-auto pt-3">
          {book.tags.includes("sell") && (
            <div className="text-primary flex items-center gap-1.5 font-bold">
              <span>৳{book.price}</span>
              {book.originalPrice &&
                book.price !== undefined &&
                book.originalPrice > book.price && (
                  <span className="text-muted-foreground text-[10px] font-normal line-through">
                    ৳{book.originalPrice}
                  </span>
                )}
            </div>
          )}

          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="outline" className="text-[10px]">
              {book.condition}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
