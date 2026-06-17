"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  PlusIcon,
  Repeat2Icon,
  BookOpenIcon,
  ShoppingCartIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Sell Book",
    href: "/dashboard/books/add?action=sell",
    icon: ShoppingCartIcon,
    color:
      "bg-warning text-warning-foreground hover:bg-warning/80 shadow-warning/30",
  },
  {
    title: "Swap Book",
    href: "/dashboard/books/add?action=swap",
    icon: Repeat2Icon,
    color: "bg-info text-info-foreground hover:bg-info/80 shadow-info/30",
  },
  {
    title: "Borrow Book",
    href: "/explore/central-library",
    icon: BookOpenIcon,
    color:
      "bg-success text-success-foreground hover:bg-success/80 shadow-success/30",
  },
];

export function MobileFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);

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
    // Also close on Escape key
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleNavigate(href: string) {
    if (isDraggingRef.current) return;
    setIsOpen(false);
    // small delay so close animation plays before navigation
    setTimeout(() => router.push(href), 120);
  }

  return (
    <>
      {/* Background Overlay */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] transition-all duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Constraints Area for Dragging */}
      <div
        ref={constraintsRef}
        className="pointer-events-none fixed inset-4 z-40 md:inset-6"
      />

      {/* FAB Container */}
      <motion.div
        ref={containerRef}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDragEnd={() => {
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 150);
        }}
        className="fixed right-4 bottom-20 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6"
        style={{ touchAction: "none" }} // Prevents scrolling while dragging on touch devices
      >
        {/* Sub-actions */}
        <div className="flex flex-col items-end gap-2.5">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const delay = isOpen
              ? index * 60
              : (actions.length - 1 - index) * 40;
            return (
              <div
                key={action.title}
                className={cn(
                  "flex items-center gap-2.5 transition-all duration-300",
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Label */}
                <span className="bg-card border-border text-foreground pointer-events-none cursor-default rounded-lg border px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-md">
                  {action.title}
                </span>

                {/* Circle Button */}
                <button
                  type="button"
                  onClick={() => handleNavigate(action.href)}
                  aria-label={action.title}
                  className={cn(
                    "pointer-events-auto flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95",
                    action.color,
                  )}
                >
                  <Icon className="size-5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Main FAB Button */}
        <button
          type="button"
          onClick={(e) => {
            if (isDraggingRef.current) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            setIsOpen((prev) => !prev);
          }}
          aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
          aria-expanded={isOpen}
          className={cn(
            "pointer-events-auto z-50 flex size-14 cursor-pointer items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95",
            isOpen
              ? "bg-destructive text-destructive-foreground rotate-45"
              : "from-primary to-info bg-gradient-to-br text-white",
          )}
        >
          {isOpen ? (
            <XIcon className="pointer-events-none size-6" />
          ) : (
            <PlusIcon className="pointer-events-none size-6" />
          )}
        </button>
      </motion.div>
    </>
  );
}
