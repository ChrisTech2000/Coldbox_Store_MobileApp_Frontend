import React from 'react';
import { View } from 'react-native';
import { Icon, Portal } from 'react-native-paper';

import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';

export function SortingMenu() {
  return (
    <View>
      <Icon source="sort" size={32} />
      <Portal>
        <Modal tw="w-2/3" visible={false} onDismiss={() => null}>
          <View tw="w-full items-center mx-16 bg-white rounded-sm py-1 max-h-80">
            <Text>Sort by</Text>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
