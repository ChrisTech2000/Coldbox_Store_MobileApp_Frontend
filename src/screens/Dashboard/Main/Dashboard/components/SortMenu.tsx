import { useFocusEffect } from '@react-navigation/native';
import React, { SetStateAction, useCallback, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Portal, RadioButton } from 'react-native-paper';
import { create } from 'zustand';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { Modal } from '#ui/components/Modal';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { useControlledState } from '#ui/hooks/useControlledState';

export enum ESortingOptions {
  CROP_TYPE = 'crop_type',
  PICK_UP_TIME = 'pick_up_time',
  CHECK_IN_DATE = 'check_in_date',
  CHECK_IN_DATE_REVERSE = 'check_in_date_reverse',
}

type SortingStore = {
  sorting: ESortingOptions;
  onSelect: (sorting: ESortingOptions) => void;
};

type SortingMenuProps = {
  isModalVisible: boolean;
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
};

export const useSortingStore = create<SortingStore>((set) => ({
  sorting: ESortingOptions.CHECK_IN_DATE,
  onSelect: (sorting) => set({ sorting }),
}));

export function SortingMenu(props: SortingMenuProps) {
  const store = useSortingStore();
  const { t } = useTranslationUtils();

  const [isModalVisible, setIsModalVisible] = useControlledState<boolean>(
    props.isModalVisible,
    props.setIsModalVisible
  );

  const [internalSelection, setInternalSelection] = useState<ESortingOptions>(store.sorting);

  const options = useMemo(
    () => [
      { label: t('Dashboard.SortMenu.options.cropType'), id: ESortingOptions.CROP_TYPE },
      { label: t('Dashboard.SortMenu.options.timeToPick'), id: ESortingOptions.PICK_UP_TIME },
      { label: t('Dashboard.SortMenu.options.checkInDate'), id: ESortingOptions.CHECK_IN_DATE },
      {
        label: t('Dashboard.SortMenu.options.checkInDateReverse'),
        id: ESortingOptions.CHECK_IN_DATE_REVERSE,
      },
    ],
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
