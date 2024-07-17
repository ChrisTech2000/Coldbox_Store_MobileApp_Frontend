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

import FormManager, { type FormValues } from '../contexts/FormManager';
import DataAggregator from '../contexts/DataAggregator';

export default function LocationField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { companyLocations } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);
  const [internalSelection, setInternalSelection] = useState<string | null>(null);

  const selectedLocationId = watch('location');
  const currentValue = selectedLocationId ? companyLocations[selectedLocationId] : '';
  const fieldError = !!formState.errors.location;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="location"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label="Location"
                currentValue={currentValue}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                content={{
                  header: 'Location',
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) => setInternalSelection(value)}
                    >
                      {Object.keys(companyLocations).map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={companyLocations[parseInt(option)]}
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
                          setInternalSelection(selectedLocationId?.toString() ?? null);
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
                          const safeValue = internalSelection
                            ? parseInt(internalSelection)
                            : undefined;
                          if (typeof safeValue === 'number') onChange(safeValue);
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
