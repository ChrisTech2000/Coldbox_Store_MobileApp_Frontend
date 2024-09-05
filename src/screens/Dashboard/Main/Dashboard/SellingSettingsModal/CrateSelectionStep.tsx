import React, { type PropsWithChildren } from 'react';
import { FlatList, View } from 'react-native';
import { Checkbox, Divider, List } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';
import FastImage from 'react-native-fast-image';

import { Text } from '#ui/components/Text';

import type { Crate } from '#types/global';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { API_BASE_URL } from '#constants/environment';

import type { SellingSettingsFormValues } from './index';

export default function CrateSelectionStep(
  props: PropsWithChildren<{ crates: Array<Crate>; shelfLife: number }>
) {
  const { crates, shelfLife } = props;

  const { t } = useTranslationUtils();
  const { watch, setValue } = useFormContext<SellingSettingsFormValues>();

  const selectedCrates = watch('selectedCrates');
  const allSelected =
    Array.isArray(crates) && crates.length >= 1 ? selectedCrates.length === crates.length : false;

  return (
    <React.Fragment>
      <Text variant="TextMedium" tw="text-lg mt-3">
        Select the crates you want to sell.
      </Text>
      <List.Item
        title={undefined}
        tw="p-0 mt-5"
        left={() => <Text tw="text-lg">Select all</Text>}
        right={() => (
          <View tw="self-center">
            <Checkbox
              status={allSelected ? 'checked' : 'unchecked'}
              onPress={(evt) => {
                evt.stopPropagation();
                if (allSelected) return setValue('selectedCrates', []);
                setValue(
                  'selectedCrates',
                  crates.map((crate) => crate.id)
                );
              }}
            />
          </View>
        )}
      />
      <Divider tw="bg-gray-400" />

      <FlatList
        data={crates ?? []}
        keyExtractor={(item) => `selling-settings-list-item-#${item.id}`}
        ItemSeparatorComponent={Divider}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const isSelected = selectedCrates.includes(item.id);
          return (
            <List.Item
              title={undefined}
              tw="p-0 m-0"
              left={() => (
                <View tw="flex-row space-x-6">
                  <FastImage
                    resizeMode="contain"
                    tw="w-20 h-16"
                    source={{ uri: `${API_BASE_URL}media/${item.cropImage}` }}
                  />
                  <View tw="flex-col items-start">
                    <Text tw="text-lg">{item.movementCode}</Text>
                    <Text tw="text-sm text-zinc-500">{item.name}</Text>
                    <Text tw="text-sm text-zinc-500">
                      {`${item.weight} ${t('Dashboard.ProduceDetails.kilogram')}`}
                    </Text>
                  </View>
                </View>
              )}
              right={() => (
                <View tw="flex-row space-x-8">
                  <View tw="flex-col justify-evenly">
                    <Text tw="text-sm text-green-primary">TTP: {shelfLife}</Text>
                    <Text tw="text-sm text-zinc-500">{`${t('Dashboard.CrateManagement.CheckOut.checkIn')}:`}</Text>
                    <Text tw="text-sm text-zinc-500">
                      {dateFmt(item.checkInDate.toString(), 'MMM dd yyyy')}
                    </Text>
                  </View>
                  <View tw="self-center">
                    <Checkbox
                      status={isSelected ? 'checked' : 'unchecked'}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        if (isSelected) {
                          return setValue(
                            'selectedCrates',
                            selectedCrates.filter((crateId) => crateId !== item.id)
                          );
                        }
                        setValue('selectedCrates', [...selectedCrates, item.id]);
                      }}
                    />
                  </View>
                </View>
              )}
            />
          );
        }}
      />

      <React.Fragment>{props.children}</React.Fragment>
    </React.Fragment>
  );
}
