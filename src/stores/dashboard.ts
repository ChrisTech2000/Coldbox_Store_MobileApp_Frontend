import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import ColdtivateService from '#services/ColdtivateService';
import type { GetFarmerParams } from '#types/api.params';

import storage from './lib/storage';

type State = {
  farmerId: number | null;
};

type Actions = {
  fetchFarmer: (params: GetFarmerParams) => Promise<void>;
};

export const useDashboardStore = create(
  persist<State & Actions>(
    (set) => ({
      farmerId: null,

      fetchFarmer: async (params: GetFarmerParams) => {
        try {
          const res = await ColdtivateService.getFarmer(params);
          set({ farmerId: res?.[0]?.id });
        } catch (err) {
          console.error('Error in data fetch:', err);
          set({ farmerId: null });
        }
      },
    }),
    { name: 'dashboard', storage }
  )
);
