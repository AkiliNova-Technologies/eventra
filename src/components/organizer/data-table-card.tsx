"use client";

import * as React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableColumn<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableCardProps<T> = {
  title: string;
  description?: string;
  data: T[];
  columns: DataTableColumn<T>[];
  actionLabel?: string;
  onActionClick?: () => void;
  showPagination?: boolean;
  pageSize?: number;
  bordered?: boolean;
  emptyMessage?: string;
};

export function DataTableCard<T>({
  title,
  description,
  data,
  columns,
  actionLabel,
  onActionClick,
  showPagination = true,
  pageSize = 5,
  bordered = true,
  emptyMessage = "No records found.",
}: DataTableCardProps<T>) {
  const [page, setPage] = React.useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const paginatedData = React.useMemo(() => {
    if (!showPagination) return data;

    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize, showPagination]);

  function getValue(row: T, key: keyof T | string) {
    return row[key as keyof T] as React.ReactNode;
  }

  return (
    <Card
      className={`overflow-hidden bg-white/[0.04] text-white backdrop-blur-xl ${
        bordered ? "border-white/10" : "border-transparent"
      }`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-white/10">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>

        {actionLabel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onActionClick}
            className="shrink-0 text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
          >
            {actionLabel}
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0d141d]/60">
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={`h-11 whitespace-nowrap px-5 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 ${
                      column.className ?? ""
                    }`}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={String(column.key)}
                        className={`px-5 py-4 text-sm text-slate-400 ${
                          column.className ?? ""
                        }`}
                      >
                        {column.render ? column.render(row) : getValue(row, column.key)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-b border-white/5">
                  <TableCell
                    colSpan={columns.length}
                    className="h-28 text-center text-sm text-slate-500"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {showPagination && data.length > pageSize && (
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
            <p className="text-xs text-slate-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="h-8 w-8 border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
                className="h-8 w-8 border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}