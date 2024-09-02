import React, { useState } from 'react';
import GetLocation from 'react-native-get-location';
import ms from 'ms';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';
import { View } from 'react-native';

export default function GeoLocationForm() {
  const form = FormManager.useFormManager();
  const [isLoading, toggleLoading] = useToggle();
  const { t } = useTranslationUtils();

  const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });

  async function getCoordinates() {
    try {
      toggleLoading();
      const result = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: ms('6 seconds'),
      });
      const newCoordinates = {
        latitude: result.latitude.toString(),
        longitude: result.longitude.toString(),
      };
      form.reset((prev) => ({
        ...prev,
        ...newCoordinates,
      }));
      setCoordinates(newCoordinates);
    } catch {
      // silent error
    } finally {
      toggleLoading();
    }
  }

  return (
    <View>
      <Button
        mode="text"
        onPress={getCoordinates}
        tw="self-center mb-3.5 mt-1"
        disabled={isLoading}
      >
        {t('Dashboard.Management.Location.actions.currentLocation')}
      </Button>
      {coordinates.latitude && coordinates.longitude && (
        <View tw="flex flex-row justify-between mx-6 mb-4">
          <Input
            label={t('Dashboard.Management.Location.fields.latitude')}
            value={coordinates.latitude}
            disabled
            tw="flex-1 mr-2"
          />
          <Input
            label={t('Dashboard.Management.Location.fields.longitude')}
            value={coordinates.longitude}
            disabled
            tw="flex-1 ml-2"
          />
        </View>
      )}
    </View>
  );
}
