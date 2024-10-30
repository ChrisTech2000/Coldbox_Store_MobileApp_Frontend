import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { create } from 'zustand';

import { DashboardMainRoutes } from '#navigation/Dashboard/Main';

interface TutorialStore {
  isTutorialActive: boolean;
  toggleTutorial: (value?: boolean) => void;
}

export const useTutorialStore = create<TutorialStore>((set) => {
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  return {
    isTutorialActive: false,
    toggleTutorial: (value) => {
      set((state) => ({ isTutorialActive: value ?? !state.isTutorialActive }));
      if (!value) rootNavigation.navigate('Dashboard');
    },
  };
});
