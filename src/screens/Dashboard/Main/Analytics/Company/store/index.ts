import { create } from 'zustand';

import type { CompanyData, CoolingUnit, ImpactData } from '#types/global';

type State = {
  companyData: CompanyData | null;
  coolingUnits: Array<CoolingUnit>;
  impactData: ImpactData | null;
};

type Actions = {
  setCompanyData: (companyData: State['companyData']) => void;
  setCoolingUnits: (coolingUnits: State['coolingUnits']) => void;
  setImpactData: (impactData: State['impactData']) => void;
};

export const useCompanyData = create<State & Actions>((set) => ({
  companyData: null,
  coolingUnits: [],
  impactData: null,

  setCompanyData: (companyData) => set({ companyData }),
  setCoolingUnits: (coolingUnits) => set({ coolingUnits }),
  setImpactData: (impactData) => set({ impactData }),
}));
