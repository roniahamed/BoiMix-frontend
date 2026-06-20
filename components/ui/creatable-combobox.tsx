"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export interface CreatableComboboxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
}

export function CreatableCombobox({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  emptyText = "No results found.",
  className,
}: CreatableComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  const exactMatch = options.some(
    (option) => option.toLowerCase() === search.toLowerCase(),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <div className="flex flex-col">
          <div className="border-b px-3">
            <Input
              placeholder="Search or add new..."
              className="h-9 border-0 px-0 shadow-none focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search && !exactMatch) {
                  e.preventDefault();
                  onChange(search);
                  setOpen(false);
                  setSearch("");
                }
              }}
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {filteredOptions.length === 0 && !search && (
              <p className="text-muted-foreground p-2 text-center text-sm">
                {emptyText}
              </p>
            )}
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none",
                  value === option && "bg-accent text-accent-foreground",
                )}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {value === option && (
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                {option}
              </div>
            ))}
            {search && !exactMatch && (
              <div
                className="hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-2 text-sm outline-none select-none"
                onClick={() => {
                  onChange(search);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <Plus className="h-4 w-4" />
                Add &quot;{search}&quot;
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
