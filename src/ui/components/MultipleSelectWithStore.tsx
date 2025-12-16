import React, { useCallback, useEffect, useState, type SetStateAction } from 'react';
import {
  Dimensions,
  FlatList,
  type GestureResponderEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { create } from 'zustand';

import { Button } from '#ui/components/Button';
import { Checkbox } from '#ui/components/Checkbox';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import { useControlledState } from '#ui/hooks/useControlledState';
import { cn } from '#ui/lib/cn';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';

interface SelectStore<T> {
  selectedItems: T[];
  onSelect: (items: T[]) => void;
  reset: () => void;
}

export const createMultipleSelectStore = <T,>() =>
  create<SelectStore<T>>((set) => ({
    selectedItems: [],
    onSelect: (items) => set({ selectedItems: items }),
    reset: () => set({ selectedItems: [] }),
  }));

interface SelectItemProps<T> {
  autoSelect?: boolean;
  autoSelectAll?: boolean;
  datums: Array<T>;
  displayValue?: string;
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
  enableScroll?: boolean;
}

const screenHeight = Dimensions.get('window').height;

const EMPTY_ARRAY: never[] = [];

export default function MultipleSelectWithStore<T>(props: SelectItemProps<T>) {
  const {
    useSelectStore,
    datums = EMPTY_ARRAY,
    label = '',
    modalHeader = '',
    enableScroll = true,
    displayValue,
    ...rest
  } = props;

  const store = useSelectStore();
  const { t } = useTranslationUtils();

  const [isModalVisible, setIsModalVisible] = useControlledState<boolean>(
    rest.isModalVisible,
    rest.setIsModalVisible
  );

  const [internalSelection, setInternalSelection] = useState<T[]>(store.selectedItems);

  const handleSelect = useCallback(
    (item: T) => {
      const itemKey = rest.itemName(item);
      setInternalSelection((prev) =>
        prev.some((selectedItem) => rest.itemName(selectedItem) === itemKey)
          ? prev.filter((selectedItem) => rest.itemName(selectedItem) !== itemKey)
          : [...prev, item]
      );
    },
    [rest.itemName]
  );

  const handleModalClose = useCallback(() => {
    setInternalSelection(store.selectedItems);
    setIsModalVisible(false);
  }, [store.selectedItems, setIsModalVisible]);

  const handleSelectAll = useCallback(() => {
    setInternalSelection(datums);
  }, [datums]);

  const handleSelectNone = useCallback(() => {
    setInternalSelection(EMPTY_ARRAY);
  }, []);

  const handleCancel = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      setInternalSelection(store.selectedItems);
      setIsModalVisible(false);
    },
    [store.selectedItems, setIsModalVisible]
  );

  const handleConfirm = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      store.onSelect(internalSelection);
      setIsModalVisible(false);
    },
    [store, internalSelection, setIsModalVisible]
  );

  useEffect(() => {
    if (
      !store.selectedItems.length &&
      (rest.autoSelect || rest.autoSelectAll) &&
      datums.length > 0
    ) {
      if (rest.autoSelectAll) {
        store.onSelect(datums);
        setInternalSelection(datums);
      } else {
        const firstDatum = datums[0];
        store.onSelect([firstDatum]);
        setInternalSelection([firstDatum]);
      }
    }
  }, [datums, store.selectedItems]);

  useFocusEffect(
    useCallback(() => {
      if (internalSelection.length !== store.selectedItems.length) {
        setInternalSelection(store.selectedItems);
      }
    }, [store.selectedItems])
  );

  if (!datums.length && rest.emptyMessage) {
    return (
      <View tw={rest.occupyFullWidth ? 'w-full' : ''}>
        <Text variant="TextMedium" tw="text-base">
          {rest.emptyMessage}
        </Text>
        <Divider tw="bg-gray-600 my-1" />
      </View>
    );
  }

  const isSmallScreen = screenHeight <= SMALL_SCREEN_THRESHOLD;

  return (
    <View tw={rest.occupyFullWidth ? 'w-full' : ''}>
      <View tw="px-2">
        <Select
          variant="md"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          onDismiss={handleModalClose}
        >
          <Select.Touchable label={label} displayValue={displayValue} />
          <Select.Dialog
            enableScroll={enableScroll}
            header={modalHeader}
            FooterElement={
              <View
                tw={
                  isSmallScreen ? 'items-center' : 'w-full flex flex-row items-center justify-end'
                }
              >
                <View
                  tw={cn(
                    'flex flex-row items-center justify-end w-1/2',
                    isSmallScreen && 'space-x-2 w-full'
                  )}
                >
                  <Button mode="text" uppercase onPress={handleSelectAll}>
                    {t('actions.all')}
                  </Button>
                  <Button mode="text" uppercase onPress={handleSelectNone}>
                    {t('actions.none')}
                  </Button>
                </View>
                <View
                  tw={cn(
                    'flex flex-row items-center justify-end w-1/2',
                    isSmallScreen && 'space-x-2 w-full'
                  )}
                >
                  <Button mode="text" uppercase onPress={handleCancel}>
                    {t('actions.cancel')}
                  </Button>
                  <Button
                    mode="text"
                    uppercase
                    disabled={rest.disableOnEmpty && !internalSelection.length}
                    onPress={handleConfirm}
                  >
                    {t('actions.ok')}
                  </Button>
                </View>
              </View>
            }
          >
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={datums}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  tw="w-full flex flex-row items-center justify-between px-4 py-2"
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text tw="text-base w-[70%]" numberOfLines={2}>
                    {rest.itemName(item)}
                  </Text>
                  <Checkbox
                    tw="flex flex-row-reverse ml-[-10]"
                    status={
                      internalSelection.some(
                        (selectedItem) => rest.itemName(selectedItem) === rest.itemName(item)
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                </TouchableOpacity>
              )}
              nestedScrollEnabled
            />
          </Select.Dialog>
        </Select>
      </View>
      {rest.divider && <Divider tw="bg-gray-600 my-1" />}
    </View>
  );
}
