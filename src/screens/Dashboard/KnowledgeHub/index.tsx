import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useIsFocused } from '@react-navigation/native';

import { KNOWLEDGE_HUB_URL } from '#constants/environment';
import { mmkv } from '#stores/lib/storage';
import { GenericError } from '#ui/components/GenericError';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function KnowledgeHub() {
  const language = mmkv.getString('i18n-locale');
  const isFocused = useIsFocused();

  const [uri, setUri] = useState<string>(
    `${KNOWLEDGE_HUB_URL}${language ? `&language=${language}` : ''}`
  );

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.url !== uri) {
      let modifiedUrl = navState.url;

      const [baseUrl, queryString] = modifiedUrl.split('?');
      const hideHeaderExists = queryString ? queryString.includes('hideHeader=') : false;
      const languageExists = queryString ? queryString.includes('language=') : false;

      if (!hideHeaderExists || !languageExists) {
        modifiedUrl = `${baseUrl}?${queryString ? queryString + '&' : ''}${
          !hideHeaderExists ? 'hideHeader=true&' : ''
        }${!languageExists ? `language=${language}` : ''}`;
      }

      setUri(modifiedUrl);
    }
  };

  useEffect(() => {
    setUri(`${KNOWLEDGE_HUB_URL}${language ? `&language=${language}` : ''}`);
  }, [isFocused]);

  return (
    <View tw="flex-1 flex-start">
      <WebView
        source={{ uri }}
        tw="flex-1"
        onNavigationStateChange={onNavigationStateChange}
        renderLoading={() => (
          <View tw="flex-1 items-center justify-center">
            <ActivityIndicator size={18} color={paperTheme.colors.backdrop} animating />
          </View>
        )}
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
