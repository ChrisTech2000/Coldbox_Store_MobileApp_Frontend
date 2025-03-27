import React, { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import type { LocationError, LocationErrorCode } from 'react-native-get-location/dist';
import colors from 'tailwindcss/colors';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';

import { useTranslationUtils } from '#i18n/utils';
import InAppNotifications from '#common/InAppNotifications';
import { useToggle } from '#ui/hooks/useToggle';
import reportCrash from '#ui/lib/reportCrash';
import { LocationGeocoder } from '#services/LocationGeocoder';
import { CustomError, type EGeolocationError } from '#services/utils/ErrorUtil';

import FormManager from '../components/FormManager';

type LocalState = { latitude: string; longitude: string };

export default function GeoLocationForm() {
  const form = FormManager.useFormManager();
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [isLoading, toggleLoading] = useToggle(false);
  const [coordinates, setCoordinates] = useState<LocalState | undefined>(undefined);

  async function getCoordinates() {
    toggleLoading();
    try {
      const result = await LocationGeocoder.getCurrentLocation();
      const newCoordinates = {
        latitude: result.latitude.toString(),
        longitude: result.longitude.toString(),
      };
      form.reset((prev) => ({ ...prev, ...newCoordinates }));
      setCoordinates(newCoordinates);
    } catch (exception) {
      if (exception instanceof CustomError) {
        const geolocationError = exception as CustomError<EGeolocationError, LocationError>;
        const locationErrorCode = geolocationError.originalError?.code;

        const errorMessageMap = {
          CANCELLED: t('Dashboard.Management.Location.toasts.positionCancelled'),
          UNAUTHORIZED: t('Dashboard.Management.Location.toasts.positionUnauthorized'),
          UNAVAILABLE: t('Dashboard.Management.Location.toasts.locationUnavailable'),
        } as Record<LocationErrorCode, string>;

        const errorMessage = errorMessageMap?.[locationErrorCode!] ?? errorMessageMap.UNAVAILABLE;
        toast.show(errorMessage, { type: 'md_danger' });
        return;
      }

      reportCrash(exception as Error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <View tw="my-4.5">
      <Button
        tw="self-center mb-3.5 mt-1 w-5/6"
        mode="text"
        onPress={getCoordinates}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.zinc[400]} />
        ) : (
          t('Dashboard.Management.Location.actions.currentLocation')
        )}
      </Button>

      {typeof coordinates !== 'undefined' ? (
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
      ) : null}
    </View>
  );
}
