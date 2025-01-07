import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useController } from 'react-hook-form';
import { Divider, List, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';

import { Select, VIRTUAL_LIST_SIZE_WIDTH } from '#ui/components/Select';

import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { customCountrySort } from '#screens/Auth/SignUp/utils';
import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';

const countriesMeta = countriesDict();

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function CountryField() {
  const { control } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const { field } = useController({ name: 'country', control });

  const [search, setSearch] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const selectedCountry = countriesMeta.getByValue(field.value)?.name;
  const datums = useMemo(
    () =>
      countriesMeta
        .values()
        .filter((value) => value.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => customCountrySort(a.name, b.name)),
    [search]
  );

  return (
    <React.Fragment>
      <Select
        variant="lg"
        isOpen={isModalVisible}
        onOpenChange={setIsModalVisible}
        onDismiss={() => setSearch('')}
      >
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
                  const countryISO = countriesMeta.getISOByName(item.name);
                  if (countryISO) field.onChange(countryISO);
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
      <Divider tw="w-full bg-gray-700 mt-3" />
    </React.Fragment>
  );
}
