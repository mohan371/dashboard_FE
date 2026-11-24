import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';
import CategoryTabs from './CategoryTabs';
import WidgetCheckboxList from './WidgetCheckboxList';
import CustomWidgetForm from './CustomWidgetForm';

export default function AddWidgetModal() {
  const {
    isAddWidgetModalOpen,
    closeAddWidgetModal,
    categories,
    availableWidgets,
    activeModalCategory,
    setActiveModalCategory,
    toggleWidget,
    addWidget,
  } = useDashboardStore();

  // Escape key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAddWidgetModalOpen) {
        closeAddWidgetModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddWidgetModalOpen, closeAddWidgetModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAddWidgetModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAddWidgetModalOpen]);

  if (!isAddWidgetModalOpen) return null;

  const currentCategory = categories.find((c) => c.id === activeModalCategory) || categories[0];
  const currentAvailable = availableWidgets[currentCategory?.id] || [];
  const activeWidgetIds = new Set((currentCategory?.widgets || []).map((w) => w.id));

  const handleToggle = (widgetId) => {
    toggleWidget(currentCategory.id, widgetId);
  };

  const handleAddCustomWidget = ({ name, text }) => {
    return addWidget(currentCategory.id, {
      name,
      text,
      type: 'custom',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeAddWidgetModal}
        aria-hidden="true"
      />

      {/* Slide-over panel container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="w-screen max-w-lg bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-sky-900 text-white flex items-center justify-between">
            <div>
              <h2 id="modal-title" className="text-base font-bold tracking-tight text-white">
                Add Widget
              </h2>
              <p className="text-xs text-sky-200 mt-0.5">
                Personalise your dashboard by adding or configuring widgets
              </p>
            </div>
            <button
              onClick={closeAddWidgetModal}
              className="p-1.5 text-sky-200 hover:text-white hover:bg-sky-800 rounded-lg transition-colors cursor-pointer"
              title="Close modal"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            activeCategoryId={currentCategory?.id}
            onSelectCategory={setActiveModalCategory}
          />

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Checkbox List for current category */}
            <WidgetCheckboxList
              availableWidgets={currentAvailable}
              activeWidgetIds={activeWidgetIds}
              onToggleWidget={handleToggle}
            />

            {/* Custom Widget Creation Form */}
            <CustomWidgetForm
              categoryName={currentCategory?.name}
              onAddWidget={handleAddCustomWidget}
            />
          </div>

          {/* Footer Controls */}
          <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {currentCategory?.widgets.length} of {currentAvailable.length} widgets active
            </span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={closeAddWidgetModal}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={closeAddWidgetModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Confirm & Done
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
