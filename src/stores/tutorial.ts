import { create } from 'zustand';

interface TutorialStore {
  isTutorialActive: boolean;
  toggleTutorial: (value?: boolean) => void;
}

export const useTutorialStore = create<TutorialStore>((set) => ({
  isTutorialActive: false,
  toggleTutorial: (value) => set((state) => ({ isTutorialActive: value ?? !state.isTutorialActive })),
}));
