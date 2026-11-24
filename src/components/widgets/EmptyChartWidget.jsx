import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function EmptyChartWidget({ data, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-7 text-center">
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
        <BarChart3 className="w-6 h-6 stroke-[1.5]" />
      </div>
      <p className="text-sm font-semibold text-slate-600">
        {text || data?.message || 'No Graph data available!'}
      </p>
      <p className="text-xs text-slate-400 mt-0.5 max-w-[200px]">
        {data?.description || 'No alerts recorded in the current monitoring interval.'}
      </p>
    </div>
  );
}
