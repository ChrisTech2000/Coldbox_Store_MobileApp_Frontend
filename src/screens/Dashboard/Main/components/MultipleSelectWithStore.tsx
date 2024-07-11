import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState, type SetStateAction } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { create } from 'zustand';

import { Button } from '#ui/components/Button';
import { CheckboxItem } from '#ui/components/Checkbox';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { useControlledState } from '#ui/hooks/useControlledState';

type SelectStore<T> = {
  selectedItems: T[];
  onSelect: (items: T[]) => void;
};

export const createMultipleSelectStore = <T,>() =>
  create<SelectStore<T>>((set) => ({
    selectedItems: [],
    onSelect: (items) => set({ selectedItems: items }),
  }));

type SelectItemProps<T> = {
  autoSelect?: boolean;
  datums: Array<T>;
  divider?: boolean;
  emptyMessage?: string;
  isModalVisible: boolean;
  label: string;
  modalHeader?: string;
  occupyFullWidth?: boolean;
  useSelectStore: ReturnType<typeof createMultipleSelectStore<T>>;
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
  itemName: (item: T) => string;
};

export default function MultipleSelectWithStore<T>({
  useSelectStore,
  ...rest
}: SelectItemProps<T>) {
  const store = useSelectStore();

  const [isModalVisible, setIsModalVisible] = useControlledState<boolean>(
    rest.isModalVisible,
    rest.setIsModalVisible
  );

  const [internalSelection, setInternalSelection] = useState<T[]>(store.selectedItems);

  useEffect(() => {
    if (!store.selectedItems.length && rest.autoSelect && rest.datums.length > 0) {
      const firstDatum = rest.datums[0];
      store.onSelect([firstDatum]);
      setInternalSelection([firstDatum]);
    }
  }, [rest.datums, store.selectedItems]);

  useFocusEffect(
    useCallback(() => {
      if (internalSelection.length !== store.selectedItems.length) {
        setInternalSelection(store.selectedItems);
      }
    }, [store.selectedItems])
  );

  const { t } = useTranslationUtils();

  if (!rest.datums.length && rest.emptyMessage) {
    return (
      <View tw={rest.occupyFullWidth ? 'w-full' : ''}>
        <Text variant="TextMedium" tw="text-base">
          {rest.emptyMessage}
        </Text>
        <Divider tw="bg-gray-600 my-1" />
      </View>
    );
  }

  const handleSelect = (item: T) => {
    if (internalSelection.includes(item)) {
      setInternalSelection(internalSelection.filter((selectedItem) => selectedItem !== item));
    } else {
      setInternalSelection([...internalSelection, item]);
    }
  };

  return (
    <View tw={rest.occupyFullWidth ? 'w-full' : ''}>
      <View tw="px-2">
        <Select
          variant="md"
          label={rest.label}
          isModalOpen={isModalVisible}
          onClick={() => setIsModalVisible(!isModalVisible)}
          content={{
            header: rest.modalHeader ?? '',
            options: (
              <FlatList
                data={rest.datums}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <CheckboxItem
                    label={rest.itemName(item)}
                    tw="flex flex-row-reverse ml-[-10]"
                    status={internalSelection.includes(item) ? 'checked' : 'unchecked'}
                    onPress={() => handleSelect(item)}
                  />
                )}
                nestedScrollEnabled
              />
            ),
            footer: (
              <View tw="flex flex-row items-center justify-end">
                <Button
                  mode="text"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    setInternalSelection(store.selectedItems);
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
                    store.onSelect(internalSelection);
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
