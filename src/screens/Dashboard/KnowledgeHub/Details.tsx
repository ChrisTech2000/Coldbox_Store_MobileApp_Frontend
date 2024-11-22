import React from 'react';
import { WebView } from 'react-native-webview';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { KnowledgeHubStackRouteProps } from '#navigation/Dashboard/KnowledgeHub';

function KnowledgeHubDetails(props: KnowledgeHubStackRouteProps<'Details'>) {
  const { sourceUri } = props.route.params;

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: sourceUri }}
      cacheEnabled
      cacheMode="LOAD_DEFAULT"
      javaScriptEnabled
      domStorageEnabled
      originWhitelist={['*']}
    />
  );
}

export default withSafeArea(KnowledgeHubDetails, ['bottom'], true);
