import { Star, Plus, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../features/cart/cartSlice";

// A "dumb"/presentational component: it receives everything it needs via
// props and doesn't know where the data came from.
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const inCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-slate-900">{product.title}</h3>
        <p className="line-clamp-2 text-xs text-slate-500">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating}
          </div>
          <span className="text-base font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`mt-2 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            inCart
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-900 text-white hover:bg-slate-700"
          }`}
        >
          {inCart ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
