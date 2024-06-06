import React, { useMemo, type ComponentType } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function withSafeArea<T extends object>(WrappedComponent: ComponentType<T>) {
  const SafeAreaInsets = (props: T) => {
    const insets = useSafeAreaInsets();

    const style = useMemo(
      () =>
        ({
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }) satisfies StyleProp<ViewStyle>,
      [insets]
    );

    return (
      <View style={style}>
        <WrappedComponent {...props} />
      </View>
    );
  };

  return SafeAreaInsets;
}
