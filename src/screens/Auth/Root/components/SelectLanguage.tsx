import React, { useCallback, useState } from 'react';
import { type GestureResponderEvent, View } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { RadioButtonItem } from '#ui/components/RadioButton';
import { Select } from '#ui/components/Select';

import { APP_LOCALES, type TranslationLocales } from '#i18n/constants';
import { useTranslationUtils } from '#i18n/utils';
import { mmkv } from '#stores/lib/storage';

const LANGUAGE_OPTIONS = Object.values(APP_LOCALES) as Array<TranslationLocales>;

export function SelectLanguage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<TranslationLocales>(
    (mmkv.getString('i18n-locale') ?? APP_LOCALES.ENGLISH) as TranslationLocales
  );
  const [selectedLanguage, setSelectedLanguage] = useState<TranslationLocales>(activeLanguage);

  const { mutate, t } = useTranslationUtils();

  const doLanguageUpdate = useCallback(
    async (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setActiveLanguage(selectedLanguage);
      setIsModalOpen(false);
      await mutate(selectedLanguage);
    },
    [selectedLanguage]
  );

  const cancelLanguageUpdate = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setSelectedLanguage(activeLanguage);
      setIsModalOpen(false);
    },
    [activeLanguage]
  );

  return (
    <View tw="mt-8">
      <Select
        label={t(['languages.options', activeLanguage])}
        isModalOpen={isModalOpen}
        onClick={() => setIsModalOpen(!isModalOpen)}
        content={{
          header: t('languages.label'),
          options: (
            <RadioButton.Group
              value={selectedLanguage}
              onValueChange={(value) => setSelectedLanguage(value as TranslationLocales)}
            >
              {LANGUAGE_OPTIONS.map((option, optionIdx) => (
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
              <Button mode="text" uppercase onPress={cancelLanguageUpdate}>
                {t('actions.cancel')}
              </Button>
              <Button mode="text" uppercase onPress={doLanguageUpdate}>
                {t('actions.ok')}
              </Button>
            </View>
          ),
        }}
      />
    </View>
  );
}
