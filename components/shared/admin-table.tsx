import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AdminTableColumn<TRow> = {
  key: string;
  header: string;
  render: (row: TRow) => ReactNode;
};

type AdminTableProps<TRow> = {
  columns: AdminTableColumn<TRow>[];
  rows: TRow[];
  getRowKey: (row: TRow) => string;
  className?: string;
};

export function AdminTable<TRow>({
  columns,
  rows,
  getRowKey,
  className,
}: AdminTableProps<TRow>) {
  return (
    <div
      className={cn(
        "bg-card shadow-soft overflow-hidden rounded-lg border",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead className="bg-muted/70 text-muted-foreground text-left">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="hover:bg-muted/40 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
