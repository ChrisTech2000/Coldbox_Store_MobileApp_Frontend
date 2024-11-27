import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
import { useController } from 'react-hook-form';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { EApiGender } from '#types/global';
import { cn } from '#ui/lib/cn';

import FormManager from '../components/FormManager';

const GENDERS_LIST = Object.values(EApiGender);

export default function GenderField() {
  const { control } = FormManager.useFormManager();

  const { t } = useTranslationUtils();

  const { field, fieldState } = useController({ name: 'gender', control });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [internalSelection, setInternalSelection] = useState<EApiGender>(field.value);

  const error = typeof fieldState.error !== 'undefined';

  return (
    <View tw="mt-5">
      <View tw="px-3 pb-2.5">
        <Select
          variant="md"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          onDismiss={() => setInternalSelection(field.value)}
        >
          <Select.Touchable
            label={t('Dashboard.Management.Operators.text.gender')}
            displayValue={t(['Dashboard.Management.Operators.text', field.value])}
          />
          <Select.Dialog
            enableScroll={false}
            header={t('Dashboard.Management.Operators.text.gender')}
            FooterElement={
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setIsModalVisible(false);
                    setInternalSelection(field.value);
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setIsModalVisible(false);
                    field.onChange(internalSelection);
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
                data={GENDERS_LIST}
                keyExtractor={(item, itemIdx) => `gender-option-${item}-#${itemIdx}`}
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
      <Divider tw={cn('w-full bg-gray-700', error && 'bg-red-700 h-0.5')} />
    </View>
  );
}
