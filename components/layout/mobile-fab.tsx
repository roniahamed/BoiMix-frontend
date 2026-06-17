"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  PlusIcon,
  Repeat2Icon,
  BookOpenIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const actions = [
    {
      title: "Sell Book",
      href: "/dashboard/books/add?action=sell",
      icon: ShoppingCartIcon,
      color: "bg-warning text-warning-foreground hover:bg-warning/90",
    },
    {
      title: "Swap Book",
      href: "/dashboard/books/add?action=swap",
      icon: Repeat2Icon,
      color: "bg-info text-info-foreground hover:bg-info/90",
    },
    {
      title: "Borrow Book",
      href: "/explore/central-library",
      icon: BookOpenIcon,
      color: "bg-success text-success-foreground hover:bg-success/90",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed right-4 bottom-20 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6"
    >
      {/* Background Overlay when open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sub-actions container */}
      <div
        className={cn(
          "pointer-events-none z-50 flex origin-bottom scale-90 flex-col items-end gap-3 opacity-0 transition-all duration-300",
          isOpen && "pointer-events-auto scale-100 opacity-100",
        )}
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-2.5"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Tooltip-like label */}
              <span className="bg-card border-border shadow-soft text-foreground rounded-lg border px-2.5 py-1 text-xs font-bold">
                {action.title}
              </span>
              {/* Circular Action Button */}
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-105 active:scale-95",
                  action.color,
                )}
              >
                <Icon className="size-5" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Main FAB Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
        aria-expanded={isOpen}
        className={cn(
          "from-primary to-info z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-r text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95",
          isOpen ? "from-destructive to-destructive rotate-45" : "",
        )}
      >
        <PlusIcon className="size-6 transition-transform duration-300" />
      </button>
    </div>
  );
}
