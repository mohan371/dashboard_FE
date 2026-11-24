import React, { useMemo } from 'react';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import CategorySection from './components/dashboard/CategorySection';
import AddWidgetModal from './components/modal/AddWidgetModal';
import { useDashboardStore } from './store/useDashboardStore';
import { SearchX } from 'lucide-react';

function App() {
  const { categories, searchQuery, setSearchQuery } = useDashboardStore();

  // Compute filtered categories based on global search query
  const { filteredCategories, totalMatchingWidgets } = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      const total = categories.reduce((sum, c) => sum + c.widgets.length, 0);
      return {
        filteredCategories: categories.map((cat) => ({
          category: cat,
          matchingWidgets: cat.widgets,
        })),
        totalMatchingWidgets: total,
      };
    }

    let matchCount = 0;
    const filtered = categories.map((cat) => {
      // Check if category name matches
      const categoryMatches = cat.name.toLowerCase().includes(query);

      // Filter widgets inside category by name or text
      const matchingWidgets = cat.widgets.filter((w) => {
        const nameMatch = w.name.toLowerCase().includes(query);
        const textMatch = (w.text || '').toLowerCase().includes(query);
        return nameMatch || textMatch || categoryMatches;
      });

      matchCount += matchingWidgets.length;

      return {
        category: cat,
        matchingWidgets,
      };
    });

    return {
      filteredCategories: filtered,
      totalMatchingWidgets: matchCount,
    };
  }, [categories, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f0f3f7] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Header />

        {/* Global Search Results Indicator if active */}
        {searchQuery.trim() && (
          <div className="mb-6 bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 flex items-center justify-between text-sm text-sky-900">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Search results for:</span>
              <span className="italic font-mono bg-white px-2 py-0.5 rounded border border-sky-200">
                "{searchQuery}"
              </span>
              <span className="text-xs bg-sky-600 text-white font-semibold px-2 py-0.5 rounded-full ml-1">
                {totalMatchingWidgets} found
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Categories Rendering */}
        {totalMatchingWidgets === 0 && searchQuery.trim() ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">No matching widgets found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No widgets or categories matched your query "{searchQuery}". Try searching by metric name, status, or category.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredCategories.map(({ category, matchingWidgets }) => (
            <CategorySection
              key={category.id}
              category={category}
              filteredWidgets={matchingWidgets}
            />
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-4 text-center text-xs text-slate-400">
        <p>CloudGuard Security Posture Dashboard &bull; Dynamic JSON Configuration &bull; Zustand State Engine</p>
      </footer>

      {/* Add Widget Modal Drawer */}
      <AddWidgetModal />
    </div>
  );
}

export default App;
