import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState, type SetStateAction } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { create } from 'zustand';

import { Button } from '#ui/components/Button';
import { CheckboxItem } from '#ui/components/Checkbox';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import { useControlledState } from '#ui/hooks/useControlledState';
import { cn } from '#ui/lib/cn';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';

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
  autoSelectAll?: boolean;
  datums: Array<T>;
  disableOnEmpty?: boolean;
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

const screenHeight = Dimensions.get('window').height;

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

  const { t } = useTranslationUtils();

  const handleSelect = useCallback(
    (item: T) => {
      const itemKey = rest.itemName(item);
      if (internalSelection.some((selectedItem) => rest.itemName(selectedItem) === itemKey)) {
        setInternalSelection(
          internalSelection.filter((selectedItem) => rest.itemName(selectedItem) !== itemKey)
        );
      } else {
        setInternalSelection([...internalSelection, item]);
      }
    },
    [rest.itemName, internalSelection]
  );

  useEffect(() => {
    if (
      !store.selectedItems.length &&
      (rest.autoSelect || rest.autoSelectAll) &&
      rest.datums.length > 0
    ) {
      if (rest.autoSelectAll) {
        store.onSelect(rest.datums);
        setInternalSelection(rest.datums);
      } else {
        const firstDatum = rest.datums[0];
        store.onSelect([firstDatum]);
        setInternalSelection([firstDatum]);
      }
    }
  }, [rest.datums, store.selectedItems]);

  useFocusEffect(
    useCallback(() => {
      if (internalSelection.length !== store.selectedItems.length) {
        setInternalSelection(store.selectedItems);
      }
    }, [store.selectedItems])
  );

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
                showsVerticalScrollIndicator={false}
                data={rest.datums}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => {
                  return (
                    <CheckboxItem
                      label={rest.itemName(item)}
                      tw="flex flex-row-reverse ml-[-10]"
                      status={
                        internalSelection.some(
                          (selectedItem) => rest.itemName(selectedItem) === rest.itemName(item)
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => handleSelect(item)}
                    />
                  );
                }}
                nestedScrollEnabled
              />
            ),
            footer: (
              <View
                tw={
                  screenHeight > SMALL_SCREEN_THRESHOLD
                    ? 'flex flex-row items-center justify-end'
                    : 'items-center'
                }
              >
                <View
                  tw={cn(
                    'flex flex-row items-center',
                    screenHeight <= SMALL_SCREEN_THRESHOLD && 'space-x-2'
                  )}
                >
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setInternalSelection(rest.datums);
                    }}
                  >
                    {t('actions.all')}
                  </Button>
                  <Button
                    mode="text"
                    uppercase
                    onPress={(evt) => {
                      evt.stopPropagation();
                      setInternalSelection([]);
                    }}
                  >
                    {t('actions.none')}
                  </Button>
                </View>
                <View
                  tw={cn(
                    'flex flex-row items-center',
                    screenHeight <= SMALL_SCREEN_THRESHOLD && 'space-x-2'
                  )}
                >
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
                    disabled={rest.disableOnEmpty && !internalSelection.length}
                    onPress={(evt) => {
                      evt.stopPropagation();
                      store.onSelect(internalSelection);
                      setIsModalVisible(!isModalVisible);
                    }}
                  >
                    {t('actions.ok')}
                  </Button>
                </View>
              </View>
            ),
          }}
        />
      </View>
      {rest.divider && <Divider tw="bg-gray-600 my-1" />}
    </View>
  );
}
