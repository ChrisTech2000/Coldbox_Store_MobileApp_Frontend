import React from 'react';
import { WebView } from 'react-native-webview';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { KnowledgeHubStackRouteProps } from '#navigation/Dashboard/KnowledgeHub';
import { mmkv } from '#stores/lib/storage';

const INJECTED_JS = `
  (function() {
    const header = document.querySelector('ion-header');
    if (header) header.remove();

    function removeToasts() {
      const toasts = document.querySelectorAll('ion-toast');
      toasts.forEach(toast => toast.remove());
    }
    removeToasts();

    const observer = new MutationObserver(removeToasts);
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 2_000);
  })();
`;

function KnowledgeHubDetails(props: KnowledgeHubStackRouteProps<'Details'>) {
  const language = mmkv.getString('i18n-locale');

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `${props.route.params.sourceUri}?language=${language}` }}
      injectedJavaScript={INJECTED_JS}
    />
  );
}

export default withSafeArea(KnowledgeHubDetails, ['bottom'], true);
