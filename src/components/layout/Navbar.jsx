import React from 'react';
import { Search, Bell, Shield, X, Plus } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

export default function Navbar() {
  const { searchQuery, setSearchQuery, openAddWidgetModal } = useDashboardStore();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Breadcrumb / Brand */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-sky-600 text-white shadow-xs">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex items-center text-sm">
            <span className="font-semibold text-slate-800 tracking-tight">CloudGuard</span>
            <span className="hidden sm:inline mx-2 text-slate-300">/</span>
            <span className="hidden sm:inline text-slate-500 font-medium">Dashboard V2</span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search widgets, metrics, categories..."
              className="w-full pl-8 sm:pl-9 pr-8 sm:pr-9 py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all duration-150"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Subtle Quick Add Action in Navbar (Non-competing secondary tier) */}
          <button
            onClick={() => openAddWidgetModal()}
            className="inline-flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80 cursor-pointer"
            title="Quick add widget to dashboard"
            aria-label="Add widget"
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline text-xs font-semibold">Add Widget</span>
          </button>

          <button
            type="button"
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold ring-2 ring-slate-100">
              SE
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-none">Security Admin</p>
              <p className="text-[10px] text-slate-400 leading-none mt-1">Enterprise Tier</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
