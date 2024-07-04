import React from 'react';
import GetLocation from 'react-native-get-location';
import ms from 'ms';

import { Button } from '#ui/components/Button';

import FormManager from '../components/FormManager';

export default function GeoLocationForm() {
  const form = FormManager.useFormManager();

  async function getCoordinates() {
    try {
      const result = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: ms('6 seconds'),
      });
      form.reset((prev) => ({
        ...prev,
        latitude: result.latitude,
        longitude: result.longitude,
      }));
    } catch {
      // silent error
    }
  }

  return (
    <Button mode="text" onPress={getCoordinates} tw="self-center mt-2">
      Choose current location
    </Button>
  );
}
