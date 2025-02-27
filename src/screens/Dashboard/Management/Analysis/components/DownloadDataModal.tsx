import { format } from 'date-fns';
import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { View } from 'react-native';
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
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { useControlledState } from '#ui/hooks/useControlledState';
import { useToggle } from '#ui/hooks/useToggle';
import type { CoolingUnit } from '#types/global';
import reportCrash from '#ui/lib/reportCrash';
import { FileUtility } from '#ui/lib/file';

type DownloadDataModalProps = {
  coolingUnits?: Array<CoolingUnit>;
  mode?: 'usage' | 'revenue';
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const useCoolingUnitStore = createMultipleSelectStore<CoolingUnit>();
const useDateRangeStore = createDataRangeStore();

export const downloadAnalysisStores = [useCoolingUnitStore, useDateRangeStore];

export function DownloadDataModal(props: DownloadDataModalProps) {
  const { isOpen, setIsOpen, coolingUnits, mode } = props;

  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();
  const { selectedItems: selectedUnits } = useCoolingUnitStore();
  const { startDate, endDate } = useDateRangeStore();
  const { company } = useManagementStore();

  const [isModalOpen, setIsModalOpen] = useControlledState<boolean>(isOpen, setIsOpen);
  const [isProcessing, toggleIsProcessing] = useToggle(false);

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);

  const language = LanguageManager.read();

  return (
    <Portal>
      <Dialog
        visible={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        style={{ backgroundColor: 'white' }}
      >
        <Dialog.Title>{t('Dashboard.Management.UsageAnalysis.modal.title')}</Dialog.Title>
        <Dialog.Content>
          <View tw="space-y-2">
            <View>
              <DateRangePickerWithStore
                locale={language}
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
                toggleIsProcessing();
                if (!startDate || !endDate) throw new Error();
                const _company = company?.id;
                const _mode = mode === 'usage' ? 'usage_analysis' : 'revenue_analysis';
                const _startDate = format(new Date(startDate), 'yyyy-MM-dd');
                const _endDate = format(new Date(endDate), 'yyyy-MM-dd');
                const url = `${AIR_PROD_BASE_URL}company/${_company}/${_mode}?start_date=${_startDate}&end_date=${_endDate}&cooling_unit_ids=${selectedUnits.map((cu) => cu.id).join(',')}`;
                await FileUtility.downloadFile(url, `revenue_analysis_comp_id_${_company}`, 'xlsx');
                setIsModalOpen(false);
                toast.show(`${t('actions.done')}!`, { type: 'md_success' });
              } catch (exception) {
                toast.show(t('navigation.error.errorMessage'), { type: 'md_danger' });
                reportCrash(exception as Error);
              } finally {
                toggleIsProcessing();
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
