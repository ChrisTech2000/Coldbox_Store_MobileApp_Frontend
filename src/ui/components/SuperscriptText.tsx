import React from 'react';

import { Text } from './Text';
import { paperTheme } from '#ui/lib/theme';
import { StyleSheet } from 'react-native';

function _SuperscriptText(props: React.PropsWithChildren<{ disabled?: boolean }>) {
  const { disabled, children } = props;

  return <Text style={[styles.base, disabled && styles.disabled]}>&nbsp;{children}&nbsp;</Text>;
}

const styles = StyleSheet.create({
  base: {
    fontSize: 12,
    textAlignVertical: 'top',
    color: paperTheme.colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
});

export { _SuperscriptText as Sup };
