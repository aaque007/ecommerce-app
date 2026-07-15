import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-sm text-slate-500">This page doesn't exist.</p>
      <Link to="/" className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-500">
        ← Back home
      </Link>
    </div>
  );
}
