import React from 'react';
import { X } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';
import DonutChartWidget from '../widgets/DonutChartWidget';
import ProgressBarWidget from '../widgets/ProgressBarWidget';
import EmptyChartWidget from '../widgets/EmptyChartWidget';
import CustomWidgetContent from '../widgets/CustomWidgetContent';

export default function WidgetCard({ widget, categoryId }) {
  const { removeWidget } = useDashboardStore();

  const handleRemove = (e) => {
    e.stopPropagation();
    removeWidget(categoryId, widget.id);
  };

  const renderWidgetBody = () => {
    switch (widget.type) {
      case 'donut':
        return <DonutChartWidget data={widget.data} text={widget.text} />;
      case 'progress':
        return <ProgressBarWidget data={widget.data} text={widget.text} />;
      case 'empty-chart':
        return <EmptyChartWidget data={widget.data} text={widget.text} />;
      case 'custom':
      default:
        return <CustomWidgetContent widget={widget} />;
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between h-full min-h-[270px]">
      {/* Header with normalized height for row alignment */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold text-slate-800 tracking-tight leading-snug line-clamp-2 min-h-[2.5rem] flex items-center group-hover:text-sky-900 transition-colors">
          {widget.name}
        </h3>

        {/* Remove Button (Cross Icon) */}
        <button
          onClick={handleRemove}
          className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-all duration-150 -mr-1.5 -mt-1.5 flex-shrink-0 cursor-pointer"
          title={`Remove "${widget.name}"`}
          aria-label={`Remove ${widget.name}`}
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Widget Content Body - Centered Vertically */}
      <div className="flex-1 flex flex-col justify-center my-auto py-1">
        {renderWidgetBody()}
      </div>

      {/* Footer / Meta info */}
      <div className="pt-2.5 mt-auto border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate max-w-[190px]">
          {widget.type === 'custom' ? 'Custom Metric' : 'Sample Telemetry'}
        </span>
        <span className="text-[10px] uppercase font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
          Active
        </span>
      </div>
    </div>
  );
}
