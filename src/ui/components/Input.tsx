import React from 'react';
import { Text, TextInput, TextInputProps } from 'react-native-paper';
import { styled } from 'nativewind';
import { FieldError } from 'react-hook-form';

type WrapperProps = {
  error?: FieldError;
} & Omit<TextInputProps, 'error'>;

function _Wrapper({ error, ...rest }: WrapperProps) {
  return (
    <>
      <TextInput error={!!error} {...rest} />
      {error && (
        <Text tw="text-xs text-red-600 mt-2 mb-2 pl-4 w-[95%]">{error.message?.toString()}</Text>
      )}
    </>
  );
}

const _StyledButton = styled(_Wrapper, {
  props: {
    error: true,
  },
});

export { _StyledButton as Input };
