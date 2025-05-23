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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import AddJob from "../AddJob/AddJob";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<
    | "All"
    | "Need to apply"
    | "Pending"
    | "Interview"
    | "Technical Test"
    | "Accepted"
    | "Rejected"
  >("All");
  const [sorting, setSorting] = useState<SortingState>([]);
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
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row gap-1">
          <Button
            variant={selectedFilter === "All" ? "default" : "outline"}
            onClick={() => {
              setSelectedFilter("All");
              table.getColumn("status")?.setFilterValue("");
            }}
          >
            All
          </Button>
          <Button
            variant={selectedFilter === "Need to apply" ? "default" : "outline"}
            onClick={() => {
              setSelectedFilter("Need to apply");
              table.getColumn("status")?.setFilterValue("Need to apply");
            }}
          >
            Need to apply
          </Button>
          <Button
            variant={selectedFilter === "Pending" ? "default" : "outline"}
            onClick={() => {
              setSelectedFilter("Pending");
              table.getColumn("status")?.setFilterValue("Pending");
            }}
          >
            Pending
          </Button>
          <Button
            variant={selectedFilter === "Interview" ? "default" : "outline"}
            onClick={() => {
              setSelectedFilter("Interview");
              table.getColumn("status")?.setFilterValue("Interview");
            }}
          >
            Interview
          </Button>
          <Button
            variant={
              selectedFilter === "Technical Test" ? "default" : "outline"
            }
            onClick={() => {
              setSelectedFilter("Technical Test");
              table.getColumn("status")?.setFilterValue("Technical Test");
            }}
          >
            Technical Test
          </Button>
          <Button
            variant={selectedFilter === "Accepted" ? "default" : "outline"}
            onClick={() => {
              setSelectedFilter("Accepted");
              table.getColumn("status")?.setFilterValue("Accepted");
            }}
          >
            Accepted
          </Button>
          <Button
            variant={selectedFilter === "Rejected" ? "default" : "outline"}
            onClick={() => {
              setSelectedFilter("Rejected");
              table.getColumn("status")?.setFilterValue("Rejected");
            }}
          >
            Rejected
          </Button>
        </div>
        <AddJob />
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                switch (row.getValue("status")) {
                  case "Need to apply":
                    var color = "";
                    break;
                  case "Pending":
                    var color = "bg-yellow-500/10";
                    break;
                  case "Interview":
                    var color = "bg-blue-500/10";
                    break;
                  case "Technical Test":
                    var color = "bg-purple-500/10";
                    break;
                  case "Accepted":
                    var color = "bg-green-500/10";
                    break;
                  case "Rejected":
                    var color = "bg-red-500/10";
                    break;
                  default:
                    var color = "";
                    break;
                }
                return (
                  <TableRow
                    key={row.id}
                    className={`cursor-pointer ${color}`}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={(e) => {
                      if (e.target instanceof HTMLButtonElement) {
                        return;
                      }
                      navigate("/jobs/" + row.getValue("_id"));
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row gap-1">
        <Button
          onClick={() => table.previousPage()}
          size="sm"
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => table.nextPage()}
          size="sm"
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
