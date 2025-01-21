import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import type { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';

import type { KnowledgeHubStackRouteProps } from '#navigation/Dashboard/KnowledgeHub';
import reportCrash from '#ui/lib/reportCrash';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function KnowledgeHubDetails(props: KnowledgeHubStackRouteProps<'Details'>) {
  const { sourceUri } = props.route.params;

  const webViewRef = React.useRef<WebView>(null);
  const [uri, setUri] = React.useState(sourceUri);

  useFocusEffect(
    React.useCallback(() => {
      setUri(sourceUri);
      webViewRef.current?.reload();
    }, [sourceUri])
  );

  const handleLoad = React.useCallback(
    (evt: WebViewNavigationEvent) => setUri(evt.nativeEvent.url),
    []
  );

  return (
    <WebView
      ref={webViewRef}
      source={{ uri }}
      onLoad={handleLoad}
      style={{ flex: 1 }}
      cacheEnabled
      cacheMode="LOAD_DEFAULT"
      javaScriptEnabled
      domStorageEnabled
      originWhitelist={['*']}
      startInLoadingState
      bounces={false}
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      onError={(syntheticEvent) => {
        const { description, code } = syntheticEvent.nativeEvent;
        reportCrash(new Error(`WebView Error - Code: ${code}, Description: ${description}`));
      }}
    />
  );
}

export default withSafeArea(KnowledgeHubDetails, ['bottom'], true);
