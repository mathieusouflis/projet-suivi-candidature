import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { updateJob } from "@/services/jobService";
import { Job, JobStatus, JobType } from "@/types/job";

export const Jobs: Job[] = [
    {
        id: "daijzd",
        title: "Job 1",
        company: "Veired",
        description: "A cool job ! OMG",
        type: "Freelance", 
        status: "Need to apply",
        link: "https://localhost:3000000",
        location: "Paris",
        salary: 10000,
        createdAt: "2021-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Accepted",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Interview",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Need to apply",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Pending",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Rejected",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Technical Test",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Accepted",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Pending",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
    {
        id: "daijdazzd",
        title: "Job 2",
        company: "Sapalyuk",
        description: "A cool job !! OMG",
        type: "Apprenticeship", 
        status: "Rejected",
        link: "https://localhost:3000000",
        location: "NYC",
        salary: 300000,
        createdAt: "2027-01-01"
    },
]
  
export const columns: ColumnDef<Job>[] = [
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
            )
          },
        cell: ({ row }) => {
            const [status, setStatus] = useState<JobStatus>(row.getValue("status"));

            const changeStatus = (newStatus: JobStatus) => {
                // TODO: DELETE THIS LINE
                // HINT: To update the status we have to refresh (fetch again the backend)
                setStatus(newStatus);
                row.renderValue(newStatus)
                updateJob(row.getValue('id'), {status: newStatus}).then(() => {
                    setStatus(newStatus);
                }).catch(() => {
                    console.log('Error while changing status')
                })
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            {status}
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeStatus("Need to apply")}>Need to apply</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeStatus("Pending")}>Pending</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeStatus("Interview")}>Interview</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeStatus("Technical Test")}>Technical Test</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeStatus("Accepted")}>Accepted</Button></DropdownMenuItem>
                            <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeStatus("Rejected")}>Rejected</Button></DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
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
        cell: ({ row }) => {
            const [type, setType] = useState<JobType>(row.getValue("type"));

            const changeType = (newType: JobType) => {
                setType(newType);
                updateJob(row.getValue('id'), {type: newType}).then(() => {
                    setType(newType);
                }).catch(() => {
                    console.log('Error while changing status')
                })
            }

            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        {type}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Types</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeType("Internship")}>Internship</Button></DropdownMenuItem>
                        <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeType("Apprenticeship")}>Apprenticeship</Button></DropdownMenuItem>
                        <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeType("Full-time")}>Full-time</Button></DropdownMenuItem>
                        <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeType("Contract")}>Contract</Button></DropdownMenuItem>
                        <DropdownMenuItem><Button variant="ghost" className="w-full" onClick={() => changeType("Freelance")}>Freelance</Button></DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            )
        }
    }
]