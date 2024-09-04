import React from 'react';

import { Text } from './Text';
import { paperTheme } from '#ui/lib/theme';
import { StyleSheet } from 'react-native';

function _SuperscriptText(props: React.PropsWithChildren) {
  const { children } = props;

  return <Text style={styles.base}>&nbsp;{children}&nbsp;</Text>;
}

const styles = StyleSheet.create({
  base: {
    fontSize: 12,
    textAlignVertical: 'top',
    color: paperTheme.colors.primary,
  },
});

export { _SuperscriptText as Sup };
