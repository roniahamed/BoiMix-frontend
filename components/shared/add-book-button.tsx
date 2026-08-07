"use client";

import React, { ReactNode } from "react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddBookDialog({ children }: { children: ReactNode }) {
  const router = useRouter();

  type TriggerElement = React.ReactElement<{
    onClick?: React.MouseEventHandler;
  }>;

  const trigger = React.isValidElement(children) ? (
    React.cloneElement(children as TriggerElement, {
      onClick: (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        router.push("/dashboard/upload");
        (children as TriggerElement).props.onClick?.(event);
      },
    })
  ) : (
    <span onClick={() => router.push("/dashboard/upload")}>{children}</span>
  );

  return <>{trigger}</>;
}

export function AddBookButton({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <AddBookDialog>
      <button
        className={
          className ||
          "group hidden shrink-0 items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-[#0397d3] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 sm:inline-flex"
        }
      >
        {children || (
          <>
            <PlusIcon className="h-4 w-4 stroke-[3] transition-transform duration-200 group-hover:rotate-90" />
            Add New Book
          </>
        )}
      </button>
    </AddBookDialog>
  );
}
