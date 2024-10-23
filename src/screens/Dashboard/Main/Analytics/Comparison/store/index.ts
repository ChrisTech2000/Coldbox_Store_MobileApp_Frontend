import { create } from 'zustand';

import type { CoolingUnitImpact, ImpactData } from '#types/global';

import { ConfigData } from '../../components/Configuration';

type State = {
  configData: ConfigData;
  impactData: ImpactData | null;
  coolingUnitData: CoolingUnitImpact | null;
};

type Actions = {
  setConfigData: (configData: State['configData']) => void;
  setImpactData: (impactData: State['impactData']) => void;
  setCoolingUnitData: (coolingUnitData: State['coolingUnitData']) => void;
  reset: () => void;
};

const initialState = {
  configData: null,
  impactData: null,
  coolingUnitData: null,
};

export const useComparisonData = create<State & Actions>((set) => ({
  ...initialState,

  setConfigData: (configData) => set({ configData }),
  setImpactData: (impactData) => set({ impactData }),
  setCoolingUnitData: (coolingUnitData) => set({ coolingUnitData }),
  reset: () => set(initialState),
}));
