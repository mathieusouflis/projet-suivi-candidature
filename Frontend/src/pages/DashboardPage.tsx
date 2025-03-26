import AddJob from "@/components/AddJob/AddJob";
import { columns } from "@/components/Dashboard Table/columns";
import { DataTable } from "@/components/Dashboard Table/data-table";
import { getJobs } from "@/services/jobService";
import { Job } from "@/types/job";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
      getJobs().then((res) => {
        res.success ? setJobs(res.data) : console.error(res.error.message);
      })
    })

    return (
      <>
        <AddJob/>
        <DataTable columns={columns} data={jobs} />
      </>
    );
  }
  
  export default DashboardPage;