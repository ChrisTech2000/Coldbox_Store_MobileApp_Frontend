import { useMemo } from 'react';
import { create } from 'zustand';

import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles, PredictionParams } from '#types/global';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';

type State = {
  predictionParams: PredictionParams | null;
};

type Actions = {
  setPredictionParams: (predictionParams: PredictionParams | null) => void;
};

type AllowedCountry = 'IN' | 'NG';

const MARKET_PRICE_ALLOWED_COUNTRIES: Array<AllowedCountry> = ['IN', 'NG'];

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

  const country = useMemo((): AllowedCountry | null => {
    const contextualCountry = farmer?.[0]?.country || company?.country || '';
    const countryDatum = countriesDict().getByValue(contextualCountry);
    if (typeof countryDatum === 'undefined') return null;
    const isValid = MARKET_PRICE_ALLOWED_COUNTRIES.includes(countryDatum.ISO as AllowedCountry);
    if (isValid) return countryDatum.ISO as AllowedCountry;
    return null;
  }, [farmer, company]);

  return {
    predictionParams,
    setPredictionParams,
    loadingFarmer,
    country,
  };
}
