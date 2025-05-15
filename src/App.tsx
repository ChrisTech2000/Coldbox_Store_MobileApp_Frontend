import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  enableExperimentalLayoutAnimation,
  WalkthroughProvider,
} from 'react-native-interactive-walkthrough';
import { PaperProvider, Portal } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppVersionModal from './common/AppVersion';
import InAppNotifications from './common/InAppNotifications';
import StaleWhileRevalidate from './common/StaleWhileRevalidate';
import { ENVIRONMENT, SENTRY_DSN } from './constants/environment';
import launchArgs from './constants/launch.args';
import { TUTORIAL_BACKDROP_COLOR } from './constants/ui';
import { useI18n } from './i18n';
import AuthNavigator from './navigation/Auth';
import DashboardNavigator from './navigation/Dashboard';
import linking from './navigation/deepLinking';
import { useAuthManager } from './stores/auth';
import { useGlobalInformation } from './stores/dashboard';
import { useCartInformation } from './stores/shoppingCart';
import { navigatorTheme, paperTheme } from './ui/lib/theme';

if (
  typeof ENVIRONMENT === 'string' &&
  ENVIRONMENT !== 'development' &&
  ENVIRONMENT !== 'e2e' &&
  !launchArgs.isE2E
) {
  Sentry.init({ dsn: SENTRY_DSN, environment: ENVIRONMENT, tracesSampleRate: 1.0 });
}

if (launchArgs.isE2E) {
  LogBox.ignoreAllLogs();
}

enableExperimentalLayoutAnimation();

function App() {
  const isI18nReady = useI18n();

  const isAuthenticated = useAuthManager();
  useGlobalInformation(isAuthenticated);
  useCartInformation(isAuthenticated);

  if (!isI18nReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <AppVersionModal />
        <InAppNotifications>
          <StaleWhileRevalidate>
            <SafeAreaProvider>
              <NavigationContainer
                theme={navigatorTheme}
                linking={linking}
                onReady={() => BootSplash.hide({ fade: true })}
              >
                <WalkthroughProvider
                  useIsFocused={useIsFocused}
                  backdropColor={TUTORIAL_BACKDROP_COLOR}
                >
                  <Portal.Host>
                    {isAuthenticated ? <DashboardNavigator /> : <AuthNavigator />}
                  </Portal.Host>
                </WalkthroughProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </StaleWhileRevalidate>
        </InAppNotifications>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(App);
