import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { Movement } from '#screens/Dashboard/Main/History/components/Movement';
import {
  createSortingStore,
  ESortingOptions,
  SortingMenu,
} from '#screens/Dashboard/Main/History/components/SortMenu';
import { sortMovementCrops } from '#screens/Dashboard/Main/History/utils/sortMovements';

import { Button } from '#ui/components/Button';
import {
  createDataRangeStore,
  DateRangePickerWithStore,
} from '#ui/components/DateRangePickerWithStore';
import { GenericEmptyState } from '#ui/components/GenericEmptyState';
import { Input } from '#ui/components/Input';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { type CoolingUnit, EPaymentMethod, ERoles } from '#types/global';

import { DownloadDataModal } from '../components/DownloadDataModal';
import { sortMovements } from '../utils';
import { useAnalysis } from '../utils/useAnalysis';

export type PaymentOption = {
  label: string;
  value: EPaymentMethod;
};

const useCoolingUnitStore = createMultipleSelectStore<CoolingUnit>();
const usePaymentType = createMultipleSelectStore<PaymentOption>();
const useDateRangeStore = createDataRangeStore();
const useSortingStore = createSortingStore();

export const revenueAnalysisStores = [useDateRangeStore, usePaymentType, useCoolingUnitStore];

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function RevenueAnalysis(props: ManagementRouteProps<'RevenueAnalysis'>) {
  const { t } = useTranslationUtils();

  const { user } = useAuthStore();
  const { company } = useManagementStore();
  const { selectedItems: selectedUnits } = useCoolingUnitStore();
  const { startDate, endDate, setEndDate, setStartDate } = useDateRangeStore();
  const { selectedItems: paymentMethods } = usePaymentType();
  const { sorting } = useSortingStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState<boolean>(false);
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

  const { revenueData, isLoading } = useAnalysis(user!, coolingUnits ?? [], paymentMethods);

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
        movement.checkout?.crates.some((crate) =>
          crate.ownerName?.toLowerCase().includes(lowerCaseSearchString)
        ) ||
        sortMovementCrops(movement).some((crop) =>
          crop.toLowerCase().includes(lowerCaseSearchString)
        );

      return isWithinDateRange && matchesSearchTerm;
    });
  }, [sortedMovements, startDate, endDate, search]);

  useEffect(() => {
    return () => {
      setEndDate(null);
      setStartDate(null);
    };
  }, []);

  return (
    <View tw="absolute bottom-0 top-0 right-0 left-0 m-4 space-y-4">
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

      <View>
        <MultipleSelectWithStore<PaymentOption>
          datums={[
            {
              label: t('Dashboard.Management.RevenueAnalysis.paymentType.cash'),
              value: EPaymentMethod.CASH,
            },
            {
              label: t('Dashboard.Management.RevenueAnalysis.paymentType.creditCard'),
              value: EPaymentMethod.CREDIT_CARD,
            },
            {
              label: t('Dashboard.Management.RevenueAnalysis.paymentType.bankTransfer'),
              value: EPaymentMethod.BANK_TRANSFER,
            },
          ]}
          isModalVisible={isPaymentModalOpen}
          setIsModalVisible={setIsPaymentModalOpen}
          itemName={(item) => item.label}
          useSelectStore={usePaymentType}
          label={`${t('Dashboard.Management.RevenueAnalysis.paymentType.label')} ${paymentMethods.flatMap((p) => p.label).join(', ')}`}
          modalHeader={t('Dashboard.Management.RevenueAnalysis.paymentType.label')}
          divider
          autoSelectAll
          occupyFullWidth
        />
      </View>

      <View tw="flex flex-row items-center flex-wrap ml-2">
        <Text variant="TextMedium" tw="text-base mr-2">
          {t('Dashboard.Management.UsageAnalysis.dateSelectionLabel')}
        </Text>
        <DateRangePickerWithStore useDateRangeStore={useDateRangeStore} separator />
      </View>

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

      <Button
        mode="contained"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          setIsPDFModalOpen(true);
        }}
      >
        {t('Dashboard.Management.UsageAnalysis.downloadDataButton')}
      </Button>

      <ScrollView tw="mx-2 mt-2 mb-1" showsVerticalScrollIndicator={false}>
        {isLoading || coolingUnitsLoading ? (
          <View tw="h-full flex-1 mt-24 items-center justify-center">
            <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
          </View>
        ) : (
          <FlashList
            ListEmptyComponent={
              <GenericEmptyState message={t('Dashboard.Management.UsageAnalysis.empty')} />
            }
            showsVerticalScrollIndicator={false}
            data={filteredMovements}
            renderItem={({ item: movement, index }) => (
              <Movement
                key={`${movement.id}-${index}`}
                movement={movement}
                coolingUnit={
                  coolingUnits?.find((unit) => unit.id === movement.coolingUnitId) as CoolingUnit
                }
                selectedCompany={company}
                navigateToMarketSurvey={() => {
                  props.navigation.navigate('MarketSurveyStack', {
                    screen: 'MarketSurveyBase',
                    params: {
                      farmer: movement.checkout?.crates[0].ownerName,
                      crops: movement.checkout?.crates
                        ?.flatMap((crate) => crate.crop)
                        .filter(
                          (crop) => crop && !movement.checkout?.hasMarketSurvey?.includes(crop.id)
                        ) as Array<{ id: number; name: string }>,
                      checkoutId: movement.checkout?.id as number,
                      companyCurrency: company?.currency,
                    },
                  });
                }}
              />
            )}
            estimatedItemSize={40}
            estimatedListSize={{
              height: deviceHeight,
              width: deviceWidth,
            }}
          />
        )}
      </ScrollView>

      <View tw="flex flex-row justify-between items-center mb-4 mx-4">
        <Text variant="TextBold" tw="text-base font-bold">
          {t('Dashboard.Management.RevenueAnalysis.summary.total')}
        </Text>
        <Text variant="TextBold" tw="text-base font-bold">
          {(
            revenueData.reduce((acc, current) => (acc += current.checkout.totalPrice), 0) ?? 0
          ).toLocaleString('en-US', {
            style: 'currency',
            currency: company?.currency,
          })}
        </Text>
      </View>

      <DownloadDataModal
        isOpen={isPDFModalOpen}
        setIsOpen={setIsPDFModalOpen}
        coolingUnits={coolingUnits}
        mode="revenue"
      />
    </View>
  );
}

export default withSafeArea(RevenueAnalysis);
