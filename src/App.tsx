import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Portal } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import InAppNotifications from './common/InAppNotifications';
import StaleWhileRevalidate from './common/StaleWhileRevalidate';
import AuthNavigator from './navigation/Auth';
import DashboardNavigator from './navigation/Dashboard';

import linking from './navigation/deepLinking';
import { useAuthManager } from './stores/auth';
import { useGlobalInformation } from './stores/dashboard';
import { useCartInformation } from './stores/shoppingCart';
import { navigatorTheme, paperTheme } from './ui/lib/theme';

import './i18n';

export default function App() {
  const isAuthenticated = useAuthManager();

  useGlobalInformation(isAuthenticated);
  useCartInformation(isAuthenticated);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
