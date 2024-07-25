import { create } from 'zustand';

import { ConfigData } from '..';
import { ImpactData } from 'types/global';

type State = {
  configData: ConfigData | null;
  impactData: ImpactData | null;
};

type Actions = {
  setConfigData: (configData: State['configData']) => void;
  setImpactData: (impactData: State['impactData']) => void;
};

export const useAggregatedData = create<State & Actions>((set) => ({
  configData: null,
  impactData: null,

  setConfigData: (configData) => set({ configData }),
  setImpactData: (impactData) => set({ impactData }),
}));
