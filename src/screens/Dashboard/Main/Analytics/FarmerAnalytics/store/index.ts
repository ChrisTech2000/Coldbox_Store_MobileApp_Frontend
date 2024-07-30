import { create } from 'zustand';

import { ConfigData } from '../../components/Configuration';

type State = {
  configData: ConfigData;
};

type Actions = {
  setConfigData: (configData: State['configData']) => void;
};

export const useFarmerAnalyticsData = create<State & Actions>((set) => ({
  configData: null,

  setConfigData: (configData) => set({ configData }),
}));
