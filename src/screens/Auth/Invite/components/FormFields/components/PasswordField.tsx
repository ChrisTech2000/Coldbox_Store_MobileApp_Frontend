import React from 'react';
import { TextInput, type TextInputProps } from 'react-native-paper';

import { useToggle } from '#ui/hooks/useToggle';

export default function PasswordField(props: TextInputProps) {
  const [isPasswordHidden, togglePasswordVisibility] = useToggle(true);

  return (
    <TextInput
      {...props}
      tw="w-full bg-transparent mt-1"
      secureTextEntry={isPasswordHidden}
      left={<TextInput.Icon icon="lock" />}
      right={
        <TextInput.Icon
          icon={isPasswordHidden ? 'eye' : 'eye-off'}
          onPress={(evt) => {
            evt?.stopPropagation();
            togglePasswordVisibility();
          }}
        />
      }
    />
  );
}
