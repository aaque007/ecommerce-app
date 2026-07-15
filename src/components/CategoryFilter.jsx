// Renders a list of category buttons from props.categories (list rendering + keys)
export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            active === category
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
