import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { TextInput, type TextInputProps } from 'react-native-paper';

import { Text } from './Text';

import { useControlledState } from '../hooks/useControlledState';

const SUFFIX_MARGIN_Y = {
  FOCUSED: 6, // bottom-1.5
  UNFOCUSED: 12, // bottom-3
} as const;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_WIDTH_THRESHOLD = 400 as const;

const IS_WIDER_SCREEN = SCREEN_WIDTH > SCREEN_WIDTH_THRESHOLD;

export function SuffixTextInput(
  props: { suffix?: string } & Omit<TextInputProps, 'onChange' | 'left' | 'right'>
): React.ReactElement {
  const { value, onChangeText, onBlur, onFocus, suffix, ...rest } = props;

  const [_value, _setValue] = useControlledState(value, onChangeText);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const bottomAnim = React.useRef<Animated.Value>(new Animated.Value(SUFFIX_MARGIN_Y.UNFOCUSED));
  const prevPosition = React.useRef<number>(SUFFIX_MARGIN_Y.UNFOCUSED);

  const safeLabelValue = typeof rest.label === 'string' ? rest.label : '';
  const safeSuffixValue = typeof suffix === 'string' ? suffix : '';

  const showSuffix =
    (safeLabelValue.length > 43 && safeSuffixValue.length < 3) ||
    (safeLabelValue.length < 44 && safeSuffixValue.length > 3)
      ? IS_WIDER_SCREEN
      : true;

  React.useEffect(() => {
    const nextPos = isFocused || !!_value ? SUFFIX_MARGIN_Y.FOCUSED : SUFFIX_MARGIN_Y.UNFOCUSED;
    if (showSuffix && prevPosition.current !== nextPos) {
      Animated.timing(bottomAnim.current, {
        toValue: nextPos,
        duration: 200,
        useNativeDriver: false,
      }).start();
      prevPosition.current = nextPos;
    }
  }, [isFocused, _value, showSuffix]);

  const renderRightContent = React.useCallback(() => {
    if (showSuffix) return <View />;
    if (isFocused) return <TextInput.Affix text={safeSuffixValue} />;
    return undefined;
  }, [showSuffix, isFocused, safeSuffixValue]);

  return (
    <View tw="relative flex-row items-center w-full">
      <TextInput
        {...rest}
        tw="w-full bg-transparent mt-1"
        label={safeLabelValue}
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
        right={renderRightContent()}
      />
      {showSuffix ? (
        <Animated.View
          style={{
            position: 'absolute',
            right: SUFFIX_MARGIN_Y.UNFOCUSED,
            bottom: bottomAnim.current,
          }}
        >
          <Text tw="text-base">{safeSuffixValue}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}
