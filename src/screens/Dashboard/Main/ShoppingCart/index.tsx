import { useIsFocused } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { FlatList, RefreshControl, View, Platform } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import useCartStore from '#stores/shoppingCart';
import { cn } from '#ui/lib/cn';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';
import { useDashboardStore } from '#stores/dashboard';

import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';
import CompanyBottomSheet from '../Marketplace/components/CompanyBottomSheet';
import { CartItem } from './components/CartItem';
import { OwnershipModal } from './components/OwnershipModal';
import { DEFAULT_CROP_VALUES } from '../Marketplace/utils';

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

  const { recomputeCart, cartData, isLoading } = useCartStore((store) => ({
    recomputeCart: store.recomputeCart,
    cartData: store.cartData,
    isLoading: store.isLoading,
  }));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const locale = LanguageManager.read();

  const datums = useMemo(() => {
    const crops = useDashboardStore.getState().allCrops;
    if (!cartData?.items) return [];
    const { buildMap, find } = cropTranslationLookup();
    const translationsLookup = buildMap();
    const cropsLookup = Object.fromEntries(crops?.map((crop) => [crop.id, crop]) || []);
    return cartData.items.map((item) => {
      const crop = cropsLookup?.[item.relCropId];
      return {
        ...item,
        crop: {
          ...(crop || {}),
          image: crop?.image || DEFAULT_CROP_VALUES.imageUri,
          name: find(translationsLookup, {
            name: crop?.name || DEFAULT_CROP_VALUES.name,
            country: company?.country || farmerCountry || undefined,
            locale,
          }),
        },
      };
    });
  }, [cartData?.items, company?.country, farmerCountry, locale]);

  if (isLoading && !cartData) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!cartData || !cartData.items?.length) {
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
    cartData.totalProduceAmount - cartData.totalDiscountAmount + cartData.totalCoolingFeesAmount <
    CART_MINIMUM_VALUE;

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
          <FlatList
            data={datums}
            keyExtractor={(item) =>
              `marketplace-shopping-cart-list-item-#${item.marketListedCrateId}`
            }
            scrollEnabled={false}
            renderItem={({ item }) => <CartItem item={item} />}
            ListFooterComponent={
              <View tw="flex-col w-full mt-6">
                <RBAC.ProtectedResource action="SET" subject="MarketplaceBuyerOption">
                  <Button
                    mode="outlined"
                    tw="border border-green-primary mb-8"
                    onPress={() => setIsModalOpen(true)}
                  >
                    {t('Dashboard.ShoppingCart.ownership', {
                      name: cartData?.ownedOnBehalfOfCompanyId
                        ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`
                        : (company?.name ?? ''),
                    })}
                  </Button>
                </RBAC.ProtectedResource>

                <View tw="flex-row items-center justify-between">
                  <Text tw="text-lg">{t('Dashboard.ShoppingCart.subtotal')}</Text>
                  <Text tw="text-lg">
                    {formatCurrencyWithSymbol(DEFAULT_CURRENCY_CODE, cartData.totalProduceAmount)}
                  </Text>
                </View>

                <Divider tw="bg-zinc-400 my-3" />

                <Button
                  tw="w-5/6 self-center my-4"
                  mode="contained"
                  uppercase
                  disabled={orderDisabled}
                  onPress={(evt) => {
                    evt.stopPropagation();
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
