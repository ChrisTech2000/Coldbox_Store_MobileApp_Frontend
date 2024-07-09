import React, { useMemo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, List, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';

import { Select } from '#ui/components/Select';
import { ScrollView } from '#ui/components/ScrollView';

import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';
import { useTranslationUtils } from '#i18n/utils';

import FormManager, { type FormValues } from '../components/FormManager';

import { currenciesDict } from '../utils';

const currenciesMeta = currenciesDict();

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default function CurrencyField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [search, setSearch] = useState<string>('');

  const selectedCurrent = currenciesMeta.getValueByCode(watch('currency'));
  const datums = useMemo(
    () =>
      currenciesMeta.values().filter((value) => value.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const fieldError = !!formState.errors.country;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="currency"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mx-4">
            <Select
              variant="lg"
              label={t('Dashboard.Management.CompanyDetails.labels.currency')}
              currentValue={selectedCurrent}
              isModalOpen={isVisible}
              onClick={toggleVisibility}
              content={{
                header: t('Dashboard.Management.CompanyDetails.headings.currency'),
                options: (
                  <ScrollView>
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
                          key={`currency-list-item-${item}-#${index}`}
                          onPress={() => {
                            const currencyCode = currenciesMeta.getCodeByName(item);
                            if (currencyCode) onChange(currencyCode);
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
    </React.Fragment>
  );
}
