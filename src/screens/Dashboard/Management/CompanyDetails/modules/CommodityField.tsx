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
import type { GetAllCropsResponse } from '#types/api.responses';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../components/FormManager';

type Props = {
  crops: Array<GetAllCropsResponse>;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function CommodityField(props: Props) {
  const { crops } = props;

  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [search, setSearch] = useState<string>('');

  const selectedCommodities = watch('commodities');
  const [internalSelection, setInternalSelection] = useState<Array<number>>(selectedCommodities);

  const datums = useMemo(
    () => crops.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const selectLabel = useMemo(() => {
    const selectedOptions = datums
      .filter((option) => selectedCommodities.includes(option.id))
      .slice(0, 2)
      .map((option) => truncate(option.name, { length: 7 }));
    return selectedOptions.length > 0 ? selectedOptions.join(', ') : '';
  }, [datums, selectedCommodities]);

  const fieldError = !!formState.errors.commodities;

  return (
    <View tw="mb-2">
      <Controller<FormValues>
        name="commodities"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mx-4">
            <Select
              variant="lg"
              label={t('Dashboard.Management.CompanyDetails.labels.commodity')}
              currentValue={selectLabel}
              isModalOpen={isVisible}
              onClick={() => {
                setInternalSelection(selectedCommodities);
                toggleVisibility();
              }}
              enableScroll={false}
              content={{
                header: t('Dashboard.Management.CompanyDetails.headings.commodity'),
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
                    renderItem={({ item, index }) => (
                      <React.Fragment>
                        <View
                          key={`commodity-item-${item.id}-#${index}`}
                          tw="w-full flex flex-row items-center justify-between px-4 py-2"
                        >
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
                    <Button
                      mode="text"
                      uppercase
                      onPress={(evt) => {
                        evt.stopPropagation();
                        setInternalSelection(datums.map(({ id }) => id));
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
                    <Button
                      mode="text"
                      uppercase
                      onPress={(evt) => {
                        evt.stopPropagation();
                        setInternalSelection(selectedCommodities);
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
                ),
              }}
            />
          </View>
        )}
      />
      <Divider tw={cn('w-full bg-gray-700 my-3', fieldError && 'bg-red-700 h-0.5')} />
    </View>
  );
}
