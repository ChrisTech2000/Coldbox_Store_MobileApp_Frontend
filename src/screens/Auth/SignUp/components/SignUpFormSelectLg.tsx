import React, { useState } from 'react';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import startCase from 'lodash/startCase';

import { Select } from '#ui/components/Select';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

type Props<T extends FieldValues> = {
  items: Array<string>;
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  search: string;
  testID?: string;
  setSearch: (val: string) => void;
  onValueChange?: (prev: string | undefined, next: string) => void;
  computedDisplayValue?: (value: string) => string;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export function SignUpFormSelectLg<T extends FieldValues>(props: Props<T>) {
  const { items, name, control, required, label, search, setSearch, computedDisplayValue } = props;

  const { field, fieldState } = useController({ name, control, rules: { required } });
  const { t } = useTranslationUtils();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const error = typeof fieldState.error !== 'undefined';

  return (
    <View>
      <Select variant="lg" isOpen={isModalOpen} onOpenChange={setIsModalOpen} error={error}>
        <Select.Touchable
          testID={props.testID}
          label={required ? `${startCase(label)}*` : startCase(label)}
          displayValue={computedDisplayValue?.(field.value) || field.value || ''}
        />
        <Select.Dialog
          enableScroll
          header={t('Auth.SignUp.select.header', { fieldName: label })}
          StickyHeaderElement={
            <View tw="px-6 py-3">
              <TextInput
                tw="bg-white rounded-sm h-12 border border-gray-600"
                label={t('Auth.SignUp.select.label')}
                onChangeText={(val) => setSearch(val)}
                value={search}
                left={<TextInput.Icon icon="magnify" />}
              />
            </View>
          }
        >
          <FlashList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={(item, itemIdx) => `${item}-${itemIdx}`}
            renderItem={({ item }) => (
              <List.Item
                title={item}
                tw="px-2 py-2 m-0"
                onPress={(evt) => {
                  evt.stopPropagation();
                  field.onChange(item);
                  props.onValueChange?.(field.value, item);
                  setIsModalOpen(false);
                }}
              />
            )}
            ItemSeparatorComponent={Divider}
            estimatedItemSize={40}
            estimatedListSize={{
              height: deviceHeight,
              width: deviceWidth / 2,
            }}
          />
        </Select.Dialog>
      </Select>
      <Divider tw={cn('w-full bg-gray-700 my-3', error && 'bg-red-700 h-0.5')} />
    </View>
  );
}
