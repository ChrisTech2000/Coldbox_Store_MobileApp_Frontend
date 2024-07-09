import { useEffect } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import ColdtivateService from '#services/ColdtivateService';
import type { GetFarmerParams } from '#types/api.params';
import type { GetFarmerResponse } from '#types/api.responses';
import { ERoles, type Company, type CoolingUnit } from '#types/global';

import { useAuthStore } from './auth';

type State = {
  farmerId: number | null;
  farmerParentName: string | null;
  farmerCountry: string | null;
  farmerUserCode: string | null;

  farmerCompanies: Company[] | null;
  farmerUnitsIds: number[] | null;

  coolingUnits: CoolingUnit[] | null;

  refreshDashboard: (() => void) | null;
};

type FarmerDatum = Partial<Pick<State, 'farmerCountry' | 'farmerParentName'>>;

type Actions = {
  fetchGlobalInformation: (params: GetFarmerParams) => Promise<void>;
  setCoolingUnits: (units: CoolingUnit[]) => void;
  setRefreshDashboardFn: (fn: () => void) => void;
  patchFarmer: (datum: FarmerDatum) => void;
};

export const useDashboardStore = create<State & Actions>((set) => ({
  farmerId: null,
  farmerCountry: null,
  farmerParentName: null,
  farmerUserCode: null,
  farmerCompanies: null,
  farmerUnitsIds: null,
  coolingUnits: null,
  refreshDashboard: null,

  fetchGlobalInformation: async (params: GetFarmerParams) => {
    try {
      const [farmerResult, companiesResult] = await Promise.allSettled([
        ColdtivateService.getFarmer(params),
        ColdtivateService.getCompanies(),
      ]);

      const farmer =
        farmerResult.status === 'fulfilled' ? farmerResult.value?.at(0) : ({} as GetFarmerResponse);
      const companies = companiesResult.status === 'fulfilled' ? companiesResult.value : [];

      const farmerCompanies = companies?.filter((company) =>
        farmer?.companies.includes(company.id)
      );

      set({
        farmerId: farmer?.id ?? null,
        farmerCountry: farmer?.country ?? null,
        farmerParentName: farmer?.parentName ?? null,
        farmerUserCode: farmer?.userCode ?? null,
        farmerCompanies: farmerCompanies ?? null,
        farmerUnitsIds: farmer?.coolingUnits ?? null,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      set({ farmerId: null, farmerCompanies: null });
    }
  },

  setCoolingUnits: (coolingUnits) => set({ coolingUnits }),
  setRefreshDashboardFn: (fn) => set({ refreshDashboard: fn }),
  patchFarmer: (datum) => set((prev) => ({ ...prev, ...datum })),
}));

export const useGlobalInformation = (isAuthenticated: boolean) => {
  const fetchGlobalInformation = useDashboardStore((store) => store.fetchGlobalInformation);
  const user = useAuthStore(useShallow((store) => store.user));

  useEffect(() => {
    if (!isAuthenticated || !user?.id || user.role !== ERoles.COOLING_USER) return;

    void fetchGlobalInformation({ userId: user?.id });
  }, [isAuthenticated, user]);
};
