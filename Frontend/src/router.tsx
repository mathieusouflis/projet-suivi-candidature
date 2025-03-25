import { BrowserRouter, Route, Routes } from "react-router";
import App from "./app";
import LoginPage from "./pages/auth/LogInPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import ContactsPage from "./pages/ContactsPage";
import Homepage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" >
                    <Route path="login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/" element={<Homepage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;