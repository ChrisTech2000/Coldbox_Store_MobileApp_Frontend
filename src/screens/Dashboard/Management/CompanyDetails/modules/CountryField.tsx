import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useController } from 'react-hook-form';
import { Divider, List, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';

import { Select, VIRTUAL_LIST_SIZE_WIDTH } from '#ui/components/Select';

import { useTranslationUtils } from '#i18n/utils';
import { customCountrySort } from '#screens/Auth/SignUp/utils';
import { cn } from '#ui/lib/cn';

import FormManager from '../components/FormManager';

import { countriesDict } from '../utils';

const countriesMeta = countriesDict();

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function CountryField() {
  const { control } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const { field, fieldState } = useController({ name: 'country', control });

  const [search, setSearch] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const selectedCountry = countriesMeta.getNameByISO(field.value);
  const datums = useMemo(
    () =>
      countriesMeta
        .values()
        .filter((value) => value.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => customCountrySort(a.name, b.name)),
    [search]
  );

  const fieldError = typeof fieldState.error !== 'undefined';

  return (
    <View tw="mb-2">
      <Select variant="lg" isOpen={isModalVisible} onOpenChange={setIsModalVisible}>
        <Select.Touchable
          label={t('Dashboard.Management.CompanyDetails.labels.country')}
          displayValue={selectedCountry}
        />
        <Select.Dialog
          enableScroll
          header={t('Dashboard.Management.CompanyDetails.headings.country')}
          StickyHeaderElement={
            <View tw="px-6 py-3">
              <TextInput
                tw="bg-white rounded-sm h-12 border border-gray-600"
                label={t('Auth.SignUp.select.label')}
                onChangeText={(val) => setSearch(val)}
                value={search}
                left={<TextInput.Icon icon="magnify" />}
              />
            </View>
          }
        >
          <FlashList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={datums}
            keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                tw="px-2 py-2 m-0"
                onPress={(evt) => {
                  evt.stopPropagation();
                  const datum = countriesMeta.getISOByName(item.name);
                  if (datum) field.onChange(datum);
                  setIsModalVisible(false);
                }}
              />
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
      <Divider tw={cn('w-full bg-gray-700 my-3', fieldError && 'bg-red-700 h-0.5')} />
    </View>
  );
}
