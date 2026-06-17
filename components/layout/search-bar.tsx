import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  className?: string;
  placeholder?: string;
};

export function SearchBar({
  className,
  placeholder = "Search books, authors, ISBN...",
}: SearchBarProps) {
  return (
    <form
      action="/books/search"
      className={cn("flex w-full items-center gap-2", className)}
      role="search"
    >
      <div className="relative flex-1">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          type="search"
          name="q"
          placeholder={placeholder}
          className="h-10 rounded-lg pl-9"
        />
      </div>
      <Button type="submit" size="sm" className="hidden sm:inline-flex">
        Search
      </Button>
    </form>
  );
}
