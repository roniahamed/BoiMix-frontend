"use client";

import * as React from "react";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
  loadingText?: string;
};

function LoadingButton({
  children,
  className,
  disabled,
  loading = false,
  loadingText,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn(className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Loader2Icon className="animate-spin" /> : null}
      {loading && loadingText ? loadingText : children}
    </Button>
  );
}

export { LoadingButton };
