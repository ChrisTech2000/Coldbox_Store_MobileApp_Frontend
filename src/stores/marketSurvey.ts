import { create } from 'zustand';

import { GetFarmerSurveysResponse } from '#types/api.responses';

type State = {
  farmerId: number | null;
  surveys: GetFarmerSurveysResponse;
};

type Actions = {
  setFarmerId: (farmerId: State['farmerId']) => void;
  setSurveys: (surveys: State['surveys']) => void;
  resetMarketSurveyStore: () => void;
};

export const useMarketSurveyStore = create<State & Actions>((set) => ({
  farmerId: null,
  surveys: [],

  setFarmerId: (farmerId) => set({ farmerId }),
  setSurveys: (surveys) => set({ surveys }),

  resetMarketSurveyStore: () => set({ surveys: [], farmerId: null }),
}));
