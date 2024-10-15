import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { KNOWLEDGE_HUB_URL } from '#constants/environment';
import { GenericError } from '#ui/components/GenericError';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function KnowledgeHub() {
  const [loading, setLoading] = useState<boolean>(true);
  const [uri, setUri] = useState<string>(KNOWLEDGE_HUB_URL!);

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.url !== uri) {
      let modifiedUrl = navState.url;

      const [baseUrl, queryString] = modifiedUrl.split('?');
      const hideHeaderExists = queryString ? queryString.includes('hideHeader=') : false;

      if (!hideHeaderExists) {
        modifiedUrl = `${baseUrl}?${queryString ? queryString + '&' : ''}hideHeader=true`;
      }

      setUri(modifiedUrl);
    }
  };

  useEffect(() => {
    return () => {
      setUri(KNOWLEDGE_HUB_URL!);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={18} color={paperTheme.colors.backdrop} animating />
        </View>
      )}

      <WebView
        source={{ uri }}
        style={{ flex: 1 }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(KnowledgeHub, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
