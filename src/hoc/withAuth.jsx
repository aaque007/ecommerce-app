import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Higher-Order Component: a function that takes a component and returns a
// new component with extra behavior - here, route protection.
// Usage: export default withAuth(Dashboard);
export function withAuth(WrappedComponent) {
  function RequireAuth(props) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
      // Bounce to /login and remember where the user was headed
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <WrappedComponent {...props} />;
  }

  RequireAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return RequireAuth;
}
