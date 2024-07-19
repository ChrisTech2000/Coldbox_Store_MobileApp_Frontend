import { create } from 'zustand';

import { GetFarmerSurveysResponse } from '#types/api.responses';

type State = {
  farmerId: number | null;
  surveys: GetFarmerSurveysResponse;
  checkoutId: number | null;
  refetchSurveys: (() => void) | null;
};

type Actions = {
  setFarmerId: (farmerId: State['farmerId']) => void;
  setSurveys: (surveys: State['surveys']) => void;
  setRefetchSurveys: (refetchSurveys: State['refetchSurveys']) => void;
  setCheckoutId: (checkoutId: State['checkoutId']) => void;
  resetMarketSurveyStore: () => void;
};

export const useMarketSurveyStore = create<State & Actions>((set) => ({
  farmerId: null,
  surveys: [],
  refetchSurveys: null,
  checkoutId: null,

  setFarmerId: (farmerId) => set({ farmerId }),
  setSurveys: (surveys) => set({ surveys }),
  setRefetchSurveys: (refetchSurveys) => set({ refetchSurveys }),
  setCheckoutId: (checkoutId) => set({ checkoutId }),

  resetMarketSurveyStore: () => set({ surveys: [], farmerId: null, refetchSurveys: null }),
}));
