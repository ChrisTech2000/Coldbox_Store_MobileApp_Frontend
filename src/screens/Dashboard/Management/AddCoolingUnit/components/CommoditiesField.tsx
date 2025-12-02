import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { useController } from 'react-hook-form';
import { FlashList } from '@shopify/flash-list';
import { useDebouncedCallback } from 'use-debounce';
import truncate from 'lodash/truncate';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Select, VIRTUAL_LIST_SIZE_WIDTH } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';

import DataAggregator from '../contexts/DataAggregator';
import FormManager, { type FormValues } from '../contexts/FormManager';
import { CropPricingManager } from '../utils';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function CommoditiesField() {
  const { control } = FormManager.useFormManager();
  const { companyCrops } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  const { field, fieldState } = useController({ name: 'crops', control });

  const [search, setSearch] = useState<string>('');
  const [internalSelection, setInternalSelection] = useState<Array<number>>(field.value);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  _useCropPricingPatcher();

  const sortedData: Array<[number, string]> = useMemo(
    () =>
      Object.entries(companyCrops)
        .map(([id, name]): [number, string] => [parseInt(id), name])
        .sort((a, b) => a[1].toLowerCase().localeCompare(b[1].toLowerCase())),
    [companyCrops]
  );

  const datums: Array<[number, string]> = useMemo(
    () => sortedData.filter(([, name]) => name.toLowerCase().includes(search.toLowerCase())),
    [sortedData, search]
  );

  const displayValue: string = useMemo(() => {
    if (!field.value.length) return '';
    const selectedNames = Object.entries(companyCrops)
      .filter(([id]) => field.value.includes(Number(id)))
      .slice(0, 2)
      .map(([, name]) => truncate(name, { length: 7 }));
    return selectedNames.join(', ');
  }, [companyCrops, field.value]);

  const fieldError = typeof fieldState.error !== 'undefined';

  return (
    <View tw="mt-4">
      <View tw="pb-2">
        <Select
          variant="lg"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          onDismiss={() => {
            setSearch('');
            setInternalSelection(field.value);
          }}
        >
          <Select.Touchable
            label={t('Dashboard.Management.AddCoolingUnit.fields.crops')}
            displayValue={displayValue}
          />
          <Select.Dialog
            enableScroll
            header={t('Dashboard.Management.AddCoolingUnit.fields.selectCrops')}
            StickyHeaderElement={
              <View tw="p-3">
                <TextInput
                  tw="bg-white rounded-sm h-12 border border-gray-600"
                  label={t('actions.search')}
                  value={search}
                  onChangeText={(val) => setSearch(val)}
                  left={<TextInput.Icon icon="magnify" />}
                />
              </View>
            }
            FooterElement={
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
                      setSearch('');
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
                      setSearch('');
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
                      setSearch('');
                      setInternalSelection(field.value);
                      setIsModalVisible(false);
                    }}
                  >
                    {t('actions.cancel')}
                  </Button>
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      field.onChange(internalSelection);
                      setSearch('');
                      setIsModalVisible(false);
                    }}
                  >
                    {t('actions.ok')}
                  </Button>
                </View>
              </View>
            }
          >
            <FlashList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={[...datums]}
              keyExtractor={([id], idx) => `commodity-item-${id}-#${idx}`}
              renderItem={({ item: [id, name] }) => (
                <View tw="w-full flex flex-row items-center justify-between px-4 py-2">
                  <Text tw="text-base w-[70%]" numberOfLines={2}>
                    {name}
                  </Text>
                  <Checkbox
                    status={internalSelection.includes(id) ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setInternalSelection((prev) =>
                        prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
                      );
                    }}
                  />
                </View>
              )}
              ItemSeparatorComponent={Divider}
              estimatedItemSize={40}
              estimatedListSize={{
                height: deviceHeight,
                width: deviceWidth - VIRTUAL_LIST_SIZE_WIDTH,
              }}
            />
          </Select.Dialog>
        </Select>
      </View>
      <Divider tw={cn('w-full bg-gray-700', fieldError && 'bg-red-700 h-0.5')} />
    </View>
  );
}

function _useCropPricingPatcher() {
  const { getValues, setValue, watch } = FormManager.useFormManager();
  const { companyCrops } = DataAggregator.useDataAggregator();

  const [selectedCrops, priceType, commonPrice] = watch(['crops', 'priceType', 'price']);
  const previousCommonPriceRef = React.useRef<FormValues['price']>(commonPrice);

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
      previousCommonPrice: previousCommonPriceRef.current,
    });

    if (JSON.stringify(prevCropPricing) !== JSON.stringify(newCropPricing)) {
      setValue('cropSpecificPricing', newCropPricing);
    }

    // Update the ref after patching
    previousCommonPriceRef.current = commonPrice;
  }, 480);

  useEffect(_callback, [selectedCrops.length, priceType, commonPrice]);
}
