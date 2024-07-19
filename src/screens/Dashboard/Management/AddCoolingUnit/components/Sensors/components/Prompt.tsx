import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List, Modal, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';
import { useUnmount } from '#ui/hooks/useUnmount';

import { SENSOR_TYPES } from '../../../constants';

export default function Prompt() {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const { t } = useTranslationUtils();

  useAppEventListener<[boolean]>('DISPATCH_SENSOR_PROMPT', setModalVisibility);

  useUnmount(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={toggleVisibility}>
        <View tw="w-full bg-white rounded-3xl w-2/3 max-w-2/3 h-auto pt-6 pb-4 self-center space-y-2">
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.selectSensorType')}
          </Text>
          <View tw="w-full py-1.5">
            <FlatList
              nestedScrollEnabled
              data={SENSOR_TYPES}
              keyExtractor={(item, itemIdx) => `sensor-type-item-${item}-#${itemIdx}`}
              ItemSeparatorComponent={Divider}
              renderItem={({ item }) => (
                <List.Item
                  title={item}
                  tw="px-2"
                  onPress={() => {
                    toggleVisibility();
                    timeoutRef.current = setTimeout(
                      () => emitter.emit(APP_EVENTS.DISPATCH_SENSOR_MODAL, true, item),
                      440
                    );
                  }}
                />
              )}
            />
          </View>
          <View tw="self-end px-6">
            <Button mode="text" onPress={toggleVisibility}>
              {t('actions.close')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
