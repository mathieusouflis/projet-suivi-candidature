import { Job, JobStatus } from "@/types/job";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useState } from "react";
import { updateJob } from "@/services/jobService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: () => {
      return <></>;
    },
  },
  {
    accessorKey: "datePostulation",
    header: "Relance",
    cell: ({ row }) => {
      const date = new Date(row.getValue("datePostulation"));

      return Date.now() - date.getTime() >= 604800000 &&
        row.getValue("status") === "Pending" ? (
        <Badge className="bg-amber-300">Relaunch</Badge>
      ) : null;
    },
  },
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const [status, setStatus] = useState<JobStatus>(row.getValue("status"));

      const changeStatus = (newStatus: JobStatus) => {
        updateJob(row.getValue("_id"), { status: newStatus })
          .then(() => {
            setStatus(newStatus);
          })
          .catch(() => {
            console.log("Error while changing status");
          });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              {status}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {[
                "Need to apply",
                "Pending",
                "Interview",
                "Technical Test",
                "Accepted",
                "Rejected",
              ].map((jobStatus) => (
                <DropdownMenuItem key={jobStatus}>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => changeStatus(jobStatus as JobStatus)}
                  >
                    {jobStatus}
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
];
