import { styled } from 'nativewind';
import React from 'react';
import { Checkbox, CheckboxItemProps, CheckboxProps } from 'react-native-paper';

function _Wrapper({ ...props }: CheckboxProps) {
  return <Checkbox.Android {...props} />;
}

function _ItemWrapper({ ...props }: CheckboxItemProps) {
  return <Checkbox.Item {...props} />;
}

const _StyledCheckboxItem = styled(_ItemWrapper, {});
const _StyledCheckbox = styled(_Wrapper, {});

export { _StyledCheckbox as Checkbox };
export { _StyledCheckboxItem as CheckboxItem };
