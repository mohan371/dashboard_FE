import React from 'react';
import { Sliders, Clock, CheckCircle2 } from 'lucide-react';

export default function CustomWidgetContent({ widget }) {
  const highlights = widget?.data?.highlights;

  return (
    <div className="h-[140px] flex flex-col justify-between py-1">
      {/* Primary Metric Note Box */}
      <div className="p-3 bg-slate-50/80 border border-slate-200/70 rounded-xl flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sliders className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">
            {widget.text}
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Custom metric telemetry
          </span>
        </div>
      </div>

      {/* Highlights or Metadata pills */}
      {highlights && highlights.length > 0 ? (
        <div className="space-y-1">
          {highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-0.5">
              <span className="text-slate-500 font-medium truncate max-w-[170px]">{h.label}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">
                {h.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-slate-500 text-[11px] inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Evaluation active
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold">
            User Metric
          </span>
        </div>
      )}

      {/* Meta Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          Monitored
        </span>
        <span className="text-slate-500 font-medium text-[11px]">
          Sample Telemetry
        </span>
      </div>
    </div>
  );
}
