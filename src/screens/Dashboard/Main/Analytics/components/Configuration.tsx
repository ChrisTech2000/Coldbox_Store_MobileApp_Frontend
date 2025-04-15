import React, { useState } from 'react';
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

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { CoolingUnit } from '#types/global';
import { cn } from '#ui/lib/cn';

export type ConfigData = {
  startDate: Date;
  endDate: Date;
  coolingUnits: Array<CoolingUnit>;
} | null;

type ConfigurationModalProps = {
  coolingUnits: Array<CoolingUnit> | null;
  isOpen: boolean;
  confirm: (config: ConfigData) => void;
  dismiss: () => void;
};

export const useAnalyticsConfigCoolingUnitStore = createMultipleSelectStore<CoolingUnit>();
export const useAnalyticsDateRangeStore = createDataRangeStore();

export function ConfigurationModal({
  isOpen,
  dismiss,
  coolingUnits,
  confirm,
}: ConfigurationModalProps) {
  const { t } = useTranslationUtils();
  const { startDate, endDate } = useAnalyticsDateRangeStore();
  const { selectedItems: selectedUnits } = useAnalyticsConfigCoolingUnitStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);

  const language = LanguageManager.read();

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={dismiss} style={{ backgroundColor: 'white' }}>
        <Dialog.Title>{t('Dashboard.Management.UsageAnalysis.modal.title')}</Dialog.Title>
        <Dialog.Content tw="space-y-3">
          <View>
            <DateRangePickerWithStore
              locale={language}
              useDateRangeStore={useAnalyticsDateRangeStore}
              variant="contained"
              initialEndDate={new Date()}
              initialStartDate={new Date(2022, 9)}
              showSelectionTitle
            />
          </View>
          <View>
            <Text variant="TextMedium" tw="text-base mt-2 px-2">
              {t('Dashboard.Management.UsageAnalysis.modal.coolingUnitSelection')}
            </Text>
            <MultipleSelectWithStore<CoolingUnit>
              emptyMessage={t('Dashboard.noCoolingUnitAvailable')}
              datums={coolingUnits ?? []}
              isModalVisible={isUnitsModalOpen}
              setIsModalVisible={setIsUnitsModalOpen}
              itemName={(item) => item?.name}
              useSelectStore={useAnalyticsConfigCoolingUnitStore}
              label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
                name: selectedUnits.length ? selectedUnits.map((unit) => unit.name).join(', ') : '',
              })}
              modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
              divider
              disableOnEmpty
              autoSelectAll
              occupyFullWidth
            />
          </View>

          <Button
            mode="contained"
            uppercase
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse"
            tw="w-full"
            onPress={(evt) => {
              evt.stopPropagation();
              if (startDate && endDate && selectedUnits.length) {
                confirm({
                  startDate,
                  endDate,
                  coolingUnits: selectedUnits.sort((unit1, unit2) => unit1.id - unit2.id),
                });
              }
              dismiss();
            }}
          >
            {t('actions.done')}
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

export function Configuration({ openModal }: { openModal: () => void }) {
  const { t } = useTranslationUtils();
  const isRTL = LanguageManager.isRTL;
  return (
    <View tw="bg-gray-200 px-4 py-2 items-center w-full rounded-lg space-y-2">
      <Text variant="TextMedium" tw={cn('text-base text-center', isRTL && 'text-left')}>
        {t('Dashboard.Analytics.tabsShared.configurationMessage')}
      </Text>
      <Button mode="contained" contentStyle="bg-gray-800" icon="cog" onPress={openModal}>
        {t('Dashboard.Analytics.tabsShared.configureButton')}
      </Button>
    </View>
  );
}
