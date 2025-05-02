import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { EApiGender } from '#types/global';

import FormManager from '../components/FormManager';

const GENDER_LIST = Object.values(EApiGender);

export default function GenderField() {
  const { watch, setValue } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const selectedGender = watch('gender');

  const [internalSelection, setInternalSelection] = useState<EApiGender>(selectedGender);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const displayValue = selectedGender
    ? t(['Dashboard.Management.Operators.text', selectedGender])
    : '';

  return (
    <View tw="mt-5">
      <View tw="px-3">
        <Select
          variant="md"
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onDismiss={() => setInternalSelection(selectedGender)}
        >
          <Select.Touchable
            testID="gender-select"
            label={t('Dashboard.Management.Operators.text.gender')}
            displayValue={displayValue}
          />
          <Select.Dialog
            enableScroll
            header={t('Dashboard.Management.Operators.text.gender')}
            FooterElement={
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setIsModalOpen(false);
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
                    setIsModalOpen(false);
                    setValue('gender', internalSelection);
                  }}
                >
                  {t('actions.ok')}
                </Button>
              </View>
            }
          >
            <RadioButton.Group
              value={internalSelection}
              onValueChange={(value) => setInternalSelection(value as EApiGender)}
            >
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={GENDER_LIST}
                keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                renderItem={({ item }) => (
                  <RadioButtonItem
                    label={t(['Dashboard.Management.Operators.text', item])}
                    value={item}
                    tw="flex flex-row m-0 px-0 py-2 px-6 w-full"
                  />
                )}
              />
            </RadioButton.Group>
          </Select.Dialog>
        </Select>
      </View>
      <Divider tw="w-full bg-gray-700 mt-2 my-3" />
    </View>
  );
}
