import { useFocusEffect } from '@react-navigation/native';
import React, { SetStateAction, useCallback, useMemo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Dialog, Portal, RadioButton } from 'react-native-paper';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { useControlledState } from '#ui/hooks/useControlledState';

export enum ESortingOptions {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
  COOLING_UNIT = 'cooling_unit',
}

type SortingStore = {
  sorting: ESortingOptions;
  onSelect: (sorting: ESortingOptions) => void;
};

type SortingMenuProps = {
  isModalVisible: boolean;
  useSortingStore: UseBoundStore<StoreApi<SortingStore>>;
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
};

export const createSortingStore = () =>
  create<SortingStore>((set) => ({
    sorting: ESortingOptions.DESCENDING,
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
    () => [
      {
        label: t('Dashboard.Analytics.comparisonTab.sortingMenuOptions.descending'),
        id: ESortingOptions.DESCENDING,
      },
      {
        label: t('Dashboard.Analytics.comparisonTab.sortingMenuOptions.ascending'),
        id: ESortingOptions.ASCENDING,
      },
      {
        label: t('Dashboard.Analytics.comparisonTab.sortingMenuOptions.coolingUnitName'),
        id: ESortingOptions.COOLING_UNIT,
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
      <Button
        mode="contained"
        contentStyle="bg-gray-800 h-8"
        icon="filter-variant"
        onPress={() => setIsModalVisible(true)}
        labelStyle="h-5"
      >
        {t('Dashboard.Analytics.comparisonTab.sortingLabel')}
      </Button>
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
                <View tw="max-h-40">
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
                </View>
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
