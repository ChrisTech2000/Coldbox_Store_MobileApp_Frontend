import React from 'react';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { useAppEventListener } from '#ui/lib/emitter';
import type { SensorTypes } from '#screens/Dashboard/Management/AddCoolingUnit/constants';

import { ModalWorkaround } from './components/ModalWorkaround';
import EcozenForm from './components/EcozenForm';
import UbibotForm from './components/UbibotForm';
import FigorrForm from './components/FigorrForm';
import VictronForm from './components/VictronForm';

export default function SensorModal() {
  const { t } = useTranslationUtils();

  const [isVisible, setModalVisibility] = React.useState<boolean>(false);
  const [selectedSensor, setSelectedSensor] = React.useState<SensorTypes | undefined>(undefined);

  useAppEventListener<[boolean, SensorTypes]>('DISPATCH_SENSOR_MODAL', (status, sensorType) => {
    setModalVisibility(status);
    setSelectedSensor(sensorType);
  });

  const onDismiss = React.useCallback(() => {
    setModalVisibility(false);
    setSelectedSensor(undefined);
  }, []);

  switch (selectedSensor) {
    case 'ecozen':
      return (
        <ModalWorkaround visible={isVisible} onDismiss={onDismiss}>
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.addTempSensor')}
          </Text>
          <Text tw="px-6 mt-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.sensorDesc.default')}
          </Text>
          <EcozenForm />
        </ModalWorkaround>
      );
    case 'figorr':
      return (
        <ModalWorkaround visible={isVisible} onDismiss={onDismiss}>
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.addTempSensor')}
          </Text>
          <Text tw="px-6 mt-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.sensorDesc.default')}
          </Text>
          <FigorrForm />
        </ModalWorkaround>
      );
    case 'victron':
      return (
        <ModalWorkaround visible={isVisible} onDismiss={onDismiss}>
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.addTempSensor')}
          </Text>
          <Text tw="px-6 mt-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.sensorDesc.default')}
          </Text>
          <VictronForm />
        </ModalWorkaround>
      );
    case 'ubibot':
      return <UbibotForm onDismiss={onDismiss} />;
    default:
      return null;
  }
}
