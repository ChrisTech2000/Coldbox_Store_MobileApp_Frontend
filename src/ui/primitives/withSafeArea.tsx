import React, { useMemo, type ComponentType } from 'react';
import { Platform, type StyleProp, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Boundaries = 'top' | 'bottom';

export const BOTTOM_NAV_HEIGHT = Platform.select({
  ios: 108,
  default: 75,
});

export function withSafeArea<T extends object>(
  WrappedComponent: ComponentType<T>,
  boundaries: Array<Boundaries> = ['bottom'],
  excludeExtraPadding?: boolean
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
            base.paddingBottom = insets.bottom + (excludeExtraPadding ? 0 : BOTTOM_NAV_HEIGHT);
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

  SafeAreaInsets.displayName = `withSafeArea(${WrappedComponent.displayName || WrappedComponent.name || 'ScreenComponent'})`;

  return SafeAreaInsets;
}
