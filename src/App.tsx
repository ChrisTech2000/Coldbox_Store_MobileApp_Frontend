import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
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
import { TUTORIAL_BACKDROP_COLOR } from './constants/ui';
import AuthNavigator from './navigation/Auth';
import DashboardNavigator from './navigation/Dashboard';
import linking from './navigation/deepLinking';
import { useAuthManager } from './stores/auth';
import { useGlobalInformation } from './stores/dashboard';
import { useCartInformation } from './stores/shoppingCart';
import { navigatorTheme, paperTheme } from './ui/lib/theme';

import initI18n from './i18n';
import { LanguageManager } from './i18n/utils';

if (typeof ENVIRONMENT === 'string' && ENVIRONMENT !== 'development') {
  Sentry.init({ dsn: SENTRY_DSN, environment: ENVIRONMENT, tracesSampleRate: 1.0 });
}

enableExperimentalLayoutAnimation();

function App() {
  const isAuthenticated = useAuthManager();
  useGlobalInformation(isAuthenticated);
  useCartInformation(isAuthenticated);

  const [isI18nReady, setIsI18nReady] = React.useState<boolean>(false);

  useEffect(() => {
    initI18n().then((initialLanguage) => {
      LanguageManager.setDateFnsLocale(initialLanguage);
      setIsI18nReady(true);
    });
  }, []);

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
