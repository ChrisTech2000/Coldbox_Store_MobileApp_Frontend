import { FlashList } from '@shopify/flash-list';
import truncate from 'lodash/truncate';
import React, { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Select, VIRTUAL_LIST_SIZE_WIDTH } from '#ui/components/Select';
import { Text } from '#ui/components/Text';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { GetAllCropsResponse } from '#types/api.responses';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import MarketplaceFormManager, {
  FilterValue,
  type FormValues,
} from '../modules/MarketplaceFormManager';
import LoadingConditionalRenderer from '../modules/LoadingConditionalRenderer';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CropTypeFilters() {
  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const locale = LanguageManager.read();
  const { t } = useTranslationUtils();

  const { control, watch, formState } = MarketplaceFormManager.useForm();
  const selectedCrops = watch('crops');

  const { data, isLoading } = useApiCall(
    'getMarketplaceCropFilterOptions',
    async () => {
      const result = await ColdtivateService.getAllCrops();
      return new Map<number, GetAllCropsResponse>(result.map((item) => [item.id, item]));
    },
    undefined,
    { defaultData: new Map<number, GetAllCropsResponse>() }
  );

  const translatedCropNames = useMemo(() => {
    const { buildMap, find } = cropTranslationLookup();
    const lookupMap = buildMap();
    const translatedCropNames: Record<number, string> = {};
    for (const [key, value] of data) {
      if (!translatedCropNames[key]) {
        translatedCropNames[key] = find(lookupMap, {
          name: value.name,
          country: companyCountry || farmerCountry || '',
          locale,
        });
      }
    }
    return translatedCropNames;
  }, [data, companyCountry, locale]);

  const [search, setSearch] = useState<string>('');
  const [internalSelection, setInternalSelection] = MarketplaceFormManager.useFieldState('crops');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const displayValue = useMemo(() => {
    const cropNames = internalSelection
      .slice(0, 2)
      .map((cropId) => data.get(cropId)?.name)
      .filter(Boolean);
    return cropNames.length > 0 ? truncate(cropNames.join(', '), { length: 20 }) : t('actions.all');
  }, [internalSelection, data, t]);

  const fieldError = !!formState.errors.crops;

  const sortedData = useMemo(
    () =>
      Array.from(data.values()).sort((a, b) => {
        const nameA = translatedCropNames[a.id] || a.name;
        const nameB = translatedCropNames[b.id] || b.name;
        return nameA.toLowerCase().localeCompare(nameB.toLowerCase());
      }),
    [data, translatedCropNames]
  );

  const datums = useMemo(
    () => sortedData.filter((crop) => crop.name.toLowerCase().includes(search.toLowerCase())),
    [sortedData, search]
  );

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="crops"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-4">
            <View tw="pb-2">
              <Select
                variant="lg"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedCrops.map(({ value }) => value))}
              >
                <Select.Touchable
                  label={t('Dashboard.Marketplace.Filters.cropTypeLabel')}
                  displayValue={displayValue}
                />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.Marketplace.Filters.cropTypeHeading')}
                  StickyHeaderElement={
                    <View tw="px-4 py-3">
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
                          ? 'w-full flex flex-row items-center justify-end'
                          : 'items-center'
                      }
                    >
                      <View
                        tw={cn(
                          'flex flex-row items-center justify-end w-1/2',
                          deviceHeight <= SMALL_SCREEN_THRESHOLD && 'space-x-2 w-full'
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
                          'flex flex-row items-center justify-end w-1/2',
                          deviceHeight <= SMALL_SCREEN_THRESHOLD && 'space-x-2 w-full'
                        )}
                      >
                        <Button
                          mode="text"
                          uppercase
                          onPress={(evt) => {
                            evt.stopPropagation();
                            setInternalSelection(selectedCrops.map(({ value }) => value));
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
                            const datums: Array<FilterValue> = [];
                            for (const value of internalSelection) {
                              const crop = data.get(value);
                              if (typeof crop === 'undefined') continue;
                              datums.push({ label: crop.name, value });
                            }
                            onChange(datums);
                            setIsModalVisible(false);
                          }}
                        >
                          {t('actions.ok')}
                        </Button>
                      </View>
                    </View>
                  }
                >
                  <LoadingConditionalRenderer
                    isLoading={isLoading}
                    fallback={
                      <View tw="h-96">
                        <ActivityIndicator
                          tw="pt-8"
                          size={26}
                          color={paperTheme.colors.backdrop}
                          animating
                        />
                      </View>
                    }
                  >
                    <FlashList
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      data={datums}
                      extraData={{ internalSelection, translatedCropNames }}
                      keyExtractor={(item, itemIdx) => `crops-list-item-${item.id}-#${itemIdx}`}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          tw="w-full flex flex-row items-center justify-between px-4 py-2"
                          onPress={() => {
                            setInternalSelection((prev) =>
                              prev.includes(item.id)
                                ? prev.filter((id) => id !== item.id)
                                : [...prev, item.id]
                            );
                          }}
                          activeOpacity={0.7}
                        >
                          <Text tw="text-base w-[70%]" numberOfLines={2}>
                            {translatedCropNames?.[item.id] || ''}
                          </Text>
                          <Checkbox
                            status={internalSelection.includes(item.id) ? 'checked' : 'unchecked'}
                          />
                        </TouchableOpacity>
                      )}
                      ItemSeparatorComponent={Divider}
                      estimatedItemSize={40}
                      estimatedListSize={{
                        height: deviceHeight,
                        width: deviceWidth - VIRTUAL_LIST_SIZE_WIDTH,
                      }}
                    />
                  </LoadingConditionalRenderer>
                </Select.Dialog>
              </Select>
            </View>
            <Divider tw={cn('w-full bg-gray-700', fieldError && 'bg-red-700 h-0.5')} />
          </View>
        )}
      />
    </React.Fragment>
  );
}
