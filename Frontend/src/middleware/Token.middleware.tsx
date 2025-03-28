
import { Outlet, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath: string; 
}

const ProtectedRoute = ({ redirectPath }: ProtectedRouteProps) => {
  
    const token = localStorage.getItem('token');
      const navigate = useNavigate();
  
  if (!token) {
    return navigate(redirectPath)
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
