import React from 'react';
import { Plus } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

export default function AddWidgetCard({ categoryId }) {
  const { openAddWidgetModal } = useDashboardStore();

  return (
    <button
      onClick={() => openAddWidgetModal(categoryId)}
      className="group relative bg-white/50 hover:bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-sky-400 p-5 h-full min-h-[270px] flex flex-col items-center justify-center text-center transition-all duration-200 shadow-xs hover:shadow-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500/20"
    >
      <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-sky-50 flex items-center justify-center text-slate-500 group-hover:text-sky-600 transition-colors mb-3">
        <Plus className="w-5 h-5 stroke-[2.2]" />
      </div>
      <span className="text-sm font-semibold text-slate-600 group-hover:text-sky-700 transition-colors">
        + Add Widget
      </span>
      <span className="text-xs text-slate-400 mt-1 max-w-[180px]">
        Select from library or create a custom metric
      </span>
    </button>
  );
}
