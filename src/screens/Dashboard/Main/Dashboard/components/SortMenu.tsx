import { useFocusEffect } from '@react-navigation/native';
import React, { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View, ScrollView } from 'react-native';
import { Dialog, Icon, Portal, RadioButton } from 'react-native-paper';
import { create } from 'zustand';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';

import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { useControlledState } from '#ui/hooks/useControlledState';

export enum ESortingOptions {
  CROP_TYPE = 'crop_type',
  PICK_UP_TIME = 'pick_up_time',
  CHECK_IN_DATE = 'check_in_date',
  CHECK_IN_DATE_REVERSE = 'check_in_date_reverse',
  COOLING_USER = 'cooling_user',
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
  sorting: ESortingOptions.CHECK_IN_DATE_REVERSE,
  onSelect: (sorting) => set({ sorting }),
}));

export function SortingMenu(props: SortingMenuProps) {
  const store = useSortingStore();
  const user = useAuthStore((store) => store.user);
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
    [t, user]
  );

  useFocusEffect(
    useCallback(() => {
      if (internalSelection && internalSelection !== store.sorting) {
        setInternalSelection(store.sorting);
      }
    }, [store.sorting])
  );

  useEffect(() => {
    if (user?.role !== ERoles.COOLING_USER) {
      options.push({
        label: t('Dashboard.SortMenu.options.coolingUser'),
        id: ESortingOptions.COOLING_USER,
      });
    }
  }, [user?.role]);

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
            setIsModalVisible(false);
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
