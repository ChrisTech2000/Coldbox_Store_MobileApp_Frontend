import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { PaperProvider, Portal } from 'react-native-paper';
import {
  enableExperimentalLayoutAnimation,
  WalkthroughProvider,
} from 'react-native-interactive-walkthrough';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';

import { ENVIRONMENT, SENTRY_DSN } from './constants/environment';
import AppVersionModal from './common/AppVersion';
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

if (typeof ENVIRONMENT === 'string' && ENVIRONMENT !== 'development') {
  Sentry.init({ dsn: SENTRY_DSN, environment: ENVIRONMENT, tracesSampleRate: 1.0 });
}

enableExperimentalLayoutAnimation();

function App() {
  const isAuthenticated = useAuthManager();
  useGlobalInformation(isAuthenticated);
  useCartInformation(isAuthenticated);

  return (
    <WalkthroughProvider useIsFocused={useIsFocused}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={paperTheme}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <AppVersionModal />
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
    </WalkthroughProvider>
  );
}

export default Sentry.wrap(App);
