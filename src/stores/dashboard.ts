import { useEffect } from 'react';
import { create } from 'zustand';

import ColdtivateService from '#services/ColdtivateService';
import type { GetFarmerParams } from '#types/api.params';
import { type Company, ERoles } from '#types/global';

import { useAuthStore } from './auth';

type State = {
  farmerId: number | null;
  farmerCompanies: Company[] | null;
  farmerUnitsIds: number[] | null;
};

type Actions = {
  fetchGlobalInformation: (params: GetFarmerParams) => Promise<void>;
};

export const useDashboardStore = create<State & Actions>((set) => ({
  farmerId: null,
  farmerCompanies: null,
  farmerUnitsIds: null,

  fetchGlobalInformation: async (params: GetFarmerParams) => {
    try {
      const getFarmerResponse = await ColdtivateService.getFarmer(params);
      const getCompaniesResponse = await ColdtivateService.getCompanies();

      const farmer = getFarmerResponse?.[0];

      set({
        farmerId: farmer?.id,
        farmerCompanies: getCompaniesResponse?.filter((company) =>
          farmer?.companies.includes(company.id)
        ),
        farmerUnitsIds: farmer?.coolingUnits,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      set({ farmerId: null, farmerCompanies: null });
    }
  },
}));

export const useGlobalInformation = (isAuthenticated: boolean) => {
  const { fetchGlobalInformation } = useDashboardStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user?.id || user.role !== ERoles.COOLING_USER) return;

    fetchGlobalInformation({ userId: user?.id });
  }, [isAuthenticated, user]);
};
