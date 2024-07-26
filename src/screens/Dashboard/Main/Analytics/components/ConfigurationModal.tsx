import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import {
  createDataRangeStore,
  DateRangePickerWithStore,
} from '#ui/components/DateRangePickerWithStore';
import { Modal } from '#ui/components/Modal';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { CoolingUnit } from '#types/global';
import { ConfigData } from '../Aggregated';

type ConfigurationModalProps = {
  coolingUnits: Array<CoolingUnit> | null;
  isOpen: boolean;
  confirm: (config: ConfigData) => void;
  dismiss: () => void;
};

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const useDateRangeStore = createDataRangeStore();

export function ConfigurationModal({
  isOpen,
  dismiss,
  coolingUnits,
  confirm,
}: ConfigurationModalProps) {
  const { t } = useTranslationUtils();
  const { selectedItem: coolingUnit } = useCoolingUnitStore();
  const { startDate, endDate } = useDateRangeStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);

  return (
    <Portal>
      <Modal visible={isOpen} onDismiss={dismiss}>
        <View tw="items-center bg-white mx-14 p-2 rounded-3xl h-auto space-y-4">
          <Text variant="TextMedium" tw="text-base mt-2 px-2">
            {t('Dashboard.Management.UsageAnalysis.modal.title')}
          </Text>
          <Divider tw="w-full" />

          <View tw="px-2">
            <DateRangePickerWithStore
              useDateRangeStore={useDateRangeStore}
              variant="contained"
              initialEndDate={new Date()}
              initialStartDate={new Date(2022, 9)}
              showSelectionTitle
            />
          </View>

          <View tw="w-[90%]">
            <Text variant="TextMedium" tw="text-base mt-2 px-2">
              {t('Dashboard.Management.UsageAnalysis.modal.coolingUnitSelection')}
            </Text>
            <SelectWithStore<CoolingUnit>
              emptyMessage={t('Dashboard.noCoolingUnitAvailable')}
              datums={coolingUnits ?? []}
              isModalVisible={isUnitsModalOpen}
              setIsModalVisible={setIsUnitsModalOpen}
              itemName={(item) => item?.name}
              useSelectStore={useCoolingUnitStore}
              label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
                name: coolingUnit ? coolingUnit.name : '',
              })}
              modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
              divider
              autoSelect
              occupyFullWidth
            />
          </View>

          <Button
            mode="contained"
            uppercase
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse"
            tw="w-[90%]"
            onPress={() => {
              if (startDate && endDate && coolingUnit) {
                confirm({
                  startDate,
                  endDate,
                  coolingUnit,
                });
              }
              dismiss();
            }}
          >
            {t('actions.done')}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
