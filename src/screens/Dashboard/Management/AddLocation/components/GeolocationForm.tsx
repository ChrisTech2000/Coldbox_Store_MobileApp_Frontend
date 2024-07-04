import React from 'react';
import GetLocation from 'react-native-get-location';
import ms from 'ms';

import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';

import FormManager from '../components/FormManager';

export default function GeoLocationForm() {
  const form = FormManager.useFormManager();
  const [isLoading, toggleLoading] = useToggle();

  async function getCoordinates() {
    try {
      toggleLoading();
      const result = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: ms('6 seconds'),
      });
      form.reset((prev) => ({
        ...prev,
        latitude: result.latitude,
        longitude: result.longitude,
      }));
      toggleLoading();
    } catch {
      // silent error
    }
  }

  return (
    <Button mode="text" onPress={getCoordinates} tw="self-center mb-3.5 mt-1" disabled={isLoading}>
      Choose current location
    </Button>
  );
}
