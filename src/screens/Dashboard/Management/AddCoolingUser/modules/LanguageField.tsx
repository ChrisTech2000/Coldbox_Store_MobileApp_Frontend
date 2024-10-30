import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { APP_LOCALES, type TranslationLocales } from '#i18n/constants';

import FormManager from '../components/FormManager';
import { cn } from '#ui/lib/cn';

type Props = {
  disabled?: boolean;
};

export default function LanguageField(props: Props) {
  const { watch, setValue } = FormManager.useFormManager();
  const { t, mutate: changeLanguage } = useTranslationUtils();

  const selectedLanguage = watch('language');

  const [isVisible, toggleVisibility] = useToggle(false);
  const [internalSelection, setInternalSelection] = useState<TranslationLocales>(selectedLanguage);

  return (
    <View tw="mt-6">
      <View tw="px-3">
        <Select
          disabled={props.disabled}
          variant="md"
          label={t('languages.label')}
          currentValue={t(['languages.options', selectedLanguage])}
          isModalOpen={isVisible}
          onClick={() => {
            setInternalSelection(selectedLanguage);
            toggleVisibility();
          }}
          content={{
            header: t('languages.label'),
            options: (
              <RadioButton.Group
                value={internalSelection}
                onValueChange={(value) => setInternalSelection(value as TranslationLocales)}
              >
                {Object.values(APP_LOCALES).map((option, optionIdx) => (
                  <RadioButtonItem
                    key={`${option}-${optionIdx}`}
                    label={t(['languages.options', option])}
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
                    setInternalSelection(selectedLanguage);
                    toggleVisibility();
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  mode="text"
                  uppercase
                  onPress={async (evt) => {
                    evt.stopPropagation();
                    setValue('language', internalSelection);
                    await changeLanguage(internalSelection);
                    toggleVisibility();
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
