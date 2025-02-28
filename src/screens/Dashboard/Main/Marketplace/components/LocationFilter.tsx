import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from 'tailwindcss/colors';

import { Input } from '#ui/components/Input';
import { Sup } from '#ui/components/SuperscriptText';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import reportCrash from '#ui/lib/reportCrash';
import * as BottomSheet from '#ui/components/BottomSheet';

import InAppNotifications from '#common/InAppNotifications';
import { Translator, useTranslationUtils } from '#i18n/utils';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { LocationGeocoder } from '#services/LocationGeocoder';
import { CustomError, EGeolocationError } from '#services/utils/ErrorUtil';

import { useMarketplaceQueryParams } from '../store';
import { DEFAULT_COORDINATES } from '../utils';

function _getContextualCountry(value: string): string | undefined {
  if (!value) return undefined;
  const dict = countriesDict();
  const datum = dict.getByValue(value);
  if (typeof datum === 'undefined') return undefined;
  return dict.getISOByName(datum.name);
}

type FormValues<T = string> = {
  cityName: string;
  distance: T;
};

const TRUNCATE_TEST_THRESHOLD = 10;
const DEFAULT_FORM_VALUES: FormValues = {
  cityName: '',
  distance: '0',
};

export default function MarketplaceLocationFilter() {
  const { t, zodResolver } = useTranslationUtils();
  const { company } = useManagementStore();
  const toast = InAppNotifications.useToast();
  const farmerCountry = useDashboardStore((store) => store.farmerCountry);

  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  const form = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver((z) =>
      z.object({
        cityName: z.string().optional(),
        distance: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0)),
      })
    ),
    reValidateMode: 'onSubmit',
  });
  const previousValues = useRef<FormValues>(DEFAULT_FORM_VALUES);

  const cityName = form.watch('cityName');
  const distance = form.watch('distance');

  async function onSubmit(values: FormValues<number>): Promise<void> {
    const countryCode = _getContextualCountry(company?.country || farmerCountry || '');
    if (!countryCode) {
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      return;
    }

    function _onComplete() {
      previousValues.current = form.getValues();
      modalActions.close();
    }

    if (!values.cityName) {
      useMarketplaceQueryParams.getState().setParams({
        location: DEFAULT_COORDINATES,
        filterByMaxDistanceInKm: values.distance,
      });
      return _onComplete();
    }

    try {
      const result = await LocationGeocoder.getCoordsFromLocation({
        cityName: values.cityName,
        countryCode: countryCode,
      });
      useMarketplaceQueryParams.getState().setParams({
        location: [result.latitude, result.longitude],
        filterByMaxDistanceInKm: values.distance,
      });
      return _onComplete();
    } catch (exception) {
      // eslint-disable-next-line
      // @ts-ignore
      if (exception instanceof CustomError<EGeolocationError>) {
        const message = _getToastMessage(exception.type, t);
        toast.show(message, { type: 'md_warning' });
      }

      useMarketplaceQueryParams.getState().setParams({
        location: DEFAULT_COORDINATES,
        filterByMaxDistanceInKm: values.distance,
      });
      return _onComplete();
    }
  }

  useEffect(() => {
    async function _getInitialLocation(): Promise<void> {
      if (form.getValues('cityName').length > 0) return;

      const currentLocation = useMarketplaceQueryParams.getState().location;

      function _setLocation(location: [number, number]): void {
        useMarketplaceQueryParams.getState().setParams({ location });
      }

      try {
        const result = await LocationGeocoder.getCurrentLocation();

        const nextValue: [number, number] = [result.latitude, result.longitude];
        if (JSON.stringify(nextValue) === JSON.stringify(currentLocation)) return;

        _setLocation(nextValue);

        const location = await LocationGeocoder.getAddressFromCoords({
          latitude: nextValue[0],
          longitude: nextValue[1],
        });
        const address = LocationGeocoder.buildAddressFromDatum({
          city: location.city,
          state: location.state,
        });

        form.setValue('cityName', address);
        previousValues.current = { cityName: address, distance: form.getValues('distance') };
      } catch (exception) {
        if (exception instanceof CustomError) {
          const isLocationPermissionDenied =
            exception.type === EGeolocationError.LocationPermission;

          const isLocationDisabledBySystem = exception.type === EGeolocationError.GeneralError;

          if (isLocationPermissionDenied || isLocationDisabledBySystem) {
            // if we already have valid coordinates, keep using those
            if (!isEmpty(currentLocation) && !isEqual(currentLocation, DEFAULT_COORDINATES)) return;
            // otherwise fallback to default coordinates
            return _setLocation(DEFAULT_COORDINATES);
          }

          reportCrash(exception as Error);
        }
      }
    }

    void _getInitialLocation();
    return emitter.on(APP_EVENTS.DISPATCH_INVALIDATE_MARKETPLACE_COORDINATES, _getInitialLocation);
  }, []);

  return (
    <React.Fragment>
      <Touchable
        tw={cn(
          'flex-row items-center justify-center space-x-1.5 py-1.5 max-w-[55%]',
          cityName?.length > TRUNCATE_TEST_THRESHOLD ? 'ml-4' : ''
        )}
        rippleColor={colors.zinc[200]}
        onPress={(evt) => {
          evt.stopPropagation();
          previousValues.current = form.getValues();
          modalActions.open();
        }}
      >
        <MaterialCommunityIcon name="map-marker-outline" size={28} color={colors.zinc[600]} />
        <Text tw="text-base" numberOfLines={1}>
          {cityName
            ? `${cityName} ${distance ? `(+${distance}km)` : ''}`
            : t('Dashboard.Marketplace.currentLocation')}
        </Text>
        <MaterialIcon name="arrow-drop-down" size={26} color={colors.zinc[600]} />
      </Touchable>

      <BottomSheet.Root
        ref={modalRef}
        onClose={() => {
          if (!isEqual(previousValues.current, form.getValues())) {
            form.reset(previousValues.current);
          }
        }}
      >
        <BottomSheet.Content tw="pt-2.5 space-y-4">
          <View tw="space-y-2">
            <Text tw="text-base">{t('Dashboard.Marketplace.currentLocation')}</Text>
            <Controller
              control={form.control}
              name="cityName"
              render={({ field: { value, onChange } }) => (
                <Input
                  tw="bg-white border rounded-sm h-14 rounded-md"
                  placeholder="City name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <View tw="space-y-2">
            <View tw="flex-row items-center">
              <Text tw="text-base">{t('Dashboard.Marketplace.maxDistance')}</Text>
              <Sup>(KM)</Sup>
            </View>
            <Controller
              control={form.control}
              name="distance"
              render={({ field: { value, onChange } }) => (
                <Input
                  tw="bg-white border rounded-sm h-14 text-center rounded-md"
                  keyboardType="numeric"
                  defaultValue="0"
                  editable={false}
                  value={value}
                  onChangeText={onChange}
                  left={
                    <TextInput.Icon
                      icon="minus"
                      color={paperTheme.colors.primary}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        const int = Number(value);
                        if (isNaN(int)) return; // safe value
                        const finalValue = (int > 0 ? int - 1 : 0).toString();
                        onChange(finalValue);
                      }}
                      disabled={form.watch('distance') === '0'}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon="plus"
                      color={paperTheme.colors.primary}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        const int = Number(value);
                        if (isNaN(int)) return; // safe value
                        const finalValue = (int + 1).toString();
                        onChange(finalValue);
                      }}
                    />
                  }
                />
              )}
            />
          </View>
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <Button
            tw="w-2/5"
            mode="outlined"
            uppercase
            onPress={(evt) => {
              evt.stopPropagation();
              form.reset(previousValues.current);
              modalActions.close();
            }}
            disabled={form.formState.isSubmitting}
          >
            {t('actions.cancel')}
          </Button>
          <Button
            tw="w-2/5"
            mode="contained"
            uppercase
            // eslint-disable-next-line
            onPress={form.handleSubmit(onSubmit as any)}
            disabled={form.formState.isSubmitting}
          >
            {t('actions.apply')}
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Root>
    </React.Fragment>
  );
}

function _getToastMessage(type: EGeolocationError, t: Translator): string {
  switch (type) {
    case EGeolocationError.InvalidFormat:
      return t('Dashboard.Marketplace.invalidFormatWarning');
    case EGeolocationError.UnresolvedCity:
      return t('Dashboard.Marketplace.unresolvedCityFormatWarning');
    case EGeolocationError.LowConfidence:
      return t('Dashboard.Marketplace.lowConfidenceWarning');
    case EGeolocationError.GeneralError:
    default:
      return t('Dashboard.Marketplace.filterGeneralWarning');
  }
}
