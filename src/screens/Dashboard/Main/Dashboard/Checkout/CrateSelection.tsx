import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  type GestureResponderEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { cropTranslationLookup } from '#i18n/transl/misc/crops';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { CheckOutStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckOutTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { useTutorialStore } from '#stores/tutorial';
import { CoolingUnit, Crate } from '#types/global';

import { CheckOutScreenOverlay } from '#screens/Dashboard/Tutorial/CheckoutOverlays';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { RadioButtonItem } from '#ui/components/RadioButton';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { CheckoutCrate } from '../components/CheckOutCrate';

type CrateDatum = Crate & {
  remainingShelfLife: number;
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ESTIMATED_LIST_SIZE = {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH - 32,
} as const;

const BUTTON_WIDTH = (DEVICE_WIDTH - 42) / 2;

export const useCrateSelectionCoolingUnitStore = createSelectStore<CoolingUnit>();

function CrateSelection({ route, navigation }: CheckOutStackRouteProps<'CrateSelection'>) {
  const { user, owner, coolingUnit: _coolingUnit, crates: _crates } = route.params;
  const { t } = useTranslationUtils();
  const { coolingUnits } = useDashboardStore();
  const isTutorialActive = useTutorialStore(useShallow((store) => store.isTutorialActive));
  const { selectedItem: coolingUnit, onSelect: onSelectCoolingUnit } =
    useCrateSelectionCoolingUnitStore();

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const locale = LanguageManager.read();

  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState<boolean>(false);
  const [selectedCrates, setSelectedCrates] = useState<Crate[]>([]);

  useWalkthroughStep({
    number: EOperatorTutorialSteps.CHECK_OUT_STEP_2,
    OverlayComponent: CheckOutScreenOverlay,
    fullScreen: true,
  });

  const { data, isLoading, refetch } = useApiCall(
    'getFarmerCrates',
    ColdtivateService.getFarmerCrates,
    {
      coolingUnit: coolingUnit?.id as number,
      farmer: user?.id as number,
    },
    {
      defaultData: [],
      skip: !user?.id || !coolingUnit?.id || !!_crates?.length || isTutorialActive,
    }
  );

  const {
    data: dashboardProduces,
    refetch: refetchDashboardProduces,
    isLoading: isLoadingDashboardProduces,
  } = useApiCall(
    'getDashboardProduces',
    ColdtivateService.getDashboardProduces,
    {
      coolingUnit: coolingUnit?.id as number,
    },
    {
      skip: !user?.id || !coolingUnit?.id || !!_crates?.length || isTutorialActive,
      defaultData: [],
    }
  );

  useFocusEffect(
    useCallback(() => {
      if (!data) return;
      Promise.all([refetch(), refetchDashboardProduces()]).catch((error) => {
        console.error('Error refetching data:', error);
      });
    }, [data, refetch, refetchDashboardProduces])
  );

  const { crates, allSelectableCrates, translatedCropNames } = useMemo(() => {
    const datums = _crates ?? data ?? [];

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    const translatedCropNames: Record<number, string> = {};
    const selectableCrates: Array<CrateDatum> = [];

    const mappedCrates = datums.map((crate) => {
      if (!translatedCropNames[crate.id]) {
        translatedCropNames[crate.id] = find(translationMap, {
          name: crate.name,
          country: companyCountry,
          locale,
        });
      }

      const newCrateDatum = {
        ...crate,
      } satisfies CrateDatum;

      if (!newCrateDatum.lockedWithinPendingOrders) {
        selectableCrates.push(newCrateDatum);
      }

      return newCrateDatum;
    });

    return {
      crates: mappedCrates,
      allSelectableCrates: selectableCrates,
      translatedCropNames,
    };
  }, [_crates, data, dashboardProduces, companyCountry, locale]);

  const onPress = useCallback(
    (crate: Crate) => {
      const copySelectedCrates = [...selectedCrates];
      const index = copySelectedCrates.indexOf(crate);

      if (index !== -1) copySelectedCrates.splice(index, 1);
      else copySelectedCrates.push(crate);

      setSelectedCrates(copySelectedCrates);
    },
    [selectedCrates]
  );

  const onSelectAll = useCallback(() => {
    if (selectedCrates.length === allSelectableCrates?.length) {
      setSelectedCrates([]);
      return;
    }

    setSelectedCrates(allSelectableCrates ?? []);
  }, [allSelectableCrates, selectedCrates]);

  const onNext = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();

      navigation.navigate('BillingInfo', {
        user: (user ? `${user?.user.firstName} ${user?.user.lastName}` : owner) ?? '',
        crates: selectedCrates,
        coolingUnit: coolingUnit ?? undefined,
      });
    },
    [selectedCrates, coolingUnit, user]
  );

  useEffect(() => {
    if (_crates && allSelectableCrates) setSelectedCrates(allSelectableCrates);
    if (_coolingUnit) onSelectCoolingUnit(_coolingUnit);
  }, [_crates, _coolingUnit, allSelectableCrates]);

  return (
    <View tw="flex-1">
      <View tw="pt-4 px-4">
        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg max-w-[70%]" numberOfLines={1}>
            {t('Dashboard.CrateManagement.coolingUserLabel')}
          </Text>
          <Text variant="TextMedium" tw="text-lg max-w-[30%]" numberOfLines={1}>
            {user?.user.firstName}
          </Text>
        </View>
        <Divider tw="bg-gray-400 my-2" />
        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg max-w-[70%]" numberOfLines={1}>
            {t('Dashboard.CrateManagement.selectCoolingUnitLabel')}
          </Text>
          <View tw="max-w-[30%]">
            <SelectWithStore<CoolingUnit>
              testID="cooling-unit-select"
              datums={coolingUnits ?? []}
              isModalVisible={isUnitsModalOpen}
              setIsModalVisible={setIsUnitsModalOpen}
              itemName={(item) => item?.name}
              disabled={!!_crates?.length || isLoading}
              useSelectStore={useCrateSelectionCoolingUnitStore}
              label={
                coolingUnit
                  ? coolingUnit.name
                  : `${t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}...`
              }
              modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
            />
          </View>
        </View>
        <Divider tw="bg-gray-400 my-2" />

        <_LoadingSlot isLoading={isLoading || isLoadingDashboardProduces}>
          {!coolingUnit ? (
            <Text variant="TextBold" tw="text-lg mt-2 ml-4">
              {t('Dashboard.CrateManagement.noUnitWarning')}
            </Text>
          ) : coolingUnit && crates?.length === 0 ? (
            <Text variant="TextBold" tw="text-lg mt-2 ml-4">
              {t('Dashboard.CrateManagement.noCratesWarning')}
            </Text>
          ) : null}

          {coolingUnit && crates && crates.length > 0 ? (
            <React.Fragment>
              <Text variant="TextBold" tw="text-lg mt-2 mb-1 ml-4">
                {t('Dashboard.CrateManagement.CheckOut.selectCrateMessage')}
              </Text>
              <TouchableOpacity
                tw="flex flex-row justify-between items-center"
                onPress={onSelectAll}
              >
                <Text variant="TextBold" tw="text-lg mt-2 ml-4">
                  {t('Dashboard.CrateManagement.CheckOut.selectAll')}
                </Text>
                <RadioButtonItem
                  rippleColor="white"
                  onPress={onSelectAll}
                  label=""
                  value=""
                  status={
                    selectedCrates.length === allSelectableCrates?.length ? 'checked' : 'unchecked'
                  }
                />
              </TouchableOpacity>

              <View style={{ height: DEVICE_HEIGHT - 400 }}>
                <FlashList
                  data={crates}
                  extraData={{ selectedCrates, translatedCropNames }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, itemIdx) => `checkout-list-item-${item.id}-#${itemIdx}`}
                  renderItem={({ item: crate, index }) => (
                    <View>
                      <TouchableOpacity
                        testID={`checkout-list-item-#${index}`}
                        tw="flex flex-row items-center"
                        onPress={() => onPress(crate)}
                        disabled={crate.lockedWithinPendingOrders}
                      >
                        <CheckoutCrate
                          crate={crate}
                          cropName={translatedCropNames?.[crate.id] || ''}
                        />
                        <View tw="absolute right-[-2]">
                          <RadioButtonItem
                            disabled={crate.lockedWithinPendingOrders}
                            rippleColor="white"
                            onPress={() => onPress(crate)}
                            label=""
                            value={crate.id.toString()}
                            status={selectedCrates.includes(crate) ? 'checked' : 'unchecked'}
                          />
                        </View>
                      </TouchableOpacity>
                      {crate.lockedWithinPendingOrders ? (
                        <Text
                          variant="TextMedium"
                          tw="ml-0.5"
                          numberOfLines={2}
                        >{`${t('Dashboard.CrateManagement.CheckOut.lockedWithinPendingOrders')}`}</Text>
                      ) : null}
                    </View>
                  )}
                  estimatedItemSize={80}
                  estimatedListSize={ESTIMATED_LIST_SIZE}
                />
              </View>
            </React.Fragment>
          ) : null}
        </_LoadingSlot>
      </View>

      <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-16 pt-4 absolute bottom-[-5%] left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
        <Button
          style={{ width: BUTTON_WIDTH }}
          mode="outlined"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            navigation.goBack();
          }}
          icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
        >
          {t('actions.back')}
        </Button>
        <Button
          testID="next-button"
          style={{ width: BUTTON_WIDTH }}
          mode="contained"
          uppercase
          onPress={onNext}
          contentStyle="flex flex-row-reverse items-center"
          icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
          disabled={selectedCrates.length === 0}
        >
          {t('actions.next')}
        </Button>
      </HideWithKeyboardView>
    </View>
  );
}

function _LoadingSlot(props: React.PropsWithChildren<{ isLoading: boolean }>) {
  if (!props.isLoading) return <React.Fragment>{props.children}</React.Fragment>;
  return (
    <View tw="items-center justify-center mt-6">
      <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(CrateSelection, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
