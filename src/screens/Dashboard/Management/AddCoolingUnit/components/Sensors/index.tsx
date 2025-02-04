import React, { type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Divider, Switch } from 'react-native-paper';

import { emitter, APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

import FormManager, { type SensorDatum } from '../../contexts/FormManager';
import Prompt from './components/Prompt';
import SensorModal from './components/SensorModal';

export default function Sensors(props: PropsWithChildren) {
  const { watch, setValue } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  useAppEventListener<[SensorDatum]>(APP_EVENTS.DISPATCH_SENSOR_DATUMS, (sensorData) => {
    setValue('sensor', true);
    setValue('sensorData', sensorData);
    emitter.emit(APP_EVENTS.DISPATCH_SENSOR_MODAL, false, undefined);
  });

  const integratedSensor = watch('sensor');

  return (
    <React.Fragment>
      <Prompt />
      <SensorModal />
      <View tw="flex-row items-center justify-between px-3 py-3.5">
        <Text tw="text-black">
          {t('Dashboard.Management.AddCoolingUnit.fields.sensorAvailable')}
        </Text>
        <View tw="flex flex-row items-center space-x-2.5">
          {props.children}

          <Switch
            value={integratedSensor}
            onValueChange={(value) => {
              if (!value) {
                setValue('sensor', value);
                setValue('sensorData', undefined);
                return;
              }
              emitter.emit(APP_EVENTS.DISPATCH_SENSOR_PROMPT, value);
            }}
          />
        </View>
      </View>
      <Divider tw="w-full bg-gray-700" />
    </React.Fragment>
  );
}
