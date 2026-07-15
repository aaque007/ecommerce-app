import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Store, LogOut, LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";
import { useAuth } from "../hooks/useAuth";

const navLinkClasses = ({ isActive }) =>
  `text-sm font-medium transition-colors hover:text-indigo-600 ${
    isActive ? "text-indigo-600" : "text-slate-600"
  }`;

export default function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <Store className="h-5 w-5 text-indigo-600" />
          <span>Cartly</span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" className={navLinkClasses}>
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex items-center gap-1 text-slate-700 hover:text-indigo-600"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4.5 w-4.5 min-w-4.5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="hidden items-center gap-1 text-sm text-slate-600 hover:text-indigo-600 sm:flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                {user?.name}
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
