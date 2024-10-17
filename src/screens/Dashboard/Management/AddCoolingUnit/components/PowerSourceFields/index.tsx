import React, { useState } from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../../contexts/FormManager';
import { POWER_SOURCES, type PowerSourcesIds } from '../../constants';
import PowerSourceFactory from './components/PowerSourceFactory';

export default function PowerSourceFields() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const selectedPowerSource = watch('powerSource');
  const [internalSelection, setInternalSelection] = useState<PowerSourcesIds | null>(
    selectedPowerSource
  );

  const currentValue = selectedPowerSource ? POWER_SOURCES[selectedPowerSource] : '';

  const fieldError = !!formState.errors.powerSource;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="powerSource"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label={t('Dashboard.Management.AddCoolingUnit.fields.powerSource')}
                currentValue={currentValue}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                content={{
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) => setInternalSelection(value as PowerSourcesIds)}
                    >
                      {Object.keys(POWER_SOURCES).map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={POWER_SOURCES[option as PowerSourcesIds]}
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
                          setInternalSelection(selectedPowerSource);
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

      <PowerSourceFactory />
    </React.Fragment>
  );
}
