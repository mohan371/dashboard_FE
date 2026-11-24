import React from 'react';
import { Check } from 'lucide-react';

export default function WidgetCheckboxList({
  availableWidgets,
  activeWidgetIds,
  onToggleWidget,
}) {
  if (!availableWidgets || availableWidgets.length === 0) {
    return (
      <div className="py-8 text-center text-slate-400 text-xs">
        No predefined widgets in this category catalog.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
        <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
          Available Widgets ({availableWidgets.length})
        </span>
        <span className="text-[11px] text-slate-400 font-medium">
          {activeWidgetIds.size} selected
        </span>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1" role="group" aria-label="Widget selection list">
        {availableWidgets.map((widget) => {
          const isChecked = activeWidgetIds.has(widget.id);

          return (
            <button
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              key={widget.id}
              onClick={() => onToggleWidget(widget.id)}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 ${
                isChecked
                  ? 'bg-sky-50/60 border-sky-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              {/* Checkbox Box */}
              <div
                className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center transition-colors flex-shrink-0 ${
                  isChecked
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'border-2 border-slate-300 bg-white hover:border-slate-400'
                }`}
                aria-hidden="true"
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              {/* Widget info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-xs font-semibold ${isChecked ? 'text-sky-950' : 'text-slate-800'}`}>
                    {widget.name}
                  </p>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 flex-shrink-0">
                    {widget.type || 'metric'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {widget.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
