import React, { useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import {
  createDataRangeStore,
  DateRangePickerWithStore,
} from '#ui/components/DateRangePickerWithStore';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { type CoolingUnit, ERoles } from '#types/global';
import { Movement } from '../Main/History/components/Movement';
import { FlashList } from '@shopify/flash-list';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const useDateRangeStore = createDataRangeStore();

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

function UsageAnalysis() {
  const { t } = useTranslationUtils();

  const { user } = useAuthStore();
  const { company } = useManagementStore();
  const { selectedItem: coolingUnit } = useCoolingUnitStore();
  //const { startDate, endDate } = useDateRangeStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);

  const { data: coolingUnits, isLoading: coolingUnitsLoading } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      ...(user?.role === ERoles.EMPLOYEE
        ? { company: company?.id as number }
        : { operator: user?.id as number }),
    },
    {
      skip:
        (user?.role === ERoles.EMPLOYEE && !company?.id) ||
        (user?.role === ERoles.OPERATOR && !user?.id),
      defaultData: [],
    }
  );

  const { data: usage, isLoading: usageDataLoading } = useApiCall(
    'getUsageAnalysis',
    ColdtivateService.getUsageAnalysis,
    coolingUnit?.id as number,
    {
      skip: !coolingUnit?.id,
      defaultData: [],
    }
  );

  return (
    <View tw="m-4 space-y-4">
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

      <View tw="flex flex-row justify-between items-center">
        <Text variant="TextMedium" tw="text-base ml-2">
          {t('Dashboard.Management.UsageAnalysis.dateSelectionLabel')}
        </Text>
        <DateRangePickerWithStore useDateRangeStore={useDateRangeStore} />
      </View>

      <ScrollView tw="mx-4 my-2">
        {usageDataLoading || coolingUnitsLoading ? (
          <View tw="h-full flex-1 mt-24 items-center justify-center">
            <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
          </View>
        ) : usage.length > 0 ? (
          <FlashList
            data={usage}
            renderItem={({ item: movement, index }) => (
              <Movement
                key={`${movement.id}-${index}`}
                movement={movement}
                coolingUnit={coolingUnit}
                selectedCompany={company}
              />
            )}
            estimatedItemSize={40}
            estimatedListSize={{
              height: deviceHeight,
              width: deviceWidth,
            }}
          />
        ) : (
          <View tw="flex-1 items-center text-center mx-4 mt-4">
            <Text variant="TextBold" tw="text-base text-green-primary text-center">
              {t('Dashboard.emptyCoolingUser')}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default withSafeArea(UsageAnalysis);
