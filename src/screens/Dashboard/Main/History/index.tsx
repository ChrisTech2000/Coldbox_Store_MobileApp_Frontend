import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { DashboardRoutes } from '#navigation/Dashboard';
import { HistoryTabStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { useTutorialStore } from '#stores/tutorial';
import { Company, CoolingUnit, ERoles } from '#types/global';

import { GenericError } from '#ui/components/GenericError';
import { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { HistoryOverlay } from '#screens/Dashboard/Tutorial/HistoryOverlay';
import { ECommonTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import { MOCKED_HISTORY_DATA } from '#screens/Dashboard/Tutorial/utils/mockedData';

import { Filters } from '../components/Filters';
import { Movement } from './components/Movement';
import { createSortingStore, ESortingOptions, SortingMenu } from './components/SortMenu';
import { sortMovements } from './utils/sortMovements';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const useCompanyStore = createSelectStore<Company>();
const useSortingStore = createSortingStore();

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function History(props: HistoryTabStackRouteProps<'RootHistoryTabStack'>) {
  const { t } = useTranslationUtils();
  const bottomTabNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const user = useAuthStore((store) => store.user);
  const isTutorialActive = useTutorialStore((store) => store.isTutorialActive);
  const sorting = useSortingStore((store) => store.sorting);
  const { farmerId, addRefreshDataFn } = useDashboardStore((store) => ({
    farmerId: store.farmerId,
    addRefreshDataFn: store.addRefreshDataFn,
  }));

  const coolingUnit = useCoolingUnitStore((store) => store.selectedItem);
  const company = useCompanyStore((store) => store.selectedItem);

  const [search, setSearch] = useState<string>('');
  const [areCoolingUnitsLoading, setAreCoolingUnitsLoading] = useState<boolean>(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);

  const { onLayout } = useWalkthroughStep({
    number: ECommonTutorialSteps.HISTORY_STEP,
    enableHardwareBack: true,
    OverlayComponent: HistoryOverlay,
    onPressMask: () => bottomTabNavigation.navigate('Main', { screen: 'CoolingUnits' }),
  });

  const {
    data: movements,
    isLoading: areMovementsLoading,
    refetch: refetchHistoryMovements,
  } = useApiCall(
    'getMovementsHistory',
    ColdtivateService.getMovementsHistory,
    {
      ...(user?.role === ERoles.COOLING_USER ? { farmerId: farmerId as number } : {}),
      coolingUnit: coolingUnit?.id as number,
    },
    {
      skip: (user?.role === ERoles.COOLING_USER && !farmerId) || !coolingUnit?.id,
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
      const matchesFarmer = movement.owner.toLowerCase().includes(lowerCaseSearchString);
      const matchesCrop = movement.movementCrops.some((crop) =>
        crop.name.toLowerCase().includes(lowerCaseSearchString)
      );

      return matchesCode || matchesFarmer || matchesCrop;
    });
  }, [sortedMovements, search]);

  const movementsWithCheckout = useMemo(() => {
    return movements.map((movement) => movement.checkinCode ?? null).filter(Boolean);
  }, [movements]);

  useEffect(() => {
    addRefreshDataFn(refetchHistoryMovements);
  }, []);

  return (
    <View tw="absolute bottom-0 top-0 right-0 left-0" onLayout={onLayout}>
      <Filters
        sortingMenu={
          <SortingMenu
            isModalVisible={isSortingModalOpen}
            setIsModalVisible={setIsSortingModalOpen}
            useSortingStore={useSortingStore}
            hideableOptions={[ESortingOptions.COOLING_USER_NAME]}
          />
        }
        search={search}
        onSearch={(val) => setSearch(val)}
        useCompanyStore={useCompanyStore}
        useCoolingUnitStore={useCoolingUnitStore}
        setAreCoolingUnitsLoading={(loading) => setAreCoolingUnitsLoading(loading)}
      />

      <ScrollView tw="mx-4 mt-2 mb-28" showsVerticalScrollIndicator={false}>
        {areCoolingUnitsLoading || areMovementsLoading ? (
          <View tw="h-full flex-1 mt-24 items-center justify-center">
            <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
          </View>
        ) : movements.length > 0 || isTutorialActive ? (
          <FlashList
            showsVerticalScrollIndicator={false}
            // eslint-disable-next-line
            // @ts-ignore
            data={isTutorialActive ? MOCKED_HISTORY_DATA : filteredMovements}
            renderItem={({ item: movement, index }) => (
              <Movement
                key={`${movement.id}-${index}`}
                movement={movement}
                coolingUnit={coolingUnit}
                selectedCompany={company}
                navigateToCheckIn={(movement, id) =>
                  props.navigation.navigate('EditCheckIn', {
                    movement,
                    coolingUnitId: id,
                  })
                }
                navigateToMarketSurvey={() => {
                  props.navigation.navigate('MarketSurveyStack', {
                    screen: 'MarketSurveyBase',
                    params: {
                      farmer: movement.owner, // TODO: this has been removed by the backend, we will need to review this later
                      crops: movement.movementCrops.filter(
                        (crop) => !movement.hasMarketSurvey.includes(crop.id)
                      ),
                      checkoutId: movement.checkoutId as number,
                      companyCurrency: company?.currency,
                    },
                  });
                }}
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
              {t('Dashboard.History.empty')}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(History, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
