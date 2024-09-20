import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Checkbox, Divider, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import truncate from 'lodash/truncate';

import { Select } from '#ui/components/Select';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import type { CoolingUnit } from '#types/global';
import { useToggle } from '#ui/hooks/useToggle';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { cn } from '#ui/lib/cn';

import MarketplaceFormManager, { type FormValues } from '../modules/MarketplaceFormManager';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CoolingUnitFilters() {
  const { t } = useTranslationUtils();

  const { control, watch, formState } = MarketplaceFormManager.useForm();
  const selectedCoolingUnits = watch('coolingUnits');

  const { data } = useApiCall(
    'getMarketplaceCoolingUnitFilterOptions',
    async () => {
      const result = await ColdtivateService.getCoolingUnits({});
      return new Map<number, CoolingUnit>(result?.map((item) => [item.id, item]));
    },
    undefined,
    { defaultData: new Map<number, CoolingUnit>() }
  );

  const [isVisible, toggleVisibility] = useToggle(false);
  const [search, setSearch] = useState<string>('');
  const [internalSelection, setInternalSelection] = useState<Array<number>>(selectedCoolingUnits);

  const currentValue = useMemo(() => {
    const names: Array<string> = [];
    for (const unitId of internalSelection) {
      if (names.length >= 2) break;
      const unit = data.get(unitId);
      if (typeof unit === 'undefined') continue;
      names.push(unit.name);
    }
    return names.length > 0 ? truncate(names.join(', '), { length: 24 }) : 'All';
  }, [data, selectedCoolingUnits]);

  const fieldError = !!formState.errors.coolingUnits;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="coolingUnits"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-4">
            <View tw="pr-0.5 pb-1.5">
              <Select
                variant="lg"
                label="Cooling unit"
                currentValue={currentValue}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                useScrollView={false}
                content={{
                  header: 'Select cooling units',
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
                      data={Array.from(data.values())}
                      keyExtractor={(item, itemIdx) =>
                        `cooling-unit-list-item-${item.id}-#${itemIdx}`
                      }
                      renderItem={({ item }) => (
                        <View>
                          <Checkbox.Item
                            label={item.name}
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
                            setInternalSelection(selectedCoolingUnits);
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
