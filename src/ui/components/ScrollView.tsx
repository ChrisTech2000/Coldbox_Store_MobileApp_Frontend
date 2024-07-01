import React from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { styled } from 'nativewind';

type WrapperProps = {
  contentContainerStyle?: string;
} & Exclude<ScrollViewProps, 'contentContainerStyle'>;

function _Wrapper({ children, ...rest }: WrapperProps) {
  return <ScrollView {...rest}>{children}</ScrollView>;
}

const _StyledScrollView = styled(_Wrapper, {
  props: {
    contentContainerStyle: true,
  },
});

export { _StyledScrollView as ScrollView };
