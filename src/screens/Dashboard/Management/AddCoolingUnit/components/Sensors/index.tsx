import React from 'react';
import { Text, View } from 'react-native';
import { Divider, Switch } from 'react-native-paper';

import { emitter, APP_EVENTS } from '#ui/lib/emitter';

import FormManager from '../../contexts/FormManager';
import Prompt from './components/Prompt';

export default function Sensors() {
  const { watch } = FormManager.useFormManager();

  const selectedSensor = watch('sensor');

  return (
    <React.Fragment>
      <Prompt />
      <View tw="flex-row items-center justify-between px-3 py-3.5">
        <Text>Sensor available</Text>
        <Switch
          value={selectedSensor}
          onChange={() => emitter.emit(APP_EVENTS.DISPATCH_SENSOR_PROMPT, true)}
        />
      </View>
      <Divider tw="w-full bg-gray-700" />
    </React.Fragment>
  );
}
