import { FlashList } from '@shopify/flash-list';
import truncate from 'lodash/truncate';
import React, { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { GetAllCropsResponse } from '#types/api.responses';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';

import MarketplaceFormManager, {
  FilterValue,
  type FormValues,
} from '../modules/MarketplaceFormManager';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CropTypeFilters() {
  const { t } = useTranslationUtils();

  const { control, watch, formState } = MarketplaceFormManager.useForm();
  const selectedCrops = watch('crops');

  const { data } = useApiCall(
    'getMarketplaceCropFilterOptions',
    async () => {
      const result = await ColdtivateService.getAllCrops();
      return new Map<number, GetAllCropsResponse>(result?.map((item) => [item.id, item]));
    },
    undefined,
    { defaultData: new Map<number, GetAllCropsResponse>() }
  );

  const [isVisible, toggleVisibility] = useToggle(false);
  const [search, setSearch] = useState<string>('');
  const [internalSelection, setInternalSelection] = MarketplaceFormManager.useFieldState('crops');

  const currentValue = useMemo(() => {
    const names: Array<string> = [];
    for (const cropId of internalSelection) {
      if (names.length >= 2) break;
      const crop = data.get(cropId);
      if (typeof crop === 'undefined') continue;
      names.push(crop.name);
    }
    return names.length > 0 ? truncate(names.join(', '), { length: 20 }) : 'All';
  }, [internalSelection, data]);

  const fieldError = !!formState.errors.crops;

  const datums = useMemo(
    () =>
      Array.from(data.values()).filter((crop) =>
        crop.name.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="crops"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-4">
            <View tw="pr-0.5 pb-1.5">
              <Select
                variant="lg"
                label="Produce / Crop Type"
                currentValue={currentValue}
                isModalOpen={isVisible}
                onClick={() => {
                  setInternalSelection(selectedCrops.map(({ value }) => value));
                  toggleVisibility();
                }}
                useScrollView={false}
                content={{
                  header: 'Select crops',
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
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={datums}
                      extraData={internalSelection}
                      keyExtractor={(item, itemIdx) => `crops-list-item-${item.id}-#${itemIdx}`}
                      renderItem={({ item }) => (
                        <View>
                          <View tw="w-full flex flex-row items-center justify-between px-4 py-2">
                            <Text tw="text-base w-[70%]" numberOfLines={2}>
                              {item.name}
                            </Text>
                            <Checkbox
                              status={internalSelection.includes(item.id) ? 'checked' : 'unchecked'}
                              onPress={() => {
                                setInternalSelection((prev) => {
                                  const clone = [...prev];
                                  const idx = clone.indexOf(item.id);
                                  if (idx === -1) clone.push(item.id);
                                  else clone.splice(idx, 1);
                                  return clone;
                                });
                              }}
                            />
                          </View>
                          <Divider />
                        </View>
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
                            setInternalSelection(Array.from(data.keys()));
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
                            setInternalSelection(selectedCrops.map(({ value }) => value));
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
                            const datums: Array<FilterValue> = [];
                            for (const value of internalSelection) {
                              const crop = data.get(value);
                              if (typeof crop === 'undefined') continue;
                              datums.push({ label: crop.name, value });
                            }
                            onChange(datums);
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
