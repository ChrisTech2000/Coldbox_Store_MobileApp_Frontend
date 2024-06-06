import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Root from '#screens/Root';

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}
