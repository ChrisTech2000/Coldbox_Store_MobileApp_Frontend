import { useEffect } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import ColdtivateService from '#services/ColdtivateService';
import { ERoles, type Farmer, type Company, type CoolingUnit } from '#types/global';

import { useAuthStore } from './auth';

type State = {
  farmerId: number | null;
  farmerParentName: string | null;
  farmerCountry: string | null;
  farmerUserCode: string | null;

  farmerCompanies: Company[] | null;
  farmerUnitsIds: number[] | null;

  coolingUnits: Array<CoolingUnit> | null;

  refreshData: Array<() => void>;
};

type FarmerDatum = Partial<Pick<State, 'farmerCountry' | 'farmerParentName'>>;

type Actions = {
  addRefreshDataFn: (fn: () => void) => void;
  fetchGlobalInformation: (userId: number) => Promise<void>;
  setCoolingUnits: (units: Array<CoolingUnit>) => void;
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
  refreshData: [],

  fetchGlobalInformation: async (userId: number) => {
    try {
      const [farmerResult, companiesResult] = await Promise.allSettled([
        ColdtivateService.getFarmerByUserId(userId),
        ColdtivateService.getCompanies(),
      ]);

      const farmer =
        farmerResult.status === 'fulfilled' ? farmerResult.value?.at(0) : ({} as Farmer);
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
  addRefreshDataFn: (fn) =>
    set((state) => ({
      refreshData: state.refreshData ? [...state.refreshData, fn] : [fn],
    })),
  patchFarmer: (datum) => set((prev) => ({ ...prev, ...datum })),
}));

export const useGlobalInformation = (isAuthenticated: boolean) => {
  const fetchGlobalInformation = useDashboardStore((store) => store.fetchGlobalInformation);
  const user = useAuthStore(useShallow((store) => store.user));

  useEffect(() => {
    if (!isAuthenticated || !user?.id || user.role !== ERoles.COOLING_USER) return;
    void fetchGlobalInformation(user?.id);
  }, [isAuthenticated, user]);
};
