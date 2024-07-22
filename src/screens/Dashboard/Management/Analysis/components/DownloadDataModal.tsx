import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import RNFS from 'react-native-fs';
import { Divider, Portal } from 'react-native-paper';
import XLSX from 'xlsx';

import { Button } from '#ui/components/Button';
import {
  createDataRangeStore,
  DateRangePickerWithStore,
} from '#ui/components/DateRangePickerWithStore';
import { Modal } from '#ui/components/Modal';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { CoolingUnit, EPaymentType } from '#types/global';

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

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);

  const { data: usageData, isLoading: usageDataLoading } = useApiCall(
    'getUsageAnalysis',
    ColdtivateService.getUsageAnalysis,
    coolingUnit?.id as number,
    {
      skip: !coolingUnit?.id || mode === 'revenue',
      defaultData: [],
    }
  );

  const { data: revenueData, isLoading: revenueDataLoading } = useApiCall(
    'getRevenueAnalysis',
    ColdtivateService.getRevenueAnalysis,
    {
      coolingUnits: coolingUnit?.id as number,
      paymentMethods: [EPaymentType.CASH, EPaymentType.CREDIT_CARD],
    },
    {
      skip: !coolingUnit?.id || mode === 'usage',
      defaultData: [],
    }
  );

  const data = mode === 'usage' ? usageData : revenueData;

  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return data;

    return data.filter((movement) => {
      const movementDate = new Date(movement.date);
      return (!startDate || movementDate >= startDate) && (!endDate || movementDate <= endDate);
    });
  }, [data, startDate, endDate]);

  const downloadDataAsXlsx = useCallback(async () => {
    const worksheetData = filteredData.flatMap((item) =>
      item.cratesCheckin.map((crate) => ({
        'Crate Id': item.id,
        'Check-in Code': item.checkinCode,
        'Check-in Date': item.checkinDate,
        'Crop Name': crate.name,
        Weight: crate.weight,
        'Price per Crate': 0,
        Currency: '£',
        'First Name': item.farmer.split(' ')[0],
        'Last Name': item.farmer.split(' ')[1],
        'Phone Number': item.farmer,
        Gender: '',
        'Cooling Unit Number': coolingUnit?.id ?? '',
        'Location Name': '',
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const xlsxData = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

    const base64Data = btoa(xlsxData);

    const fileName = 'data.xlsx';
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      await RNFS.writeFile(filePath, base64Data, 'base64');
      console.log('File saved to', filePath);
    } catch (error) {
      console.log('Error saving file:', error);
    }
  }, [filteredData, coolingUnit]);

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
            disabled={
              (mode === 'usage' && usageDataLoading) || (mode === 'revenue' && revenueDataLoading)
            }
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
