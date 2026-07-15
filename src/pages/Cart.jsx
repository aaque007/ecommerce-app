import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
        <ShoppingBag className="h-10 w-10 text-slate-300" />
        <h1 className="mt-4 text-lg font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-1 text-sm text-slate-500">Add some products to see them here.</p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Your Cart</h1>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <img src={item.image} alt={item.title} className="h-16 w-16 rounded-xl object-cover" />

            <div className="flex-1">
              <h2 className="text-sm font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decrementQty(item.id))}
                className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center text-sm">{item.qty}</span>
              <button
                onClick={() => dispatch(incrementQty(item.id))}
                className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <span className="w-20 text-right text-sm font-semibold text-slate-900">
              ${(item.price * item.qty).toFixed(2)}
            </span>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-slate-400 hover:text-red-500"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-slate-900 p-6 text-white">
        <span className="text-sm text-slate-300">Total</span>
        <span className="text-xl font-semibold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
