import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Linking, View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import {
  createDataRangeStore,
  DateRangePickerWithStore,
} from '#ui/components/DateRangePickerWithStore';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import { Text } from '#ui/components/Text';

import InAppNotifications from '#common/InAppNotifications';
import { AIR_PROD_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { CoolingUnit } from '#types/global';

type DownloadDataModalProps = {
  coolingUnits?: Array<CoolingUnit>;
  mode?: 'usage' | 'revenue';
  isOpen: boolean;
  dismiss: () => void;
};

const useCoolingUnitStore = createMultipleSelectStore<CoolingUnit>();
const useDateRangeStore = createDataRangeStore();

export const downloadAnalysisStores = [useCoolingUnitStore, useDateRangeStore];

export function DownloadDataModal(props: DownloadDataModalProps) {
  const { isOpen, dismiss, coolingUnits, mode } = props;

  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();
  const { selectedItems: selectedUnits } = useCoolingUnitStore();
  const { startDate, endDate } = useDateRangeStore();
  const { company } = useManagementStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const downloadDataAsXlsx = useCallback(async () => {
    if (!startDate || !endDate) throw new Error();

    const _company = company?.id;
    const _mode = mode === 'usage' ? 'usage_analysis' : 'revenue_analysis';
    const _startDate = format(new Date(startDate), 'yyyy-MM-dd');
    const _endDate = format(new Date(endDate), 'yyyy-MM-dd');

    const url = `${AIR_PROD_BASE_URL}company/${_company}/${_mode}?start_date=${_startDate}&end_date=${_endDate}&cooling_unit_ids=${selectedUnits.map((cu) => cu.id).join(',')}`;

    await Linking.openURL(url);
  }, [selectedUnits, startDate, endDate, company]);

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={dismiss} style={{ backgroundColor: 'white' }}>
        <Dialog.Title>{t('Dashboard.Management.UsageAnalysis.modal.title')}</Dialog.Title>
        <Dialog.Content>
          <View tw="space-y-2">
            <View>
              <DateRangePickerWithStore
                useDateRangeStore={useDateRangeStore}
                variant="contained"
                initialEndDate={new Date()}
                initialStartDate={new Date(2022, 9)}
                showSelectionTitle
              />
            </View>
            <View>
              <Text variant="TextMedium" tw="text-base mt-3 px-2">
                {t('Dashboard.Management.UsageAnalysis.modal.coolingUnitSelection')}
              </Text>
              <MultipleSelectWithStore<CoolingUnit>
                emptyMessage={t('Dashboard.noCoolingUnitAvailable')}
                datums={coolingUnits ?? []}
                isModalVisible={isUnitsModalOpen}
                setIsModalVisible={setIsUnitsModalOpen}
                itemName={(item) => item?.name}
                useSelectStore={useCoolingUnitStore}
                label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
                  name: selectedUnits ? selectedUnits.map((unit) => unit.name).join(', ') : '',
                })}
                modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
                divider
                autoSelect
                occupyFullWidth
              />
            </View>
          </View>

          <Button
            mode="contained"
            uppercase
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse"
            tw="w-full mt-4"
            disabled={isProcessing}
            onPress={async (evt) => {
              evt.stopPropagation();
              try {
                setIsProcessing(true);
                await downloadDataAsXlsx();
                dismiss();
              } catch (exception) {
                console.error('Failed to open URL: ', exception);
                toast.show(t('navigation.error.errorMessage'), { type: 'md_danger' });
              } finally {
                setIsProcessing(false);
              }
            }}
          >
            {t('actions.done')}
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
