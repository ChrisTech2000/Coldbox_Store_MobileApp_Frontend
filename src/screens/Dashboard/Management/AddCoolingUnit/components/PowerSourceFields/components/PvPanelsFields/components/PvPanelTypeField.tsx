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
  PV_PANELS_TYPES,
  type PvPanelsTypes,
} from '#screens/Dashboard/Management/AddCoolingUnit/constants';

export default function PvPanelTypeField() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const [isVisible, toggleVisibility] = useToggle(false);

  const selectedPvPanelType = watch('pvPanelType', null);
  const [internalSelection, setInternalSelection] = useState<PvPanelsTypes | null>(
    selectedPvPanelType
  );

  const currentValue = selectedPvPanelType ? PV_PANELS_TYPES[selectedPvPanelType] : '';

  const fieldError = !!formState.errors.pvPanelType;

  return (
    <React.Fragment>
      <Controller
        name="pvPanelType"
        control={control}
        render={({ field: { onChange } }) => (
          <View tw="mt-5">
            <View tw="pl-4 pr-2 pb-1.5">
              <Select
                variant="md"
                label={t('Dashboard.Management.AddCoolingUnit.fields.pvPanelType')}
                currentValue={truncate(currentValue, { length: 30 })}
                isModalOpen={isVisible}
                onClick={toggleVisibility}
                content={{
                  header: t('Dashboard.Management.AddCoolingUnit.fields.pvPanelType'),
                  options: (
                    <RadioButton.Group
                      value={internalSelection ?? ''}
                      onValueChange={(value) => setInternalSelection(value as PvPanelsTypes)}
                    >
                      {Object.keys(PV_PANELS_TYPES).map((option, optionIdx) => (
                        <RadioButtonItem
                          key={`${option}-${optionIdx}`}
                          label={PV_PANELS_TYPES[option as PvPanelsTypes]}
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
                          setInternalSelection(selectedPvPanelType);
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
