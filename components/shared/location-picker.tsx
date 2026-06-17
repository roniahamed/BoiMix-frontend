"use client";

import { MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type LocationOption = {
  label: string;
  value: string;
};

type LocationPickerProps = {
  locations: LocationOption[];
  value?: string;
  placeholder?: string;
  className?: string;
  onValueChange?: (value: string) => void;
};

export function LocationPicker({
  locations,
  value,
  placeholder = "Select location",
  className,
  onValueChange,
}: LocationPickerProps) {
  return (
    <div className={cn("relative", className)}>
      <MapPinIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="pl-9">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.value} value={location.value}>
              {location.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
