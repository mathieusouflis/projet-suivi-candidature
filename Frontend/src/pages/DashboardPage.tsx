import { columns } from "@/components/Dashboard Table/columns";
import { DataTable } from "@/components/Dashboard Table/data-table";
import { ChartPerStatus } from "@/components/Graph/Graph";
import { getJobs } from "@/services/jobService";
import { Job } from "@/types/job";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getJobs().then((res) => {
        res.success ? setJobs(res.data) : console.error(res.error.message);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 w-full">
        <ChartPerStatus />
      </div>
      <DataTable columns={columns} data={jobs} />
    </div>
  );
};

export default DashboardPage;
