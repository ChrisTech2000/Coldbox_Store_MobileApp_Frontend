import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FlatList, View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { GetAllCropsResponse } from '#types/api.responses';
import { useTranslationUtils } from '#i18n/utils';

import { Text } from '#ui/components/Text';
import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Input } from '#ui/components/Input';

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

  return (
    <View tw="space-y-1 my-2">
      <View tw="flex flex-row justify-between items-center">
        <Text variant="TextMedium" tw="text-base">
          {option.label}
        </Text>
        {option.id === 'cropType' ? (
          <Controller
            name={`produces.${index}.crop`}
            control={control}
            render={({ field }) => (
              <Select variant="md" isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <Select.Touchable label={field.value} />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.History.editCheckIn.selectCropLabel')}
                >
                  <RadioButton.Group
                    value={field.value || ''}
                    onValueChange={(value) => {
                      const item = crops.find((crop) => crop.name === value);
                      if (!item) return;
                      field.onChange(item.name);
                      setIsModalOpen(false);
                    }}
                  >
                    <FlatList
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      data={crops}
                      keyExtractor={(item, idx) => `rb-${item.name}-${idx}-${index}`}
                      renderItem={({ item }) => (
                        <RadioButtonItem
                          label={item.name}
                          value={item.name}
                          tw="flex flex-row m-0 px-0 py-2 px-6 w-full"
                        />
                      )}
                    />
                  </RadioButton.Group>
                </Select.Dialog>
              </Select>
            )}
          />
        ) : option.id === 'plannedDays' ? (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                tw="w-24 items-end text-base bg-transparent rounded-sm h-12 truncate"
                onChangeText={onChange}
                keyboardType="number-pad"
                value={value}
              />
            )}
            name={`produces.${index}.plannedDays`}
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
