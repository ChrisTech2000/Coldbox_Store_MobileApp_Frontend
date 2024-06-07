import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StaleWhileRevalidate from '#common/StaleWhileRevalidate';
import Root from '#screens/Root';

export default function App() {
  return (
    <ToastProvider>
      <StaleWhileRevalidate>
        <SafeAreaProvider>
          <Root />
        </SafeAreaProvider>
      </StaleWhileRevalidate>
    </ToastProvider>
  );
}
