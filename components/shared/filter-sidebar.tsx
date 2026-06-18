import { SlidersHorizontalIcon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { RatingStars } from "@/components/shared/rating-stars";

type FilterOption = {
  label: string;
  value: string;
  count?: number;
};

type FilterGroup = {
  id: string;
  title: string;
  type: "checkbox" | "radio" | "range" | "rating";
  searchable?: boolean;
  options?: FilterOption[];
};

type FilterSidebarProps = {
  groups: FilterGroup[];
  className?: string;
};

export function FilterSidebar({ groups, className }: FilterSidebarProps) {
  return (
    <aside className={cn("bg-card shadow-soft rounded-lg border", className)}>
      <div className="flex items-center justify-between gap-2 border-b p-4">
        <h2 className="text-foreground flex items-center gap-2 font-semibold">
          <SlidersHorizontalIcon className="text-primary size-4" />
          Filter Options
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-primary h-auto px-2 py-1 text-xs"
        >
          Reset Filter
        </Button>
      </div>

      <div className="divide-y">
        {groups.map((group) => (
          <div key={group.id} className="space-y-3 p-4">
            <h3 className="text-foreground text-sm font-medium">
              {group.title}
            </h3>

            {group.searchable && (
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
                <Input
                  placeholder={`Search ${group.title}...`}
                  className="h-8 pl-8 text-xs"
                />
              </div>
            )}

            {group.type === "checkbox" && group.options && (
              <div className="custom-scrollbar max-h-48 space-y-2 overflow-y-auto pr-2">
                {group.options.map((option) => (
                  <Label
                    key={option.value}
                    className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center justify-between text-sm font-normal"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      {option.label}
                    </div>
                    {option.count !== undefined && (
                      <span className="text-xs opacity-60">
                        ({option.count})
                      </span>
                    )}
                  </Label>
                ))}
              </div>
            )}

            {group.type === "radio" && group.options && (
              <RadioGroup
                defaultValue={group.options[0]?.value}
                className="space-y-2"
              >
                {group.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`radio-${option.value}`}
                    />
                    <Label
                      htmlFor={`radio-${option.value}`}
                      className="text-muted-foreground hover:text-foreground cursor-pointer text-sm font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {group.type === "range" && (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  className="h-8 text-xs"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="h-8 text-xs"
                />
                <Button size="sm" className="h-8 px-3">
                  Go
                </Button>
              </div>
            )}

            {group.type === "rating" && group.options && (
              <div className="space-y-2">
                {group.options.map((option) => (
                  <Label
                    key={option.value}
                    className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 text-sm font-normal"
                  >
                    <Checkbox />
                    <RatingStars
                      rating={Number(option.value)}
                      className="origin-left scale-90"
                    />
                  </Label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
