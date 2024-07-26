import { create } from 'zustand';

import type { CoolingUnit } from '#types/global';

type State = {
  coolingUnits: Array<CoolingUnit>;
};

type Actions = {
  setCoolingUnits: (coolingUnits: State['coolingUnits']) => void;
};

export const useAnalyticsData = create<State & Actions>((set) => ({
  coolingUnits: [],

  setCoolingUnits: (coolingUnits) => set({ coolingUnits }),
}));
