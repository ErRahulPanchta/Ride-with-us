import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.user_type !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
