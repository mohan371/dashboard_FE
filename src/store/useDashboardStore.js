import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialDashboardData, initialAvailableWidgets } from '../data/initialDashboardData';

export const useDashboardStore = create(
  persist(
    (set, get) => ({
      // Core dynamic categories containing active widgets
      categories: initialDashboardData.categories,

      // Registry of all available widgets mapped by category ID for modal checkbox selection
      availableWidgets: initialAvailableWidgets,

      // UI Search & Modal States
      searchQuery: '',
      isAddWidgetModalOpen: false,
      activeModalCategory: initialDashboardData.categories[0]?.id || 'cspm-executive',

      // Actions
      setSearchQuery: (query) => set({ searchQuery: query }),

      openAddWidgetModal: (categoryId) => {
        set((state) => ({
          isAddWidgetModalOpen: true,
          activeModalCategory: categoryId || state.activeModalCategory || state.categories[0]?.id,
        }));
      },

      closeAddWidgetModal: () => set({ isAddWidgetModalOpen: false }),

      setActiveModalCategory: (categoryId) => set({ activeModalCategory: categoryId }),

      /**
       * Remove a widget from a specific category
       */
      removeWidget: (categoryId, widgetId) => {
        set((state) => ({
          categories: state.categories.map((category) => {
            if (category.id !== categoryId) return category;
            return {
              ...category,
              widgets: category.widgets.filter((w) => w.id !== widgetId),
            };
          }),
        }));
      },

      /**
       * Add a new widget to a category with duplicate prevention
       */
      addWidget: (categoryId, { name, text, type = 'custom', data = null }) => {
        const trimmedName = name?.trim();
        const trimmedText = text?.trim();

        if (!trimmedName) {
          return { success: false, error: 'Widget name is required.' };
        }
        if (!trimmedText) {
          return { success: false, error: 'Widget text / description is required.' };
        }

        const state = get();
        const targetCategory = state.categories.find((c) => c.id === categoryId);

        if (!targetCategory) {
          return { success: false, error: 'Target category not found.' };
        }

        // Duplicate Check: ensure no widget in this category shares the same name (case-insensitive)
        const isDuplicate = targetCategory.widgets.some(
          (w) => w.name.trim().toLowerCase() === trimmedName.toLowerCase()
        );

        if (isDuplicate) {
          return {
            success: false,
            error: `A widget named "${trimmedName}" already exists in ${targetCategory.name}.`,
          };
        }

        const newWidgetId = `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const newWidget = {
          id: newWidgetId,
          name: trimmedName,
          text: trimmedText,
          type,
          data: data || { customNote: trimmedText },
          createdAt: new Date().toISOString(),
        };

        // Update state: append to category.widgets AND add to availableWidgets catalog
        set((state) => {
          const updatedCategories = state.categories.map((category) => {
            if (category.id !== categoryId) return category;
            return {
              ...category,
              widgets: [...category.widgets, newWidget],
            };
          });

          const currentAvailable = state.availableWidgets[categoryId] || [];
          const updatedAvailable = [...currentAvailable, newWidget];

          return {
            categories: updatedCategories,
            availableWidgets: {
              ...state.availableWidgets,
              [categoryId]: updatedAvailable,
            },
          };
        });

        return { success: true, widget: newWidget };
      },

      /**
       * Toggle widget presence in a category (used by checkbox selection in the modal)
       */
      toggleWidget: (categoryId, widgetId) => {
        set((state) => {
          const category = state.categories.find((c) => c.id === categoryId);
          if (!category) return state;

          const isCurrentlyActive = category.widgets.some((w) => w.id === widgetId);

          let updatedWidgets;
          if (isCurrentlyActive) {
            // Deselect / Remove
            updatedWidgets = category.widgets.filter((w) => w.id !== widgetId);
          } else {
            // Select / Add from available catalog
            const widgetToAdd = (state.availableWidgets[categoryId] || []).find((w) => w.id === widgetId);
            if (!widgetToAdd) return state;
            updatedWidgets = [...category.widgets, widgetToAdd];
          }

          return {
            categories: state.categories.map((c) =>
              c.id === categoryId ? { ...c, widgets: updatedWidgets } : c
            ),
          };
        });
      },

      /**
       * Reset dashboard to factory JSON configuration (useful for testing & evaluation)
       */
      resetDashboard: () => {
        set({
          categories: JSON.parse(JSON.stringify(initialDashboardData.categories)),
          availableWidgets: JSON.parse(JSON.stringify(initialAvailableWidgets)),
          searchQuery: '',
        });
      },
    }),
    {
      name: 'cloud_security_dashboard_v1',
      storage: createJSONStorage(() => localStorage),
      // Persist only domain data; keep UI modals and search transient
      partialize: (state) => ({
        categories: state.categories,
        availableWidgets: state.availableWidgets,
      }),
    }
  )
);
