import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import storage from './lib/storage';

type State = {
  companyId: number | null;
};

type Actions = {
  setCompanyId: (companyId: number) => void;
};

export const useManagementStore = create(
  persist<State & Actions>(
    (set) => ({
      companyId: null,
      setCompanyId: (id) => set({ companyId: id }),
    }),
    { name: 'management', storage }
  )
);
