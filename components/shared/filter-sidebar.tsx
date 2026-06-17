import { SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FilterOption = {
  label: string;
  value: string;
};

type FilterGroup = {
  title: string;
  options: FilterOption[];
};

type FilterSidebarProps = {
  groups: FilterGroup[];
  selectedValues?: string[];
  className?: string;
};

export function FilterSidebar({
  groups,
  selectedValues = [],
  className,
}: FilterSidebarProps) {
  return (
    <aside
      className={cn("bg-card shadow-soft rounded-lg border p-4", className)}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-foreground flex items-center gap-2 font-semibold">
          <SlidersHorizontalIcon className="text-primary size-4" />
          Filters
        </h2>
        <Button type="button" variant="ghost" size="sm">
          Reset
        </Button>
      </div>
      <div className="space-y-5">
        {groups.map((group) => (
          <fieldset key={group.title} className="space-y-3">
            <legend className="type-badge text-foreground">
              {group.title}
            </legend>
            <div className="space-y-2">
              {group.options.map((option) => (
                <Label
                  key={option.value}
                  className="text-muted-foreground flex items-center gap-2 text-sm font-normal"
                >
                  <Checkbox
                    defaultChecked={selectedValues.includes(option.value)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </aside>
  );
}
