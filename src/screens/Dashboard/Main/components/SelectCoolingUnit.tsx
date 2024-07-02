import React, { useCallback, useState, type SetStateAction } from 'react';
import { FlatList, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { create } from 'zustand';
import { useFocusEffect } from '@react-navigation/native';

import { Select } from '#ui/components/Select';
import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { useControlledState } from '#ui/hooks/useControlledState';
import { useTranslationUtils } from '#i18n/utils';

export type CoolingUnitMockedEntry = { name: string } | null;

export const useSelectCoolingUnitStore = create<{
  coolingUnit: CoolingUnitMockedEntry;
  onSelect: (coolingUnit: CoolingUnitMockedEntry) => void;
}>((set) => ({
  coolingUnit: null,
  onSelect: (datum) => set({ coolingUnit: datum }),
}));

type SelectCoolingUnitProps = {
  datums: Array<CoolingUnitMockedEntry>;
  isModalVisible: boolean;
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
};

export default function SelectCoolingUnit(props: SelectCoolingUnitProps) {
  const store = useSelectCoolingUnitStore();

  const [isModalVisible, setIsModalVisible] = useControlledState<boolean>(
    props.isModalVisible,
    props.setIsModalVisible
  );

  const [internalSelection, setInternalSelection] = useState<CoolingUnitMockedEntry>(
    store.coolingUnit
  );

  useFocusEffect(
    useCallback(() => {
      if (internalSelection?.name !== store.coolingUnit?.name) {
        setInternalSelection(store.coolingUnit);
      }
    }, [store.coolingUnit?.name])
  );

  const { t } = useTranslationUtils();

  return (
    <View tw="w-full px-4">
      <Select
        variant="md"
        label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
          name: store.coolingUnit?.name || props.datums.at(0)?.name || '',
        })}
        isModalOpen={isModalVisible}
        onClick={() => setIsModalVisible(!isModalVisible)}
        content={{
          header: t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header'),
          options: (
            <RadioButton.Group
              value={internalSelection?.name || props.datums.at(0)?.name || ''}
              onValueChange={(value) => {
                const unit = props.datums.find((item) => item?.name === value);
                if (!unit) return;
                setInternalSelection(unit);
              }}
            >
              <FlatList
                data={props.datums}
                keyExtractor={(_, itemIdx) => `cooling-unit-${itemIdx}`}
                renderItem={({ item }) => (
                  <RadioButtonItem
                    label={item?.name || ''}
                    value={item?.name || ''}
                    tw="flex flex-row-reverse ml-[-10]"
                  />
                )}
                nestedScrollEnabled
              />
            </RadioButton.Group>
          ),
          footer: (
            <View tw="flex flex-row items-center justify-end">
              <Button
                mode="text"
                uppercase
                onPress={(evt) => {
                  evt.stopPropagation();
                  setInternalSelection(store.coolingUnit);
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
                  store.onSelect(internalSelection);
                  setIsModalVisible(!isModalVisible);
                }}
              >
                {t('actions.ok')}
              </Button>
            </View>
          ),
        }}
      />
    </View>
  );
}
