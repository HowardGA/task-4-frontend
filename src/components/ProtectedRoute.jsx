import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContenxt';

function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
      return (
        <div className="d-flex justify-content-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;