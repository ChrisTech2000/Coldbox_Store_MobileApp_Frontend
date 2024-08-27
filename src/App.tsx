import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, Portal } from 'react-native-paper';

import InAppNotifications from './common/InAppNotifications';
import StaleWhileRevalidate from './common/StaleWhileRevalidate';
import AuthNavigator from './navigation/Auth';
import DashboardNavigator from './navigation/Dashboard';

import { paperTheme, navigatorTheme } from './ui/lib/theme';
import { useAuthManager } from './stores/auth';
import { useGlobalInformation } from './stores/dashboard';
import linking from './navigation/deepLinking';

import './i18n';

export default function App() {
  const isAuthenticated = useAuthManager();

  useGlobalInformation(isAuthenticated);

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <InAppNotifications>
        <StaleWhileRevalidate>
          <SafeAreaProvider>
            <NavigationContainer theme={navigatorTheme} linking={linking}>
              <Portal.Host>
                {isAuthenticated ? <DashboardNavigator /> : <AuthNavigator />}
              </Portal.Host>
            </NavigationContainer>
          </SafeAreaProvider>
        </StaleWhileRevalidate>
      </InAppNotifications>
    </PaperProvider>
  );
}
