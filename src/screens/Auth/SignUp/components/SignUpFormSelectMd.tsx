import startCase from 'lodash/startCase';
import React, { useCallback, useState } from 'react';
import { GestureResponderEvent, ScrollView, View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Select } from '#ui/components/Select';
import { SignUpSchemaType } from '../SignUpCompany';
import { RadioButtonItem } from '#ui/components/RadioButton';

type SignUpFormSelectProps = {
  data: Array<string>;
  form: {
    fieldName: keyof SignUpSchemaType;
    currentValue?: string;
    required?: boolean;
    setCurrentValue: (val: string) => void;
  };
  isModalOpen: boolean;
  closeModal: () => void;
};

export function SignUpFormSelectMd({ data, form, isModalOpen, closeModal }: SignUpFormSelectProps) {
  const { fieldName, currentValue, required, setCurrentValue } = form;

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
          label={`${startCase(fieldName)}${required ? '*' : ''}`}
          currentValue={currentValue}
          minifyLabel
          isModalOpen={isModalOpen}
          content={{
            header: `Select a ${fieldName}`,
            footer: (
              <View tw="flex flex-row items-center justify-end">
                <Button mode="text" uppercase onPress={cancel}>
                  Cancel
                </Button>
                <Button mode="text" uppercase onPress={submit}>
                  OK
                </Button>
              </View>
            ),
            options: (
              <ScrollView>
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
      <Divider tw="w-full bg-gray-700 mt-2 my-2" />
    </View>
  );
}
