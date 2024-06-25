import React, { useMemo, type ComponentType } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Boundaries = 'top' | 'bottom';

export function withSafeArea<T extends object>(
  WrappedComponent: ComponentType<T>,
  boundaries: Array<Boundaries> = ['bottom']
) {
  const SafeAreaInsets = (props: T) => {
    const insets = useSafeAreaInsets();

    const style = useMemo(() => {
      const base = {
        flex: 1,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      } satisfies StyleProp<ViewStyle>;

      for (const boundary of new Set<Boundaries>(boundaries)) {
        switch (boundary) {
          case 'top':
            base.paddingTop = insets.top;
            continue;

          case 'bottom':
            base.paddingBottom = insets.bottom;
            continue;
        }
      }

      return base;
    }, [insets]);

    return (
      <View style={style}>
        <WrappedComponent {...props} />
      </View>
    );
  };

  return SafeAreaInsets;
}
