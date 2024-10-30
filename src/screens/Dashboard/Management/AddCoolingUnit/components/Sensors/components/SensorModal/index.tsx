import React, { useState } from 'react';

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

  switch (selectedSensor) {
    case 'ecozen':
      return <EcozenForm isVisible={isVisible} onDismiss={toggleVisibility} />;
    case 'figorr':
      return <FigorrForm isVisible={isVisible} onDismiss={toggleVisibility} />;
    case 'ubibot':
      return <UbibotForm isVisible={isVisible} onDismiss={toggleVisibility} />;
    default:
      return null;
  }
}
