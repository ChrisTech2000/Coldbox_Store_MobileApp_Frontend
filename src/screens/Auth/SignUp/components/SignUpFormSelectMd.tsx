import startCase from 'lodash/startCase';
import React, { useCallback, useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { GestureResponderEvent, ScrollView, View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Select } from '#ui/components/Select';
import { cn } from '#ui/lib/cn';

type SignUpFormSelectProps<T extends FieldValues> = {
  data: Array<string>;
  form: {
    fieldName: Path<T>;
    currentValue?: string;
    error?: boolean;
    required?: boolean;
    setCurrentValue: (val: string) => void;
  };
  isModalOpen: boolean;
  closeModal: () => void;
};

export function SignUpFormSelectMd<T extends FieldValues>({
  data,
  form,
  isModalOpen,
  closeModal,
}: SignUpFormSelectProps<T>) {
  const { t } = useTranslationUtils();
  const { fieldName, currentValue, required, setCurrentValue, error } = form;

  const [selectedValue, setSelectedValue] = useState<string>('');

  const submit = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setCurrentValue(selectedValue);
      closeModal();
    },
    [selectedValue, closeModal]
  );

  const cancel = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setSelectedValue('');
      closeModal();
    },
    [closeModal]
  );

  return (
    <View tw="mt-2">
      <View tw="w-full px-4 mb-1">
        <Select
          variant="md"
          error={error}
          label={`${startCase(fieldName)}${required ? '*' : ''}`}
          currentValue={currentValue}
          isModalOpen={isModalOpen}
          content={{
            header: t('Auth.SignUp.select.header', { fieldName }),
            footer: (
              <View tw="flex flex-row items-center justify-end">
                <Button mode="text" uppercase onPress={cancel}>
                  {t('Auth.SignUp.select.cancel')}
                </Button>
                <Button mode="text" uppercase onPress={submit}>
                  {t('Auth.SignUp.select.ok')}
                </Button>
              </View>
            ),
            options: (
              <ScrollView showsVerticalScrollIndicator={false}>
                <RadioButton.Group
                  value={selectedValue}
                  onValueChange={(value) => setSelectedValue(value)}
                >
                  {data.map((val, index) => (
                    <RadioButtonItem
                      key={`${val}-${index}`}
                      label={val}
                      value={val}
                      tw="flex flex-row-reverse ml-[-10]"
                    />
                  ))}
                </RadioButton.Group>
              </ScrollView>
            ),
          }}
          onClick={closeModal}
        />
      </View>
      <Divider tw={cn('w-full bg-gray-700 mt-2 my-2', error && 'bg-red-700 h-0.5')} />
    </View>
  );
}
