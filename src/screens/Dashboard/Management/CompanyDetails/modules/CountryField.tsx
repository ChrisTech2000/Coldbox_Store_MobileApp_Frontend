import React, { useMemo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, List, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';

import { Select } from '#ui/components/Select';
import { ScrollView } from '#ui/components/ScrollView';

import { useToggle } from '#ui/hooks/useToggle';
import { customCountrySort } from '#screens/Auth/SignUp/utils';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../components/FormManager';

import { countriesDict } from '../utils';

const countriesMeta = countriesDict();

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CountryField() {
  const { control, watch, formState } = FormManager.useFormManager();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [search, setSearch] = useState<string>('');

  const selectedCountry = countriesMeta.getValueByISO(watch('country'));
  const datums = useMemo(
    () =>
      countriesMeta
        .values()
        .filter((value) => value.toLowerCase().includes(search.toLowerCase()))
        .sort(customCountrySort),
    [search]
  );

  const fieldError = !!formState.errors.country;

  return (
    <View tw="mb-2">
      <Controller<FormValues>
        name="country"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mx-4">
            <Select
              variant="lg"
              label="Country"
              currentValue={selectedCountry}
              isModalOpen={isVisible}
              onClick={toggleVisibility}
              content={{
                header: 'Select a country',
                options: (
                  <ScrollView>
                    <TextInput
                      tw="w-[85%] self-center bg-white rounded-sm my-2 h-12 border border-gray-600"
                      label="Search..."
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
                            const countryISO = countriesMeta.getISOByValue(item);
                            if (countryISO) onChange(countryISO);
                            toggleVisibility();
                          }}
                        >
                          <List.Item title={item} />
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
      <Divider tw={cn('w-full bg-gray-700 my-3', fieldError && 'bg-red-700 h-0.5')} />
    </View>
  );
}
