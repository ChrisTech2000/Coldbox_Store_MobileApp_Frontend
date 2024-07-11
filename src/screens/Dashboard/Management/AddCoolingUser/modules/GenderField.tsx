import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { EApiGender } from '#types/global';
import { cn } from '#ui/lib/cn';

import FormManager from '../components/FormManager';

type Props = {
  disabled: boolean;
};

export default function GenderField(props: Props) {
  const { watch, setValue } = FormManager.useFormManager();

  const { t } = useTranslationUtils();
  const [isModalVisible, toggleModalVisibility] = useToggle();

  const selectedGender = watch('gender');
  const [internalSelection, setInternalSelection] = useState<EApiGender>(selectedGender);

  return (
    <View tw="mt-5">
      <View tw="px-3">
        <Select
          disabled={props.disabled}
          variant="md"
          label={t('Dashboard.Management.Operators.text.gender')}
          currentValue={t(['Dashboard.Management.Operators.text', selectedGender])}
          isModalOpen={isModalVisible}
          onClick={toggleModalVisibility}
          content={{
            header: t('Dashboard.Management.Operators.text.gender'),
            options: (
              <RadioButton.Group
                value={internalSelection}
                onValueChange={(value) => setInternalSelection(value as EApiGender)}
              >
                {Object.values(EApiGender).map((value, optionIdx) => (
                  <RadioButtonItem
                    key={`gender-option-${value}-#${optionIdx}`}
                    label={t(['Dashboard.Management.Operators.text', value])}
                    value={value}
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
                    toggleModalVisibility();
                    setInternalSelection(selectedGender);
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    toggleModalVisibility();
                    setValue('gender', internalSelection);
                  }}
                >
                  {t('actions.ok')}
                </Button>
              </View>
            ),
          }}
        />
      </View>
      <Divider tw={cn('w-full bg-gray-700 mt-2 my-3', props.disabled && 'bg-gray-300')} />
    </View>
  );
}
