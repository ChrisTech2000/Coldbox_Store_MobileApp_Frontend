import { useIsFocused } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Platform, RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator, Divider } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { cropTranslationLookup, getDefaultCropValues } from '#i18n/transl/misc/crops';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import { ShoppingCartScreenOverlay } from '#screens/Dashboard/Tutorial/MarketplaceOverlay';
import { EMarketplaceTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import { MOCKED_SHOPPING_CART_DATA } from '#screens/Dashboard/Tutorial/utils/mockedData';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import useCartStore from '#stores/shoppingCart';
import { useTutorialStore } from '#stores/tutorial';

import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';
import CompanyBottomSheet from '../Marketplace/components/CompanyBottomSheet';
import { CartItem } from './components/CartItem';
import { OwnershipModal } from './components/OwnershipModal';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

export const CART_MINIMUM_VALUE = 100;

function ShoppingCartRoot(props: ShoppingCartStackRouteProps<'Root'>) {
  const user = useAuthStore((store) => store.user);
  const toast = InAppNotifications.useToast();

  const company = useManagementStore((store) => store.company);
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const { t } = useTranslationUtils();
  const [isTutorialActive] = useTutorialStore((store) => [store.isTutorialActive]);

  const {
    recomputeCart,
    cartData,
    isLoading,
    allCoolingUnits,
    isCoolingUnitsLoading,
    coolingUnitsError,
    fetchCoolingUnits,
  } = useCartStore((store) => ({
    recomputeCart: store.recomputeCart,
    cartData: store.cartData,
    isLoading: store.isLoading,
    allCoolingUnits: store.allCoolingUnits,
    isCoolingUnitsLoading: store.isCoolingUnitsLoading,
    coolingUnitsError: store.coolingUnitsError,
    fetchCoolingUnits: store.fetchCoolingUnits,
  }));

  const contextualCartData = isTutorialActive ? MOCKED_SHOPPING_CART_DATA : cartData;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const locale = LanguageManager.read();

  const datums = useMemo(() => {
    const crops = useDashboardStore.getState().allCrops;

    if (!contextualCartData?.items) return [];

    const { buildMap, find } = cropTranslationLookup();
    const translationsLookup = buildMap();
    const cropsLookup = Object.fromEntries(crops?.map((crop) => [crop.id, crop]) || []);

    return contextualCartData.items.map((item) => {
      const crop = cropsLookup?.[item.relCropId];
      return {
        ...item,
        crop: {
          ...(crop || {}),
          image: crop?.image || getDefaultCropValues(t).imageUri,
          name: find(translationsLookup, {
            name: crop?.name || getDefaultCropValues(t).name,
            country: company?.country || farmerCountry || undefined,
            locale,
          }),
        },
      };
    });
  }, [t, contextualCartData?.items, isTutorialActive, company?.country, farmerCountry, locale]);

  useWalkthroughStep({
    number: EMarketplaceTutorialSteps.SHOPPING_CART_STEP,
    OverlayComponent: ShoppingCartScreenOverlay,
    fullScreen: true,
  });

  if (isLoading && !contextualCartData) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!contextualCartData || !contextualCartData.items?.length) {
    return (
      <View tw="flex-1 items-center justify-center space-y-3.5">
        <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
          <MaterialCommunityIcon name="cart-off" size={60} color={paperTheme.colors.primary} />
        </View>
        <Text tw="text-base">{t('Dashboard.ShoppingCart.empty')}</Text>
      </View>
    );
  }

  const orderDisabled =
    contextualCartData.totalProduceAmount -
      contextualCartData.totalDiscountAmount +
      contextualCartData.totalCoolingFeesAmount <
    CART_MINIMUM_VALUE;

  const cannotProceedWithoutUnits =
    isCoolingUnitsLoading || coolingUnitsError || !allCoolingUnits?.length;

  return (
    <React.Fragment>
      <ScrollView
        tw={cn('h-full pt-3 bg-white', HORIZONTAL_SPACING)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={async () => await recomputeCart(toast, t)}
          />
        }
      >
        <View tw="flex-1 pb-8">
          <FlashList
            data={datums}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            keyExtractor={(item) =>
              `marketplace-shopping-cart-list-item-#${item.marketListedCrateId}`
            }
            renderItem={({ item }) => <CartItem item={item} />}
            estimatedItemSize={120}
            ListFooterComponent={
              <View tw="flex-col w-full mt-6">
                <RBAC.ProtectedResource action="SET" subject="MarketplaceBuyerOption">
                  <Button
                    mode="outlined"
                    tw="border border-green-primary mb-8"
                    onPress={() => setIsModalOpen(true)}
                  >
                    {t('Dashboard.ShoppingCart.ownership', {
                      name: contextualCartData?.ownedOnBehalfOfCompanyId
                        ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`
                        : (company?.name ?? ''),
                    })}
                  </Button>
                </RBAC.ProtectedResource>

                <View tw="flex-row items-center justify-between">
                  <Text tw="text-lg">{t('Dashboard.ShoppingCart.subtotal')}</Text>
                  <Text tw="text-lg">
                    {formatCurrencyWithSymbol(
                      DEFAULT_CURRENCY_CODE,
                      contextualCartData.totalProduceAmount
                    )}
                  </Text>
                </View>

                <Divider tw="bg-zinc-400 my-3" />

                <Button
                  tw="w-5/6 self-center my-4"
                  mode="contained"
                  uppercase
                  disabled={orderDisabled || !!cannotProceedWithoutUnits}
                  onPress={(evt) => {
                    evt.stopPropagation();
                    if (cannotProceedWithoutUnits) {
                      fetchCoolingUnits();
                      toast.show(t('navigation.error.errorMessage'), { type: 'md_danger' });
                      return;
                    }
                    props.navigation.navigate('OrderDetails');
                  }}
                >
                  {t('actions.continue')}
                </Button>
                {orderDisabled ? (
                  <Text tw="text-red-700 self-center mb-4">
                    {t('Dashboard.ShoppingCart.errors.minimumCartValue')}
                  </Text>
                ) : null}
              </View>
            }
          />
        </View>
      </ScrollView>

      <_PortalsWrapper />
      <OwnershipModal isVisible={isModalOpen} close={() => setIsModalOpen(false)} />
    </React.Fragment>
  );
}

function _PortalsWrapper() {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <React.Fragment>
      <CompanyBottomSheet />
    </React.Fragment>
  );
}

export default withSafeArea(
  withErrorBoundary(ShoppingCartRoot, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
