import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, Portal, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { Modal } from './Modal';
import { cn } from '#ui/lib/cn';

type WrapperProps = {
  currentValue?: string;
  label: string;
  isModalOpen: boolean;
  content: {
    options: React.ReactElement;
    header?: string;
    footer?: React.ReactElement;
  };
  variant?: 'sm' | 'lg';
  onClick: () => void;
};

export function Select({
  currentValue,
  content,
  label,
  isModalOpen,
  variant = 'sm',
  onClick,
}: WrapperProps) {
  const { options, header, footer } = content;
  const colors = useTailwindColors();

  return (
    <View>
      <Portal>
        <Modal tw="w-1/2" visible={isModalOpen} onDismiss={onClick}>
          <View
            tw={cn(
              'w-full mx-24 bg-white rounded-sm py-1',
              variant === 'sm' ? 'max-h-72' : 'h-full'
            )}
          >
            {header && (
              <>
                <Text tw="text-lg px-2 py-1">{header}</Text>
                <Divider />
              </>
            )}
            <ScrollView tw="py-0.5">{options}</ScrollView>
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
        tw={cn('flex flex-row items-center', variant === 'sm' ? 'space-x-0.5' : 'justify-between')}
        onPress={onClick}
      >
        <Text tw={variant === 'sm' ? 'text-green-primary' : 'text-gray-700 text-base'}>
          {label}
        </Text>
        <View tw="flex flex-row items-center space-x-2s">
          {currentValue && <Text tw="text-base">{currentValue}</Text>}
          <Icon
            name={variant === 'sm' ? 'arrow-drop-down' : 'keyboard-arrow-down'}
            size={variant === 'sm' ? 20 : 30}
            style={{
              color: variant === 'sm' ? colors.green.primary : colors.gray[600],
              ...(isModalOpen && { transform: [{ rotate: '180deg' }] }),
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
