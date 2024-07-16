import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { Company, CoolingUnit, ERoles } from '#types/global';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { HistoryTabStackRouteProps } from 'navigation/Dashboard/Main/HistoryTabStack';
import { Filters } from '../components/Filters';
import { createSelectStore } from '../components/SelectWithStore';
import { Movement } from './components/Movement';
import { SortingMenu, useSortingStore } from './components/SortMenu';
import { sortMovements } from './utils/sortMovements';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const useCompanyStore = createSelectStore<Company>();

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

function History(props: HistoryTabStackRouteProps<'RootHistoryTabStack'>) {
  const { t } = useTranslationUtils();
  const { farmerId, addRefreshDataFn } = useDashboardStore();
  const { user } = useAuthStore();
  const { sorting } = useSortingStore();

  const { selectedItem: coolignUnit } = useCoolingUnitStore();
  const { selectedItem: company } = useCompanyStore();

  const [search, setSearch] = useState<string>('');
  const [areCoolingUnitsLoading, setAreCoolingUnitsLoading] = useState<boolean>(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);

  const {
    data: movements,
    isLoading: areMovementsLoading,
    refetch: refetchHistoryMovements,
  } = useApiCall(
    'getMovementsHistory',
    ColdtivateService.getMovementsHistory,
    {
      ...(user?.role === ERoles.COOLING_USER ? { farmerId: farmerId as number } : {}),
      coolingUnit: coolignUnit?.id as number,
    },
    {
      skip: (user?.role === ERoles.COOLING_USER && !farmerId) || !coolignUnit?.id,
      defaultData: [],
    }
  );

  const sortedMovements = useMemo(() => {
    return (movements ?? []).slice().sort((a, b) => sortMovements(a, b, sorting));
  }, [movements, sorting]);

  const filteredMovements = useMemo(() => {
    if (!search) return sortedMovements;

    const lowerCaseSearchString = search.toLowerCase();

    return sortedMovements.filter((movement) => {
      const matchesCode = movement.code.toLowerCase().includes(lowerCaseSearchString);
      const matchesFarmer = movement.farmer.toLowerCase().includes(lowerCaseSearchString);
      const matchesCrop = movement.movementCrops.some((crop) =>
        crop.name.toLowerCase().includes(lowerCaseSearchString)
      );

      return matchesCode || matchesFarmer || matchesCrop;
    });
  }, [sortedMovements, search]);

  useEffect(() => {
    addRefreshDataFn(refetchHistoryMovements);
  }, []);

  return (
    <View tw="absolute bottom-0 top-0 right-0 left-0">
      <Filters
        sortingMenu={
          <SortingMenu
            isModalVisible={isSortingModalOpen}
            setIsModalVisible={setIsSortingModalOpen}
          />
        }
        search={search}
        onSearch={(val) => setSearch(val)}
        useCompanyStore={useCompanyStore}
        useCoolingUnitStore={useCoolingUnitStore}
        setAreCoolingUnitsLoading={(loading) => setAreCoolingUnitsLoading(loading)}
      />

      <ScrollView tw="mx-4 my-2">
        {areCoolingUnitsLoading || areMovementsLoading ? (
          <View tw="h-full flex-1 mt-24 items-center justify-center">
            <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
          </View>
        ) : movements.length > 0 ? (
          <FlashList
            data={filteredMovements}
            renderItem={({ item: movement, index }) => (
              <Movement
                key={`${movement.id}-${index}`}
                movement={movement}
                coolingUnit={coolignUnit}
                selectedCompany={company}
                {...props}
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

export default withSafeArea(History);
