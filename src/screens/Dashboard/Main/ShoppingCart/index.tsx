import { useIsFocused } from '@react-navigation/native';
import { CurrencyStandardization } from 'currency-format-utils';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import useCartStore from '#stores/shoppingCart';

import CompanyBottomSheet from '../Marketplace/components/CompanyBottomSheet';
import { CartItem } from './components/CartItem';

function ShoppingCartRoot(props: ShoppingCartStackRouteProps<'Root'>) {
  const { t } = useTranslationUtils();
  const { fetchCart, cartData, isLoading } = useCartStore((store) => ({
    fetchCart: store.fetchCart,
    cartData: store.cartData,
    isLoading: store.isLoading,
  }));

  if (isLoading) {
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

  return (
    <React.Fragment>
      <ScrollView
        tw="h-full px-4 pt-3 bg-white"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={async () => await fetchCart()} />
        }
      >
        <View tw="flex-1 pb-8">
          <FlatList
            data={cartData.items}
            keyExtractor={(item) =>
              `marketplace-shopping-cart-list-item-#${item.marketListedCrateId}`
            }
            scrollEnabled={false}
            renderItem={({ item }) => <CartItem item={item} />}
            ListFooterComponent={
              <View tw="flex-col w-full mt-6">
                <View tw="flex-row items-center justify-between">
                  <Text tw="text-lg">{t('Dashboard.ShoppingCart.totalToPay')}</Text>
                  <Text tw="text-lg">
                    {CurrencyStandardization.currencyCode({
                      code: 'NGN', // TODO: get from somewhere
                      value: cartData.totalAmount,
                    }).getValueFormated()}
                  </Text>
                </View>
                <Divider tw="bg-zinc-400 my-3" />
                <Button
                  tw="w-5/6 self-center my-4"
                  mode="contained"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    props.navigation.navigate('OrderDetails');
                  }}
                >
                  {t('actions.continue')}
                </Button>
              </View>
            }
          />
        </View>
      </ScrollView>

      <_PortalsWrapper />
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
