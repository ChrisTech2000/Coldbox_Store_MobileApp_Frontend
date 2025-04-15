import React from 'react';
import { List } from 'react-native-paper';
import type { Style as RNPaperStyle } from 'react-native-paper/lib/typescript/components/List/utils';

import { LanguageManager } from '#i18n/utils';

export function ListItemArrow(props: { color?: string; style?: RNPaperStyle }) {
  const isRTL = LanguageManager.isRTL;
  return (
    <List.Icon
      icon="chevron-right"
      color={props.color}
      style={[props.style, isRTL && { transform: [{ rotate: '180deg' }] }]}
    />
  );
}
