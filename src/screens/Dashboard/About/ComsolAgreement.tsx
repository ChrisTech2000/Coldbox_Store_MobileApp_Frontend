import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { DEEP_LINK_DOMAIN } from '#constants/environment';

const SOURCE_URI = `https://${DEEP_LINK_DOMAIN}/comsol-runtime`;

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

function ComsolAgreement() {
  const ref = useRef<WebView>(null);

  return (
    <WebView
      ref={ref}
      style={{ flex: 1 }}
      source={{ uri: SOURCE_URI }}
      onLoadEnd={() => {
        ref.current?.injectJavaScript(INJECTED_JS);
      }}
    />
  );
}

export default withSafeArea(ComsolAgreement, ['bottom'], true);
