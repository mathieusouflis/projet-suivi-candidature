import { Jobs, columns } from "@/components/Dashboard Table/columns";
import { DataTable } from "@/components/Dashboard Table/data-table";

const DashboardPage = () => {
    return (
      <>
        <DataTable columns={columns} data={Jobs} />
      </>
    );
  }
  
  export default DashboardPage;