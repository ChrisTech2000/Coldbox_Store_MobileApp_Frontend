import { FlashList } from '@shopify/flash-list';
import truncate from 'lodash/truncate';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';

import DataAggregator from '../contexts/DataAggregator';
import FormManager, { type FormValues } from '../contexts/FormManager';
import { CropPricingManager } from '../utils';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function CommoditiesField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { companyCrops } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [search, setSearch] = useState<string>('');

  const selectedCrops = watch('crops');
  const [internalSelection, setInternalSelection] = useState<Array<number>>(selectedCrops);

  _useCropPricingPatcher();

  const datums = useMemo(() => {
    const entries: Array<[number, string]> = [];
    for (const [id, name] of Object.entries(companyCrops)) {
      if (name.toLowerCase().includes(search.toLowerCase())) {
        entries.push([parseInt(id), name]);
      }
    }
    return entries;
  }, [companyCrops, search]);

  const selectLabel = useMemo(() => {
    const selectedOptions = Object.entries(companyCrops)
      .filter(([id]) => selectedCrops.includes(Number(id)))
      .slice(0, 2)
      .map(([, name]) => truncate(name, { length: 7 }));
    return selectedOptions.length > 0 ? selectedOptions.join(', ') : '';
  }, [datums, selectedCrops]);

  const fieldError = !!formState.errors.crops;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="crops"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-4">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="lg"
                label={t('Dashboard.Management.AddCoolingUnit.fields.crops')}
                currentValue={selectLabel}
                isModalOpen={isVisible}
                onClick={() => {
                  setInternalSelection(selectedCrops);
                  toggleVisibility();
                }}
                useScrollView={false}
                content={{
                  header: t('Dashboard.Management.AddCoolingUnit.fields.selectCrops'),
                  headerComponent: (
                    <TextInput
                      tw="w-[85%] self-center bg-white rounded-sm my-2 h-12 border border-gray-600 mb-2"
                      label={t('actions.search')}
                      value={search}
                      onChangeText={(val) => setSearch(val)}
                      left={<TextInput.Icon icon="magnify" />}
                    />
                  ),
                  options: (
                    <FlashList
                      showsVerticalScrollIndicator={false}
                      data={[...datums]}
                      renderItem={({ item: [id, name], index }) => (
                        <React.Fragment>
                          <View
                            tw="w-full flex flex-row items-center justify-between px-4 py-2"
                            key={`commodity-item-${id}-#${index}`}
                          >
                            <Text tw="text-base w-[70%]" numberOfLines={2}>
                              {name}
                            </Text>
                            <Checkbox
                              status={internalSelection.includes(id) ? 'checked' : 'unchecked'}
                              onPress={() => {
                                setInternalSelection((prev) => {
                                  const clone = [...prev];
                                  const idx = clone.indexOf(id);
                                  if (idx === -1) clone.push(id);
                                  else clone.splice(idx, 1);
                                  return clone;
                                });
                              }}
                            />
                          </View>
                          <Divider />
                        </React.Fragment>
                      )}
                      estimatedItemSize={40}
                      estimatedListSize={{
                        height: deviceHeight,
                        width: deviceWidth / 2,
                      }}
                    />
                  ),
                  footer: (
                    <View
                      tw={
                        deviceHeight > SMALL_SCREEN_THRESHOLD
                          ? 'flex flex-row items-center justify-end'
                          : 'items-center'
                      }
                    >
                      <View
                        tw={cn(
                          'flex flex-row items-center',
                          deviceHeight <= SMALL_SCREEN_THRESHOLD && 'space-x-2'
                        )}
                      >
                        <Button
                          mode="text"
                          uppercase
                          onPress={(evt) => {
                            evt.stopPropagation();
                            setInternalSelection(datums.map(([id]) => id));
                          }}
                        >
                          {t('actions.all')}
                        </Button>
                        <Button
                          mode="text"
                          uppercase
                          onPress={(evt) => {
                            evt.stopPropagation();
                            setInternalSelection([]);
                          }}
                        >
                          {t('actions.none')}
                        </Button>
                      </View>
                      <View
                        tw={cn(
                          'flex flex-row items-center',
                          deviceHeight <= SMALL_SCREEN_THRESHOLD && 'space-x-2'
                        )}
                      >
                        <Button
                          mode="text"
                          uppercase
                          onPress={(evt) => {
                            evt.stopPropagation();
                            setInternalSelection(selectedCrops);
                            toggleVisibility();
                          }}
                        >
                          {t('actions.cancel')}
                        </Button>
                        <Button
                          mode="text"
                          uppercase
                          onPress={(evt) => {
                            evt.stopPropagation();
                            onChange(internalSelection);
                            toggleVisibility();
                          }}
                        >
                          {t('actions.ok')}
                        </Button>
                      </View>
                    </View>
                  ),
                }}
              />
            </View>
            <Divider tw={cn('w-full bg-gray-700', fieldError && 'bg-red-700 h-0.5')} />
          </View>
        )}
      />
    </React.Fragment>
  );
}

function _useCropPricingPatcher() {
  const { getValues, setValue, watch } = FormManager.useFormManager();
  const { companyCrops } = DataAggregator.useDataAggregator();

  const [selectedCrops, priceType, commonPrice] = watch(['crops', 'priceType', 'price']);

  const _callback = useDebouncedCallback(() => {
    const prevCropPricing = getValues('cropSpecificPricing');

    const formCropsShallow = [...selectedCrops];

    if (!(formCropsShallow.length >= 1)) {
      for (const cropId in companyCrops) {
        formCropsShallow.push(Number(cropId));
      }
    }

    const newCropPricing = CropPricingManager.patch({
      formCrops: formCropsShallow,
      previous: prevCropPricing,
      priceType,
      commonPrice,
    });

    if (JSON.stringify(prevCropPricing) !== JSON.stringify(newCropPricing)) {
      setValue('cropSpecificPricing', newCropPricing);
    }
  }, 480);

  useEffect(_callback, [selectedCrops.length, priceType, commonPrice]);
}
