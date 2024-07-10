import { styled } from 'nativewind';
import React from 'react';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

type WrapperProps = {
  contentContainerStyle?: string;
} & Exclude<KeyboardAwareScrollViewProps, 'contentContainerStyle'>;

function _Wrapper({ children, ...rest }: WrapperProps) {
  return <KeyboardAwareScrollView {...rest}>{children}</KeyboardAwareScrollView>;
}

const _StyledKeyboardAwareScrollView = styled(_Wrapper, {
  props: {
    contentContainerStyle: true,
  },
});

export { _StyledKeyboardAwareScrollView as KeyboardAwareScrollView };
