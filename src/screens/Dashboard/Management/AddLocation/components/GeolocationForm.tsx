import React from 'react';
import GetLocation from 'react-native-get-location';
import ms from 'ms';

import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';

export default function GeoLocationForm() {
  const form = FormManager.useFormManager();
  const [isLoading, toggleLoading] = useToggle();
  const { t } = useTranslationUtils();

  async function getCoordinates() {
    try {
      toggleLoading();
      const result = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: ms('6 seconds'),
      });
      form.reset((prev) => ({
        ...prev,
        latitude: result.latitude.toString(),
        longitude: result.longitude.toString(),
      }));
    } catch {
      // silent error
    } finally {
      toggleLoading();
    }
  }

  return (
    <Button mode="text" onPress={getCoordinates} tw="self-center mb-3.5 mt-1" disabled={isLoading}>
      {t('Dashboard.Management.Location.actions.currentLocation')}
    </Button>
  );
}
