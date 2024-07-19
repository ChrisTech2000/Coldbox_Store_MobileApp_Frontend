import React from 'react';

import FormManager from '../../../contexts/FormManager';
import DieselConsumptionField from './DieselConsumptionField';
import PvPanelsFields from './PvPanelsFields';
import HybridFields from './HybridFields';

export default function PowerSourceFactory() {
  const { watch } = FormManager.useFormManager();

  switch (watch('powerSource')) {
    case 'generator':
      return <DieselConsumptionField />;
    case 'pvpanels':
      return <PvPanelsFields />;
    case 'hybrid':
      return (
        <React.Fragment>
          <HybridFields />
          <DieselConsumptionField />
          <PvPanelsFields />
        </React.Fragment>
      );
    case 'biomass':
    case 'grid':
    default:
      return null;
  }
}
