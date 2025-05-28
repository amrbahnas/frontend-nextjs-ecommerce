import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_SEARCH_HISTORY = 10;

interface SearchState {
  searchValues: string[];
  addNewSearchValue: (value: string) => void;
  deleteSearchValue: (value: string) => void;
  clearSearchHistory: () => void;
}

const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      searchValues: [],
      addNewSearchValue: (value: string) => {
        if (!value.trim()) return;

        set((state) => {
          // Use Set for O(1) lookup and deduplication
          const uniqueValues = new Set([value, ...state.searchValues]);
          // Convert back to array and limit size
          const newValues = Array.from(uniqueValues).slice(
            0,
            MAX_SEARCH_HISTORY
          );

          return { searchValues: newValues };
        });
      },
      deleteSearchValue: (value: string) => {
        set((state) => ({
          searchValues: state.searchValues.filter((s) => s !== value),
        }));
      },
      clearSearchHistory: () => {
        set({ searchValues: [] });
      },
    }),
    {
      name: "search-store",
      // Only persist searchValues
      partialize: (state) => ({ searchValues: state.searchValues }),
    }
  )
);

export default useSearchStore;
