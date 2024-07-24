import { create } from 'zustand';

import { CompanyData } from '#types/global';

type State = {
  companyData: CompanyData | null;
};

type Actions = {
  setCompanyData: (companyData: State['companyData']) => void;
};

export const useCompanyData = create<State & Actions>((set) => ({
  companyData: null,

  setCompanyData: (companyData) => set({ companyData }),
}));
