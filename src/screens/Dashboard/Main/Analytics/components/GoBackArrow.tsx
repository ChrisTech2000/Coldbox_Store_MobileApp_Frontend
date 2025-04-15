import React from 'react';
import { Icon } from 'react-native-paper';

import { LanguageManager } from '#i18n/utils';

export function BackArrowIcon() {
  const isRTL = LanguageManager.isRTL;
  return (
    <Icon source={isRTL ? 'arrow-right-circle-outline' : 'arrow-left-circle-outline'} size={15} />
  );
}
