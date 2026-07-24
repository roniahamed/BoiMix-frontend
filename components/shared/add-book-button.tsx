"use client";

import React, { ReactNode, useState } from "react";
import { PlusIcon, SendIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadBookForm } from "@/components/shared/upload-book-form";

export function AddBookDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const formId = React.useId();

  type TriggerElement = React.ReactElement<{
    onClick?: React.MouseEventHandler;
  }>;

  const trigger = React.isValidElement(children) ? (
    React.cloneElement(children as TriggerElement, {
      onClick: (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setOpen(true);
        (children as TriggerElement).props.onClick?.(event);
      },
    })
  ) : (
    <span onClick={() => setOpen(true)}>{children}</span>
  );

  return (
    <>
      {trigger}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="h-[100dvh] w-full max-w-5xl overflow-hidden border-none bg-transparent p-0 shadow-none sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl"
        >
          <DialogTitle className="sr-only">Add New Book</DialogTitle>
          <DialogClose className="bg-background/95 text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute top-4 right-4 z-[80] flex size-10 items-center justify-center rounded-full border shadow-lg backdrop-blur transition-colors focus-visible:ring-2 focus-visible:outline-none">
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="bg-background h-full w-full overflow-y-auto pb-20 sm:rounded-2xl">
            <UploadBookForm
              formId={formId}
              showActions={false}
              onSuccess={() => setOpen(false)}
            />
          </div>
          <div className="bg-card absolute right-0 bottom-0 left-0 z-[70] border-t px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.14)] sm:rounded-b-2xl">
            <div className="flex w-full justify-end">
              <Button
                type="submit"
                form={formId}
                className="h-12 w-full sm:w-auto"
              >
                <SendIcon className="mr-2 h-4 w-4" /> Publish Book
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
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
