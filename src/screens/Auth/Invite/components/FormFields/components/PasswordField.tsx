import React from 'react';
import { TextInput, type TextInputProps } from 'react-native-paper';

import { useToggle } from '#ui/hooks/useToggle';

export default function PasswordField(props: TextInputProps) {
  const [isPasswordVisible, togglePasswordVisibility] = useToggle(false);

  return (
    <TextInput
      {...props}
      tw="w-full bg-transparent mt-1"
      secureTextEntry={isPasswordVisible}
      left={<TextInput.Icon icon="lock" />}
      right={
        <TextInput.Icon
          icon={isPasswordVisible ? 'eye' : 'eye-off'}
          onPress={(evt) => {
            evt?.stopPropagation();
            togglePasswordVisibility();
          }}
        />
      }
    />
  );
}
