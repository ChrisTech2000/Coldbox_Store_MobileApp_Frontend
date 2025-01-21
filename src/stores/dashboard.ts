import { useEffect } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import ColdtivateService from '#services/ColdtivateService';
import { GetAllCropsResponse } from '#types/api.responses';
import { type Company, type CoolingUnit, type Farmer } from '#types/global';
import reportCrash from '#ui/lib/reportCrash';

import { useAuthStore } from './auth';

type State = {
  isLoading: boolean;

  farmerId: number | null;
  farmerParentName: string | null;
  farmerCountry: string | null;
  farmerUserCode: string | null;

  farmerCompanies: Company[] | null;
  farmerUnitsIds: number[] | null;

  coolingUnits: Array<CoolingUnit> | null;

  allCrops: Array<GetAllCropsResponse> | null;

  refreshData: Array<() => void>;
};

type FarmerDatum = Partial<Pick<State, 'farmerCountry' | 'farmerParentName'>>;

type Actions = {
  addRefreshDataFn: (fn: () => void) => void;
  fetchGlobalInformation: (userId: number) => Promise<void>;
  setCoolingUnits: (units: Array<CoolingUnit>) => void;
  patchFarmer: (datum: FarmerDatum) => void;
  setIsLoading: (val: boolean) => void;
};

export const useDashboardStore = create<State & Actions>((set) => ({
  isLoading: false,
  farmerId: null,
  farmerCountry: null,
  farmerParentName: null,
  farmerUserCode: null,
  farmerCompanies: null,
  farmerUnitsIds: null,
  coolingUnits: null,
  allCrops: null,
  refreshData: [],

  fetchGlobalInformation: async (userId: number) => {
    try {
      const [farmerResult, companiesResult, allCropsResult] = await Promise.allSettled([
        ColdtivateService.getFarmerByUserId(userId),
        ColdtivateService.getCompanies(),
        ColdtivateService.getAllCrops(),
      ]);

      const farmer =
        farmerResult.status === 'fulfilled' ? farmerResult.value?.at(0) : ({} as Farmer);
      const companies = companiesResult.status === 'fulfilled' ? companiesResult.value : [];

      const crops = allCropsResult.status === 'fulfilled' ? allCropsResult.value : [];

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
        allCrops: crops ?? null,
      });
    } catch (err) {
      set({ farmerId: null, farmerCompanies: null });
      reportCrash(err as Error);
    }
  },

  setCoolingUnits: (coolingUnits) => set({ coolingUnits }),
  addRefreshDataFn: (fn) =>
    set((state) => ({
      refreshData: state.refreshData ? [...state.refreshData, fn] : [fn],
    })),
  patchFarmer: (datum) => set((prev) => ({ ...prev, ...datum })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export const useGlobalInformation = (isAuthenticated: boolean) => {
  const { isLoading, setIsLoading, fetchGlobalInformation } = useDashboardStore((store) => ({
    isLoading: store.isLoading,
    setIsLoading: store.setIsLoading,
    fetchGlobalInformation: store.fetchGlobalInformation,
  }));

  const user = useAuthStore(useShallow((store) => store.user));

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    setIsLoading(true);
    fetchGlobalInformation(user?.id).finally(() => setIsLoading(false));
  }, [isAuthenticated, user]);

  return { isLoading };
};
