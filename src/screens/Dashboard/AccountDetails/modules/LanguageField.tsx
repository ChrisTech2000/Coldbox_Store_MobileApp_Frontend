import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
import { useController } from 'react-hook-form';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { APP_LOCALES, type TranslationLocales } from '#i18n/constants';

import FormManager from '../components/FormManager';
import { FlatList } from 'react-native';

const LANGUAGES_LIST = Object.values(APP_LOCALES);

export default function LanguageField() {
  const { control } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const { field } = useController({ name: 'language', control });

  const [internalSelection, setInternalSelection] = useState<TranslationLocales>(field.value);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <View tw="mt-4">
      <View tw="mx-4">
        <Select
          variant="md"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          onDismiss={() => setInternalSelection(field.value)}
        >
          <Select.Touchable
            label={t('languages.label')}
            displayValue={t(['languages.options', field.value])}
          />
          <Select.Dialog
            enableScroll
            header={t('languages.label')}
            FooterElement={
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setInternalSelection(field.value);
                    setIsModalVisible(false);
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  mode="text"
                  uppercase
                  onPress={async (evt) => {
                    evt.stopPropagation();
                    field.onChange(internalSelection);
                    setIsModalVisible(false);
                  }}
                >
                  {t('actions.ok')}
                </Button>
              </View>
            }
          >
            <RadioButton.Group
              value={internalSelection}
              onValueChange={(value) => setInternalSelection(value as TranslationLocales)}
            >
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={LANGUAGES_LIST}
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
      <Divider tw="w-full bg-gray-700 mt-3" />
    </View>
  );
}
