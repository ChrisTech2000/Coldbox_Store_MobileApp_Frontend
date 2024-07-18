import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';

import { useToggle } from '#ui/hooks/useToggle';
import { useAppEventListener } from '#ui/lib/emitter';

import type { SensorTypes } from '#screens/Dashboard/Management/AddCoolingUnit/constants';
import EcozenForm from './components/EcozenForm';
import UbibotForm from './components/UbibotForm';
import FigorrForm from './components/FigorrForm';

export default function SensorModal() {
  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const [selectedSensor, setSelectedSensor] = useState<SensorTypes | undefined>(undefined);

  useAppEventListener<[boolean, SensorTypes]>('DISPATCH_SENSOR_MODAL', (status, sensorType) => {
    setModalVisibility(status);
    setSelectedSensor(sensorType);
  });

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={toggleVisibility}>
        <View tw="w-full bg-white rounded-3xl w-5/6 max-w-5/6 h-auto pt-6 pb-4 self-center space-y-2">
          <Text variant="TitleRegular" tw="px-6">
            Add a temperature sensor to your cooling unit.
          </Text>
          <Text tw="px-6">Request this info from your sensor provider if not at hand.</Text>
          <_SensorFactory sensorType={selectedSensor} />
        </View>
      </Modal>
    </Portal>
  );
}

function _SensorFactory(props: { sensorType: SensorTypes | undefined }) {
  switch (props.sensorType) {
    case 'ecozen':
      return <EcozenForm />;
    case 'ubibot':
      return <UbibotForm />;
    case 'figorr':
      return <FigorrForm />;
    default:
      return null;
  }
}
