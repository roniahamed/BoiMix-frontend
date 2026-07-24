"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Edit,
  MoreVertical,
  Trash2,
  Copy,
  Archive,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Book } from "@/components/shared/library-grid";

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
  book: Book;
  isSelected?: boolean;
  onToggleSelect?: () => void;
};

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; dot: string }
> = {
  available: {
    label: "Available",
    bg: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  borrowed: {
    label: "Borrowed",
    bg: "bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
    dot: "bg-purple-500",
  },
  archived: {
    label: "Archived",
    bg: "bg-slate-500/10 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400",
    dot: "bg-slate-500",
  },
  sold: {
    label: "Sold",
    bg: "bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400",
    dot: "bg-red-500",
  },
};

export function DashboardLibraryCard({
  book,
  isSelected,
  onToggleSelect,
}: DashboardLibraryCardProps) {
  const handleDelete = () => {
    toast.success("Listing Deleted", {
      description: `${book.title} has been removed from your inventory.`,
    });
  };

  const statusKey = book.inventoryStatus || "available";
  const statusConfig = STATUS_CONFIG[statusKey] || STATUS_CONFIG["available"];

  return (
    <div
      className={`bg-card group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? "border-[#0397d3] shadow-md ring-1 ring-[#0397d3]"
          : "border-border/60 hover:-translate-y-1 hover:border-[#0397d3]/30"
      }`}
    >
      {/* ── Selection Overlay (Desktop Hover or Mobile) ── */}
      <div
        className={`absolute inset-0 z-30 transition-opacity ${isSelected ? "pointer-events-auto opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleSelect?.();
          }}
          className="absolute top-2 left-2 rounded bg-white p-1 shadow hover:bg-slate-50 dark:bg-slate-800"
        >
          {isSelected ? (
            <CheckCircle2 className="h-5 w-5 text-[#0397d3]" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
          )}
        </button>
      </div>

      {/* ── Action Menu ── */}
      <div className="absolute top-2 right-2 z-30">
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
            <DropdownMenuLabel>Manage Inventory</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/books/upload?edit=${book.id}`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 size-4" /> Edit Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <CheckCircle2 className="mr-2 size-4" /> Change Status
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/books/${book.id}`} className="cursor-pointer">
                <Eye className="mr-2 size-4" /> Manage Listing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Copy className="mr-2 size-4" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Archive className="mr-2 size-4" /> Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            >
              <Trash2 className="mr-2 size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Top Status Ribbon ── */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold ${statusConfig.bg}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
        {statusConfig.label}
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
          {/* Gradient fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </Link>

      {/* ── Content & Management Info ── */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <Link href={`/books/${book.id}`} className="block">
          <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-sm leading-tight font-bold transition-colors">
            {book.title}
          </h3>
          <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
            {book.author}
          </p>
        </Link>

        {/* Quick Capabilities / Status info */}
        <div className="mt-2 rounded-xl bg-slate-50 p-2 dark:bg-slate-800/50">
          {statusKey === "borrowed" ? (
            <div className="flex flex-col gap-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Borrower</span>
                <span className="font-semibold">
                  {book.borrower || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {book.dueDate || "N/A"}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
              {book.tags.filter((t) =>
                ["borrow", "exchange", "sell"].includes(t),
              ).length > 0 ? (
                book.tags
                  .filter((t) => ["borrow", "exchange", "sell"].includes(t))
                  .map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span className="capitalize">
                        {tag === "sell" ? "Sale" : tag}
                      </span>
                    </div>
                  ))
              ) : (
                <span className="text-slate-400 italic">No actions set</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-1 pt-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Condition</span>
            <span className="font-semibold text-slate-700 capitalize dark:text-slate-300">
              {book.condition}
            </span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Location</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {book.shelfLocation || "Unassigned"}
            </span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Added</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {book.addedAt || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">ISBN</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {book.isbn || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
