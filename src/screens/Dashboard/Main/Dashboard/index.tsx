import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { ERoles, type Company, type CoolingUnit } from '#types/global';

import { createSelectStore } from '#ui/components/SelectWithStore';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { Filters, type Search } from '../components/Filters';
import { DashboardEmptyState } from './components/DashboardEmptyState';
import { OperatorActions } from './components/OperatorActions';
import { Produce } from './components/Produce';
import { SortingMenu, useSortingStore } from './components/SortMenu';
import { sortProduces } from './utils/sortProduces';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const useCompanyStore = createSelectStore<Company>();

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;
  const { user } = useAuthStore();

  const { sorting } = useSortingStore();
  const { selectedItem: coolingUnit } = useCoolingUnitStore();
  const { selectedItem: company } = useCompanyStore();
  const { farmerId, addRefreshDataFn } = useDashboardStore();

  const {
    data: farmerDashboardProduces,
    refetch: refreshFarmerDashboardProduces,
    isLoading: loadingFarmerDashboardProduces,
  } = useApiCall(
    'getFarmerDashboardProduces',
    ColdtivateService.getFarmerDashboardProduces,
    {
      coolingUnit: coolingUnit?.id as number,
      farmerId: farmerId as number,
    },
    {
      skip: !farmerId || !coolingUnit?.id,
      defaultData: [],
    }
  );

  const {
    data: operatorDashboardProduces,
    refetch: refreshOperatorDashboardProduces,
    isLoading: loadingOperatorDashboardProduces,
  } = useApiCall(
    'getDashboardProduces',
    ColdtivateService.getDashboardProduces,
    {
      coolingUnit: coolingUnit?.id as number,
    },
    {
      skip: user?.role === ERoles.COOLING_USER || !coolingUnit?.id,
      defaultData: [],
    }
  );

  const dashboardProduces =
    user?.role === ERoles.COOLING_USER ? farmerDashboardProduces : operatorDashboardProduces;

  const [searchType, setSearchType] = useState<Search>('details');
  const [search, setSearch] = useState<string>('');
  const [areCoolingUnitsLoading, setAreCoolingUnitsLoading] = useState<boolean>(true);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);

  const sortedProduces = useMemo(() => {
    return (dashboardProduces ?? []).slice().sort((a, b) => sortProduces(a, b, sorting));
  }, [dashboardProduces, sorting]);

  const filteredProduces = useMemo(() => {
    if (!search) return sortedProduces;
    const lowerCaseSearch = search.toLowerCase();

    return sortedProduces.filter((produce) => {
      if (searchType === 'id') {
        return produce.crates.some((crate) => crate.id.toString() === lowerCaseSearch);
      }

      return (
        produce.currentStorageDays.toString().includes(lowerCaseSearch) ||
        produce.farmer.toLowerCase().includes(lowerCaseSearch) ||
        produce.cropName.toLowerCase().includes(lowerCaseSearch) ||
        produce.movementCode.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }, [sortedProduces, search, searchType]);

  useEffect(() => {
    if (user?.role === ERoles.COOLING_USER) addRefreshDataFn(refreshFarmerDashboardProduces);
    else addRefreshDataFn(refreshOperatorDashboardProduces);
  }, [user?.role]);

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
        onSearchTypeChange={(type) => setSearchType(type)}
        searchType={searchType}
        useCompanyStore={useCompanyStore}
        useCoolingUnitStore={useCoolingUnitStore}
        setAreCoolingUnitsLoading={(loading) => setAreCoolingUnitsLoading(loading)}
      />

      {loadingFarmerDashboardProduces ||
      loadingOperatorDashboardProduces ||
      areCoolingUnitsLoading ? (
        <View tw="flex-1 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      ) : !dashboardProduces?.length ? (
        <DashboardEmptyState />
      ) : (
        <FlatList
          data={filteredProduces}
          renderItem={({ item: produce, index }) => (
            <Produce
              key={`${produce.id}-${index}`}
              produce={produce}
              onNavigate={() =>
                navigation.navigate('ProduceDetails', { produce, coolingUnit: coolingUnit })
              }
              currency={company?.currency ?? ''}
            />
          )}
        />
      )}
      {user?.role === ERoles.OPERATOR && <OperatorActions {...props} coolingUnit={coolingUnit} />}
    </View>
  );
}

export default withSafeArea(DashboardMain);
