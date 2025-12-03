import React, { useCallback, useEffect, useState, type SetStateAction } from 'react';
import { FlatList, View, type GestureResponderEvent } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Divider, RadioButton } from 'react-native-paper';
import { create } from 'zustand';

import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';

import { useControlledState } from '#ui/hooks/useControlledState';
import { type Translator, useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

export type SelectStore<T> = {
  selectedItem: T | null;
  onSelect: (item: T | null) => void;
  reset: () => void;
};

type SelectItemProps<T> = {
  autoSelect?: boolean;
  border?: boolean;
  datums: Array<T>;
  divider?: boolean;
  disabled?: boolean;
  emptyMessage?: string;
  isModalVisible: boolean;
  label: string;
  modalHeader?: string;
  occupyFullWidth?: boolean;
  useSelectStore: ReturnType<typeof createSelectStore<T>>;
  enableScroll?: boolean;
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
  itemName: (item: T) => string;
  postSelectionAction?: (val?: T) => void;
  testID?: string;
};

export const createSelectStore = <T,>(initialState?: T) =>
  create<SelectStore<T>>((set) => ({
    selectedItem: initialState ?? null,
    onSelect: (item) => set({ selectedItem: item }),
    reset: () => set({ selectedItem: null }),
  }));

function EmptyState(props: { occupyFullWidth?: boolean; emptyMessage: string }) {
  const { occupyFullWidth, emptyMessage } = props;
  return (
    <View tw={occupyFullWidth ? 'w-full' : ''}>
      <Text variant="TextMedium" tw="text-base pl-2">
        {emptyMessage}
      </Text>
      <Divider tw="bg-gray-600 my-1" />
    </View>
  );
}

function DialogFooter(props: {
  onCancel: (evt: GestureResponderEvent) => void;
  onConfirm: (evt: GestureResponderEvent) => void;
  t: Translator;
}) {
  const { onCancel, onConfirm, t } = props;
  return (
    <View tw="flex flex-row items-center justify-end w-full gap-2 px-2">
      <Button mode="text" uppercase onPress={onCancel} tw="shrink-0">
        {t('actions.cancel')}
      </Button>
      <Button mode="text" uppercase onPress={onConfirm} tw="shrink-0">
        {t('actions.ok')}
      </Button>
    </View>
  );
}

export default function SelectWithStore<T>(props: SelectItemProps<T>) {
  const { useSelectStore, enableScroll = true, ...rest } = props;

  const store = useSelectStore();
  const { t } = useTranslationUtils();

  const [internalSelection, setInternalSelection] = useState<T | null>(store.selectedItem);
  const [isModalVisible, setIsModalVisible] = useControlledState<boolean>(
    rest.isModalVisible,
    rest.setIsModalVisible
  );

  useEffect(() => {
    function handleEmptyDatums() {
      if (!rest.datums.length && store.selectedItem) {
        setInternalSelection(null);
        store.onSelect(null);
      }
    }

    function handleAutoSelect() {
      if (!store.selectedItem && rest.autoSelect && rest.datums.length > 0) {
        const firstDatum = rest.datums[0];
        store.onSelect(firstDatum);
        setInternalSelection(firstDatum);
      }
    }

    handleEmptyDatums();
    handleAutoSelect();
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

  function handleCancel(evt: GestureResponderEvent) {
    evt.stopPropagation();
    setInternalSelection(store.selectedItem);
    setIsModalVisible(!isModalVisible);
  }

  function handleConfirm(evt: GestureResponderEvent) {
    evt.stopPropagation();
    if (internalSelection) {
      store.onSelect(internalSelection);
      rest.postSelectionAction?.(internalSelection);
    }
    setIsModalVisible(!isModalVisible);
  }

  if (!rest.datums.length && rest.emptyMessage) {
    return <EmptyState occupyFullWidth={rest.occupyFullWidth} emptyMessage={rest.emptyMessage} />;
  }

  return (
    <View
      tw={cn(rest.occupyFullWidth && 'w-full', rest.border && 'border border-gray-900 py-4')}
      testID={props.testID}
    >
      <View tw="px-2">
        <Select
          variant="md"
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          disabled={rest.disabled}
          onDismiss={() => setInternalSelection(store.selectedItem)}
        >
          <Select.Touchable label={rest.label || ''} />
          <Select.Dialog
            enableScroll={enableScroll}
            header={rest.modalHeader || ''}
            FooterElement={<DialogFooter onCancel={handleCancel} onConfirm={handleConfirm} t={t} />}
          >
            <RadioButton.Group
              value={internalSelection ? rest.itemName(internalSelection) : ''}
              onValueChange={(value) => {
                const item = rest.datums.find((datum) => rest.itemName(datum) === value);
                if (!item) return;
                setInternalSelection(item);
              }}
            >
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={rest.datums}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <RadioButtonItem
                    label={rest.itemName(item)}
                    value={rest.itemName(item)}
                    tw={cn('flex flex-row m-0 py-2 w-full', !rest.modalHeader ? 'px-8' : 'px-6')}
                  />
                )}
              />
            </RadioButton.Group>
          </Select.Dialog>
        </Select>
      </View>
      {rest.divider ? <Divider tw="bg-gray-600 my-1" /> : null}
    </View>
  );
}
