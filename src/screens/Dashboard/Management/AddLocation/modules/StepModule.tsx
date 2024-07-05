import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';

import FormManager, { type FormValues } from '../components/FormManager';

export default function StepModule() {
  const { watch, setValue, clearErrors } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

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
        {t('Dashboard.Management.Location.chips.coordinates')}
      </Chip>
      <Chip
        icon="map-marker-outline"
        mode={selectedStep === 'geolocation' ? 'flat' : 'outlined'}
        onPress={() => onSelect('geolocation')}
        compact
      >
        {t('Dashboard.Management.Location.chips.geolocation')}
      </Chip>
      <Chip
        icon="home-outline"
        mode={selectedStep === 'address' ? 'flat' : 'outlined'}
        onPress={() => onSelect('address')}
        compact
      >
        {t('Dashboard.Management.Location.chips.address')}
      </Chip>
    </View>
  );
}
