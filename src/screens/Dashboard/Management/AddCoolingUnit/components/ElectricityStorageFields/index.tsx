import React, { useState } from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';
import truncate from 'lodash/truncate';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../../contexts/FormManager';
import { ELECTRICITY_STORAGE, type ElectricityStorageIds } from '../../constants';
import StorageFactory from './components/StorageFactory';

export default function ElectricityStorageFields() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const selectedStorageSystem = watch('electricityStorageSystem');
  const [internalSelection, setInternalSelection] = useState<ElectricityStorageIds | null>(
    selectedStorageSystem
  );

  const currentValue = selectedStorageSystem ? ELECTRICITY_STORAGE[selectedStorageSystem] : '';

  const fieldError = !!formState.errors.electricityStorageSystem;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="electricityStorageSystem"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label={t('Dashboard.Management.AddCoolingUnit.fields.electricityStorageSystem')}
                currentValue={truncate(currentValue, { length: 25 })}
                isModalOpen={isVisible}
                onClick={() => {
                  toggleVisibility();
                  setInternalSelection(selectedStorageSystem);
                }}
                content={{
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) =>
                        setInternalSelection(value as ElectricityStorageIds)
                      }
                    >
                      {Object.keys(ELECTRICITY_STORAGE).map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={ELECTRICITY_STORAGE[option as ElectricityStorageIds]}
                          value={option}
                          tw="flex flex-row-reverse ml-[-10]"
                        />
                      ))}
                    </RadioButton.Group>
                  ),
                  footer: (
                    <View tw="flex flex-row items-center justify-end">
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          toggleVisibility();
                          setInternalSelection(selectedStorageSystem);
                        }}
                      >
                        {t('actions.cancel')}
                      </Button>
                      <Button
                        mode="text"
                        uppercase
                        onPress={(evt) => {
                          evt.stopPropagation();
                          toggleVisibility();
                          onChange(internalSelection);
                        }}
                      >
                        {t('actions.ok')}
                      </Button>
                    </View>
                  ),
                }}
              />
            </View>
            <Divider tw={cn('w-full bg-gray-700', fieldError && 'bg-red-700 h-0.5')} />
          </View>
        )}
      />

      <StorageFactory />
    </React.Fragment>
  );
}
