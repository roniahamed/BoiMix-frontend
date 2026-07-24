"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Edit,
  MoreVertical,
  Trash2,
  ShoppingBag,
  Repeat,
  BookOpen,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

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

const TAG_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  sell: {
    label: "Sell",
    color: "bg-emerald-500",
    icon: <ShoppingBag className="h-2.5 w-2.5" />,
  },
  exchange: {
    label: "Exchange",
    color: "bg-[#0397d3]",
    icon: <Repeat className="h-2.5 w-2.5" />,
  },
  borrow: {
    label: "Borrow",
    color: "bg-purple-500",
    icon: <BookOpen className="h-2.5 w-2.5" />,
  },
};

const CONDITION_COLOR: Record<string, string> = {
  new: "bg-emerald-500/15 text-emerald-700",
  excellent: "bg-[#0397d3]/10 text-[#0397d3]",
  good: "bg-amber-400/15 text-amber-700",
  fair: "bg-orange-400/15 text-orange-700",
  poor: "bg-red-400/15 text-red-700",
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

  const conditionKey = book.condition?.toLowerCase() ?? "good";
  const conditionColor =
    CONDITION_COLOR[conditionKey] ?? "bg-muted text-muted-foreground";

  return (
    <div className="bg-card group border-border/60 relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0397d3]/30 hover:shadow-lg">
      {/* ── Action Menu ── */}
      <div className="absolute top-2 right-2 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="size-7 rounded-full border-0 bg-black/40 text-white shadow backdrop-blur-sm hover:bg-black/60"
            >
              <MoreVertical className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Manage Listing</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/books/${book.id}`} className="cursor-pointer">
                <Eye className="mr-2 size-4" /> View Listing
              </Link>
            </DropdownMenuItem>
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

      {/* ── Book Cover ── */}
      <Link href={`/books/${book.id}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          <Image
            src={book.coverUrl || "/images/books/placeholder.jpg"}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Sold / Exchanged Overlay */}
          {(book.isSold || book.isExchanged) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/65 backdrop-blur-[2px]">
              <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-extrabold tracking-widest text-white uppercase backdrop-blur-sm">
                {book.isSold ? "Sold Out" : "Exchanged"}
              </span>
            </div>
          )}

          {/* Gradient fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Tags */}
          <div className="absolute bottom-2 left-2 z-10 flex flex-wrap gap-1">
            {(["sell", "exchange", "borrow"] as const).map((tag) =>
              book.tags.includes(tag) ? (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white shadow-sm ${TAG_CONFIG[tag].color}`}
                >
                  {TAG_CONFIG[tag].icon}
                  {TAG_CONFIG[tag].label}
                </span>
              ) : null,
            )}
          </div>
        </div>
      </Link>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <Link href={`/books/${book.id}`} className="block">
          <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-sm leading-tight font-bold transition-colors">
            {book.title}
          </h3>
          <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
            {book.author}
          </p>
        </Link>

        <div className="border-border/40 mt-auto flex items-center justify-between gap-2 border-t pt-2">
          {/* Price */}
          {book.tags.includes("sell") ? (
            <div className="flex items-baseline gap-1">
              <span className="text-primary text-sm font-extrabold">
                ৳{book.price}
              </span>
              {book.originalPrice &&
                book.price !== undefined &&
                book.originalPrice > book.price && (
                  <span className="text-muted-foreground text-[10px] line-through">
                    ৳{book.originalPrice}
                  </span>
                )}
            </div>
          ) : (
            <div />
          )}

          {/* Condition badge */}
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${conditionColor}`}
          >
            {book.condition}
          </span>
        </div>
      </div>
    </div>
  );
}
