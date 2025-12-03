import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Platform, RefreshControl, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import cloneDeep from 'lodash/cloneDeep';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { HistoryTabStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { useTutorialStore } from '#stores/tutorial';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { Company, CoolingUnit, User } from '#types/global';

import { GenericEmptyState } from '#ui/components/GenericEmptyState';
import { GenericError } from '#ui/components/GenericError';
import { createSelectStore } from '#ui/components/SelectWithStore';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { HistoryOverlay } from '#screens/Dashboard/Tutorial/HistoryOverlay';
import { ECommonTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import { MOCKED_HISTORY_DATA } from '#screens/Dashboard/Tutorial/utils/mockedData';

import { Filters } from '../components/Filters';
import { Movement } from './components/Movement';
import { createSortingStore, ESortingOptions, SortingMenu } from './components/SortMenu';
import { sortMovementCrops, sortMovements } from './utils/sortMovements';
import { useMovementsHistory } from './utils/useMovementsData';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

const useCoolingUnitStore = createSelectStore<CoolingUnit>();
const useCompanyStore = createSelectStore<Company>();
const useSortingStore = createSortingStore();

export const historyStores = [useCoolingUnitStore, useCompanyStore];

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function History(props: HistoryTabStackRouteProps<'RootHistoryTabStack'>) {
  const { t } = useTranslationUtils();

  const user = useAuthStore((store) => store.user);
  const [isTutorialActive] = useTutorialStore((store) => [store.isTutorialActive]);
  const sorting = useSortingStore((store) => store.sorting);
  const { farmerId, addRefreshDataFn, farmerCountry } = useDashboardStore(
    useShallow((store) => ({
      farmerId: store.farmerId,
      addRefreshDataFn: store.addRefreshDataFn,
      farmerCountry: store.farmerCountry,
    }))
  );

  const coolingUnit = useCoolingUnitStore((store) => store.selectedItem);
  const company = useCompanyStore((store) => store.selectedItem);

  const locale = LanguageManager.read();

  const [search, setSearch] = useState<string>('');
  const [areCoolingUnitsLoading, setAreCoolingUnitsLoading] = useState<boolean>(false);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);

  useWalkthroughStep({
    number: ECommonTutorialSteps.HISTORY_STEP,
    OverlayComponent: HistoryOverlay,
    fullScreen: true,
  });

  const {
    data: movements,
    refetch: refetchHistoryMovements,
    isLoading: isHistoryDataLoading,
    isValidating,
  } = useMovementsHistory(farmerId, user as User, coolingUnit);

  const sortedMovements = useMemo(
    () =>
      cloneDeep(movements).sort((a, b) =>
        sortMovements(a, b, sorting, t, company?.country || farmerCountry || undefined, locale)
      ),
    [movements, sorting, company?.country, farmerCountry, locale]
  );

  const filteredMovements = useMemo(() => {
    if (!sortedMovements) return [];
    const searchTerm = search.toLowerCase();

    // FYK → only used for filtering purposes
    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    return sortedMovements.filter((movement) => {
      const matchesCode = movement.code.toLowerCase().includes(searchTerm);
      const matchesFarmer =
        movement.checkin?.ownerName?.toLowerCase().includes(searchTerm) ??
        movement.checkout.crates.some((crate) =>
          crate.ownerName?.toLowerCase().includes(searchTerm)
        );

      const crops = sortMovementCrops(movement, t).map((cropName) =>
        find(translationMap, {
          name: cropName,
          country: company?.country || farmerCountry || undefined,
          locale,
        })
      );

      const matchesCrop = crops.some((crop) => crop.toLowerCase().includes(searchTerm));

      return matchesCode || matchesFarmer || matchesCrop;
    });
  }, [sortedMovements, search, company?.country, farmerCountry, locale]);

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

      {areCoolingUnitsLoading || isHistoryDataLoading ? (
        <View tw="h-full flex-1 mt-20 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      ) : (
        <FlashList
          ListEmptyComponent={<GenericEmptyState message={t('Dashboard.History.empty')} />}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 120 : 100,
            paddingTop: 10,
            paddingHorizontal: 15,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isValidating}
              onRefresh={async () => await refetchHistoryMovements()}
            />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={
            (isTutorialActive
              ? MOCKED_HISTORY_DATA
              : filteredMovements) as GetMovementsHistoryResponse
          }
          renderItem={({ item: movement }) => (
            <Movement
              movement={movement}
              movements={movements}
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
                    ownerId: movement.checkout?.crates?.[0]?.ownedByUserId as number,
                    owner: movement.checkout?.crates?.[0]?.ownerName as string,
                    crops: movement.checkout?.crates
                      ?.flatMap((crate) => crate.crop)
                      .filter(
                        (crop) =>
                          crop &&
                          !(movement.checkout?.hasMarketSurvey as number[])?.includes(
                            crop.id as number
                          )
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
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(History, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
