import React, { useMemo } from 'react';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Divider, Portal, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { Modal } from './Modal';
import { cn } from '#ui/lib/cn';

type WrapperProps = {
  content: {
    options: React.ReactElement;
    header?: string;
    footer?: React.ReactElement;
    headerComponent?: React.ReactElement;
  };
  currentValue?: string;
  error?: boolean;
  isModalOpen: boolean;
  label: string;
  minifyLabel?: boolean;
  variant?: 'sm' | 'md' | 'lg';
  onClick: () => void;
  useScrollView?: boolean;
  disabled?: boolean;
};

export function Select({
  content,
  currentValue,
  error,
  isModalOpen,
  label,
  minifyLabel,
  variant = 'sm',
  onClick,
  useScrollView = true,
  ...props
}: WrapperProps) {
  const { options, header, footer, headerComponent } = content;
  const colors = useTailwindColors();

  const arrowColor = useMemo(() => {
    if (props.disabled) return colors.gray[400];
    if (error) return colors.red[700];
    return variant === 'sm' ? colors.green.primary : colors.gray[600];
  }, [error]);

  return (
    <View>
      <Portal>
        <Modal visible={isModalOpen} onDismiss={onClick}>
          <TouchableWithoutFeedback onPress={onClick}>
            {/** This acts as the backdrop */}
            <View tw="absolute top-0 bottom-0 left-0 right-0" />
          </TouchableWithoutFeedback>
          <View
            tw={cn(
              'bg-white rounded-3xl w-3/4 max-w-3/4 py-2 self-center space-y-2',
              variant !== 'lg' ? 'max-h-72' : 'h-full'
            )}
          >
            {header && (
              <>
                <Text tw="text-lg px-2 py-1">{header}</Text>
                <Divider />
              </>
            )}
            {headerComponent ? headerComponent : null}
            {useScrollView ? (
              <ScrollView tw="py-0.5" showsVerticalScrollIndicator={false}>
                {options}
              </ScrollView>
            ) : (
              options
            )}
            {footer && (
              <>
                <Divider />
                {footer}
              </>
            )}
          </View>
        </Modal>
      </Portal>
      <TouchableOpacity
        tw={cn(
          'flex flex-row items-center space-x-0.5',
          variant !== 'sm' && 'justify-between',
          minifyLabel && currentValue && 'flex flex-col items-start'
        )}
        disabled={props.disabled}
        onPress={onClick}
      >
        <View tw="flex flex-row items-center justify-between flex-1">
          <Text
            tw={cn(
              variant === 'sm' ? 'text-green-primary' : 'text-gray-600 text-base',
              minifyLabel && currentValue && 'text-xs',
              error && 'text-red-700',
              props.disabled && 'text-gray-400',
              'flex-shrink'
            )}
            numberOfLines={1}
          >
            {label}
          </Text>
          {currentValue && (
            <Text
              tw={cn('text-base ml-2 flex-1 text-right', props.disabled && 'text-gray-400')}
              numberOfLines={1}
            >
              {currentValue}
            </Text>
          )}
          <Icon
            name={variant !== 'lg' ? 'arrow-drop-down' : 'keyboard-arrow-down'}
            size={variant !== 'lg' ? 20 : 30}
            style={{
              color: arrowColor,
              ...(isModalOpen && { transform: [{ rotate: '180deg' }] }),
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
