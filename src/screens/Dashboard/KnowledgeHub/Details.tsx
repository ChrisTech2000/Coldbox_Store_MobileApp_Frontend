import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { KnowledgeHubStackRouteProps } from '#navigation/Dashboard/KnowledgeHub';
import { paperTheme } from '#ui/lib/theme';

function KnowledgeHubDetails(props: KnowledgeHubStackRouteProps<'Details'>) {
  const { params } = props.route;

  return (
    <WebView
      source={{ uri: params.uri }}
      style={{ flex: 1 }}
      renderLoading={() => (
        <View tw="flex-1 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      )}
    />
  );
}

export default withSafeArea(KnowledgeHubDetails);
