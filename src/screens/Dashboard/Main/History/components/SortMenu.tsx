import { useFocusEffect } from '@react-navigation/native';
import React, { SetStateAction, useCallback, useMemo, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Dialog, Icon, Portal, RadioButton } from 'react-native-paper';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { useTranslationUtils } from '#i18n/utils';
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
        <Dialog
          visible={isModalVisible}
          onDismiss={() => {
            setInternalSelection(store.sorting);
            setIsModalVisible(!isModalVisible);
          }}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Title>{t('Dashboard.SortMenu.title')}</Dialog.Title>
          <Dialog.ScrollArea tw="px-0">
            <ScrollView tw="max-h-52" showsVerticalScrollIndicator>
              <RadioButton.Group
                value={internalSelection ?? ''}
                onValueChange={(value) => {
                  const item = options.find((datum) => datum.id === value);
                  if (!item) return;
                  setInternalSelection(item.id);
                }}
              >
                <FlatList
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  data={options}
                  keyExtractor={(item, index) => `${item.label}-${index}`}
                  renderItem={({ item }) => (
                    <RadioButtonItem
                      label={item.label}
                      value={item.id}
                      tw="flex flex-row m-0 px-0 py-2 px-6 w-full"
                    />
                  )}
                />
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button
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
              uppercase
              onPress={(evt) => {
                evt.stopPropagation();
                if (internalSelection) store.onSelect(internalSelection);
                setIsModalVisible(!isModalVisible);
              }}
            >
              {t('actions.ok')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
