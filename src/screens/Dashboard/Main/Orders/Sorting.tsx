import React, { type SetStateAction, useCallback, useMemo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Dialog, Portal, RadioButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { create } from 'zustand';

import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useAuthStore } from '#stores/auth';
import { useTranslationUtils } from '#i18n/utils';
import { useControlledState } from '#ui/hooks/useControlledState';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { cn } from '#ui/lib/cn';

const DEVICE_HEIGHT = Dimensions.get('screen').height;

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
          {options.find((o) => o.id === store.sorting)?.label ?? ''}
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
        <Dialog
          visible={isModalVisible}
          onDismiss={() => {
            setInternalSelection(store.sorting);
            setIsModalVisible(false);
          }}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Title>{t('Dashboard.SortMenu.title')}</Dialog.Title>
          <Dialog.Content tw="android:pb-1.5 p-0">
            <RadioButton.Group
              value={internalSelection ?? ''}
              onValueChange={(value) => {
                const item = options.find((datum) => datum.id === value);
                if (typeof item === 'undefined') return;
                setInternalSelection(item.id);
              }}
            >
              {options.map((item, itemIdx) => (
                <RadioButtonItem
                  key={`${item.label}-${itemIdx}`}
                  label={item.label}
                  value={item.id}
                  tw="flex flex-row m-0 px-0 py-2 px-8 w-full"
                />
              ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions
            tw={cn(
              'mt-4 space-x-2',
              DEVICE_HEIGHT > SMALL_SCREEN_THRESHOLD
                ? 'flex flex-row items-center justify-end'
                : 'items-center'
            )}
          >
            <Button
              onPress={(evt) => {
                evt.stopPropagation();
                setInternalSelection(store.sorting);
                setIsModalVisible(!isModalVisible);
              }}
            >
              {t('actions.cancel')}
            </Button>
            <Button
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
