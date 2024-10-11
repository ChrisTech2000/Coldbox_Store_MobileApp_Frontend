import { useFocusEffect } from '@react-navigation/native';
import React, { SetStateAction, useCallback, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, Portal, RadioButton } from 'react-native-paper';
import { create } from 'zustand';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';

import { Button } from '#ui/components/Button';
import { Modal } from '#ui/components/Modal';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { useControlledState } from '#ui/hooks/useControlledState';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

export enum ESortingOptions {
  MOST_RECENT = 'most_recent',
  OLDEST = 'oldest',
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
  sorting: ESortingOptions.MOST_RECENT,
  onSelect: (sorting) => set({ sorting }),
}));

export function SortingMenu(props: SortingMenuProps) {
  const store = useSortingStore();
  const user = useAuthStore((store) => store.user);
  const colors = useTailwindColors();

  const { t } = useTranslationUtils();

  const [isModalVisible, setIsModalVisible] = useControlledState<boolean>(
    props.isModalVisible,
    props.setIsModalVisible
  );

  const [internalSelection, setInternalSelection] = useState<ESortingOptions>(store.sorting);

  const options = useMemo(
    () => [
      { label: t('Dashboard.MyOrders.sort.mostRecent'), id: ESortingOptions.MOST_RECENT },
      { label: t('Dashboard.MyOrders.sort.oldest'), id: ESortingOptions.OLDEST },
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

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        tw="flex flex-row space-x-1 items-center"
      >
        <Text tw="text-green-primary">
          {options.find((o) => o.id === internalSelection)?.label ?? ''}
        </Text>
        <Icon
          name="arrow-drop-down"
          size={25}
          color={colors.green.primary}
          style={{
            transform: [{ rotate: isModalVisible ? '180deg' : '0deg' }],
          }}
        />
      </TouchableOpacity>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)}>
          <View tw="bg-white rounded-3xl h-auto space-y-2 p-4 mx-16">
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
                  showsVerticalScrollIndicator={false}
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
