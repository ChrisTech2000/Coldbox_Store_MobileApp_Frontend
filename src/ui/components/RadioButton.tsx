import { styled } from 'nativewind';
import React from 'react';
import { RadioButton, RadioButtonItemProps } from 'react-native-paper';

function _Wrapper({ ...props }: RadioButtonItemProps) {
  return <RadioButton.Item {...props} />;
}

const _StyledRadioButton = styled(_Wrapper, {});

export { _StyledRadioButton as RadioButtonItem };
