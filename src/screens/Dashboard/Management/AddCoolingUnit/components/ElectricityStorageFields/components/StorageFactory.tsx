import React from 'react';

import FormManager from '../../../contexts/FormManager';
import ThermalStorageField from './ThermalStorageField';
import BatteryFields from './BatteryFields';

export default function StorageFactory() {
  const { watch } = FormManager.useFormManager();

  switch (watch('electricityStorageSystem')) {
    case 'thermal storage':
      return <ThermalStorageField />;
    case 'battery':
      return <BatteryFields />;
    case 'hybrid':
      return (
        <React.Fragment>
          <ThermalStorageField />
          <BatteryFields />
        </React.Fragment>
      );
    case 'none':
    default:
      return null;
  }
}
