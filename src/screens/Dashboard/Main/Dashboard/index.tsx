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
import { DashboardProduce, ERoles, type Company, type CoolingUnit } from '#types/global';

import { TutorialFinishedMessageOverlay } from '#screens/Dashboard/Tutorial/TutorialFinishedMessageOverlay';
import { WelcomeMessageOverlay } from '#screens/Dashboard/Tutorial/WelcomeMessageOverlay';
import {
  ECommonTutorialSteps,
  EFarmerTutorialSteps,
} from '#screens/Dashboard/Tutorial/utils/constants';
import { MOCKED_DASHBOARD_DATA } from '#screens/Dashboard/Tutorial/utils/mockedData';

import { GenericError } from '#ui/components/GenericError';
import { createSelectStore } from '#ui/components/SelectWithStore';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { BOTTOM_NAV_HEIGHT, withSafeArea } from '#ui/primitives/withSafeArea';

import {
  Dashboard1Overlay,
  Dashboard2Overlay,
  Dashboard3Overlay,
  Dashboard4Overlay,
} from '#screens/Dashboard/Tutorial/FarmerDashboardOverlay';
import { Filters, type Search } from '../components/Filters';
import { DashboardEmptyState } from './components/DashboardEmptyState';
import { OperatorActions } from './components/OperatorActions';
import { Produce } from './components/Produce';
import { SortingMenu, useSortingStore } from './components/SortMenu';
import { sortProduces } from './utils/sortProduces';

export const useDashboardCoolingUnitStore = createSelectStore<CoolingUnit>();
export const useDashboardCompanyStore = createSelectStore<Company>();

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;
  const { user } = useAuthStore();
  const { company } = useManagementStore();
  const { isTutorialOn, toggleTutorial } = useTutorialStore((store) => ({
    isTutorialOn: store.isTutorialActive,
    toggleTutorial: store.toggleTutorial,
  }));

  const { start } = useWalkthroughStep({
    number: ECommonTutorialSteps.INITIAL_STEP,
    OverlayComponent: WelcomeMessageOverlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_1,
    enableHardwareBack: true,
    OverlayComponent: Dashboard1Overlay,
    fullScreen: true,
  });

  const { onLayout: onDashboard2Layout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_2,
    enableHardwareBack: true,
    OverlayComponent: Dashboard2Overlay,
    fullScreen: true,
  });

  const { onLayout: onDashboard3Layout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_3,
    enableHardwareBack: true,
    OverlayComponent: Dashboard3Overlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_4,
    enableHardwareBack: true,
    OverlayComponent: Dashboard4Overlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: ECommonTutorialSteps.FINAL_STEP,
    OverlayComponent: TutorialFinishedMessageOverlay,
    fullScreen: true,
  });

  const { sorting } = useSortingStore();
  const { selectedItem: coolingUnit } = useDashboardCoolingUnitStore();
  const { selectedItem: selectedCompany } = useDashboardCompanyStore();
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

  const dashboardProduces = isTutorialOn
    ? // eslint-disable-next-line
      // @ts-ignore
      (MOCKED_DASHBOARD_DATA as DashboardProduce[])
    : user?.role === ERoles.COOLING_USER
      ? farmerDashboardProduces
      : operatorDashboardProduces;

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
        return produce.checkedInCrates.some((crate) => crate.tag.toString() === lowerCaseSearch);
      }

      return (
        produce.currentStorageDays.toString().includes(lowerCaseSearch) ||
        produce.owner.toLowerCase().includes(lowerCaseSearch) ||
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
  }, [isTutorialOn]);

  useEffect(() => {
    if (user && (!user.lastLogin || user.lastLogin === 'None')) {
      toggleTutorial();
    }
  }, [user]);

  return (
    <View tw="absolute bottom-0 top-0 right-0 left-0" style={{ paddingBottom: BOTTOM_NAV_HEIGHT }}>
      <Filters
        sortingMenu={
          <SortingMenu
            isModalVisible={isSortingModalOpen}
            setIsModalVisible={setIsSortingModalOpen}
          />
        }
        search={search}
        onSearch={setSearch}
        onSearchTypeChange={setSearchType}
        searchType={searchType}
        useCompanyStore={useDashboardCompanyStore}
        useCoolingUnitStore={useDashboardCoolingUnitStore}
        setAreCoolingUnitsLoading={setAreCoolingUnitsLoading}
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
              onLayout={
                index === 0 ? onDashboard2Layout : index === 1 ? onDashboard3Layout : undefined
              }
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
