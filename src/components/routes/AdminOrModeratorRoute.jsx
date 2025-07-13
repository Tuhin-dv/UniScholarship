import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useUserRole from '../../hooks/useUserRole';

const AdminOrModeratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <div className="text-center py-10 text-xl font-medium">Loading...</div>;
  }

  if (!user || (role !== 'admin' && role !== 'moderator')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminOrModeratorRoute;
