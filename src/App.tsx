import React from 'react';
import { StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import StaleWhileRevalidate from './common/StaleWhileRevalidate';
import AuthNavigator from './navigation/Auth';

export default function App() {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ToastProvider>
        <StaleWhileRevalidate>
          <SafeAreaProvider>
            <NavigationContainer>
              <AuthNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </StaleWhileRevalidate>
      </ToastProvider>
    </React.Fragment>
  );
}
