import React from 'react';
import { Layers, Plus } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

export default function EmptyCategoryState({ categoryId, categoryName }) {
  const { openAddWidgetModal } = useDashboardStore();

  return (
    <div className="col-span-full bg-white/70 border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
        <Layers className="w-6 h-6 stroke-[1.8]" />
      </div>
      <h4 className="text-sm font-semibold text-slate-800">
        No active widgets in {categoryName}
      </h4>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">
        All widgets in this category have been removed or deselected. You can re-enable widgets or create a new one anytime.
      </p>
      <button
        onClick={() => openAddWidgetModal(categoryId)}
        className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Widget to {categoryName}
      </button>
    </div>
  );
}
