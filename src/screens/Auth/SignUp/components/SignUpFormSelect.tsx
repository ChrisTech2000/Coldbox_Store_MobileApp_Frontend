import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { SignUpSchemaType } from '../SignUpCompany';
import startCase from 'lodash/startCase';

type SignUpFormSelectProps = {
  data: Array<string>;
  form: {
    control: Control<SignUpSchemaType>;
    fieldName: keyof SignUpSchemaType;
    currentValue?: string;
    required?: boolean;
  };
  isModalOpen: boolean;
  search: string;
  closeModal: () => void;
  setSearch: (val: string) => void;
};

export function SignUpFormSelect({
  data,
  form,
  isModalOpen,
  search,
  closeModal,
  setSearch,
}: SignUpFormSelectProps) {
  const { control, fieldName, currentValue, required } = form;

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
              label={`${startCase(fieldName)}${required ? '*' : ''}`}
              currentValue={currentValue}
              isModalOpen={isModalOpen}
              content={{
                header: `Select a ${fieldName}`,
                options: (
                  <ScrollView>
                    <TextInput
                      tw="w-[85%] self-center bg-white rounded-sm my-2 h-12 border border-gray-600"
                      label={'Search...'}
                      onChangeText={(val) => setSearch(val)}
                      value={search}
                      left={<TextInput.Icon icon="magnify" />}
                    />
                    <FlashList
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
                      estimatedItemSize={data.length}
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
      <Divider tw="w-full bg-gray-700 my-2" />
    </View>
  );
}
