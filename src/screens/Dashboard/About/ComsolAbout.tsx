import React from 'react';
import { WebView } from 'react-native-webview';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { DEEP_LINK_DOMAIN } from '#constants/environment';

const SOURCE_URI = `https://${DEEP_LINK_DOMAIN}/comsol-about`;

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

function ComsolAbout() {
  return (
    <WebView
      style={{ flex: 1, marginHorizontal: 10 }}
      source={{ uri: SOURCE_URI }}
      injectedJavaScript={INJECTED_JS}
    />
  );
}

export default withSafeArea(ComsolAbout, ['bottom'], true);
