import { FlashList } from '@shopify/flash-list';
import React, { useMemo, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { Movement } from '#screens/Dashboard/Main/History/components/Movement';
import {
  createSortingStore,
  ESortingOptions,
  SortingMenu,
} from '#screens/Dashboard/Main/History/components/SortMenu';

import { Button } from '#ui/components/Button';
import {
  createDataRangeStore,
  DateRangePickerWithStore,
} from '#ui/components/DateRangePickerWithStore';
import { Input } from '#ui/components/Input';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { type CoolingUnit, EPaymentType, ERoles } from '#types/global';
import { sortMovements } from '../utils';

type PaymentOption = {
  label: string;
  value: EPaymentType;
};

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const usePaymentType = createMultipleSelectStore<PaymentOption>();
const useDateRangeStore = createDataRangeStore();
const useSortingStore = createSortingStore();

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

function RevenueAnalysis() {
  const { t } = useTranslationUtils();

  const { user } = useAuthStore();
  const { company } = useManagementStore();
  const { selectedItem: coolingUnit } = useCoolingUnitStore();
  const { startDate, endDate } = useDateRangeStore();
  const { selectedItems: paymentMethods } = usePaymentType();
  const { sorting } = useSortingStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

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

  const { data: revenueData, isLoading: revenueDataLoading } = useApiCall(
    'getRevenueAnalysis',
    ColdtivateService.getRevenueAnalysis,
    {
      coolingUnits: coolingUnit?.id as number,
      paymentMethods: paymentMethods.flatMap((method) => method.value),
    },
    {
      skip: !coolingUnit?.id,
      defaultData: [],
    }
  );

  const sortedMovements = useMemo(() => {
    return (revenueData ?? []).slice().sort((a, b) => sortMovements(a, b, sorting));
  }, [revenueData, sorting]);

  const filteredMovements = useMemo(() => {
    if ((!startDate || !endDate) && !search) return sortedMovements;

    const start = startDate ?? null;
    const end = endDate ?? null;
    const lowerCaseSearchString = search?.toLowerCase() ?? null;

    return sortedMovements.filter((movement) => {
      const movementDate = new Date(movement.date);

      const isWithinDateRange = (!start || movementDate >= start) && (!end || movementDate <= end);

      const matchesSearchTerm =
        !lowerCaseSearchString ||
        movement.code.toLowerCase().includes(lowerCaseSearchString) ||
        movement.farmer.toLowerCase().includes(lowerCaseSearchString) ||
        movement.movementCrops.some((crop) =>
          crop.name.toLowerCase().includes(lowerCaseSearchString)
        );

      return isWithinDateRange && matchesSearchTerm;
    });
  }, [sortedMovements, startDate, endDate, search]);

  return (
    <View tw="absolute bottom-0 top-0 right-0 left-0 m-4 space-y-4">
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

      <View tw="flex flex-row justify-between items-center mb-4">
        <Text variant="TextMedium" tw="text-base ml-2">
          {t('Dashboard.Management.UsageAnalysis.dateSelectionLabel')}
        </Text>
        <DateRangePickerWithStore useDateRangeStore={useDateRangeStore} />
      </View>

      <MultipleSelectWithStore<PaymentOption>
        datums={[
          {
            label: t('Dashboard.Management.RevenueAnalysis.paymentType.cash'),
            value: EPaymentType.CASH,
          },
          {
            label: t('Dashboard.Management.RevenueAnalysis.paymentType.creditCard'),
            value: EPaymentType.CREDIT_CARD,
          },
        ]}
        isModalVisible={isUnitsModalOpen}
        setIsModalVisible={setIsUnitsModalOpen}
        itemName={(item) => item.label}
        useSelectStore={usePaymentType}
        label={`${t('Dashboard.Management.RevenueAnalysis.paymentType.label')} ${paymentMethods.flatMap((p) => p.label).join(', ')}`}
        modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
        divider
        autoSelectAll
        occupyFullWidth
      />

      <View tw="flex flex-row items-center justify-between">
        <Input
          tw="border bg-white border-gray-700 rounded-sm my-2 h-11 w-[85%]"
          label={`${t('Dashboard.SearchFilter.searchLabel')}...`}
          onChangeText={(value) => setSearch(value)}
          value={search}
          left={<TextInput.Icon icon="magnify" />}
        />
        <SortingMenu
          isModalVisible={isSortingModalOpen}
          setIsModalVisible={setIsSortingModalOpen}
          useSortingStore={useSortingStore}
          hideableOptions={[ESortingOptions.CHECK_OUT_FIRST, ESortingOptions.CHECK_IN_FIRST]}
        />
      </View>

      <Button mode="contained" uppercase>
        {t('Dashboard.Management.UsageAnalysis.downloadDataButton')}
      </Button>

      <ScrollView tw="mx-4 mt-2 mb-1" showsVerticalScrollIndicator={false}>
        {revenueDataLoading || coolingUnitsLoading ? (
          <View tw="h-full flex-1 mt-24 items-center justify-center">
            <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
          </View>
        ) : filteredMovements.length > 0 ? (
          <FlashList
            data={filteredMovements}
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
              {t('Dashboard.Management.UsageAnalysis.empty')}
            </Text>
          </View>
        )}
      </ScrollView>

      <View tw="flex flex-row justify-between items-center mb-4 mx-4">
        <Text variant="TextBold" tw="text-base font-bold">
          {t('Dashboard.Management.RevenueAnalysis.summary.total')}
        </Text>
        <Text variant="TextBold" tw="text-base font-bold">
          {revenueData.reduce((acc, current) => (acc += current.totalPrice), 0)}
        </Text>
      </View>
    </View>
  );
}

export default withSafeArea(RevenueAnalysis);
