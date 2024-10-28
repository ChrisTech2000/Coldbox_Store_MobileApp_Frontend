import { useMemo } from 'react';
import { create } from 'zustand';

import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles, PredictionParams } from '#types/global';

type State = {
  predictionParams: PredictionParams | null;
};

type Actions = {
  setPredictionParams: (predictionParams: PredictionParams | null) => void;
};

export type AllowedCountry = 'IN' | 'NG' | 'India' | 'Nigeria';

const availableCountries: AllowedCountry[] = ['IN', 'NG', 'India', 'Nigeria'];

const useStore = create<State & Actions>((set) => ({
  predictionParams: null,
  setPredictionParams: (predictionParams) => set({ predictionParams }),
}));

export function usePriceTrendsStore() {
  const { predictionParams, setPredictionParams } = useStore();
  const { user } = useAuthStore();
  const { company } = useManagementStore();

  const { data: farmer, isLoading: loadingFarmer } = useApiCall(
    'getFarmerByUserId',
    ColdtivateService.getFarmerByUserId,
    user?.id as number,
    {
      skip: !user?.id || user.role !== ERoles.COOLING_USER,
      defaultData: [],
    }
  );

  const country: AllowedCountry | null = useMemo(() => {
    if (
      user?.role === ERoles.COOLING_USER &&
      farmer?.[0]?.country &&
      availableCountries.includes(farmer[0].country as AllowedCountry)
    ) {
      return farmer[0].country as AllowedCountry;
    }

    if (company?.country && availableCountries.includes(company.country as AllowedCountry)) {
      return company.country as AllowedCountry;
    }

    return null;
  }, [user, company, farmer]);

  return {
    predictionParams,
    setPredictionParams,
    loadingFarmer,
    country,
  };
}
