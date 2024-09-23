import React, { type PropsWithChildren } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform,
  type TouchableOpacityProps,
} from 'react-native';
import colors from 'tailwindcss/colors';
import { styled } from 'nativewind';

function _Touchable({
  children,
  style,
  ...props
}: PropsWithChildren<
  {
    rippleColor?: string;
  } & TouchableOpacityProps
>) {
  switch (Platform.OS) {
    case 'android':
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(props.rippleColor ?? colors.zinc[100], false)}
          {...props}
        >
          <View style={style}>{children}</View>
        </TouchableNativeFeedback>
      );
    case 'ios':
    default:
      return (
        <TouchableOpacity activeOpacity={0.6} style={style} {...props}>
          {children}
        </TouchableOpacity>
      );
  }
}

const _StyledTouchable = styled(_Touchable, { props: { style: true } });

export { _StyledTouchable as Touchable };
