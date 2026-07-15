import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const { data: products, isLoading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Derived data recalculated only when its dependencies change
  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-10 rounded-2xl bg-slate-900 px-6 py-10 text-white sm:px-10">
        <p className="text-sm font-medium text-indigo-300">New season, new gear</p>
        <h1 className="mt-2 max-w-lg text-3xl font-bold sm:text-4xl">
          Everything you need, curated in one place.
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-300">
          Browse hand-picked products across electronics, footwear, home, and more.
        </p>
      </section>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Conditional rendering: loading, error, empty, and success states */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-72 animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</p>
      )}

      {!isLoading && !error && filteredProducts.length === 0 && (
        <p className="rounded-lg bg-slate-100 p-6 text-center text-sm text-slate-500">
          No products match your search.
        </p>
      )}

      {!isLoading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
