import React, { useRef } from 'react';
import { View } from 'react-native';
import { Button, Portal, TextInput } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Controller, useForm } from 'react-hook-form';
import colors from 'tailwindcss/colors';

import { Touchable } from '#ui/components/Touchable';
import { Text } from '#ui/components/Text';
import { Input } from '#ui/components/Input';
import { Sup } from '#ui/components/SuperscriptText';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { Geocoder } from '#screens/Dashboard/Management/AddLocation/utils';
import { paperTheme } from '#ui/lib/theme';

import { useMarketplaceQueryParams } from '../store';

type FormValues<T = string> = {
  cityName: string;
  distance: T;
};

export default function MarketplaceLocationFilter() {
  const { t, zodResolver } = useTranslationUtils();
  const { company } = useManagementStore();

  const modalRef = useRef<Modalize>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      cityName: '',
      distance: '0',
    },
    resolver: zodResolver((z) =>
      z.object({
        cityName: z.string(),
        distance: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0)),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  async function onSubmit(values: FormValues<number>): Promise<void> {
    if (typeof company?.country === 'undefined') return;
    try {
      const result = await new Geocoder().getCoordsFromLocation({
        cityName: values.cityName,
        countryCode: company.country,
      });
      useMarketplaceQueryParams.getState().setParams({
        location: [result.latitude, result.longitude],
        filterByMaxDistanceInKm: values.distance,
      });
      modalRef.current?.close();
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <React.Fragment>
      <Touchable
        tw="flex-row items-center justify-center space-x-1.5 p-1.5"
        rippleColor={colors.zinc[200]}
        onPress={(evt) => {
          evt.stopPropagation();
          modalRef.current?.open();
        }}
      >
        <MaterialCommunityIcon name="map-marker-outline" size={28} color={colors.zinc[600]} />
        <Text tw="text-base">Current location</Text>
        <MaterialIcon name="arrow-drop-down" size={26} color={colors.zinc[600]} />
      </Touchable>

      <Portal>
        <Modalize
          ref={modalRef}
          modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
          adjustToContentHeight
          withHandle={false}
        >
          <View tw="w-full items-center justify-center h-10">
            <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
          </View>

          <View tw="px-4 pb-4 pt-2.5 space-y-4">
            <View tw="space-y-2">
              <Text tw="text-base">My Location</Text>
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
                <Text tw="text-base">Max Distance</Text>
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
                          const finalValue = (int - 1).toString();
                          onChange(finalValue);
                        }}
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
              Apply
            </Button>
          </View>
        </Modalize>
      </Portal>
    </React.Fragment>
  );
}
