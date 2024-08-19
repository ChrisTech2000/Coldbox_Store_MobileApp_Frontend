import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { KNOWLEDGE_HUB_URL } from '#constants/environment';
import { paperTheme } from '#ui/lib/theme';

function PrivacyPolicy() {
  return (
    <WebView
      source={{ uri: KNOWLEDGE_HUB_URL }}
      style={{ flex: 1 }}
      renderLoading={() => (
        <View tw="flex-1 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      )}
    />
  );
}

export default withSafeArea(PrivacyPolicy);
