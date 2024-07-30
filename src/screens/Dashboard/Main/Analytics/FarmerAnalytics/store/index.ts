import { create } from 'zustand';

import { Farmer } from '#types/global';

import { ConfigData } from '../../components/Configuration';

type State = {
  configData: ConfigData;
  farmer: Farmer | null;
};

type Actions = {
  setConfigData: (configData: State['configData']) => void;
  setFarmer: (farmer: State['farmer']) => void;
};

export const useFarmerAnalyticsData = create<State & Actions>((set) => ({
  configData: null,
  farmer: null,

  setConfigData: (configData) => set({ configData }),
  setFarmer: (farmer) => set({ farmer }),
}));
