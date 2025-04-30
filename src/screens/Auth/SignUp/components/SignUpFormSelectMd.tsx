import React, { useCallback, useState } from 'react';
import { type GestureResponderEvent, View, FlatList } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
import { type FieldValues, useController, type Path, type Control } from 'react-hook-form';
import startCase from 'lodash/startCase';

import { Select } from '#ui/components/Select';
import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { type TranslationPaths, useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

type Props<T extends FieldValues> = {
  items: Array<string>;
  name: Path<T>;
  label: string;
  control: Control<T>;
  required?: boolean;
  enableScroll?: boolean;
  testID?: string;
  translateItemLabel?: (item: string) => TranslationPaths;
};

export function SignUpFormSelectMd<T extends FieldValues>(props: Props<T>) {
  const { items, name, label, control, required, enableScroll = true } = props;

  const { field, fieldState } = useController({ name, control, rules: { required } });
  const { t } = useTranslationUtils();

  const safeSelectedValue = field.value || '';

  const [selectedValue, setSelectedValue] = useState<string>(safeSelectedValue);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const submit = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      field.onChange(selectedValue);
      setIsModalOpen((state) => !state);
    },
    [selectedValue, field]
  );

  const cancel = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setSelectedValue(safeSelectedValue);
      setIsModalOpen((state) => !state);
    },
    [safeSelectedValue]
  );

  const error = typeof fieldState.error !== 'undefined';
  const selectedValuePath = props?.translateItemLabel?.(field.value);

  return (
    <View tw="mt-2">
      <View tw="w-full px-4 mb-1">
        <Select
          variant="md"
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          error={error}
          onDismiss={() => setSelectedValue(field.value)}
        >
          <Select.Touchable
            testID={props.testID}
            label={required ? `${startCase(label)}*` : startCase(label)}
            displayValue={selectedValuePath ? t(selectedValuePath) : safeSelectedValue}
          />
          <Select.Dialog
            enableScroll={enableScroll}
            header={t('Auth.SignUp.select.header', { fieldName: label })}
            FooterElement={
              <View tw="flex flex-row items-center justify-end">
                <Button mode="text" uppercase onPress={cancel}>
                  {t('Auth.SignUp.select.cancel')}
                </Button>
                <Button mode="text" uppercase onPress={submit}>
                  {t('Auth.SignUp.select.ok')}
                </Button>
              </View>
            }
          >
            <RadioButton.Group
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
            >
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={items}
                keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
                renderItem={({ item }) => {
                  const itemPath = props?.translateItemLabel?.(item);
                  const safeItemValue = item || '';
                  return (
                    <RadioButtonItem
                      label={itemPath ? t(itemPath) : safeItemValue}
                      value={safeItemValue}
                      tw="flex flex-row m-0 px-0 py-2 px-6 w-full"
                    />
                  );
                }}
              />
            </RadioButton.Group>
          </Select.Dialog>
        </Select>
      </View>
      <Divider tw={cn('w-full bg-gray-700 mt-2 my-2', error && 'bg-red-700 h-0.5')} />
    </View>
  );
}
