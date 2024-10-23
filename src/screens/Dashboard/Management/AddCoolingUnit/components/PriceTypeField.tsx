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
import { PRICING_TYPE } from '../constants';

export default function PriceTypeField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const selectedPriceTypeId = watch('priceType');
  const [internalSelection, setInternalSelection] = useState<string | null>(
    selectedPriceTypeId ?? null
  );

  const currentValue = selectedPriceTypeId
    ? t(['Dashboard.Management.AddCoolingUnit.pricing', selectedPriceTypeId])
    : '';

  const fieldError = !!formState.errors.priceType;

  return (
    <React.Fragment>
      <Controller<FormValues>
        name="priceType"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label={`${t('Dashboard.Management.AddCoolingUnit.pricing.label')}*`}
                currentValue={truncate(currentValue, { length: 16 })}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                content={{
                  header: t('Dashboard.Management.AddCoolingUnit.pricing.label'),
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) => setInternalSelection(value)}
                    >
                      {Object.values(PRICING_TYPE).map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={t(['Dashboard.Management.AddCoolingUnit.pricing', option])}
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
                          setInternalSelection(selectedPriceTypeId);
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
