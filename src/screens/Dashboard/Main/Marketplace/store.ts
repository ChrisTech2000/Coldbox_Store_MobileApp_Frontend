import { create } from 'zustand';

import type { GetAvailableListingParams } from '#types/api.params';

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
      value: [number | undefined, number | undefined];
    }
);

type MarketplaceFilterState = {
  filters: Array<FilterItem>;
  addFilter: (newFilter: FilterItem) => void;
  addFilters: (newFilters: Array<FilterItem>, overwrite?: boolean) => void;
  removeFilter: (key: keyof FormValues, value: number) => void;
  removeFilterByIndex: (filterIndex: number) => void;
  reset: () => void;
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
  reset: () => set(() => ({ filters: [] })),
}));

type MarketplaceQueryParams = Pick<
  GetAvailableListingParams,
  'location' | 'sortBy' | 'filterByMaxDistanceInKm'
>;

export const useMarketplaceQueryParams = create<
  MarketplaceQueryParams & {
    setParams: (params: Partial<MarketplaceQueryParams>) => void;
    reset: () => void;
  }
>((set) => ({
  location: [],
  sortBy: 'nearby-me',
  filterByMaxDistanceInKm: 0,
  setParams: (params: Partial<MarketplaceQueryParams>) => set((state) => ({ ...state, ...params })),
  reset: () => set({ location: [], sortBy: 'nearby-me', filterByMaxDistanceInKm: 0 }),
}));
