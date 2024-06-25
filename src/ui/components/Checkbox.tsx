import { styled } from 'nativewind';
import React from 'react';
import { Checkbox, CheckboxProps } from 'react-native-paper';

function _Wrapper({ ...props }: CheckboxProps) {
  return <Checkbox {...props} />;
}

const _StyledCheckbox = styled(_Wrapper, {});

export { _StyledCheckbox as Checkbox };
