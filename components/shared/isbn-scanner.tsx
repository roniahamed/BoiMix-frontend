"use client";

import { ScanLineIcon } from "lucide-react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type IsbnScannerProps = {
  value?: string;
  onChange?: (value: string) => void;
  onScanRequest?: () => void;
};

export function IsbnScanner({
  value,
  onChange,
  onScanRequest,
}: IsbnScannerProps) {
  const inputId = useId();

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>ISBN</Label>
      <div className="flex gap-2">
        <Input
          id={inputId}
          inputMode="numeric"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder="Enter ISBN"
        />
        <Button type="button" variant="outline" onClick={onScanRequest}>
          <ScanLineIcon />
          Scan
        </Button>
      </div>
    </div>
  );
}
