import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import ms from 'ms';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import GetLocation from 'react-native-get-location';
import { Modalize } from 'react-native-modalize';
import { Button, Portal, TextInput } from 'react-native-paper';
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

import InAppNotifications from '#common/InAppNotifications';
import { Translator, useTranslationUtils } from '#i18n/utils';
import { EGeolocationError, Geocoder } from '#screens/Dashboard/Management/AddLocation/utils';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';

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

  const modalRef = useRef<Modalize>(null);

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
      toast.show(t('actions.error'), { type: 'md_danger' });
      return;
    }

    function _onComplete() {
      previousValues.current = form.getValues();
      modalRef.current?.close();
    }

    if (!values.cityName) {
      useMarketplaceQueryParams.getState().setParams({
        location: DEFAULT_COORDINATES,
        filterByMaxDistanceInKm: values.distance,
      });
      return _onComplete();
    }

    try {
      const result = await new Geocoder().getCoordsFromLocation({
        cityName: values.cityName,
        countryCode: countryCode,
      });
      useMarketplaceQueryParams.getState().setParams({
        location: [result.latitude, result.longitude],
        filterByMaxDistanceInKm: values.distance,
      });
      return _onComplete();
    } catch (exception) {
      const message = _getToastMessage((exception as Error)?.message ?? '', t);
      toast.show(message, { type: 'md_warning' });

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
        const result = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: ms('6 seconds'),
        });

        const nextValue: [number, number] = [result.latitude, result.longitude];
        if (JSON.stringify(nextValue) === JSON.stringify(currentLocation)) return;

        _setLocation(nextValue);
        const geocoder = new Geocoder();

        const location = await geocoder.getAddressFromCoords({
          latitude: nextValue[0],
          longitude: nextValue[1],
        });
        const address = geocoder.buildAddressFromDatum({
          city: location.city,
          state: location.state,
        });

        form.setValue('cityName', address);
        previousValues.current = { cityName: address, distance: form.getValues('distance') };
      } catch (exception) {
        if (exception instanceof Error) {
          const errorCode = 'code' in exception ? exception.code : 'DENIED';
          switch (errorCode) {
            case 'CANCELLED':
            case 'UNAVAILABLE':
            case 'TIMEOUT':
            case 'UNAUTHORIZED': {
              if (!isEmpty(currentLocation) && !isEqual(currentLocation, DEFAULT_COORDINATES)) {
                return;
              }
              return _setLocation(DEFAULT_COORDINATES);
            }
            default: {
              reportCrash(exception as Error);
              return;
            }
          }
        }
      }
    }

    void _getInitialLocation();
    return emitter.on(APP_EVENTS.DISPATCH_INVALIDATE_MAKETPLACE_COORDINATES, _getInitialLocation);
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
          modalRef.current?.open();
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

      <Portal>
        <Modalize
          ref={modalRef}
          modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
          adjustToContentHeight
          withHandle={false}
          onClose={() => {
            if (!isEqual(previousValues.current, form.getValues())) {
              form.reset(previousValues.current);
            }
          }}
        >
          <View tw="w-full items-center justify-center h-10">
            <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
          </View>

          <View tw="px-4 pb-4 pt-2.5 space-y-4">
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
          </View>

          <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300">
            <Button
              tw="w-2/5"
              mode="outlined"
              uppercase
              onPress={(evt) => {
                evt.stopPropagation();
                form.reset(previousValues.current);
                modalRef.current?.close();
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
          </View>
        </Modalize>
      </Portal>
    </React.Fragment>
  );
}

function _getToastMessage(message: string, t: Translator) {
  switch (message) {
    case EGeolocationError.INVALID_FORMAT:
      return t('Dashboard.Marketplace.invalidFormatWarning');
    case EGeolocationError.UNRESOLVED_CITY:
      return t('Dashboard.Marketplace.unresolvedCityFormatWarning');
    case EGeolocationError.LOW_CONFIDENCE:
      return t('Dashboard.Marketplace.lowConfidenceWarning');
    case EGeolocationError.GENERAL_ERROR:
    default:
      return t('Dashboard.Marketplace.filterGeneralWarning');
  }
}
