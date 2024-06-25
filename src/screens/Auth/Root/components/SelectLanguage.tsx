import React, { useState, useCallback } from 'react';
import { type GestureResponderEvent, View } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { APP_LANGUAGES, type TranslationLocales } from '#i18n/constants';
import { onLanguageChange, LanguageStorage } from '#i18n/utils';

const languages = Object.keys(APP_LANGUAGES) as Array<TranslationLocales>;

export function SelectLanguage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<TranslationLocales>(LanguageStorage.read());
  const [selectedLanguage, setSelectedLanguage] = useState<TranslationLocales>(activeLanguage);

  const doLanguageUpdate = useCallback(
    async (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setActiveLanguage(selectedLanguage);
      setIsModalOpen(false);
      await onLanguageChange(selectedLanguage);
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
        label={APP_LANGUAGES[activeLanguage].label}
        isModalOpen={isModalOpen}
        onClick={() => setIsModalOpen(!isModalOpen)}
        content={{
          header: 'Language',
          options: (
            <RadioButton.Group
              value={selectedLanguage}
              onValueChange={(value) => setSelectedLanguage(value as TranslationLocales)}
            >
              {languages.map((lang, index) => (
                <RadioButtonItem
                  key={`${lang}-${index}`}
                  label={APP_LANGUAGES[lang].label}
                  value={APP_LANGUAGES[lang].value}
                  tw="flex flex-row-reverse ml-[-10]"
                />
              ))}
            </RadioButton.Group>
          ),
          footer: (
            <View tw="flex flex-row items-center justify-end">
              <Button mode="text" uppercase onPress={cancelLanguageUpdate}>
                Cancel
              </Button>
              <Button mode="text" uppercase onPress={doLanguageUpdate}>
                OK
              </Button>
            </View>
          ),
        }}
      />
    </View>
  );
}
