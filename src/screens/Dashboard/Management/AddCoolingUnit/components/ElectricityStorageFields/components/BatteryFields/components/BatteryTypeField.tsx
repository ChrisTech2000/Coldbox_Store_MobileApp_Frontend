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

import FormManager from '#screens/Dashboard/Management/AddCoolingUnit/contexts/FormManager';
import {
  BATTERY_TYPES,
  type BatteryTypes,
} from '#screens/Dashboard/Management/AddCoolingUnit/constants';

export default function BatteryTypeField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const selectedBatteryType = watch('batteryType', null);
  const [internalSelection, setInternalSelection] = useState<BatteryTypes | null>(
    selectedBatteryType
  );

  const currentValue = selectedBatteryType ? BATTERY_TYPES[selectedBatteryType] : '';

  const fieldError = !!formState.errors.batteryType;

  return (
    <React.Fragment>
      <Controller
        name="batteryType"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label={t('Dashboard.Management.AddCoolingUnit.fields.batteryType')}
                currentValue={truncate(currentValue, { length: 30 })}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                content={{
                  header: t('Dashboard.Management.AddCoolingUnit.fields.batteryType'),
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) => setInternalSelection(value as BatteryTypes)}
                    >
                      {Object.keys(BATTERY_TYPES).map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={BATTERY_TYPES[option as BatteryTypes]}
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
                          setInternalSelection(selectedBatteryType);
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
