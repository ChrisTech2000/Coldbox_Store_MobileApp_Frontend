import React, { useCallback, useState } from 'react';
import { Linking, View } from 'react-native';
import { Divider, Portal } from 'react-native-paper';
import { format } from 'date-fns';

import { Button } from '#ui/components/Button';
import {
  createDataRangeStore,
  DateRangePickerWithStore,
} from '#ui/components/DateRangePickerWithStore';
import { Modal } from '#ui/components/Modal';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { CoolingUnit } from '#types/global';
import { AIR_PROD_BASE_URL } from '#constants/environment';

type DownloadDataModalProps = {
  coolingUnits?: Array<CoolingUnit>;
  mode?: 'usage' | 'revenue';
  isOpen: boolean;
  dismiss: () => void;
};

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const useDateRangeStore = createDataRangeStore();

export function DownloadDataModal({ isOpen, dismiss, coolingUnits, mode }: DownloadDataModalProps) {
  const { t } = useTranslationUtils();
  const { selectedItem: coolingUnit } = useCoolingUnitStore();
  const { startDate, endDate } = useDateRangeStore();
  const { company } = useManagementStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);

  const downloadDataAsXlsx = useCallback(async () => {
    if (!startDate || !endDate) return;

    const _company = company?.id;
    const _mode = mode === 'usage' ? 'usage_analysis' : 'revenue_analysis';
    const _startDate = format(new Date(startDate), 'yyyy-MM-dd');
    const _endDate = format(new Date(endDate), 'yyyy-MM-dd');

    const url = `${AIR_PROD_BASE_URL}company/${_company}/${_mode}?start_date=${_startDate}&end_date=${_endDate}&cooling_unit_ids=${coolingUnit?.id}`;

    Linking.openURL(url).catch((err) => {
      console.error('Failed to open URL: ', err);
    });
  }, [coolingUnit, startDate, endDate, company]);

  return (
    <Portal>
      <Modal visible={isOpen} onDismiss={dismiss}>
        <View tw="items-center bg-white mx-14 p-2 rounded-3xl h-auto space-y-4">
          <Text variant="TextMedium" tw="text-base mt-2 px-2">
            {t('Dashboard.Management.UsageAnalysis.modal.title')}
          </Text>
          <Divider />

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
              downloadDataAsXlsx();
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
