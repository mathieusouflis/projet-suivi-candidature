import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LogInPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import ContactsPage from "./pages/ContactsPage";
import PageNotFound from "./pages/PageNotFound";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import JobPage from "./pages/JobPage";
import Navbar from "./components/Nav/Navbar";
import { ReactElement, useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "./middleware/Token.middleware";


const AuthDebugger = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
  }, [isAuthenticated]);
  
  return null;
};

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
    const { isAuthenticated } = useContext(AuthContext);
    
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }
    
    return children;
};

const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AuthDebugger />
                <Routes>
                    <Route element={<MainLayout header={<Navbar />} />}>
                        <Route path="/auth">
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />
                        </Route>
                    </Route>
                    
                    <Route path="/" element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                        <Route path="/jobs/:id" element={<JobPage />} />
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Router;
