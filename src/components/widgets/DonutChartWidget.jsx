import React from 'react';

export default function DonutChartWidget({ data }) {
  if (!data || !data.segments || data.segments.length === 0) {
    return <div className="text-sm text-slate-400 py-6 text-center">No data available</div>;
  }

  const { total = 0, totalLabel = 'Total', segments = [] } = data;

  // SVG Donut calculation
  const radius = 38;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  // Calculate segment offsets
  let accumulatedOffset = 0;
  const renderedSegments = segments.map((seg) => {
    const fraction = total > 0 ? seg.value / total : 0;
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedOffset;
    accumulatedOffset += fraction * circumference;
    return {
      ...seg,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="flex items-center justify-between gap-4 py-2">
      {/* SVG Donut */}
      <div className="relative flex-shrink-0 w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          {total === 0 ? (
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
            />
          ) : (
            renderedSegments.map((seg, idx) => (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="butt"
                className="transition-all duration-500 ease-out"
              />
            ))
          )}
        </svg>

        {/* Center Total Count */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-base font-bold text-slate-900 leading-tight">
            {total.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase font-medium text-slate-400 tracking-wider leading-none mt-0.5">
            {totalLabel.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Legend Breakdown */}
      <div className="flex-1 space-y-1.5 min-w-0">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-slate-600 truncate font-medium">{seg.label}</span>
            </div>
            <span className="font-semibold text-slate-800 text-right">
              ({seg.value.toLocaleString()})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
