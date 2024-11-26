import React, { useCallback, useState } from 'react';
import { View, type GestureResponderEvent, FlatList } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { Select } from '#ui/components/Select';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { EApiGender } from '#types/global';

import FormManager from '../components/FormManager';
import { useController } from 'react-hook-form';

const GENDER_LIST = Object.values(EApiGender);

export default function GenderField() {
  const { control } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const { field } = useController({ name: 'gender', control });

  const [internalSelection, setInternalSelection] = useState<EApiGender>(field.value);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onCancel = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setIsModalVisible(false);
      setInternalSelection(field.value);
    },
    [field.value]
  );

  const onSave = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setIsModalVisible(false);
      field.onChange(internalSelection);
    },
    [field, internalSelection]
  );

  return (
    <View tw="mt-5">
      <View tw="px-3">
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
                <Button mode="text" uppercase onPress={onCancel}>
                  {t('actions.cancel')}
                </Button>
                <Button mode="text" uppercase onPress={onSave}>
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
      <Divider tw="w-full bg-gray-700 mt-2" />
    </View>
  );
}
