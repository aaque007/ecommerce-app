import { useEffect, useState } from "react";
import { products } from "../data/products";

// Custom hook demonstrating data fetching with useEffect.
// It simulates a network call with setTimeout so you can see loading/error
// states, the same way you would with a real fetch("/api/products").
export function useProducts() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (isCancelled) return;
      try {
        // Swap this block for: fetch("/api/products").then(r => r.json())
        setData(products);
        setError(null);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    }, 500);

    // Cleanup avoids setting state on an unmounted component
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return { data, isLoading, error };
}
