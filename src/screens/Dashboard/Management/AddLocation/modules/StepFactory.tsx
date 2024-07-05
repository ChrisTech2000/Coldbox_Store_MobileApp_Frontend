import React from 'react';

import FormManager from '../components/FormManager';
import CoordinatesForm from '../components/CoordinatesForm';
import GeoLocationForm from '../components/GeolocationForm';
import AddressForm from '../components/AddressForm';

export default function StepFactory() {
  const { watch } = FormManager.useFormManager();

  const selectedStep = watch('_step');

  switch (selectedStep) {
    case 'coordinates':
      return <CoordinatesForm />;
    case 'geolocation':
      return <GeoLocationForm />;
    case 'address':
      return <AddressForm />;
    default:
      return null;
  }
}
