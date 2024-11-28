import { FlashList } from '@shopify/flash-list';
import truncate from 'lodash/truncate';
import React, { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Select } from '#ui/components/Select';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { Company } from '#types/global';
import { Checkbox } from '#ui/components/Checkbox';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import MarketplaceFormManager, {
  type FilterValue,
  type FormValues,
} from '../modules/MarketplaceFormManager';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CompanyFilters() {
  const { t } = useTranslationUtils();

  const { control, watch, formState } = MarketplaceFormManager.useForm();
  const selectedCompanies = watch('companies');

  const { data, isLoading } = useApiCall(
    'getMarketplaceCompanyFilterOptions',
    async () => {
      const result = await ColdtivateService.getCompanies({ isMarketplace: true });
      return new Map<number, Company>(result?.map((item) => [item.id, item]));
    },
    undefined,
    { defaultData: new Map<number, Company>() }
  );

  const [search, setSearch] = useState<string>('');
  const [internalSelection, setInternalSelection] =
    MarketplaceFormManager.useFieldState('companies');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const displayValue = useMemo(() => {
    const names = Array.from(internalSelection)
      .slice(0, 2)
      .map((id) => data.get(id)?.name)
      .filter(Boolean);
    return names.length > 0 ? truncate(names.join(', '), { length: 24 }) : 'All';
  }, [internalSelection, data]);

  const fieldError = !!formState.errors.companies;

  const datums = useMemo(
    () =>
      Array.from(data.values()).filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  if (isLoading) {
    return (
      <View tw="h-[80%] pt-8">
        <ActivityIndicator size="small" color="gray" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="companies"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-4">
            <View tw="pb-2">
              <Select
                variant="lg"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedCompanies.map(({ value }) => value))}
              >
                <Select.Touchable label="Company" displayValue={displayValue} />
                <Select.Dialog
                  enableScroll
                  header="Select companies"
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
                            setInternalSelection(selectedCompanies.map(({ value }) => value));
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
                              const company = data.get(value);
                              if (typeof company === 'undefined') continue;
                              datums.push({ label: company.name, value });
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
                  <FlashList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={datums}
                    extraData={internalSelection}
                    keyExtractor={(item, itemIdx) =>
                      `company-list-item-${item.id}-${item.name}-#${itemIdx}`
                    }
                    renderItem={({ item }) => (
                      <View tw="w-full flex flex-row items-center justify-between px-4 py-2">
                        <Text tw="text-base w-[70%]" numberOfLines={2}>
                          {item.name}
                        </Text>
                        <Checkbox
                          status={internalSelection.includes(item.id) ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setInternalSelection((prev) => {
                              const isSelected = prev.includes(item.id);
                              return isSelected
                                ? prev.filter((id) => id !== item.id)
                                : [...prev, item.id];
                            });
                          }}
                        />
                      </View>
                    )}
                    ItemSeparatorComponent={Divider}
                    estimatedItemSize={40}
                    estimatedListSize={{
                      height: deviceHeight,
                      width: deviceWidth / 2,
                    }}
                  />
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
