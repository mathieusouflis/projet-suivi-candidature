import { AppSidebar } from "@/components/Nav/Sidebar";
import MainLayout from "./MainLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const NavBar = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-row gap-3">
        <AppSidebar />
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
};

const DashboardLayout = () => {
  return <MainLayout aside={<NavBar />} />;
};

export default DashboardLayout;
