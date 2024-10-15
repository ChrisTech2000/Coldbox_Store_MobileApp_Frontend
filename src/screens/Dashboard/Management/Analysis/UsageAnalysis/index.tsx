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

import { Button } from '#ui/components/Button';
import {
  createDataRangeStore,
  DateRangePickerWithStore,
} from '#ui/components/DateRangePickerWithStore';
import { Input } from '#ui/components/Input';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { type CoolingUnit, ERoles } from '#types/global';
import type { ManagementRouteProps } from '#navigation/Dashboard/Management';

import { sortMovements } from '../utils';
import { DownloadDataModal } from '../components/DownloadDataModal';

const useCoolingUnitStore = createMultipleSelectStore<CoolingUnit>();
const useDateRangeStore = createDataRangeStore();
const useSortingStore = createSortingStore();

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function UsageAnalysis(props: ManagementRouteProps<'UsageAnalysis'>) {
  const { t } = useTranslationUtils();

  const { user } = useAuthStore();
  const { company } = useManagementStore();
  const { selectedItems: selectedUnits } = useCoolingUnitStore();
  const { startDate, endDate, setEndDate, setStartDate } = useDateRangeStore();
  const { sorting } = useSortingStore();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
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

  const { data: usage, isLoading: usageDataLoading } = useApiCall(
    'getUsageAnalysis',
    ColdtivateService.getUsageAnalysis,
    selectedUnits.map((unit) => unit.id) as number[],
    {
      skip: !selectedUnits || !selectedUnits.length,
      defaultData: [],
    }
  );

  const sortedMovements = useMemo(() => {
    return (usage ?? []).slice().sort((a, b) => sortMovements(a, b, sorting));
  }, [usage, sorting]);

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
        movement.owner.toLowerCase().includes(lowerCaseSearchString) ||
        movement.movementCrops.some((crop) =>
          crop.name.toLowerCase().includes(lowerCaseSearchString)
        );

      return isWithinDateRange && matchesSearchTerm;
    });
  }, [sortedMovements, startDate, endDate, search]);

  const { totalCheckIns, totalCrates, totalUsers, totalWeight } = useMemo(() => {
    const { totalCrates, totalWeight, users } = filteredMovements
      .flatMap((movement) => ({
        cratesNumber: movement.cratesNumber,
        weight: movement.cratesWeight,
        user: movement.owner,
      }))
      .reduce(
        (acc, current) => {
          acc.totalCrates += current.cratesNumber;
          acc.totalWeight += current.weight;
          if (!acc.users.includes(current.user)) {
            acc.users.push(current.user);
          }
          return acc;
        },
        { totalCrates: 0, totalWeight: 0, users: [] as string[] }
      );

    return {
      totalCheckIns: filteredMovements.length,
      totalCrates,
      totalWeight,
      totalUsers: users.length,
    };
  }, [filteredMovements]);

  const movementsWithCheckout = useMemo(() => {
    return usage.map((movement) => movement.checkinCode ?? null).filter(Boolean);
  }, [usage]);

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

      <Button mode="contained" uppercase onPress={() => setIsPDFModalOpen(true)}>
        {t('Dashboard.Management.UsageAnalysis.downloadDataButton')}
      </Button>

      <ScrollView tw="mx-2 mt-2 mb-1" showsVerticalScrollIndicator={false}>
        {usageDataLoading || coolingUnitsLoading ? (
          <View tw="h-full flex-1 mt-24 items-center justify-center">
            <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
          </View>
        ) : filteredMovements.length > 0 ? (
          <FlashList
            showsVerticalScrollIndicator={false}
            data={filteredMovements}
            renderItem={({ item: movement, index }) => (
              <Movement
                key={`${movement.id}-${index}`}
                movement={movement}
                coolingUnit={
                  selectedUnits.find((unit) => unit.id === movement.coolingUnitId) as CoolingUnit
                }
                selectedCompany={company}
                navigateToCheckIn={(movement, id) =>
                  props.navigation.navigate('EditCheckIn', {
                    movement,
                    coolingUnitId: id,
                  })
                }
                movementsWithCheckout={movementsWithCheckout}
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

      <View tw="mb-4 mx-4">
        <View tw="flex flex-row justify-between items-center">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.Management.UsageAnalysis.summary.totalCheckIns')}
          </Text>
          <Text variant="TextBold" tw="text-base font-bold">
            {totalCheckIns}
          </Text>
        </View>

        <View tw="flex flex-row justify-between items-center">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.Management.UsageAnalysis.summary.totalCrates')}
          </Text>
          <Text variant="TextBold" tw="text-base font-bold">
            {totalCrates}
          </Text>
        </View>

        <View tw="flex flex-row justify-between items-center">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.Management.UsageAnalysis.summary.totalWeight')}
          </Text>
          <Text variant="TextBold" tw="text-base font-bold">
            {totalWeight} {t('Dashboard.Management.UsageAnalysis.summary.weightUnit')}
          </Text>
        </View>

        <View tw="flex flex-row justify-between items-center">
          <Text variant="TextBold" tw="text-base font-bold">
            {t('Dashboard.Management.UsageAnalysis.summary.totalUsers')}
          </Text>
          <Text variant="TextBold" tw="text-base font-bold">
            {totalUsers}
          </Text>
        </View>
      </View>

      <DownloadDataModal
        isOpen={isPDFModalOpen}
        dismiss={() => setIsPDFModalOpen(false)}
        coolingUnits={coolingUnits}
        mode="usage"
      />
    </View>
  );
}

export default withSafeArea(UsageAnalysis);
