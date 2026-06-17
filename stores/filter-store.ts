import { create } from "zustand";

export type BookFilterState = {
  availability: string[];
  condition: string[];
  genre: string[];
  language: string[];
  location?: string;
  sort?: string;
};

type FilterState = {
  filters: BookFilterState;
  setFilter: <TKey extends keyof BookFilterState>(
    key: TKey,
    value: BookFilterState[TKey],
  ) => void;
  resetFilters: () => void;
};

const defaultFilters: BookFilterState = {
  availability: [],
  condition: [],
  genre: [],
  language: [],
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
