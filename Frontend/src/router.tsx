import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LogInPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import ContactsPage from "./pages/ContactsPage";
import Homepage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import JobPage from "./pages/JobPage";
import Navbar from "./components/Nav/Navbar";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Main layout route */}
                <Route element={<MainLayout header={<Navbar />} />}>
                    <Route path="/" element={<Homepage />} />
                    {/* Authentication routes */}
                    <Route path="/auth">
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                    </Route>
                </Route>


                {/* Dashboard layout routes */}
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/jobs/:id" element={<JobPage />} />
                </Route>

                {/* Catch-all for 404 */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
