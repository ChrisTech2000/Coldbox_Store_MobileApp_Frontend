import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useController } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager from '../contexts/FormManager';
import DataAggregator from '../contexts/DataAggregator';

export default function LocationField() {
  const { control } = FormManager.useFormManager();
  const { companyLocations } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  const { field, fieldState } = useController({ name: 'location', control });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<string | null>(
    field.value?.toString() ?? null
  );

  const fieldError = typeof fieldState.error !== 'undefined';

  return (
    <View tw="mt-5">
      <View tw="px-4 pb-2">
        <Select
          variant="md"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          onDismiss={() => setInternalSelection(field.value?.toString() ?? null)}
        >
          <Select.Touchable
            testID="location-select"
            label={`${t('Dashboard.Management.AddCoolingUnit.fields.location')}*`}
            displayValue={field.value ? companyLocations[field.value] : ''}
          />
          <Select.Dialog
            enableScroll
            header={t('Dashboard.Management.AddCoolingUnit.fields.location')}
            FooterElement={
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setIsModalVisible(false);
                    setInternalSelection(field.value?.toString() ?? null);
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setIsModalVisible(false);
                    const safeValue = internalSelection ? parseInt(internalSelection) : undefined;
                    if (typeof safeValue === 'number') field.onChange(safeValue);
                  }}
                >
                  {t('actions.ok')}
                </Button>
              </View>
            }
          >
            <RadioButton.Group
              value={internalSelection ?? ''}
              onValueChange={(value) => setInternalSelection(value)}
            >
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={Object.keys(companyLocations)}
                keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                renderItem={({ item }) => (
                  <RadioButtonItem
                    label={companyLocations[parseInt(item)]}
                    value={item}
                    tw="flex flex-row m-0 px-0 py-2 px-6 w-full"
                  />
                )}
              />
            </RadioButton.Group>
          </Select.Dialog>
        </Select>
      </View>
      <Divider tw={cn('w-full bg-gray-700', fieldError && 'bg-red-700 h-0.5')} />
    </View>
  );
}
