import React from 'react';
import { WebView } from 'react-native-webview';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { DEEP_LINK_DOMAIN } from '#constants/environment';

const SOURCE_URI = `https://${DEEP_LINK_DOMAIN}/comsol-about`;

const INJECTED_JS = `
  (function() {
    const header = document.querySelector('ion-header');
    if (header) header.remove();
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
