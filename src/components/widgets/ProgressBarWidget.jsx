import React from 'react';

export default function ProgressBarWidget({ data, text }) {
  const segments = data?.segments || [];
  const total = data?.total || segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="py-2 space-y-3">
      {/* Total Count Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-xl font-bold text-slate-900">
            {total.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 ml-1.5">
            {data?.totalLabel || 'Total Vulnerabilities'}
          </span>
        </div>
      </div>

      {/* Stacked Progress Bar */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
        {segments.map((seg, idx) => {
          const widthPercent = total > 0 ? (seg.value / total) * 100 : 0;
          return (
            <div
              key={idx}
              style={{
                width: `${widthPercent}%`,
                backgroundColor: seg.color,
              }}
              className="h-full transition-all duration-500 ease-out first:rounded-l-full last:rounded-r-full"
              title={`${seg.label}: ${seg.value} (${widthPercent.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-xs flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-slate-600 truncate">{seg.label}:</span>
            </div>
            <span className="font-semibold text-slate-800 ml-1">
              {seg.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
