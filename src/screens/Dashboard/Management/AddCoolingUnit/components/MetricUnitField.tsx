import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useController } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';
import truncate from 'lodash/truncate';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager from '../contexts/FormManager';
import { METRIC_UNITS } from '../constants';

const UNITS_LIST = Object.values(METRIC_UNITS);

export default function MetricUnitField() {
  const { control } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const { field, fieldState } = useController({ name: 'metricUnit', control });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<string | null>(field.value ?? null);

  const displayValue = field.value
    ? t(['Dashboard.Management.AddCoolingUnit.metricUnit', field.value])
    : '';

  const fieldError = typeof fieldState.error !== 'undefined';

  return (
    <View tw="mt-5">
      <View tw="px-4 pb-2">
        <Select
          variant="md"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          onDismiss={() => setInternalSelection(field.value ?? null)}
        >
          <Select.Touchable
            label={`${t('Dashboard.Management.AddCoolingUnit.metricUnit.label')}*`}
            displayValue={truncate(displayValue, { length: 16 })}
          />
          <Select.Dialog
            header={t('Dashboard.Management.AddCoolingUnit.metricUnit.label')}
            FooterElement={
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setIsModalVisible(false);
                    setInternalSelection(field.value ?? null);
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
                    if (typeof internalSelection === 'string') {
                      field.onChange(internalSelection);
                    }
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
                data={UNITS_LIST}
                keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                renderItem={({ item }) => (
                  <RadioButtonItem
                    label={t(['Dashboard.Management.AddCoolingUnit.metricUnit', item])}
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
