import cloneDeep from 'lodash/cloneDeep';
import moize from 'moize';
import ms from 'ms';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator, Dialog, Portal } from 'react-native-paper';

import RBAC from '#common/RBAC';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { MainTabStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack';
import ColdtivateService from '#services/ColdtivateService';
import MarketplaceService from '#services/MarketplaceService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { useTutorialStore } from '#stores/tutorial';
import { DashboardProduce, ERoles, Farmer, type Company, type CoolingUnit } from '#types/global';
import LegacyContactsModal from '#screens/Dashboard/Main/Marketplace/components/LegacyContactsModal';

import { CoolingUnitsOverlay } from '#screens/Dashboard/Tutorial/CoolingUnitsOverlay';
import {
  Dashboard1Overlay,
  Dashboard2Overlay,
  Dashboard3Overlay,
  Dashboard4Overlay,
} from '#screens/Dashboard/Tutorial/FarmerDashboardOverlay';
import { TutorialFinishedMessageOverlay } from '#screens/Dashboard/Tutorial/TutorialFinishedMessageOverlay';
import { WelcomeMessageOverlay } from '#screens/Dashboard/Tutorial/WelcomeMessageOverlay';
import {
  ECommonTutorialSteps,
  EEmployeeTutorialSteps,
  EFarmerTutorialSteps,
} from '#screens/Dashboard/Tutorial/utils/constants';
import { MOCKED_DASHBOARD_DATA } from '#screens/Dashboard/Tutorial/utils/mockedData';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { BOTTOM_NAV_HEIGHT, withSafeArea } from '#ui/primitives/withSafeArea';

import type { DashboardRoutes } from '#navigation/Dashboard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { Filters, type Search } from '../components/Filters';
import { DashboardEmptyState } from './components/DashboardEmptyState';
import { OperatorActions } from './components/OperatorActions';
import { Produce } from './components/Produce';
import { SortingMenu, useSortingStore } from './components/SortMenu';
import { sortProduces } from './utils/sortProduces';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

export const useDashboardCoolingUnitStore = createSelectStore<CoolingUnit>();
export const useDashboardCompanyStore = createSelectStore<Company>();

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ESTIMATED_LIST_SIZE = {
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
} as const;

const _findFarmerById = moize(
  (id: number | undefined, list: Array<Farmer>) => list.find((f) => f.id === id),
  { maxAge: ms('6 seconds') }
);

const _checkMarketplaceEligibilityMemoized = moize.promise(
  async (companyId: number, userId: number) => {
    const result = await MarketplaceService.checkMarketplaceEligibility({
      companyIds: [companyId],
      userIds: [userId],
    });
    return result;
  },
  {
    maxAge: ms('5 seconds'),
    updateExpire: true,
  }
);

function DashboardMain(props: MainTabStackRouteProps<'RootMainTabStack'>) {
  const { navigation } = props;

  const { t } = useTranslationUtils();
  const { user } = useAuthStore();
  const { farmerCountry } = useDashboardStore();
  const { company } = useManagementStore();
  const { guard } = RBAC.useRBAC();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const locale = LanguageManager.read();

  const [isBankAccountModalOpen, setIsBankAccountModalOpen] = useState<boolean>(false);
  const [isBankAccountModalAllowedToOpen, setIsBankAccountModalAllowedToOpen] =
    useState<boolean>(false);

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
    OverlayComponent: Dashboard1Overlay,
    fullScreen: true,
  });

  const { onLayout: onDashboard2Layout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_2,
    OverlayComponent: Dashboard2Overlay,
    fullScreen: true,
  });

  const { onLayout: onDashboard3Layout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_3,
    OverlayComponent: Dashboard3Overlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_4,
    OverlayComponent: Dashboard4Overlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EEmployeeTutorialSteps.EMPLOYEE_COOLING_UNITS_STEP,
    OverlayComponent: CoolingUnitsOverlay,
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
      skip: !farmerId || !coolingUnit?.id || isTutorialOn,
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
      skip: user?.role === ERoles.COOLING_USER || !coolingUnit?.id || isTutorialOn,
      defaultData: [],
    }
  );

  const { data: farmers, isLoading: loadingFarmers } = useApiCall(
    'getFarmers',
    ColdtivateService.getFarmers,
    undefined,
    { defaultData: [] }
  );

  const [searchType, setSearchType] = useState<Search>('details');
  const [search, setSearch] = useState<string>('');
  const [areCoolingUnitsLoading, setAreCoolingUnitsLoading] = useState<boolean>(true);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);

  const dashboardProduces: Array<DashboardProduce> = useMemo(() => {
    if (isTutorialOn) return MOCKED_DASHBOARD_DATA as unknown as Array<DashboardProduce>;

    const isCoolingUser = user?.role === ERoles.COOLING_USER;
    const sourceProduces = isCoolingUser ? farmerDashboardProduces : operatorDashboardProduces;
    if (!sourceProduces) return [];

    const { buildMap, find } = cropTranslationLookup();
    const lookupMap = buildMap();

    return cloneDeep(sourceProduces).map((produce) => {
      produce.cropName = find(lookupMap, {
        name: produce.cropName,
        country: company?.country || farmerCountry || undefined,
        locale,
      });
      return produce;
    });
  }, [
    isTutorialOn,
    user?.role,
    farmerDashboardProduces,
    operatorDashboardProduces,
    company?.country,
    farmerCountry,
    locale,
  ]);

  const filteredProduces = useMemo(() => {
    if (!dashboardProduces?.length) return [];

    const list = cloneDeep(dashboardProduces).sort((a, b) => sortProduces(a, b, sorting));
    if (!search) return list;
    const searchTerm = search.toLowerCase();

    switch (searchType) {
      case 'id':
        return list.filter(({ checkedInCrates }) =>
          checkedInCrates.some((crate) => crate.tag?.toString() === searchTerm)
        );
      case 'details':
      default:
        return list.filter((produce) => {
          const searchableFields = [
            produce.currentStorageDays.toString(),
            produce.owner?.toLowerCase(),
            produce.cropName.toLowerCase(),
            produce.movementCode.toLowerCase(),
          ].filter(Boolean);
          return searchableFields.some((field) => field.includes(searchTerm));
        });
    }
  }, [dashboardProduces, sorting, search, searchType]);

  useEffect(() => {
    if (user?.role === ERoles.COOLING_USER) addRefreshDataFn(refreshFarmerDashboardProduces);
    else addRefreshDataFn(refreshOperatorDashboardProduces);
  }, [user?.role]);

  useEffect(() => {
    if (user && (!user.lastLogin || user.lastLogin === 'None')) {
      start();
      toggleTutorial(true);
      setIsBankAccountModalAllowedToOpen(true);
    }
  }, [user]);

  useEffect(() => {
    if (isTutorialOn || !isBankAccountModalAllowedToOpen) return;
    const marketplaceUser = guard('VIEW', 'MarketplaceListing');

    if (user?.role === ERoles.EMPLOYEE && marketplaceUser && company) {
      _checkMarketplaceEligibilityMemoized(company.id, user.id).then((result) => {
        if (!result.companies[company.id]) {
          setIsBankAccountModalOpen(true);
        }
      });
    }
  }, [isTutorialOn, isBankAccountModalAllowedToOpen, user, company]);

  const hideInTutorial =
    isTutorialOn && user?.role === ERoles.COOLING_USER && SCREEN_HEIGHT <= SMALL_SCREEN_THRESHOLD;

  return (
    <View tw="absolute bottom-0 top-0 right-0 left-0" style={{ paddingBottom: BOTTOM_NAV_HEIGHT }}>
      <Filters
        sortingMenu={
          !hideInTutorial ? (
            <SortingMenu
              isModalVisible={isSortingModalOpen}
              setIsModalVisible={setIsSortingModalOpen}
            />
          ) : undefined
        }
        search={search}
        onSearch={setSearch}
        onSearchTypeChange={setSearchType}
        searchType={!hideInTutorial ? searchType : undefined}
        useCompanyStore={useDashboardCompanyStore}
        useCoolingUnitStore={useDashboardCoolingUnitStore}
        setAreCoolingUnitsLoading={setAreCoolingUnitsLoading}
      />

      {isGlobalInfoLoading ||
      loadingFarmerDashboardProduces ||
      loadingOperatorDashboardProduces ||
      loadingFarmers ||
      areCoolingUnitsLoading ? (
        <View tw="flex-1 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      ) : (
        <FlashList
          ListEmptyComponent={<DashboardEmptyState />}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={40}
          estimatedListSize={ESTIMATED_LIST_SIZE}
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
              farmer={_findFarmerById(produce.farmerId, farmers ?? []) as Farmer}
              onNavigate={() => {
                navigation.navigate('ProduceDetailsStack', {
                  screen: 'Root',
                  params: {
                    produce,
                    coolingUnit: coolingUnit,
                    currency: selectedCompany?.currency ?? company?.currency ?? '',
                    companyId: (selectedCompany?.id ?? company?.id) as number,
                  },
                });
              }}
              currency={selectedCompany?.currency ?? company?.currency ?? ''}
            />
          )}
        />
      )}

      <RBAC.ProtectedResource action="VIEW" subject="OperatorActions">
        <OperatorActions {...props} coolingUnit={coolingUnit} />
      </RBAC.ProtectedResource>

      <RBAC.ProtectedResource action="VIEW" subject="MarketplaceListing">
        <Portal>
          <Dialog
            visible={isBankAccountModalOpen}
            onDismiss={() => setIsBankAccountModalOpen(false)}
            style={{ backgroundColor: 'white' }}
          >
            <Dialog.Content>
              <Text tw="text-base">{t('Dashboard.ProduceDetails.employeeNoBankAccount')}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={(evt) => {
                  evt.stopPropagation();
                  rootNavigation.navigate('Management', {
                    screen: 'PayoutSettings',
                    params: { isCompanyView: true },
                  });
                  setIsBankAccountModalOpen(false);
                }}
              >
                {t('Dashboard.ProduceDetails.addBankAccountButton')}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </RBAC.ProtectedResource>

      <LegacyContactsModal />
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(DashboardMain, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
