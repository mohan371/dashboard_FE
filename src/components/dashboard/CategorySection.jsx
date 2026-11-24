import React from 'react';
import WidgetCard from './WidgetCard';
import AddWidgetCard from './AddWidgetCard';
import EmptyCategoryState from './EmptyCategoryState';

export default function CategorySection({ category, filteredWidgets }) {
  const widgetsToDisplay = filteredWidgets !== undefined ? filteredWidgets : category.widgets;
  const hasWidgets = widgetsToDisplay && widgetsToDisplay.length > 0;

  return (
    <section className="mb-10 last:mb-6">
      {/* Category Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {category.name}
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-600">
            {widgetsToDisplay.length} {widgetsToDisplay.length === 1 ? 'widget' : 'widgets'}
          </span>
        </div>
        {category.description && (
          <p className="hidden md:block text-xs text-slate-400">
            {category.description}
          </p>
        )}
      </div>

      {/* Responsive Three-Column Widget Layout with Uniform Stretch */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {hasWidgets ? (
          <>
            {widgetsToDisplay.map((widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                categoryId={category.id}
              />
            ))}
            {/* Add Widget card aligned in the grid */}
            <AddWidgetCard categoryId={category.id} />
          </>
        ) : (
          <EmptyCategoryState
            categoryId={category.id}
            categoryName={category.name}
          />
        )}
      </div>
    </section>
  );
}
