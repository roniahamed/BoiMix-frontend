import { create } from "zustand";

type SearchState = {
  query: string;
  recentQueries: string[];
  setQuery: (query: string) => void;
  addRecentQuery: (query: string) => void;
  clearRecentQueries: () => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  recentQueries: [],
  setQuery: (query) => set({ query }),
  addRecentQuery: (query) =>
    set((state) => {
      const nextQuery = query.trim();

      if (!nextQuery) {
        return state;
      }

      return {
        recentQueries: [
          nextQuery,
          ...state.recentQueries.filter((item) => item !== nextQuery),
        ].slice(0, 5),
      };
    }),
  clearRecentQueries: () => set({ recentQueries: [] }),
}));
