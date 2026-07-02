"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton={true}
      icons={{
        success: (
          <button
            onClick={() => toast.dismiss()}
            className="shrink-0 cursor-pointer text-green-500 transition-opacity outline-none hover:opacity-75"
            aria-label="Close"
          >
            <CircleCheckIcon className="size-5" />
          </button>
        ),
        info: (
          <button
            onClick={() => toast.dismiss()}
            className="shrink-0 cursor-pointer text-blue-500 transition-opacity outline-none hover:opacity-75"
            aria-label="Close"
          >
            <InfoIcon className="size-5" />
          </button>
        ),
        warning: (
          <button
            onClick={() => toast.dismiss()}
            className="shrink-0 cursor-pointer text-yellow-500 transition-opacity outline-none hover:opacity-75"
            aria-label="Close"
          >
            <TriangleAlertIcon className="size-5" />
          </button>
        ),
        error: (
          <button
            onClick={() => toast.dismiss()}
            className="shrink-0 cursor-pointer text-red-500 transition-opacity outline-none hover:opacity-75"
            aria-label="Close"
          >
            <OctagonXIcon className="size-5" />
          </button>
        ),
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
