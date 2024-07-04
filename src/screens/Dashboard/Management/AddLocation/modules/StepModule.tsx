import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

import FormManager, { type FormValues } from '../components/FormManager';

export default function StepModule() {
  const { watch, setValue, clearErrors } = FormManager.useFormManager();

  function onSelect(step: FormValues['_step']) {
    setValue('_step', step);
    clearErrors();
  }

  const selectedStep = watch('_step');

  return (
    <View tw="flex-row gap-4 flex-wrap my-4">
      <Chip
        icon="crosshairs-gps"
        mode={selectedStep === 'coordinates' ? 'flat' : 'outlined'}
        onPress={() => onSelect('coordinates')}
        compact
      >
        Coordinates
      </Chip>
      <Chip
        icon="map-marker-outline"
        mode={selectedStep === 'geolocation' ? 'flat' : 'outlined'}
        onPress={() => onSelect('geolocation')}
        compact
      >
        Phone Geolocation
      </Chip>
      <Chip
        icon="home-outline"
        mode={selectedStep === 'address' ? 'flat' : 'outlined'}
        onPress={() => onSelect('address')}
        compact
      >
        Address
      </Chip>
    </View>
  );
}
