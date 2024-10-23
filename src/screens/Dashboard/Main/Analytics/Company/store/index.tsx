import { create } from 'zustand';

import type { CompanyData, ImpactData } from '#types/global';

type State = {
  companyData: CompanyData | null;
  impactData: ImpactData | null;
};

type Actions = {
  setCompanyData: (companyData: State['companyData']) => void;
  setImpactData: (impactData: State['impactData']) => void;
  reset: () => void;
};

const initialState = {
  companyData: null,
  impactData: null,
};

export const useCompanyData = create<State & Actions>((set) => ({
  ...initialState,

  setCompanyData: (companyData) => set({ companyData }),
  setImpactData: (impactData) => set({ impactData }),
  reset: () => set(initialState),
}));
