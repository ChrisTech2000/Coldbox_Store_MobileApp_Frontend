import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';
import truncate from 'lodash/truncate';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager from '../../../contexts/FormManager';
import { THERMAL_STORAGE_TYPES, type ThermalStorageTypes } from '../../../constants';

const STORAGE_LIST = Object.keys(THERMAL_STORAGE_TYPES);

export default function ThermalStorageField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const selectedThermalStorage = watch('thermalStorageMethod', null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<ThermalStorageTypes | null>(
    selectedThermalStorage
  );

  const currentValue = selectedThermalStorage ? THERMAL_STORAGE_TYPES[selectedThermalStorage] : '';

  const fieldError = !!formState.errors.thermalStorageMethod;

  return (
    <React.Fragment>
      <Controller
        name="thermalStorageMethod"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="px-4 pb-2">
              <Select
                variant="md"
                isOpen={isModalVisible}
                onOpenChange={setIsModalVisible}
                onDismiss={() => setInternalSelection(selectedThermalStorage)}
              >
                <Select.Touchable
                  label={t('Dashboard.Management.AddCoolingUnit.fields.thermalStorageMethod')}
                  displayValue={truncate(currentValue, { length: 30 })}
                />
                <Select.Dialog
                  enableScroll
                  header={t('Dashboard.Management.AddCoolingUnit.fields.thermalStorageMethod')}
                  FooterElement={
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          setIsModalVisible(false);
                          setInternalSelection(selectedThermalStorage);
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
                          onChange(internalSelection);
                        }}
                      >
                        {t('actions.ok')}
                      </Button>
                    </View>
                  }
                >
                  <RadioButton.Group
                    value={internalSelection ?? ''}
                    onValueChange={(value) => setInternalSelection(value as ThermalStorageTypes)}
                  >
                    <FlatList
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      data={STORAGE_LIST}
                      keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                      renderItem={({ item }) => (
                        <RadioButtonItem
                          label={THERMAL_STORAGE_TYPES[item as ThermalStorageTypes]}
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
        )}
      />
    </React.Fragment>
  );
}
