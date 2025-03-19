import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Dialog, Divider, List, Portal, RadioButton } from 'react-native-paper';

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
  sensors: ListUserSensorsResponse['sources'];
};

export default function SensorsList() {
  const toast = InAppNotifications.useToast();
  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const { t } = useTranslationUtils();

  const [data, setData] = useState<SensorData | undefined>(undefined);

  const [selectedSensor, setSelectedSensor] = useState<
    ListUserSensorsResponse['sources'][number] | undefined
  >(undefined);

  useAppEventListener<[boolean, SensorData]>(
    APP_EVENTS.DISPATCH_SENSOR_LIST_MODAL,
    (status, data) => {
      setModalVisibility(status);
      setData(data);
      emitter.emit(APP_EVENTS.DISPATCH_SENSOR_MODAL, false, undefined);
    }
  );

  async function onSubmit() {
    if (!selectedSensor || !data) return;
    const sensorData = {
      sourceId: selectedSensor.id,
      username: data.username,
      password: data.password,
      type: data.sensorType,
    } satisfies SensorDatum;

    toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationSuccess'), {
      type: 'md_success',
    });

    emitter.emit(APP_EVENTS.DISPATCH_SENSOR_DATUMS, sensorData);
    toggleVisibility();
  }

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={toggleVisibility} style={{ backgroundColor: 'white' }}>
        <Dialog.Title>{t('Dashboard.Management.AddCoolingUnit.fields.selectSensor')}</Dialog.Title>
        <Dialog.Content style={{ maxHeight: '85%' }}>
          <RadioButton.Group
            value={selectedSensor?.id ?? ''}
            onValueChange={(value) => {
              if (!value) return;
              const sensor = data?.sensors.find((item) => item.id === value);
              setSelectedSensor(sensor);
            }}
          >
            <FlatList
              tw="m-0 p-0"
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              data={data?.sensors ?? []}
              keyExtractor={(item) => `sensor-item-${item.id}`}
              renderItem={({ item }) => (
                <React.Fragment>
                  <List.Item
                    title={undefined}
                    onPress={() => setSelectedSensor(item)}
                    tw="flex flex-row items-center justify-between px-1 py-1"
                    left={() => (
                      <View tw="w-[85%]">
                        <Text tw="text-base">{item.id}</Text>
                        <Text tw="text-sm text-gray-400 mt-1">
                          {item.name ||
                            t('Dashboard.Management.AddCoolingUnit.fields.unknownSensor')}
                        </Text>
                      </View>
                    )}
                    right={() => (
                      <RadioButton
                        value={item.id}
                        status={selectedSensor?.id === item.id ? 'checked' : 'unchecked'}
                      />
                    )}
                  />
                  <Divider tw="bg-zinc-400" />
                </React.Fragment>
              )}
            />
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onSubmit}>{t('actions.save')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
