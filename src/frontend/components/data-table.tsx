// components/DataTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@front/components/ui/table";
import { Button } from "@front/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@front/components/ui/select";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Skeleton } from "@front/components/ui/skeleton";
import { useState } from "react";

interface DataTableProps<TData> {
  table: TableType<TData>;
  isPending?: boolean;
  emptyMessage?: string;
}

export default function DataTable<TData>({
  table,
  isPending = false,
  emptyMessage = "لا توجد نتائج.",
}: DataTableProps<TData>) {
  const totalRows = table.getFilteredRowModel().rows.length;
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const selectedCount = table.getSelectedRowModel().rows.length;
  const [page, setPage] = useState("1");
  // Calculate display range
  const startRow = table.getState().pagination.pageIndex * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, totalRows);

  return (
    <div className="w-full space-y-4">
      {/* Table */}
      <div className="overflow-hidden rounded-lg border  shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  {table.getAllColumns().map((_, j) => (
                    <TableCell key={j} className="py-4">
                      <Skeleton className="h-4 w-full rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-32 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-lg">📄</div>
                    <div>{emptyMessage}</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Selection and Info */}
        <div className="flex flex-col gap-1 text-gray-600 text-sm">
          {selectedCount > 0 && (
            <div className="font-medium text-blue-600">
              تم تحديد {selectedCount} من {totalRows} صف
            </div>
          )}
          <div>
            عرض {startRow} إلى {endRow} من {totalRows} نتيجة
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">الصفوف لكل صفحة</span>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-20">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 50, 100].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                setPage("1");
                table.setPageIndex(0);
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">الذهاب للصفحة الأولى</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>

            {/* Previous page */}
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                setPage((currentPage - 1).toString());
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">الصفحة السابقة</span>
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Page indicator */}
            <div className="flex w-24 items-center justify-center font-medium text-sm">
              صفحة {currentPage} من {totalPages}
            </div>

            {/* Next page */}
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                setPage((currentPage + 1).toString());
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">الصفحة التالية</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Last page */}
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                setPage(totalPages.toString());
                table.setPageIndex(table.getPageCount() - 1);
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">الذهاب للصفحة الأخيرة</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
