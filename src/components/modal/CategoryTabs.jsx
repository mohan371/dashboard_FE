import React from 'react';

export default function CategoryTabs({ categories, activeCategoryId, onSelectCategory }) {
  return (
    <div className="border-b border-slate-200 bg-slate-50/70 px-6">
      <nav className="flex space-x-6 overflow-x-auto" aria-label="Category Tabs">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`py-3.5 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors relative cursor-pointer ${
                isActive
                  ? 'border-sky-600 text-sky-700 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <span>{category.shortName || category.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive
                    ? 'bg-sky-100 text-sky-800'
                    : 'bg-slate-200/60 text-slate-500'
                }`}
              >
                {category.widgets.length}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
