import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
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
          <_SensorFactory sensorType={selectedSensor} />
        </View>
      </Modal>
    </Portal>
  );
}

function _SensorFactory(props: { sensorType: SensorTypes | undefined }) {
  const { t } = useTranslationUtils();

  switch (props.sensorType) {
    case 'ecozen':
      return (
        <React.Fragment>
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.addTempSensor')}
          </Text>
          <Text tw="px-6 mt-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.sensorDesc.default')}
          </Text>
          <EcozenForm />
        </React.Fragment>
      );

    case 'ubibot':
      return <UbibotForm />;

    case 'figorr':
      return (
        <React.Fragment>
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.addTempSensor')}
          </Text>
          <Text tw="px-6 mt-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.sensorDesc.default')}
          </Text>
          <FigorrForm />
        </React.Fragment>
      );

    default:
      return null;
  }
}
