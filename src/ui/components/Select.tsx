import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, Portal, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { Modal } from './Modal';

type WrapperProps = {
  label: string;
  isModalOpen: boolean;
  content: {
    options: React.ReactElement;
    header?: string;
    footer?: React.ReactElement;
  };
  onClick: () => void;
};

export function Select({ content, label, isModalOpen, onClick }: WrapperProps) {
  const { options, header, footer } = content;
  const colors = useTailwindColors();

  return (
    <View>
      <Portal>
        <Modal tw="w-1/2" visible={isModalOpen} onDismiss={onClick}>
          <View tw="w-full mx-24 bg-white rounded-sm max-h-72 py-1">
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
      <TouchableOpacity tw="flex flex-row items-center space-x-0.5" onPress={onClick}>
        <Text tw="text-green-primary">{label}</Text>
        <Icon
          name="arrow-drop-down"
          size={20}
          style={{
            color: colors.green.primary,
            ...(isModalOpen && { transform: [{ rotate: '180deg' }] }),
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
