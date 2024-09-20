import { create } from 'zustand';

import type { FormValues } from './modules/MarketplaceFormManager';

export type FilterItem = {
  label: string;
} & (
  | {
      key: keyof Omit<FormValues, 'min' | 'max'>;
      value: number;
    }
  | {
      key: 'priceRange';
      value: [number, number];
    }
);

type MarketplaceFilterState = {
  filters: Array<FilterItem>;
  addFilter: (newFilter: FilterItem) => void;
  addFilters: (newFilters: Array<FilterItem>, overwrite?: boolean) => void;
  removeFilter: (key: keyof FormValues, value: number) => void;
  removeFilterByIndex: (filterIndex: number) => void;
  clearFilters: () => void;
};

export const useMarketplaceFilters = create<MarketplaceFilterState>((set) => ({
  filters: [],
  addFilter: (newFilter) =>
    set((state) => ({
      filters: [...state.filters, newFilter],
    })),
  addFilters: (newFilters, overwrite = false) =>
    set((state) => ({
      filters: overwrite ? newFilters : [...state.filters, ...newFilters],
    })),
  removeFilter: (key, value) =>
    set((state) => ({
      filters: state.filters.filter((filter) => filter.key !== key || filter.value !== value),
    })),
  removeFilterByIndex: (filterIndex) =>
    set((state) => ({
      filters: state.filters.filter((_, idx) => idx !== filterIndex),
    })),
  clearFilters: () =>
    set(() => ({
      filters: [],
    })),
}));
