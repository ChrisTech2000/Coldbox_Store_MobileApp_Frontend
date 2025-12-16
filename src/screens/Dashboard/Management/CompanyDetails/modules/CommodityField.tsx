import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { useController } from 'react-hook-form';
import { FlashList } from '@shopify/flash-list';
import truncate from 'lodash/truncate';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Select, VIRTUAL_LIST_SIZE_WIDTH } from '#ui/components/Select';
import { Text } from '#ui/components/Text';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { GetAllCropsResponse } from '#types/api.responses';
import { cn } from '#ui/lib/cn';

import FormManager from '../components/FormManager';

type Props = {
  crops: Array<GetAllCropsResponse>;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function CommodityField(props: Props) {
  const { crops } = props;

  const { control } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const { field, fieldState } = useController({ name: 'commodities', control });

  const [search, setSearch] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [internalSelection, setInternalSelection] = useState<Array<number>>(field.value);

  const locale = LanguageManager.read();
  const sortedData = useMemo(
    () => crops.sort((a, b) => a.name.localeCompare(b.name, locale, { sensitivity: 'base' })),
    [crops, locale]
  );

  const datums = useMemo(
    () => sortedData.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [sortedData, search]
  );

  const displayValue = useMemo(() => {
    const selectedOptions = datums
      .filter((option) => field.value.includes(option.id))
      .slice(0, 2)
      .map((option) => truncate(option.name, { length: 7 }));
    return selectedOptions.length > 0 ? selectedOptions.join(', ') : '';
  }, [datums, field.value]);

  const fieldError = typeof fieldState.error !== 'undefined';

  return (
    <View tw="mb-2">
      <Select variant="lg" isOpen={isModalVisible} onOpenChange={setIsModalVisible}>
        <Select.Touchable
          label={t('Dashboard.Management.CompanyDetails.labels.commodity')}
          displayValue={displayValue}
        />
        <Select.Dialog
          enableScroll
          header={t('Dashboard.Management.CompanyDetails.headings.commodity')}
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
                  setIsModalVisible(false);
                }}
              >
                {t('actions.ok')}
              </Button>
            </View>
          }
        >
          <FlashList
            scrollEnabled={false}
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
                      setInternalSelection((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((id) => id !== item.id)
                          : [...prev, item.id]
                      );
                    }}
                  />
                </View>
                <Divider />
              </React.Fragment>
            )}
            estimatedItemSize={40}
            estimatedListSize={{
              height: deviceHeight,
              width: deviceWidth - VIRTUAL_LIST_SIZE_WIDTH,
            }}
          />
        </Select.Dialog>
      </Select>
      <Divider tw={cn('w-full bg-gray-700 my-3', fieldError && 'bg-red-700 h-0.5')} />
    </View>
  );
}
