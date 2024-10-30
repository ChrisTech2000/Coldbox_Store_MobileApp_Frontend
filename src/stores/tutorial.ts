import { create } from 'zustand';

interface TutorialStore {
  isTutorialActive: boolean;
  toggleTutorial: (value?: boolean, navigateToDashboard?: () => void) => void;
}

export const useTutorialStore = create<TutorialStore>((set) => ({
  isTutorialActive: false,
  toggleTutorial: (value, navigateToDashboard) => {
    set((state) => ({ isTutorialActive: value ?? !state.isTutorialActive }));
    if (!value && navigateToDashboard) {
      navigateToDashboard();
    }
  },
}));
