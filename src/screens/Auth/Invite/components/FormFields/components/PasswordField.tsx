import React from 'react';
import { TextInput, type TextInputProps } from 'react-native-paper';

import launchArgs from '#constants/launch.args';
import { useToggle } from '#ui/hooks/useToggle';

export default function PasswordField(props: TextInputProps) {
  const [isPasswordHidden, togglePasswordVisibility] = useToggle(true);

  return (
    <TextInput
      {...props}
      tw="w-full bg-transparent mt-1"
      secureTextEntry={isPasswordHidden && !launchArgs.isE2E}
      left={<TextInput.Icon icon="lock" />}
      right={
        <TextInput.Icon
          testID="password-eye-icon"
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
