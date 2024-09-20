import React, { useCallback, useEffect, useState, type SetStateAction } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
import { create } from 'zustand';
import { useFocusEffect } from '@react-navigation/native';

import { Select } from '#ui/components/Select';
import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';

import { useControlledState } from '#ui/hooks/useControlledState';
import { useTranslationUtils } from '#i18n/utils';

export type SelectStore<T> = {
  selectedItem: T | null;
  onSelect: (item: T | null) => void;
};

export const createSelectStore = <T,>(initialState?: T) =>
  create<SelectStore<T>>((set) => ({
    selectedItem: initialState ?? null,
    onSelect: (item) => set({ selectedItem: item }),
  }));

type SelectItemProps<T> = {
  autoSelect?: boolean;
  datums: Array<T>;
  divider?: boolean;
  disabled?: boolean;
  emptyMessage?: string;
  isModalVisible: boolean;
  label: string;
  modalHeader?: string;
  occupyFullWidth?: boolean;
  useSelectStore: ReturnType<typeof createSelectStore<T>>;
  useScrollView?: boolean;
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
  itemName: (item: T) => string;
};

export default function SelectWithStore<T>({
  useSelectStore,
  useScrollView = true,
  ...rest
}: SelectItemProps<T>) {
  const store = useSelectStore();

  const [isModalVisible, setIsModalVisible] = useControlledState<boolean>(
    rest.isModalVisible,
    rest.setIsModalVisible
  );

  const [internalSelection, setInternalSelection] = useState<T | null>(store.selectedItem);

  useEffect(() => {
    if (!rest.datums.length && store.selectedItem) {
      setInternalSelection(null);
      store.onSelect(null);
    }

    if (!store.selectedItem && rest.autoSelect && rest.datums.length > 0) {
      const firstDatum = rest.datums[0];
      store.onSelect(firstDatum);
      setInternalSelection(firstDatum);
    }
  }, [rest.datums, store.selectedItem]);

  useFocusEffect(
    useCallback(() => {
      if (
        internalSelection &&
        rest.itemName(internalSelection) !== rest.itemName(store.selectedItem as T)
      ) {
        setInternalSelection(store.selectedItem);
      }
    }, [store.selectedItem])
  );

  const { t } = useTranslationUtils();

  if (!rest.datums.length && rest.emptyMessage) {
    return (
      <View tw={rest.occupyFullWidth ? 'w-full' : ''}>
        <Text variant="TextMedium" tw="text-base pl-2">
          {rest.emptyMessage}
        </Text>
        <Divider tw="bg-gray-600 my-1" />
      </View>
    );
  }

  return (
    <View tw={rest.occupyFullWidth ? 'w-full' : ''}>
      <View tw="px-2">
        <Select
          variant="md"
          label={rest.label}
          isModalOpen={isModalVisible}
          onClick={() => setIsModalVisible(!isModalVisible)}
          useScrollView={useScrollView}
          disabled={rest.disabled}
          content={{
            header: rest.modalHeader ?? '',
            options: (
              <RadioButton.Group
                value={internalSelection ? rest.itemName(internalSelection) : ''}
                onValueChange={(value) => {
                  const item = rest.datums.find((datum) => rest.itemName(datum) === value);
                  if (!item) return;
                  setInternalSelection(item);
                }}
              >
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={rest.datums}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item }) => (
                    <RadioButtonItem
                      label={rest.itemName(item)}
                      value={rest.itemName(item)}
                      tw="flex flex-row-reverse ml-[-10]"
                    />
                  )}
                  nestedScrollEnabled
                />
              </RadioButton.Group>
            ),
            footer: (
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setInternalSelection(store.selectedItem);
                    setIsModalVisible(!isModalVisible);
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    if (internalSelection) store.onSelect(internalSelection);
                    setIsModalVisible(!isModalVisible);
                  }}
                >
                  {t('actions.ok')}
                </Button>
              </View>
            ),
          }}
        />
      </View>
      {rest.divider && <Divider tw="bg-gray-600 my-1" />}
    </View>
  );
}
