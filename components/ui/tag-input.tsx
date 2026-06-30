"use client";

import React, { useState, KeyboardEvent, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxTags?: number;
}

export function TagInput({
  value = "",
  onChange,
  placeholder = "Type and press enter...",
  className,
  maxTags = 5,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      const parsedTags = value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      {/* eslint-disable-next-line react-hooks/set-state-in-effect */}
      setTags(parsedTags);
    } else {
      setTags([]);
    }
  }, [value]);

  const addTag = (newTag: string) => {
    if (tags.length >= maxTags) return;

    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      onChange(newTags.join(","));
    }
    setInputValue("");
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(newTags.join(","));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div
      className={cn(
        "bg-background focus-within:ring-ring flex min-h-10 w-full flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-offset-2",
        className,
      )}
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-primary/10 text-primary flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
        >
          {tag}
          <button
            type="button"
            className="hover:bg-primary/20 rounded-full p-0.5 outline-none"
            onClick={(e) => {
              e.preventDefault();
              removeTag(index);
            }}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {tags.length < maxTags && (
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) {
              addTag(inputValue);
            }
          }}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
      )}
    </div>
  );
}
