import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Portal } from 'react-native-paper';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';

import { ENVIRONMENT, SENTRY_DSN } from '#constants/environment';

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

Sentry.init({ dsn: SENTRY_DSN, environment: ENVIRONMENT, tracesSampleRate: 1.0 });

function App() {
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
              <NavigationContainer
                theme={navigatorTheme}
                linking={linking}
                onReady={() => BootSplash.hide({ fade: true })}
              >
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

export default Sentry.wrap(App);
