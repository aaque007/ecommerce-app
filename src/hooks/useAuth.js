import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  selectCurrentUser,
  selectAuthStatus,
  selectAuthError,
} from "../features/auth/authSlice";

// Custom hook: bundles auth state + actions so components don't need to
// know anything about Redux directly - they just call useAuth().
export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const login = ({ name, email, password }) => {
    dispatch(loginStart());
    // Simulate an async request to a login API
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!email || !password || password.length < 4) {
          dispatch(loginFailure("Password must be at least 4 characters."));
          resolve(false);
        } else {
          dispatch(loginSuccess({ name: name || email.split("@")[0], email }));
          resolve(true);
        }
      }, 600);
    });
  };

  const signOut = () => dispatch(logout());

  return {
    user,
    isAuthenticated: Boolean(user),
    status,
    error,
    login,
    signOut,
  };
}
