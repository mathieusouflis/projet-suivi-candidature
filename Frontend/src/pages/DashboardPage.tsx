import { Jobs, columns } from "@/components/Dashboard Table/columns";
import { DataTable } from "@/components/Dashboard Table/data-table";
import Chart from "@/components/Graph/Graph";
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
        <Chart />
        <DataTable columns={columns} data={Jobs} />
      </>
    );
  }
  
  export default DashboardPage;