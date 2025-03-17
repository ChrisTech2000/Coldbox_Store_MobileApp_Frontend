import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Dialog, Divider, List, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import { ListUserSensorsResponse } from '#types/api.responses';
import { ESensorType } from '#types/global';

import { SensorDatum } from '../../../contexts/FormManager';

type SensorData = {
  username: string;
  password: string;
  sensorType: ESensorType;
  sensors: ListUserSensorsResponse;
};

export default function SensorsList() {
  const toast = InAppNotifications.useToast();
  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const { t } = useTranslationUtils();

  const [data, setData] = useState<SensorData | undefined>(undefined);

  const [selectedSensor, setSelectedSensor] = useState<ListUserSensorsResponse[number] | undefined>(
    undefined
  );

  useAppEventListener<[boolean, SensorData]>(APP_EVENTS.DISPATCH_SENSOR_MODAL, (status, data) => {
    setModalVisibility(status);
    setData(data);
  });

  async function onSubmit() {
    if (!selectedSensor || !data) return;
    const sensorData = {
      source_id: selectedSensor.id,
      username: data.username,
      password: data.password,
      type: data.sensorType,
    } satisfies SensorDatum;

    toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationSuccess'), {
      type: 'md_success',
    });

    emitter.emit(APP_EVENTS.DISPATCH_SENSOR_DATUMS, sensorData);
  }

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
            data={data?.sensors ?? []}
            keyExtractor={(item) => `sensor-item-${item.id}-#${item.name}`}
            renderItem={({ item }) => (
              <React.Fragment>
                <List.Item
                  title={undefined}
                  left={() => (
                    <Text tw="text-base">
                      {item.name} ({item.id})
                    </Text>
                  )}
                  tw="m-0 py-2 px-2.5"
                  onPress={() => setSelectedSensor(item)}
                />
                <Divider tw="bg-zinc-400" />
              </React.Fragment>
            )}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onSubmit}>{t('actions.save')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
