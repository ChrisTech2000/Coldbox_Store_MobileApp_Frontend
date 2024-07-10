import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import storage from './lib/storage';

type State = {
  company: {
    id: number;
    country?: string;
    currency?: string;
  } | null;
};

type Actions = {
  setCompany: (companyId: State['company']) => void;
};

export const useManagementStore = create(
  persist<State & Actions>(
    (set) => ({
      company: null,
      setCompany: (company) => set({ company }),
    }),
    { name: 'management', storage }
  )
);
