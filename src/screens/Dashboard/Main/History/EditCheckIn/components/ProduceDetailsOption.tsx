import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FlatList, View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { GetAllCropsResponse } from '#types/api.responses';
import { useTranslationUtils } from '#i18n/utils';

import { Text } from '#ui/components/Text';
import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { Schema } from '../schema';

type ProduceDetailsOptionProps = {
  option: { label?: string; id?: string; value?: string | number };
  index: number;
  crops: Array<GetAllCropsResponse>;
  control: Control<Schema>;
};

export function ProduceDetailsOption({ option, index, crops, control }: ProduceDetailsOptionProps) {
  const { t } = useTranslationUtils();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  console.log(index);
  return (
    <View tw="space-y-1 my-2">
      <View tw="flex flex-row justify-between items-center">
        <Text variant="TextMedium" tw="text-base">
          {option.label}
        </Text>
        {option.id === 'cropType' ? (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  variant="md"
                  label={value}
                  isModalOpen={isModalOpen}
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                  content={{
                    header: t('Dashboard.History.editCheckIn.selectCropLabel'),
                    options: (
                      <RadioButton.Group
                        value={value ?? ''}
                        onValueChange={(value) => {
                          const item = crops.find((crop) => crop.name === value);
                          if (!item) return;
                          console.log(value, index);
                          onChange(item.name);
                          setIsModalOpen(false);
                        }}
                      >
                        <FlatList
                          data={crops}
                          keyExtractor={(item, idx) => `${item.name}-${idx}-${index}`}
                          renderItem={({ item }) => (
                            <RadioButtonItem
                              label={item.name}
                              value={item.name}
                              tw="flex flex-row-reverse ml-[-10]"
                            />
                          )}
                          nestedScrollEnabled
                        />
                      </RadioButton.Group>
                    ),
                  }}
                />
              );
            }}
            name={`produces.${index}.crop`}
          />
        ) : (
          <Text variant="TextMedium" tw="text-base text-gray-400">
            {option.value ?? '-'}
          </Text>
        )}
      </View>
      <Divider />
    </View>
  );
}
