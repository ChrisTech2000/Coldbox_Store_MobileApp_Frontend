import React, { useMemo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import truncate from 'lodash/truncate';

import { Select, VIRTUAL_LIST_SIZE_WIDTH } from '#ui/components/Select';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import type { CoolingUnit } from '#types/global';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { cn } from '#ui/lib/cn';
import { Text } from '#ui/components/Text';
import { Checkbox } from '#ui/components/Checkbox';
import { paperTheme } from '#ui/lib/theme';

import MarketplaceFormManager, {
  type FilterValue,
  type FormValues,
} from '../modules/MarketplaceFormManager';
import LoadingConditionalRenderer from '../modules/LoadingConditionalRenderer';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CoolingUnitFilters() {
  const { t } = useTranslationUtils();

  const { control, watch, formState } = MarketplaceFormManager.useForm();
  const selectedCoolingUnits = watch('coolingUnits');

  const { data, isLoading } = useApiCall(
    'getMarketplaceCoolingUnitFilterOptions',
    async () => {
      const result = await ColdtivateService.getCoolingUnits({});
      return new Map<number, CoolingUnit>(result?.map((item) => [item.id, item]));
    },
    undefined,
    { defaultData: new Map<number, CoolingUnit>() }
  );

  const [search, setSearch] = useState<string>('');
  const [internalSelection, setInternalSelection] =
    MarketplaceFormManager.useFieldState('coolingUnits');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const displayValue = useMemo(() => {
    const selectedUnits = Array.from(internalSelection)
      .slice(0, 2)
      .map((unitId) => data.get(unitId)?.name)
      .filter(Boolean);
    return selectedUnits.length > 0
      ? truncate(selectedUnits.join(', '), { length: 24 })
      : t('actions.all');
  }, [internalSelection, data, t]);

  const fieldError = !!formState.errors.coolingUnits;

  const datums = useMemo(
    () =>
      Array.from(data.values()).filter((unit) =>
        unit.name.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="coolingUnits"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-4">
            <View tw="pb-2">
              <Select
                variant="lg"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() =>
                  setInternalSelection(selectedCoolingUnits.map(({ value }) => value))
                }
              >
                <Select.Touchable
                  label={t('Dashboard.Marketplace.Filters.coolingUnitLabel')}
                  displayValue={displayValue}
                />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.Marketplace.Filters.coolingUnitHeading')}
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
                            setInternalSelection(selectedCoolingUnits.map(({ value }) => value));
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
                              const unit = data.get(value);
                              if (typeof unit === 'undefined') continue;
                              datums.push({ label: unit.name, value });
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
                      extraData={internalSelection}
                      keyExtractor={(item, itemIdx) =>
                        `cooling-unit-list-item-${item.id}-#${itemIdx}`
                      }
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
                            {item.name}
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
