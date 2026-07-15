import { useSelector } from "react-redux";
import { Package, User, DollarSign } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { selectCartItems, selectCartCount, selectCartTotal } from "../features/cart/cartSlice";
import { withAuth } from "../hoc/withAuth";

function Dashboard() {
  const { user } = useAuth();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const stats = [
    { label: "Items in cart", value: count, icon: Package },
    { label: "Cart total", value: `$${total.toFixed(2)}`, icon: DollarSign },
    { label: "Signed in as", value: user?.email, icon: User },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name} 👋</h1>
      <p className="mt-1 text-sm text-slate-500">
        This page is only reachable when logged in - it's wrapped with the withAuth HOC.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Icon className="h-5 w-5 text-indigo-600" />
            <p className="mt-3 truncate text-lg font-semibold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Recent cart activity</h2>
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">Your cart is empty right now.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="text-slate-700">{item.title}</span>
                </div>
                <span className="text-slate-500">Qty {item.qty}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Wrapping the export with the HOC is what actually protects the route
export default withAuth(Dashboard);
