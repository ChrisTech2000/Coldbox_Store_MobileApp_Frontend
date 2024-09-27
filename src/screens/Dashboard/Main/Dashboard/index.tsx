import React, { useEffect, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator } from 'react-native-paper';

import RBAC from '#common/RBAC';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles, type Company, type CoolingUnit } from '#types/global';

import { WelcomeMessageOverlay } from '#screens/Dashboard/Tutorial/WelcomeMessageOverlay';

import { GenericError } from '#ui/components/GenericError';
import { createSelectStore } from '#ui/components/SelectWithStore';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { BOTTOM_NAV_HEIGHT, withSafeArea } from '#ui/primitives/withSafeArea';

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
  const { company } = useManagementStore();
  const { isTutorialOn } = useTutorialStore((store) => ({
    isTutorialOn: store.isTutorialActive,
    toggleTutorial: store.toggleTutorial,
  }));

  const { start } = useWalkthroughStep({
    number: 1,
    OverlayComponent: WelcomeMessageOverlay,
    fullScreen: true,
  });

  const { sorting } = useSortingStore();
  const { selectedItem: coolingUnit } = useCoolingUnitStore();
  const { selectedItem: selectedCompany } = useCompanyStore();
  const { isLoading: isGlobalInfoLoading, farmerId, addRefreshDataFn } = useDashboardStore();

  const {
    data: farmerDashboardProduces,
    refetch: refreshFarmerDashboardProduces,
    isLoading: loadingFarmerDashboardProduces,
    isValidating: isValidatingFarmerProduces,
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
    isValidating: isValidatingProduces,
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
        return produce.crates.some((crate) => crate.tag.toString() === lowerCaseSearch);
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

  useEffect(() => {
    if (isTutorialOn) start();
  }, [isTutorialOn])

  return (
    <View
      tw="absolute bottom-0 top-0 right-0 left-0"
      style={{ paddingBottom: BOTTOM_NAV_HEIGHT }}
    >
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

      {isGlobalInfoLoading ||
        loadingFarmerDashboardProduces ||
        loadingOperatorDashboardProduces ||
        areCoolingUnitsLoading ? (
        <View tw="flex-1 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      ) : !dashboardProduces?.length ? (
        <DashboardEmptyState />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={
                user?.role === ERoles.COOLING_USER
                  ? isValidatingFarmerProduces
                  : isValidatingProduces
              }
              onRefresh={async () =>
                user?.role === ERoles.COOLING_USER
                  ? await refreshFarmerDashboardProduces()
                  : await refreshOperatorDashboardProduces()
              }
            />
          }
          data={filteredProduces}
          renderItem={({ item: produce, index }) => (
            <Produce
              key={`${produce.id}-${index}`}
              produce={produce}
              onNavigate={() =>
                navigation.navigate('ProduceDetailsStack', {
                  screen: 'Root',
                  params: {
                    produce,
                    coolingUnit: coolingUnit,
                    currency: selectedCompany?.currency ?? company?.currency ?? '',
                  },
                })
              }
              currency={selectedCompany?.currency ?? company?.currency ?? ''}
            />
          )}
        />
      )}

      <RBAC.ProtectedResource action="VIEW" subject="OperatorActions">
        <OperatorActions {...props} coolingUnit={coolingUnit} />
      </RBAC.ProtectedResource>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(DashboardMain, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
