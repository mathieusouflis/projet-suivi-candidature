import MainLayout from "./MainLayout";

const NavBar = () => {
    return (
        <div>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    );
}

const DashboardLayout = () => {
    return (
        <MainLayout header={<NavBar/>} />
    );
  }

  export default DashboardLayout;