import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import ColumnsContextMenu from "./ColumnsContextMenu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    },
  })


  return (
    <>
        <div className="flex flex-row gap-1">
          <Button onClick={() => {
            table.getColumn("status")?.setFilterValue("")
          }}>
            All
          </Button>
          <Button onClick={() => {
            table.getColumn("status")?.setFilterValue("Need to apply")
          }}>
            Need to apply
          </Button>
          <Button onClick={() => {
            table.getColumn("status")?.setFilterValue("Pending")
          }}>
            Pending
          </Button>
          <Button onClick={() => {
            table.getColumn("status")?.setFilterValue("Interview")
          }}>
            Interview
          </Button>
          <Button onClick={() => {
            table.getColumn("status")?.setFilterValue("Technical Test")
          }}>
            Technical Test
          </Button>
          <Button onClick={() => {
            table.getColumn("status")?.setFilterValue("Accepted")
          }}>
            Accepted
          </Button>
          <Button onClick={() => {
            table.getColumn("status")?.setFilterValue("Rejected")
          }}>
            Rejected
          </Button>
      </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <AlertDialog>
                <ColumnsContextMenu key={row.id}>
                <AlertDialogTrigger>
                  <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                  </AlertDialogTrigger>
                    </ColumnsContextMenu>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex flex-row gap-1">
        <Button onClick={() => table.previousPage()} size="sm" disabled={!table.getCanPreviousPage()}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button onClick={() => table.nextPage()} size="sm" disabled={!table.getCanNextPage()}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}
