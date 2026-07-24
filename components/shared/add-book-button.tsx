"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { UploadBookForm } from "@/components/shared/upload-book-form";

export function AddBookDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="inline-block w-full cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="h-[100dvh] w-full max-w-5xl overflow-y-auto border-none bg-transparent p-0 shadow-none sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl [&>button]:hidden sm:[&>button]:flex">
        <DialogTitle className="sr-only">Add New Book</DialogTitle>
        <div className="bg-background h-full w-full sm:h-auto sm:rounded-2xl">
          <UploadBookForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AddBookButton({ className }: { className?: string }) {
  return (
    <AddBookDialog>
      <button
        className={
          className ||
          "group hidden shrink-0 items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-[#0397d3] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 sm:inline-flex"
        }
      >
        <PlusIcon className="h-4 w-4 stroke-[3] transition-transform duration-200 group-hover:rotate-90" />
        Add New Book
      </button>
    </AddBookDialog>
  );
}
