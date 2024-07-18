import React, { useState } from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Divider, RadioButton, TextInput } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

import FormManager, { type FormValues } from '../contexts/FormManager';
import { REFRIGERANTS } from '../constants';

export default function RefrigerantFields() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const selectedRefrigerantType = watch('refrigerantType');
  const [internalSelection, setInternalSelection] = useState<string | null>(
    selectedRefrigerantType ?? null
  );

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="refrigerantType"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label="Type of refrigerant used"
                currentValue={selectedRefrigerantType}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                content={{
                  header: 'Type of refrigerant used',
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) => setInternalSelection(value)}
                    >
                      {REFRIGERANTS.map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={option}
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
                          setInternalSelection(selectedRefrigerantType);
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
            <Divider
              tw={cn('w-full bg-gray-700', !!errors.refrigerantType && 'bg-red-700 h-0.5')}
            />
          </View>
        )}
      />

      <Controller
        name="amountRefrigerant"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Amount of refrigerant"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.amountRefrigerant}
            right={<TextInput.Affix text="kg" />}
          />
        )}
      />
    </React.Fragment>
  );
}
