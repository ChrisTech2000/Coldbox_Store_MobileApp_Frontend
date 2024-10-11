import { create } from 'zustand';

export type MarketplaceCrateDatum = {
  isSellable: boolean;
  crateId: number;
  crateWeight: number;
  cratePrice: number;
};

export const useMarketplaceSettingsStore = create<{
  datums: Map<number, MarketplaceCrateDatum>;
  reset: (datums?: Array<MarketplaceCrateDatum>) => void;
  overwrite: (datum: MarketplaceCrateDatum) => void;
}>((set, get) => ({
  datums: new Map(),
  reset: (datums = []) => {
    const newMap = new Map<number, MarketplaceCrateDatum>(
      datums.map((datum) => [datum.crateId, datum])
    );
    set({ datums: newMap });
  },
  overwrite: (datum) => {
    const deepCopy = new Map(get().datums);
    deepCopy.set(datum.crateId, datum);
    set({ datums: deepCopy });
  },
}));
