import { styled } from 'nativewind';
import React from 'react';
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

type WrapperProps = {
  contentContainerStyle?: string;
} & Exclude<KeyboardAwareScrollViewProps, 'contentContainerStyle'>;

const _Wrapper = React.forwardRef<KeyboardAwareScrollView, WrapperProps>(function Component(
  { children, ...rest },
  ref
) {
  return (
    <KeyboardAwareScrollView ref={ref} {...rest}>
      {children}
    </KeyboardAwareScrollView>
  );
});

_Wrapper.displayName = 'KeyboardAwareScrollViewWrapper';

const _StyledKeyboardAwareScrollView = styled(_Wrapper, {
  props: {
    contentContainerStyle: true,
  },
});

export { _StyledKeyboardAwareScrollView as KeyboardAwareScrollView };
