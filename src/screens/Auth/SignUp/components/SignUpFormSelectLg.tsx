import { FlashList } from '@shopify/flash-list';
import startCase from 'lodash/startCase';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { Select } from '#ui/components/Select';
import { cn } from '#ui/lib/cn';

type SignUpFormSelectProps<T extends FieldValues> = {
  data: Array<string>;
  form: {
    control: Control<T>;
    fieldName: Path<T>;
    currentValue?: string;
    required?: boolean;
    error?: boolean;
  };
  isModalOpen: boolean;
  search: string;
  closeModal: () => void;
  setSearch: (val: string) => void;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export function SignUpFormSelectLg<T extends FieldValues>({
  data,
  form,
  isModalOpen,
  search,
  closeModal,
  setSearch,
}: SignUpFormSelectProps<T>) {
  const { control, fieldName, currentValue, required, error } = form;
  const { t } = useTranslationUtils();

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <View tw="mx-4">
            <Select
              variant="lg"
              error={error}
              label={`${startCase(fieldName)}${required ? '*' : ''}`}
              currentValue={currentValue}
              isModalOpen={isModalOpen}
              content={{
                header: t('Auth.SignUp.select.header', { fieldName }),
                options: (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput
                      tw="w-[85%] self-center bg-white rounded-sm my-2 h-12 border border-gray-600"
                      label={t('Auth.SignUp.select.label')}
                      onChangeText={(val) => setSearch(val)}
                      value={search}
                      left={<TextInput.Icon icon="magnify" />}
                    />
                    <FlashList
                      showsHorizontalScrollIndicator={false}
                      data={data}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          key={`${item}-${index}`}
                          onPress={() => {
                            onChange(item);
                            closeModal();
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
              onClick={closeModal}
            />
          </View>
        )}
        name={fieldName}
      />
      <Divider tw={cn('w-full bg-gray-700 my-3', error && 'bg-red-700 h-0.5')} />
    </View>
  );
}
