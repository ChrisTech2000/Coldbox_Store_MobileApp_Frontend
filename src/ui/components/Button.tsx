import React from 'react';
import { Button, type ButtonProps } from 'react-native-paper';
import { styled } from 'nativewind';

type WrapperProps = {
  contentStyle?: string;
  labelStyle?: string;
} & Exclude<ButtonProps, 'contentStyle' | 'labelStyle'>;

function _Wrapper({ children, ...rest }: WrapperProps) {
  return <Button {...rest}>{children}</Button>;
}

const _StyledButton = styled(_Wrapper, {
  props: {
    contentStyle: true,
    labelStyle: true,
  },
});

export { _StyledButton as Button };
