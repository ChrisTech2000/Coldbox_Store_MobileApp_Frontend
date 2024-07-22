import { useFocusEffect } from '@react-navigation/native';
import React, { SetStateAction, useCallback, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Portal, RadioButton } from 'react-native-paper';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { Modal } from '#ui/components/Modal';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { useControlledState } from '#ui/hooks/useControlledState';

export enum ESortingOptions {
  CROP_TYPE = 'crop_type',
  MOVEMENT_DATE = 'movement_date',
  MOVEMENT_DATE_REVERSE = 'movement_date_reverse',
  CHECK_IN_FIRST = 'check_in_first',
  CHECK_OUT_FIRST = 'check_out_first',
  COOLING_USER_NAME = 'cooling_user_name',
}

type SortingStore = {
  sorting: ESortingOptions;
  onSelect: (sorting: ESortingOptions) => void;
};

type SortingMenuProps = {
  isModalVisible: boolean;
  hideableOptions?: Array<ESortingOptions>;
  useSortingStore: UseBoundStore<StoreApi<SortingStore>>;
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
};

export const createSortingStore = () =>
  create<SortingStore>((set) => ({
    sorting: ESortingOptions.MOVEMENT_DATE_REVERSE,
    onSelect: (sorting) => set({ sorting }),
  }));

export function SortingMenu({ useSortingStore, ...props }: SortingMenuProps) {
  const store = useSortingStore();
  const { t } = useTranslationUtils();

  const [isModalVisible, setIsModalVisible] = useControlledState<boolean>(
    props.isModalVisible,
    props.setIsModalVisible
  );

  const [internalSelection, setInternalSelection] = useState<ESortingOptions>(store.sorting);

  const options = useMemo(
    () =>
      [
        { label: t('Dashboard.History.sortMenuOptions.cropType'), id: ESortingOptions.CROP_TYPE },
        {
          label: t('Dashboard.History.sortMenuOptions.movementDate'),
          id: ESortingOptions.MOVEMENT_DATE,
        },
        {
          label: t('Dashboard.History.sortMenuOptions.movementDateReverse'),
          id: ESortingOptions.MOVEMENT_DATE_REVERSE,
        },
        {
          label: t('Dashboard.History.sortMenuOptions.checkInFirst'),
          id: ESortingOptions.CHECK_IN_FIRST,
        },
        {
          label: t('Dashboard.History.sortMenuOptions.checkOutFirst'),
          id: ESortingOptions.CHECK_OUT_FIRST,
        },
        {
          label: t('Dashboard.History.sortMenuOptions.coolingUser'),
          id: ESortingOptions.COOLING_USER_NAME,
        },
      ].filter((option) => !props.hideableOptions?.includes(option.id)),
    [t]
  );

  useFocusEffect(
    useCallback(() => {
      if (internalSelection && internalSelection !== store.sorting) {
        setInternalSelection(store.sorting);
      }
    }, [store.sorting])
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Icon source="sort" size={32} />
      </TouchableOpacity>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)}>
          <View tw="bg-white rounded-3xl h-auto space-y-2 items-center mx-16 py-1">
            <Text variant="TitleBold">{t('Dashboard.SortMenu.title')}</Text>
            <Divider tw="w-full bg-grey-700 my-1" />
            <RadioButton.Group
              value={internalSelection ?? ''}
              onValueChange={(value) => {
                const item = options.find((datum) => datum.id === value);
                if (!item) return;
                setInternalSelection(item.id);
              }}
            >
              <View tw="max-h-60">
                <FlatList
                  data={options}
                  keyExtractor={(item, index) => `${item.label}-${index}`}
                  renderItem={({ item }) => (
                    <RadioButtonItem
                      label={item.label}
                      value={item.id}
                      tw="flex flex-row ml-[-10]"
                    />
                  )}
                  nestedScrollEnabled
                />
              </View>
            </RadioButton.Group>
            <Divider tw="w-full bg-grey-700 mt-1" />
            <View tw="flex flex-row items-center justify-end w-full">
              <Button
                mode="text"
                uppercase
                onPress={(evt) => {
                  evt.stopPropagation();
                  setInternalSelection(store.sorting);
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
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
