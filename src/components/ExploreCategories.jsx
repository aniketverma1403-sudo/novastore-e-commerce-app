import React from 'react';

export default function ExploreCategories({ selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Accessories'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
          Filter by Category
        </h3>
      </div>

      {/* Scrollable container on mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white dark:bg-amber-400 dark:text-slate-950 shadow-lg shadow-indigo-600/25 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}