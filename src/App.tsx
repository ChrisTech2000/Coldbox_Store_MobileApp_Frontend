import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import StaleWhileRevalidate from './common/StaleWhileRevalidate';
// import AuthNavigator from './navigation/Auth';
import DashboardNavigator from './navigation/Dashboard';
import theme from './ui/lib/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ToastProvider>
        <StaleWhileRevalidate>
          <SafeAreaProvider>
            <NavigationContainer>
              <DashboardNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </StaleWhileRevalidate>
      </ToastProvider>
    </PaperProvider>
  );
}
