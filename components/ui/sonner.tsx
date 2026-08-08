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
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "!text-gray-700 dark:!text-gray-300 !opacity-100",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
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
