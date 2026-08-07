"use client";

import * as React from "react";
import { Check, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";

export interface CreatableComboboxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onSearchChange?: (search: string) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
}

export function CreatableCombobox({
  options,
  value,
  onChange,
  onSearchChange,
  placeholder = "Search or add...",
  emptyText = "No results found.",
  className,
}: CreatableComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value || "");

  // Sync internal value with external value if it changes externally
  React.useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val); // Immediately update form value as user types
    if (onSearchChange) {
      onSearchChange(val);
    }
    if (!open) setOpen(true);
  };

  const handleSelect = (option: string) => {
    setInputValue(option);
    onChange(option);
    setOpen(false);
  };

  const filteredOptions = React.useMemo(() => {
    if (onSearchChange) return options; // Let parent handle filtering if onSearchChange is provided
    if (!inputValue) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [options, inputValue, onSearchChange]);

  const exactMatch = options.some(
    (option) => option.toLowerCase() === inputValue.toLowerCase(),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (!open) setOpen(true);
            if (onSearchChange) onSearchChange(inputValue);
          }}
          className={cn("w-full", className)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue) {
              e.preventDefault();
              onChange(inputValue);
              setOpen(false);
            }
          }}
        />
      </PopoverAnchor>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus stealing from input
      >
        <div
          className="max-h-60 overflow-y-auto p-1"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {filteredOptions.length === 0 && !inputValue && (
            <p className="text-muted-foreground p-2 text-center text-sm">
              {emptyText}
            </p>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none",
                inputValue === option && "bg-accent text-accent-foreground",
              )}
              onClick={() => handleSelect(option)}
            >
              {inputValue === option && (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Check className="h-4 w-4" />
                </span>
              )}
              {option}
            </div>
          ))}
          {inputValue && !exactMatch && (
            <div
              className="hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-2 text-sm outline-none select-none"
              onClick={() => handleSelect(inputValue)}
            >
              <Plus className="h-4 w-4" />
              Add &quot;{inputValue}&quot;
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
