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

import FormManager from '../../../contexts/FormManager';
import { THERMAL_STORAGE_TYPES, type ThermalStorageTypes } from '../../../constants';

export default function ThermalStorageField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const selectedThermalStorage = watch('thermalStorageMethod', null);
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
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label="Thermal storage method"
                currentValue={truncate(currentValue, { length: 30 })}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                content={{
                  header: 'Thermal storage method',
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) => setInternalSelection(value as ThermalStorageTypes)}
                    >
                      {Object.keys(THERMAL_STORAGE_TYPES).map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={THERMAL_STORAGE_TYPES[option as ThermalStorageTypes]}
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
    </React.Fragment>
  );
}
