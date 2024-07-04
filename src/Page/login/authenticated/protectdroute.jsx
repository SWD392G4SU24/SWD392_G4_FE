import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// HOC for protected routes
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Component {...rest} /> : <Redirect to="/login1" />;
};
