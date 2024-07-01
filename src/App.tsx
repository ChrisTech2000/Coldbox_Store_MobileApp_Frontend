import 'react-native-gesture-handler';
import React from 'react';
import { AppState, type AppStateStatus, StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import StaleWhileRevalidate from './common/StaleWhileRevalidate';
import AuthNavigator from './navigation/Auth';
import DashboardNavigator from './navigation/Dashboard';

import { paperTheme, navigatorTheme } from './ui/lib/theme';
import { useAuthManager } from './stores/auth';

import './i18n';
import { SWRConfig } from 'swr';

export default function App() {
  const isAuthenticated = useAuthManager();

  return (
    <SWRConfig
      value={{
        // Global SWR config; can be overwritten when using useApiCall()
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 30000,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        initFocus(revalidate) {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
              revalidate();
            }
            appState = nextAppState;
          };

          const subscription = AppState.addEventListener('change', onAppStateChange);
          return () => subscription.remove();
        },
      }}
    >
      <PaperProvider theme={paperTheme}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <ToastProvider>
          <StaleWhileRevalidate>
            <SafeAreaProvider>
              <NavigationContainer theme={navigatorTheme}>
                {isAuthenticated ? <DashboardNavigator /> : <AuthNavigator />}
              </NavigationContainer>
            </SafeAreaProvider>
          </StaleWhileRevalidate>
        </ToastProvider>
      </PaperProvider>
    </SWRConfig>
  );
}
