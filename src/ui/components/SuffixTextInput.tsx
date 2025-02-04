import React from 'react';
import { View, Animated } from 'react-native';
import { TextInput, type TextInputProps } from 'react-native-paper';

import { Text } from './Text';

import { useControlledState } from '../hooks/useControlledState';

const SUFFIX_MARGIN_Y = {
  FOCUSED: 6, // bottom-1.5
  UNFOCUSED: 12, // bottom-3
} as const;

export function SuffixTextInput(
  props: { suffix?: string } & Omit<TextInputProps, 'onChange' | 'left' | 'right'>
): React.ReactElement {
  const { value, onChangeText, onBlur, onFocus, suffix, ...rest } = props;

  const [_value, _setValue] = useControlledState(value, onChangeText);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const bottomAnim = React.useRef<Animated.Value>(new Animated.Value(SUFFIX_MARGIN_Y.UNFOCUSED));
  const prevPosition = React.useRef<number>(SUFFIX_MARGIN_Y.UNFOCUSED);

  React.useEffect(() => {
    const nextPosition =
      isFocused || !!_value ? SUFFIX_MARGIN_Y.FOCUSED : SUFFIX_MARGIN_Y.UNFOCUSED;
    if (prevPosition.current !== nextPosition) {
      Animated.timing(bottomAnim.current, {
        toValue: nextPosition,
        duration: 200,
        useNativeDriver: false,
      }).start();
      prevPosition.current = nextPosition;
    }
  }, [isFocused, _value]);

  return (
    <View tw="relative flex-row items-center w-full">
      <TextInput
        {...rest}
        tw="w-full bg-transparent mt-1"
        value={_value}
        onChangeText={_setValue}
        onFocus={(evt) => {
          setIsFocused(true);
          onFocus?.(evt);
        }}
        onBlur={(evt) => {
          setIsFocused(false);
          onBlur?.(evt);
        }}
        right={<View />} /* empty View to maintain space for suffix */
      />
      {typeof suffix !== 'undefined' ? (
        <Animated.View
          style={{
            position: 'absolute',
            right: SUFFIX_MARGIN_Y.UNFOCUSED,
            bottom: bottomAnim.current,
          }}
        >
          <Text tw="text-base">{suffix}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}
