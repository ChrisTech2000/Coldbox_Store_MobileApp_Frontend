import React from 'react';

import { useTranslationUtils } from '#i18n/utils';
import type { SensorTypes } from '#screens/Dashboard/Management/AddCoolingUnit/constants';
import { ESensorType } from '#types/global';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';

import EcozenForm from './components/EcozenForm';
import GenericSensorForm from './components/GenericSensorForm';
import { ModalWorkaround } from './components/ModalWorkaround';

export default function SensorModal() {
  const { t } = useTranslationUtils();

  const [isVisible, setModalVisibility] = React.useState<boolean>(false);
  const [selectedSensor, setSelectedSensor] = React.useState<SensorTypes | undefined>(undefined);

  useAppEventListener<[boolean, SensorTypes]>(
    APP_EVENTS.DISPATCH_SENSOR_MODAL,
    (status, sensorType) => {
      setModalVisibility(status);
      setSelectedSensor(sensorType);
    }
  );

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
          <GenericSensorForm type={ESensorType.FIGORR} />
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
          <GenericSensorForm type={ESensorType.VICTRON} />
        </ModalWorkaround>
      );
    case 'ubibot':
      return (
        <ModalWorkaround visible={isVisible} onDismiss={onDismiss}>
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.addTempSensor')}
          </Text>
          <Text tw="px-6 mt-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.sensorDesc.default')}
          </Text>
          <GenericSensorForm type={ESensorType.UBIBOT} />
        </ModalWorkaround>
      );
    default:
      return null;
  }
}
