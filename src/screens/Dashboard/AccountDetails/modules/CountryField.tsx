import React, { useMemo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, List, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';

import { Select } from '#ui/components/Select';
import { ScrollView } from '#ui/components/ScrollView';

import { useToggle } from '#ui/hooks/useToggle';
import { customCountrySort } from '#screens/Auth/SignUp/utils';
import { useTranslationUtils } from '#i18n/utils';

import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';

import FormManager, { type FormValues } from '../components/FormManager';

const countriesMeta = countriesDict();

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CountryField() {
  const { control, watch } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [search, setSearch] = useState<string>('');

  const selectedCountry = countriesMeta.getByValue(watch('country'))?.name;
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
      <Controller<FormValues>
        name="country"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mx-4">
            <Select
              variant="lg"
              label={t('Dashboard.Management.CompanyDetails.labels.country')}
              currentValue={selectedCountry}
              isModalOpen={isVisible}
              onClick={toggleVisibility}
              content={{
                header: t('Dashboard.Management.CompanyDetails.headings.country'),
                options: (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput
                      tw="w-[85%] self-center bg-white rounded-sm my-2 h-12 border border-gray-600"
                      label={t('actions.search')}
                      value={search}
                      onChangeText={(val) => setSearch(val)}
                      left={<TextInput.Icon icon="magnify" />}
                    />
                    <FlashList
                      data={datums}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          key={`country-list-item-${item}-#${index}`}
                          onPress={() => {
                            const countryISO = countriesMeta.getISOByName(item.name);
                            if (countryISO) onChange(countryISO);
                            toggleVisibility();
                          }}
                        >
                          <List.Item title={item.name} />
                          <Divider tw="mx-4" />
                        </TouchableOpacity>
                      )}
                      estimatedItemSize={40}
                      estimatedListSize={{
                        height: deviceHeight,
                        width: deviceWidth / 2,
                      }}
                    />
                  </ScrollView>
                ),
              }}
            />
          </View>
        )}
      />
      <Divider tw="w-full bg-gray-700 mt-3" />
    </React.Fragment>
  );
}
