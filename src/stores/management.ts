import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import storage from './lib/storage';

export type ManagementCompany = {
  id: number;
  country?: string;
  currency?: string;
  name?: string;
  hasDigitalTwin?: boolean;
  hasLegacyContacts?: boolean;
} | null;

type State = {
  company: ManagementCompany;
  legacyContactsModalShown: boolean;
};

type Actions = {
  setCompany: (company: ManagementCompany) => void;
  setLegacyContactsModalShown: (shown: boolean) => void;
  reset: () => void;
};

export const useManagementStore = create(
  persist<State & Actions>(
    (set) => ({
      company: null,
      legacyContactsModalShown: false,
      setCompany: (company) => set({ company }),
      setLegacyContactsModalShown: (shown) => set({ legacyContactsModalShown: shown }),
      reset: () => set({ company: null, legacyContactsModalShown: false }),
    }),
    {
      name: 'management',
      storage,
    }
  )
);
