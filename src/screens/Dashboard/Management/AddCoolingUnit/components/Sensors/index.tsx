import React from 'react';
import { Text, View } from 'react-native';
import { Divider, Switch } from 'react-native-paper';

import { emitter, APP_EVENTS } from '#ui/lib/emitter';

import FormManager from '../../contexts/FormManager';
import Prompt from './components/Prompt';
import SensorModal from './components/SensorModal';

export default function Sensors() {
  const { watch } = FormManager.useFormManager();

  const integratedSensor = watch('sensor', false);

  return (
    <React.Fragment>
      <Prompt />
      <SensorModal />
      <View tw="flex-row items-center justify-between px-3 py-3.5">
        <Text>Sensor available</Text>
        <Switch
          value={integratedSensor}
          onChange={() => emitter.emit(APP_EVENTS.DISPATCH_SENSOR_PROMPT, true)}
        />
      </View>
      <Divider tw="w-full bg-gray-700" />
    </React.Fragment>
  );
}
