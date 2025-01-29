import React, { useCallback, useState } from 'react';
import { type GestureResponderEvent, View, FlatList } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

import { RadioButtonItem } from '#ui/components/RadioButton';
import { Select } from '#ui/components/Select';

import { APP_LOCALES, type TranslationLocales } from '#i18n/constants';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';

const LANGUAGE_OPTIONS = Object.values(APP_LOCALES) as Array<TranslationLocales>;

export function SelectLanguage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<TranslationLocales>(LanguageManager.read());
  const [selectedLanguage, setSelectedLanguage] = useState<TranslationLocales>(activeLanguage);

  const { mutate, t } = useTranslationUtils();

  const doLanguageUpdate = useCallback(
    async (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setActiveLanguage(selectedLanguage);
      setIsModalOpen(false);
      await mutate(selectedLanguage);
    },
    [selectedLanguage, setActiveLanguage, mutate]
  );

  const cancelLanguageUpdate = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setSelectedLanguage(activeLanguage);
      setIsModalOpen(false);
    },
    [activeLanguage, setSelectedLanguage]
  );

  return (
    <View tw="mt-8">
      <Select
        variant="sm"
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onDismiss={() => setSelectedLanguage(activeLanguage)}
      >
        <Select.Touchable label={t(['languages.options', activeLanguage])} />
        <Select.Dialog
          enableScroll
          header={t('languages.label')}
          FooterElement={
            <View tw="flex flex-row items-center justify-end">
              <Button mode="text" uppercase onPress={cancelLanguageUpdate}>
                {t('actions.cancel')}
              </Button>
              <Button mode="text" uppercase onPress={doLanguageUpdate}>
                {t('actions.ok')}
              </Button>
            </View>
          }
        >
          <RadioButton.Group
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value as TranslationLocales)}
          >
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={LANGUAGE_OPTIONS}
              keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
              renderItem={({ item }) => (
                <RadioButtonItem
                  label={t(['languages.options', item])}
                  value={item}
                  tw="flex flex-row m-0 px-0 py-2 px-6 w-full"
                />
              )}
            />
          </RadioButton.Group>
        </Select.Dialog>
      </Select>
    </View>
  );
}
