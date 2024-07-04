import { useEffect } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import ColdtivateService from '#services/ColdtivateService';
import type { GetFarmerParams } from '#types/api.params';
import type { GetFarmerResponse } from '#types/api.responses';
import { type CoolingUnit, ERoles, type Company } from '#types/global';

import { useAuthStore } from './auth';

type State = {
  farmerId: number | null;
  farmerCompanies: Company[] | null;
  farmerUnitsIds: number[] | null;

  coolingUnits: CoolingUnit[] | null;
};

type Actions = {
  fetchGlobalInformation: (params: GetFarmerParams) => Promise<void>;
  setCoolingUnits: (units: CoolingUnit[]) => void;
};

export const useDashboardStore = create<State & Actions>((set) => ({
  farmerId: null,
  farmerCompanies: null,
  farmerUnitsIds: null,
  coolingUnits: null,

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
        farmerCompanies: farmerCompanies ?? null,
        farmerUnitsIds: farmer?.coolingUnits ?? null,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      set({ farmerId: null, farmerCompanies: null });
    }
  },
  setCoolingUnits: (coolingUnits) => set({ coolingUnits }),
}));

export const useGlobalInformation = (isAuthenticated: boolean) => {
  const fetchGlobalInformation = useDashboardStore((store) => store.fetchGlobalInformation);
  const user = useAuthStore(useShallow((store) => store.user));

  useEffect(() => {
    if (!isAuthenticated || !user?.id || user.role !== ERoles.COOLING_USER) return;

    void fetchGlobalInformation({ userId: user?.id });
  }, [isAuthenticated, user]);
};
