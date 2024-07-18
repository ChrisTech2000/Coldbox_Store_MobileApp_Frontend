import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { useAppEventListener } from '#ui/lib/emitter';

import type { SensorTypes } from '#screens/Dashboard/Management/AddCoolingUnit/constants';

export default function SensorModal() {
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const [selectedSensor, setSelectedSensor] = useState<SensorTypes | undefined>(undefined);

  useAppEventListener<[boolean, SensorTypes]>('DISPATCH_SENSOR_MODAL', (status, sensorType) => {
    setModalVisibility(status);
    setSelectedSensor(sensorType);
  });

  console.log(selectedSensor);

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={toggleVisibility}>
        <View tw="w-full bg-white rounded-3xl w-5/6 max-w-5/6 h-auto pt-6 pb-4 self-center space-y-2">
          <Text variant="TitleRegular" tw="px-6">
            Add a temperature sensor to your cooling unit.
          </Text>
          <Text tw="px-6">Request this info from your sensor provider if not at hand. </Text>
          <View tw="w-full pt-1.5 pb-3">{/* TODO */}</View>
          <View tw="flex-row self-end px-6">
            <Button mode="text" onPress={toggleVisibility}>
              {t('actions.cancel')}
            </Button>
            <Button mode="text" onPress={undefined}>
              {t('actions.save-changes')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
