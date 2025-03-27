import React from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { styled } from 'nativewind';

type WrapperProps = {
  contentContainerStyle?: string;
} & Exclude<ScrollViewProps, 'contentContainerStyle'>;

const _Wrapper = React.forwardRef<ScrollView, WrapperProps>(function Component(
  { children, ...rest }: WrapperProps,
  ref: React.ForwardedRef<ScrollView>
) {
  return (
    <ScrollView {...rest} ref={ref}>
      {children}
    </ScrollView>
  );
});

const _StyledScrollView = styled(_Wrapper, {
  props: {
    contentContainerStyle: true,
  },
});

export { _StyledScrollView as ScrollView };
