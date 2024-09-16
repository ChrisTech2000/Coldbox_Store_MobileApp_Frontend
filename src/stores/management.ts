import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import storage from './lib/storage';

export type ManagementCompany = {
  id: number;
  country?: string;
  currency?: string;
  name?: string;
  hasDigitalTwin?: boolean;
} | null;

type State = {
  company: ManagementCompany;
};

type Actions = {
  setCompany: (company: ManagementCompany) => void;
  reset: () => void;
};

export const useManagementStore = create(
  persist<State & Actions>(
    (set) => ({
      company: null,
      setCompany: (company) => set({ company }),
      reset: () => set({ company: null }),
    }),
    {
      name: 'management',
      storage,
    }
  )
);
