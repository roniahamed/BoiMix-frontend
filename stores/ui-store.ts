import { create } from "zustand";

type UiState = {
  commandMenuOpen: boolean;
  mobileNavOpen: boolean;
  setCommandMenuOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  commandMenuOpen: false,
  mobileNavOpen: false,
  setCommandMenuOpen: (commandMenuOpen) => set({ commandMenuOpen }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
}));
