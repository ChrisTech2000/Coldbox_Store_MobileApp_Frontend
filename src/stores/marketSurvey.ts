import { create } from 'zustand';

import { GetFarmerSurveysResponse } from '#types/api.responses';

type State = {
  farmerId: number | null;
  surveys: GetFarmerSurveysResponse;
  refetchSurveys: (() => void) | null;
};

type Actions = {
  setFarmerId: (farmerId: State['farmerId']) => void;
  setSurveys: (surveys: State['surveys']) => void;
  setRefetchSurveys: (refetchSurveys: State['refetchSurveys']) => void;
  resetMarketSurveyStore: () => void;
};

export const useMarketSurveyStore = create<State & Actions>((set) => ({
  farmerId: null,
  surveys: [],
  refetchSurveys: null,

  setFarmerId: (farmerId) => set({ farmerId }),
  setSurveys: (surveys) => set({ surveys }),
  setRefetchSurveys: (refetchSurveys) => set({ refetchSurveys }),

  resetMarketSurveyStore: () => set({ surveys: [], farmerId: null, refetchSurveys: null }),
}));
