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

import FormManager, { type FormValues } from '../contexts/FormManager';
import { COOLING_UNIT_TYPES } from '../constants';

export default function UnitTypeField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [internalSelection, setInternalSelection] = useState<string | null>(null);

  const selectedUnitTypeId = watch('coolingUnitType');
  const currentValue = selectedUnitTypeId
    ? t(['Dashboard.Management.AddCoolingUnit.coolingUnitTypes', selectedUnitTypeId])
    : '';

  const fieldError = !!formState.errors.coolingUnitType;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="coolingUnitType"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label="What describes the cooling unit best?"
                currentValue={truncate(currentValue, { length: 16 })}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                content={{
                  header: 'What describes the cooling unit best?',
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) => setInternalSelection(value)}
                    >
                      {Object.values(COOLING_UNIT_TYPES).map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={t([
                            'Dashboard.Management.AddCoolingUnit.coolingUnitTypes',
                            option,
                          ])}
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
                          setInternalSelection(selectedUnitTypeId);
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
                          if (typeof internalSelection === 'string') {
                            onChange(internalSelection);
                          }
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
