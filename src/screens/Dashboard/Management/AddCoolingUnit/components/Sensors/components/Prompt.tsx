import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { Divider, List, Dialog, Portal } from 'react-native-paper';

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

  useAppEventListener<[boolean]>(APP_EVENTS.DISPATCH_SENSOR_PROMPT, setModalVisibility);

  useUnmount(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={toggleVisibility} style={{ backgroundColor: 'white' }}>
        <Dialog.Title>
          {t('Dashboard.Management.AddCoolingUnit.fields.selectSensorType')}
        </Dialog.Title>
        <Dialog.Content>
          <FlatList
            tw="m-0 p-0"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            data={SENSOR_TYPES}
            keyExtractor={(item, itemIdx) => `sensor-type-item-${item}-#${itemIdx}`}
            renderItem={({ item }) => (
              <React.Fragment>
                <List.Item
                  title={undefined}
                  left={() => <Text tw="text-base">{item}</Text>}
                  tw="m-0 py-2 px-2.5"
                  onPress={() => {
                    toggleVisibility();
                    timeoutRef.current = setTimeout(
                      () => emitter.emit(APP_EVENTS.DISPATCH_SENSOR_MODAL, true, item),
                      440
                    );
                  }}
                />
                <Divider tw="bg-zinc-400" />
              </React.Fragment>
            )}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={toggleVisibility}>{t('actions.close')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
