import React, { useState } from 'react';
import { Plus, RefreshCw, RotateCcw, Clock } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

export default function Header() {
  const { openAddWidgetModal, resetDashboard } = useDashboardStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('2d');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleReset = () => {
    if (window.confirm('Reset dashboard to default configuration? Any custom widgets created will be removed.')) {
      resetDashboard();
    }
  };

  return (
    <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title & Scope Note */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          CNAPP Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Cloud native application protection platform posture & sample workload telemetry
        </p>
      </div>

      {/* Control Actions - Primary Dashboard Action Bar */}
      <div className="flex items-center flex-wrap gap-2.5">
        <button
          onClick={() => openAddWidgetModal()}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <span>Add Widget</span>
          <Plus className="w-4 h-4 text-slate-500" />
        </button>

        <button
          onClick={handleRefresh}
          className="p-2 text-slate-600 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer"
          title="Refresh Data"
          aria-label="Refresh telemetry data"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
        </button>

        <button
          onClick={handleReset}
          className="p-2 text-slate-600 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer"
          title="Reset Dashboard to Default JSON"
          aria-label="Reset dashboard to factory configuration"
        >
          <RotateCcw className="w-4 h-4 text-slate-500 hover:text-amber-600" />
        </button>

        {/* Time Filter Pill */}
        <div className="relative inline-flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-sky-600 mr-2" />
          <span className="text-slate-400 mr-1.5">|</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent border-none text-slate-700 text-xs font-semibold focus:outline-none cursor-pointer pr-1"
          >
            <option value="2d">Last 2 days</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>
    </div>
  );
}
